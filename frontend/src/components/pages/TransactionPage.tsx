import TransactionButton from "../widgets/buttons/TransactionButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import TransactionTable from "../widgets/TransactionTable";
import { useState, useMemo } from "react";
import { usePlaidData } from "../../hooks/usePlaidData";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const TransactionPage = () => {
  const { metrics, transactions, isLoading, error } = usePlaidData();
  const [searchQuery, setSearchQuery] = useState("");

  const transactionCount = metrics.transactionCount;
  const pendingCount = transactions.filter(t => t.pending).length;

  const filteredTransactions = useMemo(() => {
    if (!searchQuery.trim()) {
      return transactions;
    }

    const query = searchQuery.toLowerCase().trim();
    const searchTerms = query.split(/\s+/); 
    
    return transactions.filter((transaction) => {
      const searchableText = `
        ${transaction.transaction_id}
        ${transaction.name}
        ${transaction.merchant_name || ""}
        ${transaction.date}
        ${transaction.amount}
        $${transaction.amount.toFixed(2)}
        ${transaction.personal_finance_category?.primary || ""}
        ${transaction.payment_channel}
        ${transaction.website}
      `.toLowerCase();
      
      return searchTerms.every(term => 
        searchableText.includes(term)
      );
      
     
    });
  }, [transactions, searchQuery]);

  const filteredTransactionCount = filteredTransactions.length;
  const filteredPendingCount = filteredTransactions.filter(t => t.pending).length;

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center h-96">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  const handleClearSearch = () => {
    setSearchQuery("");
  };

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
              {searchQuery.trim() ? filteredTransactionCount : transactionCount}
            </div>
          </button>
          <TransactionButton 
            buttonTitle="Pending" 
            badgeValue={searchQuery.trim() ? filteredPendingCount : pendingCount} 
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="relative bg-gray-100 p-2 rounded-sm flex items-center gap-2 w-full">
            <SearchOutlinedIcon className="text-gray-500" fontSize="small" />
            <input
              type="text"
              placeholder="Search by ID, amount, description, merchant, date, category..."
              className="bg-gray-100 focus:outline-none flex-1 text-sm text-gray-500 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 text-gray-400 hover:text-gray-600"
              >
                <ClearOutlinedIcon fontSize="small" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button className="bg-orange-400 text-white p-2 rounded-sm flex items-center gap-2 cursor-pointer">
              <TuneOutlinedIcon className="text-white " fontSize="inherit" />
              <p className="text-white  text-sm">Filter</p>
            </button>

            <button className="bg-orange-400 text-white p-2 rounded-sm flex items-center gap-2 cursor-pointer">
              <FileUploadOutlinedIcon
                className="text-white "
                fontSize="inherit"
              />
              <p className="text-white  text-sm">Export</p>
            </button>
          </div>
        </div>

        {searchQuery.trim() && (
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              Found {filteredTransactionCount} transaction{filteredTransactionCount !== 1 ? 's' : ''} for "{searchQuery}"
            </div>
            <button
              onClick={handleClearSearch}
              className="text-gray-400 hover:text-gray-600 text-xs flex items-center gap-1"
            >
              Clear search
            </button>
          </div>
        )}

        <div className="border rounded-md h-full border-gray-200">
          <TransactionTable transactions={filteredTransactions} />
        </div>
      </div>
    </>
  );
};

export default TransactionPage;