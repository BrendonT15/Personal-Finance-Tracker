import { useState } from "react";
import axios from "axios";
import { supabase } from "../../../services/supabaseClient";

const PlaidDisconnectButton = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDisconnect = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to disconnect your bank account? This will remove all connected accounts and transaction data."
    );

    if (!confirmed) return;

    try {
      setIsLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        alert("No user session found");
        return;
      }

      console.log("Disconnecting bank for user:", session.user.id);

      const response = await axios.post(
        "http://localhost:8000/api/disconnect-bank",
        {
          user_id: session.user.id,
        }
      );

      console.log("Disconnect response:", response.data);

      if (onSuccess) {
        console.log("Calling refetch to update UI...");
        onSuccess();

        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      alert("Bank account disconnected successfully!");
    } catch (err: any) {
      console.error("Failed to disconnect bank:", err);
      alert(
        `Failed to disconnect bank account: ${
          err.response?.data?.error || err.message
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDisconnect}
      disabled={isLoading}
      className="text-white bg-red-600 hover:bg-red-700 disabled:bg-red-400 rounded-md px-2 py-1 cursor-pointer w-fit transition-colors"
    >
      {isLoading ? "Disconnecting..." : "Disconnect Bank"}
    </button>
  );
};

export default PlaidDisconnectButton;
