import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import { useState } from "react";
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
  personal_finance_category?: {
    primary: string;
  };
}

type SortField = 
  | "transactionNumber"
  | "transactionId"
  | "description"
  | "merchant"
  | "category"
  | "date"
  | "price"
  | null;

type SortDirection = "asc" | "desc";

const TransactionTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const headers = [
    { key: "transactionNumber", label: "Transaction Number" },
    { key: "transactionId", label: "Transaction ID" },
    { key: "description", label: "Description" },
    { key: "merchant", label: "Merchant" },
    { key: "category", label: "Category" },
    { key: "date", label: "Date" },
    { key: "price", label: "Price" },
  ];

  const transactionHeaderClasses =
    "justify-center gap-1 flex items-center text-gray-400 text-xs cursor-pointer hover:text-gray-600";

  const handleSort = (field: SortField) => {
    if (field === null) return;

    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortByTransactionNumber = (_a: Transaction, _b: Transaction, indexA: number, indexB: number) => {
    if (sortDirection === "asc") {
      return indexA - indexB;
    } else {
      return indexB - indexA;
    }
  };

  const sortByTransactionId = (a: Transaction, b: Transaction) => {
    const idA = a.transaction_id.toUpperCase();
    const idB = b.transaction_id.toUpperCase();
    if (sortDirection === "asc") {
      return idA.localeCompare(idB);
    } else {
      return idB.localeCompare(idA);
    }
  };

  const sortByTransactionPrice = (a: Transaction, b: Transaction) => {
    return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount;
  };

  const sortByTransactionDate = (a: Transaction, b: Transaction) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (sortDirection === "asc") {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  };

  const sortByTransactionCategory = (a: Transaction, b: Transaction) => {
    const categoryA = a.personal_finance_category?.primary || "Other";
    const categoryB = b.personal_finance_category?.primary || "Other";
    if (sortDirection === "asc") {
      return categoryA.localeCompare(categoryB);
    } else {
      return categoryB.localeCompare(categoryA);
    }
  };

  const sortByDescription = (a: Transaction, b: Transaction) => {
    const descA = a.name.toUpperCase();
    const descB = b.name.toUpperCase();
    if (sortDirection === "asc") {
      return descA.localeCompare(descB);
    } else {
      return descB.localeCompare(descA);
    }
  };

  const sortByMerchant = (a: Transaction, b: Transaction) => {
    const merchantA = (a.merchant_name || "N/A").toUpperCase();
    const merchantB = (b.merchant_name || "N/A").toUpperCase();
    if (sortDirection === "asc") {
      return merchantA.localeCompare(merchantB);
    } else {
      return merchantB.localeCompare(merchantA);
    }
  };

  const sortedTransactions = [...transactions]
    .map((transaction, originalIndex) => ({ 
      transaction, 
      originalIndex 
    }))
    .sort((a, b) => {
      if (!sortField) return 0;

      switch (sortField) {
        case "transactionNumber":
          return sortByTransactionNumber(a.transaction, b.transaction, a.originalIndex, b.originalIndex);
        case "transactionId":
          return sortByTransactionId(a.transaction, b.transaction);
        case "description":
          return sortByDescription(a.transaction, b.transaction);
        case "merchant":
          return sortByMerchant(a.transaction, b.transaction);
        case "category":
          return sortByTransactionCategory(a.transaction, b.transaction);
        case "date":
          return sortByTransactionDate(a.transaction, b.transaction);
        case "price":
          return sortByTransactionPrice(a.transaction, b.transaction);
        default:
          return 0;
      }
    })
    .map(({ transaction }) => transaction);

  const renderSortIcon = () => {
    return <UnfoldMoreOutlinedIcon fontSize="inherit" />;
  };

  const getDisplayNumber = (index: number) => {
    if (sortField === "transactionNumber") {
      if (sortDirection === "asc") {
        return index + 1;
      } else {
        return sortedTransactions.length - index;
      }
    } else {
      return index + 1;
    }
  };

  return (
    <>
      <div className="p-4 border-b border-gray-200 grid grid-cols-7 gap-1">
        {headers.map((header, index) => (
          <div
            key={index}
            className={transactionHeaderClasses}
            onClick={() => handleSort(header.key as SortField)}
          >
            {header.label && <p>{header.label}</p>}
            {header.key && (
              <div className="flex items-center">
                {renderSortIcon()}
              </div>
            )}
          </div>
        ))}
      </div>

      {sortedTransactions.length > 0 ? (
        sortedTransactions.map((txn, index) => (
          <TransactionRow
            key={txn.transaction_id}
            transactionNumber={getDisplayNumber(index)}
            transactionID={txn.transaction_id.substring(0, 5).toUpperCase()}
            description={txn.name}
            merchant={txn.merchant_name || "N/A"}
            category={txn.personal_finance_category?.primary || "Other"}
            date={txn.date}
            price={txn.amount}
            paymentChannel={txn.payment_channel}
            website={txn.website}
            logo_url={txn.logo_url}
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