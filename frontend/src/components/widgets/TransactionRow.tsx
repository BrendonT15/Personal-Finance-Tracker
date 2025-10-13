import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import CategoryLabel from "./CategoryLabel";

const TransactionRow = ({
  transactionNumber,
  transactionID,
  description,
  merchant,
  category,
  date,
  price,
}: {
  transactionNumber: number;
  transactionID: string;
  description: string;
  merchant: string;
  category: string;
  date: string;
  price: number;
}) => {
  const transactionRowClasses =
    "justify-center flex items-center text-gray-400 text-xs";
  return (
    <div className="p-4 border-b border-gray-200  grid grid-cols-8  gap-1 hover:bg-gray-50 cursor-pointer">
      <div className={transactionRowClasses}>
        <p className="">{transactionNumber}</p>
      </div>
      <div className={transactionRowClasses}>
        <p className="">{transactionID}</p>
      </div>
      <div className={transactionRowClasses}>
        <p className="">{description}</p>
      </div>
      <div className={transactionRowClasses}>
        <p className="">{merchant}</p>
      </div>
      <div className={transactionRowClasses}>
        <CategoryLabel categoryTitle={category} />
      </div>

      <div className={transactionRowClasses}>
        <p className="">{date}</p>
      </div>
      <div className={transactionRowClasses}>
        <p className="">${price.toFixed(2)}</p>
      </div>
      <div className={transactionRowClasses}>
        <MoreHorizOutlinedIcon fontSize="inherit" className="text-gray-400" />
      </div>
    </div>
  );
};

export default TransactionRow;
