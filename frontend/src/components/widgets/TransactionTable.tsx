import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import TransactionRow from "./TransactionRow";

interface Transaction {
  transaction_id: string;
  name: string;
  merchant_name?: string;
  date: string;
  amount: number;
  payment_channel: string;
  website: string;
  logo_url: string;
  pending: boolean;
  personal_finance_category?: {
    primary: string;
  };
}

const TransactionTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
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
      <div className="p-4 border-b border-gray-200 grid grid-cols-8 gap-1">
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

      {transactions.length > 0 ? (
        transactions.map((txn, index) => (
          <TransactionRow
            key={txn.transaction_id}
            transactionNumber={index + 1}
            transactionID={txn.transaction_id.substring(0, 5).toUpperCase()}
            description={txn.name}
            merchant={txn.merchant_name || "N/A"}
            category={txn.personal_finance_category?.primary || "Other"}
            date={txn.date}
            price={txn.amount}
            paymentChannel={txn.payment_channel}
            website={txn.website}
            logo_url={txn.logo_url}
            pending={txn.pending}
          />
        ))
      ) : (
        <div className="p-4 text-center text-gray-400">
          No transactions found. Connect your bank to see transactions.
        </div>
      )}
    </>
  );
};

export default TransactionTable;
