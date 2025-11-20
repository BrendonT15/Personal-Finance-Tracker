import express from "express";
import cors from "cors";
<<<<<<< HEAD
import dotenv from "dotenv";

import plaidRoutes from "./routes/plaidRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/plaid", plaidRoutes);

const PORT = process.env.PORT || 8000;
try {
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("Server failed to start:", err);
}
=======
import supabase from "./config/supabase.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Sign up

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

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
>>>>>>> d910ee4d5f6e9bbdc62004243ef5860e6426089b
