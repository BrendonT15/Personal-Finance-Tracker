import TransactionButton from "../widgets/buttons/TransactionButton";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

const TransactionPage = () => {
  return (
    <div className="grid grid-cols-[10%_auto] w-full h-screen">
      <div className="bg-gray-100"></div>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex items-end gap-2">
          <h2 className="text-4xl font-medium">Transations</h2>
          <p className="text-sm text-gray-500 mb-1"> 196 Transactions</p>
        </div>

        <div className="">
          <TransactionButton buttonTitle="In Progress" badgeValue={112} />
        </div>
        <div className="grid grid-cols-[55%_35%_auto] gap-2">
          <div className="bg-gray-100 p-2 rounded-sm flex items-center gap-2">
            <SearchOutlinedIcon className="text-gray-500" fontSize="small" />

            <input
              type="text"
              placeholder="Search for transaction ID, amount, date"
              className="bg-gray-100 focus:outline-none flex-1 text-sm text-gray-500"
            />
          </div>

          <div className="bg-gray-100 p-2 rounded-sm flex items-center gap-2">
            <TuneOutlinedIcon className="text-gray-400" fontSize="small" />
            <input
              type="text"
              placeholder="Filter"
              className="bg-gray-100 focus:outline-none flex-1 text-sm text-gray-500"
            />

            <KeyboardArrowDownOutlinedIcon
              className="text-gray-500"
              fontSize="small"
            />
          </div>

          <button className="bg-gray-100 p-2 rounded-sm flex items-center gap-2">
            <FileUploadOutlinedIcon
              className="text-gray-500"
              fontSize="small"
            />
            <p className="text-gray-400 text-sm">Export</p>
          </button>
        </div>

        <div className="border rounded-md h-full border-gray-200">
          <div className="p-4 flex items-center justify-between text-gray-400 border-b border-gray-200 text-sm">
            <input type="checkbox" />
            <p>Transaction ID</p>
            <p>Description</p>
            <p>Merchant Name</p>
            <p>Category</p>
            <p>Date</p>
            <p>Amount</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
