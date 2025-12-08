import { useState, useEffect } from "react";
import { supabase } from "../../services/supabaseClient";
import { plaidService } from "../../services/plaidService";
import {
  AccountBalanceWallet,
  CreditCard,
  Savings,
  TrendingUp,
  AccountBalance,
  School,
  Home,
  HealthAndSafety,
} from "@mui/icons-material";

interface Account {
  account_id: string;
  balances: {
    available?: number;
    current?: number;
    iso_currency_code?: string;
    limit?: number | null;
    unofficial_currency_code?: string | null;
  };
  mask: string;
  name: string;
  official_name?: string | null;
  holder_category?: string;
  type: string;
  subtype: string;
}

const AccountsPage = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [allTransactions, setAllTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [accountTransactions, setAccountTransactions] = useState<any[]>([]);

  useEffect(() => {
    fetchAccountsAndTransactions();
  }, []);

  const fetchAccountsAndTransactions = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) return;

      const accessToken = await plaidService.getAccessToken(session.user.id);

      if (!accessToken) {
        console.log("No Plaid items found");
        setIsLoading(false);
        return;
      }

      // Use plaidService helper functions
      const [fetchedAccounts, fetchedTransactions] = await Promise.all([
        plaidService.getAccounts(accessToken),
        plaidService.getTransactions(accessToken),
      ]);

      console.log("📊 ACCOUNTS DATA:", fetchedAccounts);

      setAccounts(fetchedAccounts);
      setAllTransactions(fetchedTransactions);
    } catch (err) {
      console.error("Error fetching accounts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccountClick = (account: Account) => {
    setSelectedAccount(account);

    // Filter transactions from already-loaded data instead of fetching again
    const accountTxns = allTransactions.filter(
      (txn: any) => txn.account_id === account.account_id
    );

    setAccountTransactions(accountTxns);
  };

  const closeModal = () => {
    setSelectedAccount(null);
    setAccountTransactions([]);
  };

  const getAccountIcon = (type: string, subtype: string) => {
    if (type === "credit") return CreditCard;
    if (subtype === "savings") return Savings;
    if (subtype === "checking") return AccountBalanceWallet;
    if (subtype === "401k" || subtype === "ira") return TrendingUp;
    if (subtype === "student") return School;
    if (subtype === "mortgage") return Home;
    if (subtype === "hsa") return HealthAndSafety;
    return AccountBalance;
  };

  const getAccountTypeLabel = (type: string, subtype: string) => {
    const formatted = subtype
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return formatted || type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getAccountColor = (type: string) => {
    const colors: { [key: string]: string } = {
      depository: "bg-blue-50 border-blue-200",
      credit: "bg-purple-50 border-purple-200",
      loan: "bg-red-50 border-red-200",
      investment: "bg-green-50 border-green-200",
    };
    return colors[type] || "bg-gray-50 border-gray-200";
  };

  const groupedAccounts = accounts.reduce((groups, account) => {
    const type = account.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(account);
    return groups;
  }, {} as { [key: string]: Account[] });

  const calculateTotalByType = (accounts: Account[]) => {
    return accounts.reduce((sum, acc) => sum + (acc.balances.current || 0), 0);
  };

  const totalAssets = accounts
    .filter((acc) => acc.type === "depository" || acc.type === "investment")
    .reduce((sum, acc) => sum + (acc.balances.current || 0), 0);

  const totalLiabilities = accounts
    .filter((acc) => acc.type === "credit" || acc.type === "loan")
    .reduce((sum, acc) => sum + Math.abs(acc.balances.current || 0), 0);

  const netWorth = totalAssets - totalLiabilities;

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Loading accounts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-6">
      <div>
        <h2 className="text-4xl font-medium">Accounts</h2>
      </div>

      {accounts.length === 0 && (
        <div className="flex items-center justify-center h-64 border border-gray-200 rounded-lg">
          <div className="text-center">
            <p className="text-gray-500 mb-2">No accounts found</p>
            <p className="text-sm text-gray-400">
              Connect your bank to see accounts
            </p>
          </div>
        </div>
      )}

      {accounts.length > 0 && (
        <>
          {/* Net Worth Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <p className="text-sm text-gray-600 mb-1">Total Assets</p>
              <p className="text-2xl font-medium text-green-700">
                $
                {totalAssets.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <p className="text-sm text-gray-600 mb-1">Total Liabilities</p>
              <p className="text-2xl font-medium text-red-700">
                $
                {totalLiabilities.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
              <p className="text-sm text-gray-600 mb-1">Net Worth</p>
              <p className="text-2xl font-medium text-blue-700">
                $
                {netWorth.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          {/* Grouped Accounts */}
          <div className="flex flex-col gap-6">
            {Object.entries(groupedAccounts).map(([type, accountList]) => {
              const Icon = getAccountIcon(type, "");
              const total = calculateTotalByType(accountList);

              return (
                <div key={type}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="text-gray-600" fontSize="inherit" />
                      <h3 className="text-xl font-semibold capitalize">
                        {type} Accounts
                      </h3>
                      <span className="text-sm text-gray-500">
                        [{accountList.length}]
                      </span>
                    </div>
                    <p className="text-md font-medium text-gray-700">
                      Total: $
                      {total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {accountList.map((acc) => {
                      const AccountIcon = getAccountIcon(acc.type, acc.subtype);
                      const isNegative = (acc.balances.current || 0) < 0;

                      return (
                        <div
                          key={acc.account_id}
                          onClick={() => handleAccountClick(acc)}
                          className={`border rounded-lg p-4 ${getAccountColor(
                            acc.type
                          )} transition-all cursor-pointer`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex gap-3 items-start flex-1">
                              <div className="">
                                <AccountIcon
                                  className="text-gray-600"
                                  fontSize="small"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-semibold text-lg">
                                    {acc.name}
                                  </p>
                                  <span className="text-xs bg-white px-2 py-1 rounded-lg font-medium tracking-tigher uppercase border border-gray-200">
                                    {getAccountTypeLabel(acc.type, acc.subtype)}
                                  </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-2">
                                  {acc.official_name || "No official name"} •
                                  ••••{acc.mask}
                                </p>

                                {/* Additional Info */}
                                <div className="flex gap-4 text-xs text-gray-500">
                                  {acc.balances.available !== null &&
                                    acc.balances.available !== undefined && (
                                      <div>
                                        <span className="font-medium">
                                          Available:
                                        </span>{" "}
                                        $
                                        {acc.balances.available.toLocaleString(
                                          undefined,
                                          {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                          }
                                        )}
                                      </div>
                                    )}
                                  {acc.balances.limit && (
                                    <div>
                                      <span className="font-medium">
                                        Limit:
                                      </span>{" "}
                                      $
                                      {acc.balances.limit.toLocaleString(
                                        undefined,
                                        {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                        }
                                      )}
                                    </div>
                                  )}
                                  {acc.holder_category && (
                                    <div>
                                      <span className="font-medium">Type:</span>{" "}
                                      {acc.holder_category
                                        .charAt(0)
                                        .toUpperCase() +
                                        acc.holder_category.slice(1)}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="text-right">
                              <p
                                className={`text-2xl font-medium ${
                                  isNegative ? "text-red-600" : "text-gray-900"
                                }`}
                              >
                                {isNegative ? "-" : ""}$
                                {Math.abs(
                                  acc.balances.current || 0
                                ).toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {acc.balances.iso_currency_code || "USD"}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Account Detail Modal */}
      {selectedAccount && (
        <div
          className="fixed inset-0 backdrop-blur-xl bg-opacity-10 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className={`p-6 border-b ${getAccountColor(
                selectedAccount.type
              )}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = getAccountIcon(
                      selectedAccount.type,
                      selectedAccount.subtype
                    );
                    return <Icon className="text-gray-700" fontSize="large" />;
                  })()}
                  <div>
                    <h3 className="text-2xl font-bold">
                      {selectedAccount.name}
                    </h3>
                    <p className="text-gray-600">
                      {selectedAccount.official_name || "No official name"} •
                      ••••{selectedAccount.mask}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center"
                >
                  ×
                </button>
              </div>

              {/* Account Summary */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div>
                  <p className="text-sm text-gray-600">Current Balance</p>
                  <p className="text-2xl font-bold text-gray-900">
                    $
                    {(selectedAccount.balances.current || 0).toLocaleString(
                      undefined,
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                    )}
                  </p>
                </div>
                {selectedAccount.balances.available !== null &&
                  selectedAccount.balances.available !== undefined && (
                    <div>
                      <p className="text-sm text-gray-600">Available Balance</p>
                      <p className="text-xl font-semibold text-gray-700">
                        $
                        {selectedAccount.balances.available.toLocaleString(
                          undefined,
                          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                        )}
                      </p>
                    </div>
                  )}
                {selectedAccount.balances.limit && (
                  <div>
                    <p className="text-sm text-gray-600">Credit Limit</p>
                    <p className="text-xl font-semibold text-gray-700">
                      $
                      {selectedAccount.balances.limit.toLocaleString(
                        undefined,
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                      )}
                    </p>
                  </div>
                )}
              </div>

              {/* Account Details */}
              <div className="flex gap-6 mt-4 text-sm">
                <div>
                  <span className="text-gray-600">Account Type:</span>{" "}
                  <span className="font-medium">
                    {getAccountTypeLabel(
                      selectedAccount.type,
                      selectedAccount.subtype
                    )}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Currency:</span>{" "}
                  <span className="font-medium">
                    {selectedAccount.balances.iso_currency_code || "USD"}
                  </span>
                </div>
                {selectedAccount.holder_category && (
                  <div>
                    <span className="text-gray-600">Category:</span>{" "}
                    <span className="font-medium capitalize">
                      {selectedAccount.holder_category}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Body - Transactions */}
            <div className="flex-1 overflow-y-auto p-6">
              <h4 className="text-md font-semibold mb-4">
                Recent Transactions [{accountTransactions.length}]
              </h4>

              {accountTransactions.length === 0 && (
                <div className="flex items-center justify-center py-12 border border-gray-200 rounded-lg">
                  <p className="text-gray-500">
                    No transactions found for this account
                  </p>
                </div>
              )}

              {accountTransactions.length > 0 && (
                <div className="space-y-2">
                  {accountTransactions.slice(0, 20).map((txn) => (
                    <div
                      key={txn.transaction_id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg "
                    >
                      <div className="flex-1">
                        <p className="font-medium">{txn.name}</p>
                        <div className="flex gap-4 text-xs text-gray-500 mt-1">
                          <span>{new Date(txn.date).toLocaleDateString()}</span>
                          {txn.merchant_name && (
                            <span>• {txn.merchant_name}</span>
                          )}
                          {txn.category && txn.category[0] && (
                            <span>• {txn.category[0]}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            txn.amount > 0 ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {txn.amount > 0 ? "-" : "+"}$
                          {Math.abs(txn.amount).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountsPage;