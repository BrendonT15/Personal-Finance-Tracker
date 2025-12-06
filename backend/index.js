import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import supabase from "./config/supabase.js";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());

app.post("/auth/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ user: data.user });
});

app.post("/auth/signin", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({
    user: data.user,
    session: data.session,
  });
});

app.post("/auth/signout", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No authorization token provided" });
  }

  const token = authHeader.split(" ")[1];

  const { error } = await supabase.auth.signOut(token);

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.json({ message: "Signed out successfully" });
});

// PLAID API STUFF
const config = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const client = new PlaidApi(config);

app.post("/api/create-link-token", async (req, res) => {
  try {
    console.log("=== CREATE LINK TOKEN REQUEST ===");
    console.log("Request body:", req.body);

    const { user_id } = req.body;

    console.log("User ID:", user_id);
    console.log("PLAID_CLIENT_ID:", process.env.PLAID_CLIENT_ID);
    console.log("PLAID_SECRET exists:", !!process.env.PLAID_SECRET);
    console.log(
      "PLAID_SECRET value:",
      process.env.PLAID_SECRET?.substring(0, 10) + "..."
    );

    if (!user_id) {
      console.log("ERROR: Missing user_id");
      return res.status(400).send("Missing user_id");
    }

    console.log("Calling Plaid API...");
    const response = await client.linkTokenCreate({
      user: { client_user_id: user_id },
      client_name: "MyFinanceApp",
      products: ["transactions"],
      country_codes: ["US"],
      language: "en",
    });

    console.log("Plaid response received:", response.data);
    console.log("Link token created successfully");
    res.json(response.data);
  } catch (err) {
    console.error("=== ERROR CREATING LINK TOKEN ===");
    console.error("Error:", err);
    console.error("Error response:", err.response?.data);
    console.error("Error status:", err.response?.status);
    res.status(500).json({
      error: "Failed to create link token",
      details: err.response?.data || err.message,
    });
  }
});

app.post("/api/exchange-public-token", async (req, res) => {
  const { public_token, user_id } = req.body;

  try {
    const exchangeResponse = await client.itemPublicTokenExchange({
      public_token,
    });

    const accessToken = exchangeResponse.data.access_token;
    const itemId = exchangeResponse.data.item_id;

    const { error } = await supabase.from("plaid_items").insert({
      user_id: user_id,
      access_token: accessToken,
      item_id: itemId,
    });

    if (error) throw error;

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Token exchange failed");
  }
});

app.post("/api/get-accounts", async (req, res) => {
  const { access_token } = req.body;

  try {
    const accountsResponse = await client.accountsGet({
      access_token,
    });

    console.log("=== ACCOUNT INFO ===");
    console.log(JSON.stringify(accountsResponse.data, null, 2));

    res.json(accountsResponse.data);
  } catch (err) {
    console.error("Error fetching accounts:", err);
    res.status(500).send("Failed to fetch accounts");
  }
});

app.post("/api/get-transactions", async (req, res) => {
  const { access_token } = req.body;

  try {
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const request = {
      access_token,
      start_date: thirtyDaysAgo.toISOString().split("T")[0],
      end_date: now.toISOString().split("T")[0],
    };

    const transactionsResponse = await client.transactionsGet(request);

    console.log("=== TRANSACTIONS ===");
    console.log(JSON.stringify(transactionsResponse.data, null, 2));

    res.json(transactionsResponse.data);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).send("Failed to fetch transactions");
  }
});

app.post("/api/get-item", async (req, res) => {
  const { access_token } = req.body;

  try {
    const itemResponse = await client.itemGet({
      access_token,
    });

    console.log("=== ITEM INFO ===");
    console.log(JSON.stringify(itemResponse.data, null, 2));

    res.json(itemResponse.data);
  } catch (err) {
    console.error("Error fetching item:", err);
    res.status(500).send("Failed to fetch item");
  }
});

app.post("/api/disconnect-plaid", async (req, res) => {
  try {
    const { user_id } = req.body;

    const { data, error } = await supabase
      .from("plaid_items")
      .select("access_token")
      .eq("user_id", user_id)
      .single();

    if (!data || error) {
      return res.status(404).json({ error: "No bank connected" });
    }

    const accessToken = data.access_token;

    await client.itemRemove({ access_token: accessToken });

    await supabase.from("plaid_items").delete().eq("user_id", user_id);

    res.json({ success: true, message: "Bank disconnected" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to disconnect bank" });
  }
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
