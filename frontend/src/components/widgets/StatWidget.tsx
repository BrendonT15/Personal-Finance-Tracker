import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const StatWidget = () => {
  return (
    <div className="col gap-1 border border-gray-200 rounded-md p-3 ">
      <div className="flex items-center gap-2">
        <AccountBalanceWalletIcon
          className="text-gray-400"
          fontSize="inherit"
        />
        <p className="text-sm text-gray-400 ">Account Balance</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="font-medium text-2xl">$542,562</p>
        <div className="flex items-center gap-1">
          <TrendingUpIcon className="text-green-500" fontSize="inherit" />
          <p className="text-xs text-green-500 font-medium"> 4.32%</p>
        </div>
      </div>
    </div>
  );
};

export default StatWidget;
