import TransactionButton from "../widgets/buttons/TransactionButton";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import TransactionTable from "../widgets/TransactionTable";
import { useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "../../services/supabaseClient";

const TransactionPage = () => {
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        return;
      }

      const { data: plaidItems, error } = await supabase
        .from("plaid_items")
        .select("access_token")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (error || !plaidItems || plaidItems.length === 0) {
        return;
      }

      const accessToken = plaidItems[0].access_token;

      const transactionsRes = await axios.post(
        "http://localhost:8000/api/get-transactions",
        { access_token: accessToken }
      );

      const txns = transactionsRes.data.transactions;
      setTransactions(txns);
      setTransactionCount(txns.length);

      console.log("Fetched transactions:", txns);
    } catch (err) {
      console.error(err);
    }
  };

  const pendingCount = transactions.filter(t => t.pending).length;

  return (
    <>
      <div className="p-4 col gap-4">
        <div>
          <h2 className="text-4xl font-medium">Transactions</h2>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center justify-between border-gray-100 py-1 px-2 rounded-sm bg-gray-700 cursor-pointer text-white gap-2 text-xs">
            <span>All Transactions</span>

            <div className="bg-gray-500 p-1 text-white font-medium text-xs flex items-center justify-center rounded-sm">
              {transactionCount}
            </div>
          </button>
          <TransactionButton buttonTitle="Pending" badgeValue={pendingCount} />
         
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="bg-gray-100 p-2 rounded-sm flex items-center gap-2 w-full">
            <SearchOutlinedIcon className="text-gray-500" fontSize="small" />

            <input
              type="text"
              placeholder="Search for transaction ID, amount, date"
              className="bg-gray-100 focus:outline-none flex-1 text-sm text-gray-500"
            />
          </div>
          <div className="flex items-center gap-1">
            <button className="bg-purple-800 text-white p-2 rounded-sm flex items-center gap-2 cursor-pointer">
              <TuneOutlinedIcon className="text-white " fontSize="inherit" />
              <p className="text-white  text-sm">Filter</p>
            </button>

            <button className="bg-purple-800 text-white p-2 rounded-sm flex items-center gap-2 cursor-pointer">
              <FileUploadOutlinedIcon
                className="text-white "
                fontSize="inherit"
              />
              <p className="text-white  text-sm">Export</p>
            </button>
          </div>
        </div>

        <div className="border rounded-md h-full border-gray-200">
          <TransactionTable transactions={transactions} />
        </div>
      </div>
    </>
  );
};

export default TransactionPage;