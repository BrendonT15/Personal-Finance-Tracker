import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

const TransactionRow = () => {
  const transactionRowClasses =
    "justify-center flex items-center text-gray-400 text-xs";
  return (
    <div className="p-4 border-b border-gray-200  grid grid-cols-8  gap-1 hover:bg-gray-50 cursor-pointer">
      <div className={transactionRowClasses}>
        <p className="">1</p>
      </div>
      <div className={transactionRowClasses}>
        <p className="">DPR1472</p>
      </div>
      <div className={transactionRowClasses}>
        <p className="">Shopping</p>
      </div>
      <div className={transactionRowClasses}>
        <p className="">H&M</p>
      </div>
      <div className={transactionRowClasses}>
        <p className="">Clothes</p>
      </div>

      <div className={transactionRowClasses}>
        <p className="">06/20/04</p>
      </div>
      <div className={transactionRowClasses}>
        <p className="">$12.23</p>
      </div>
      <div className={transactionRowClasses}>
        <MoreHorizOutlinedIcon fontSize="inherit" className="text-gray-400" />
      </div>
    </div>
  );
};

export default TransactionRow;
