import { useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import axios from "axios";
import { supabase } from "../../../services/supabaseClient";

const PlaidButton = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("Session retrieved:", session);
      if (session?.user) {
        console.log("User ID found:", session.user.id);
        setUserId(session.user.id);
      } else {
        console.log("No user session found");
      }
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) setUserId(session.user.id);
        else setUserId(null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("useEffect triggered. userId:", userId);
    if (!userId) {
      console.log("Skipping link token creation - no userId");
      return;
    }

    const createLinkToken = async () => {
      try {
        console.log("Sending request to create link token for user:", userId);
        const res = await axios.post(
          "http://localhost:8000/api/create-link-token",
          {
            user_id: userId,
          }
        );
        console.log("Full response:", res.data);
        console.log("Link token received:", res.data.link_token);
        setLinkToken(res.data.link_token);
      } catch (err: any) {
        console.error("Failed to create link token:", err);
        console.error("Error response:", err.response?.data);
        console.error("Error status:", err.response?.status);
      }
    };

    createLinkToken();
  }, [userId]);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token) => {
      try {
        await axios.post("http://localhost:8000/api/exchange-public-token", {
          public_token,
          user_id: userId,
        });
        alert("Bank connected successfully!");
        onSuccess?.();
      } catch (err) {
        console.error("Failed to exchange public token:", err);
      }
    },
  });

  console.log(
    "Current state - Link token:",
    linkToken,
    "Ready:",
    ready,
    "UserId:",
    userId
  );

  return (
    <button
      onClick={() => {
        console.log("Button clicked! Ready:", ready);
        if (ready) {
          open();
        }
      }}
      disabled={!ready}
      className="text-white bg-gray-700 rounded-md p-1 cursor-pointer w-fit"
    >
      Connect Bank
    </button>
  );
};

export default PlaidButton;
