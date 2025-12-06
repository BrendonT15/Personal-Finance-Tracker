import axios from "axios";
import { useState, useEffect } from "react";
import { supabase } from "../../services/supabaseClient";

const PlaidDisconnectButton = ({
  onDisconnect,
}: {
  onDisconnect?: () => void;
}) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) setUserId(session.user.id);
    })();
  }, []);

  const handleDisconnect = async () => {
    if (!userId) return alert("No user detected");

    try {
      await axios.post("http://localhost:8000/api/disconnect-plaid", {
        user_id: userId,
      });
      alert("Bank disconnected");

      onDisconnect?.();
    } catch (err) {
      console.error("Disconnect failed:", err);
      alert("Failed to disconnect bank");
    }
  };

  return (
    <button
      onClick={handleDisconnect}
      className="bg-red-500 text-white rounded-md p-1"
    >
      Disconnect Bank
    </button>
  );
};

export default PlaidDisconnectButton;
