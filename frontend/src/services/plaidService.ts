import axios from "axios";
import { supabase } from "./supabaseClient";

const API_BASE_URL = "http://localhost:8000/api";

export const plaidService = {
  async getAccessToken(userId: string): Promise<string | null> {
    console.log("Fetching access token for user:", userId);
    
    const { data: plaidItems, error } = await supabase
      .from("plaid_items")
      .select("access_token")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Error fetching plaid items:", error);
      return null;
    }

    if (!plaidItems || plaidItems.length === 0) {
      console.log("No plaid items found for user");
      return null;
    }

    console.log("Access token found");
    return plaidItems[0].access_token;
  },

  async getAccounts(accessToken: string) {
    console.log("Fetching accounts...");
    const response = await axios.post(`${API_BASE_URL}/get-accounts`, {
      access_token: accessToken,
    });
    return response.data.accounts;
  },

  async getTransactions(accessToken: string) {
    console.log("Fetching transactions...");
    const response = await axios.post(`${API_BASE_URL}/get-transactions`, {
      access_token: accessToken,
    });
    return response.data.transactions;
  },
};