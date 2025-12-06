import TransactionButton from "../widgets/buttons/TransactionButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import TransactionTable from "../widgets/TransactionTable";
import { useState } from "react";
import { usePlaidData } from "../../hooks/usePlaidData";

const TransactionPage = () => {
  const { metrics, transactions, isLoading, error } = usePlaidData();
  const [searchQuery, setSearchQuery] = useState("");

  const transactionCount = metrics.transactionCount;
  const pendingCount = transactions.filter(t => t.pending).length;

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1">
            <button className="bg-gray-700 text-white p-2 rounded-sm flex items-center gap-2 cursor-pointer">
              <TuneOutlinedIcon className="text-white " fontSize="inherit" />
              <p className="text-white  text-sm">Filter</p>
            </button>

            <button className="bg-gray-700 text-white p-2 rounded-sm flex items-center gap-2 cursor-pointer">
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