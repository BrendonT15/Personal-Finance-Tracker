/*

import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

// Creates the configuration for plaidAPI
const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

// Instantiates Plaid Client
const client = new PlaidApi(config);

// Creates unique link token for user
// The link token is used to communicate with our backend, which then verifies and sends a message to PlaidAPI
export async function createLinkToken(req, res) {
  try {
    const request = {
      // Replace with the actual user-id making the request
      user: { client_user_id: "user-id" },
      client_name: "Personal Finance Tracker",
      products: process.env.PLAID_PRODUCTS.split(","),
      language: "en",
      country_codes: ["US"],
    };

    console.log("🟢 Plaid request being sent:", request);

    const response = await client.linkTokenCreate(request);

    // Return the link token that was created
    res.json({ link_token: response.data.link_token });
    console.log(
      `[${new Date().toLocaleString()}] User created link token: ${
        response.data.link_token
      }`
    );
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).send("Error creating link token...");
  }
}

// Call from front end after link token is converted into Public Token
// Req holds the public token
export async function exchangePublicToken(req, res) {
  try {
    // Public token will be created from front end through plaid-link
    // Temporary way of creating Public token in sandbox environment
    const request = {
      // Replace with whatever institution is being chosen by the user
      institution_id: "ins_4",
      // Replace with variable of any products being used by application
      initial_products: ["transactions"],
    };

    const response = await client.sandboxPublicTokenCreate(request);
    const public_token = response.data.public_token;

    const exchangeRequest = { public_token: public_token };
    const access_response = await client.itemPublicTokenExchange(
      exchangeRequest
    );

    const { access_token, item_id, request_id } = access_response.data;

    res.json({
      access_token,
      item_id,
      request_id,
    });

    console.log(
      `[${new Date().toLocaleString()}] User created access token: ${access_token}, item_id: ${item_id}, request_id: ${request_id}`
    );

    console.log("🟢 Plaid request being sent:", request);
  } catch (err) {
    console.error(err.response?.data || err);
    // look into request token
    res.status(500).send(`Error exchanging for access token: ${request_id}`);
  }
}

export async function itemRemove(req, res) {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      console.log("Missing access token...");
      return res.status(400).send("Missing access token...");
    }

    const response = await client.itemRemove({ access_token });

    // ADD SOME FUNCTION CALL THAT REMOVES THE ITEM FROM THE DATABASE

    res.json({ request_id: response.data.request_id });

    // ADD WHICH USER DELETED AND WHAT WAS the REQUEST
    console.log(
      `[${new Date(
        Date.now()
      ).toLocaleString()}] User removed item with access_token: ${access_token}, request_id: ${
        response.data.request_id
      } `
    );
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).send(`Error removing item...`);
  }
}

*/