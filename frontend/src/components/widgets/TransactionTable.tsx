import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import TransactionRow from "./TransactionRow";

const TransactionTable = () => {
  const headers = [
    "Transaction Number",
    "Transaction ID",
    "Description",
    "Merchant",
    "Category",
    "Date",
    "Price",
    "",
  ];

  const transactionHeaderClasses =
    "justify-center gap-1 flex items-center text-gray-400 text-xs";
  return (
    <>
      <div className="p-4 border-b border-gray-200  grid grid-cols-8 gap-1">
        {headers.map((header, index) => (
          <div key={index} className={transactionHeaderClasses}>
            {header && <p> {header}</p>}
            {header && (
              <UnfoldMoreOutlinedIcon
                fontSize="inherit"
                className="cursor-pointer"
              />
            )}
          </div>
        ))}
      </div>
      
      {[...Array(6)].map((_, index) => (
        <TransactionRow key={index} />
      ))}
    </>
  );
};

export default TransactionTable;
