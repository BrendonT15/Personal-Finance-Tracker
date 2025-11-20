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
      <TransactionRow
        transactionNumber={1}
        transactionID={"DAS231"}
        description={"Shopping"}
        merchant="H&M"
        category="Travel"
        date="04/13/12"
        price={12.42}
      />
      <TransactionRow
        transactionNumber={2}
        transactionID={"KDH951"}
        description={"Shopping"}
        merchant="H&M"
        category="Groceries"
        date="04/13/12"
        price={12.42}
      />{" "}
      <TransactionRow
        transactionNumber={3}
        transactionID={"HUD582"}
        description={"Shopping"}
        merchant="H&M"
        category="Utilities"
        date="04/13/12"
        price={12.42}
      />{" "}
      <TransactionRow
        transactionNumber={4}
        transactionID={"QUM950"}
        description={"Shopping"}
        merchant="H&M"
        category="Clothes"
        date="04/13/12"
        price={12.42}
      />{" "}
      <TransactionRow
        transactionNumber={5}
        transactionID={"FLA128"}
        description={"Shopping"}
        merchant="H&M"
        category="Healthcare"
        date="04/13/12"
        price={12.42}
      />{" "}
      <TransactionRow
        transactionNumber={6}
        transactionID={"PAL059"}
        description={"Shopping"}
        merchant="H&M"
        category="Clothes"
        date="04/13/12"
        price={12.42}
      />
    </>
  );
};

export default TransactionTable;
