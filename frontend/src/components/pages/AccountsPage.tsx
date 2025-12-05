import { useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "../../services/supabaseClient";

interface Account {
  account_id: string;
  balances: {
    available?: number;
    current?: number;
    iso_currency_code?: string;
    limit?: number | null;
    unofficial_currency_code?: string | null;
  };
  mask: string;
  name: string;
  official_name?: string | null;
  holder_category?: string;
}

const AccountsPage = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data: plaidItems, error } = await supabase
        .from("plaid_items")
        .select("access_token")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (error || !plaidItems || plaidItems.length === 0) {
        console.log("No Plaid items found");
        setLoading(false);
        return;
      }

      const accessToken = plaidItems[0].access_token;

      const accountsRes = await axios.post(
        "http://localhost:8000/api/get-accounts",
        { access_token: accessToken }
      );

      console.log("📊 ACCOUNTS DATA:", accountsRes.data);

      setAccounts(accountsRes.data.accounts);
    } catch (err) {
      console.error("Error fetching accounts:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 col gap-4">
      <h2 className="text-4xl font-medium mb-4">Accounts</h2>

      {loading && <p>Loading accounts...</p>}

      {!loading && accounts.length === 0 && (
        <p>No accounts found. Connect your bank to see accounts.</p>
      )}

      <div className="grid gap-4">
        {accounts.map((acc) => (
          <div
            key={acc.account_id}
            className="border border-gray-200 rounded-md p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{acc.name}</p>
              <p className="text-gray-400 text-sm">
                {acc.official_name || "No official name"} • ****{acc.mask}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold">
                ${acc.balances.current?.toFixed(2) || 0}
              </p>
              <p className="text-gray-400 text-sm">
                {acc.balances.iso_currency_code || "USD"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountsPage;
