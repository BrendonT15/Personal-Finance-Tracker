import { useState, useEffect, useCallback } from "react";
import { supabase } from "../services/supabaseClient";
import { plaidService } from "../services/plaidService";
import {
  financialService,
  type FinancialMetrics,
} from "../services/financialService";

const EMPTY_METRICS: FinancialMetrics = {
  totalBalance: 0,
  transactionCount: 0,
  spending: 0,
  income: 0,
  categoryData: [],
  savingsRate: 0,
  netCashFlow: 0,
};

export const usePlaidData = () => {
  const [metrics, setMetrics] = useState<FinancialMetrics>(EMPTY_METRICS);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [hasBankAccount, setHasBankAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaidData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setHasBankAccount(false);
        setMetrics(EMPTY_METRICS);
        setTransactions([]);
        setAccounts([]);
        setIsLoading(false);
        return;
      }

      const accessToken = await plaidService.getAccessToken(session.user.id);

      if (!accessToken) {
        console.log("No Plaid items found");
        setHasBankAccount(false);
        setMetrics(EMPTY_METRICS);
        setTransactions([]);
        setAccounts([]);
        setIsLoading(false);
        return;
      }

      setHasBankAccount(true);

      // Fetch data
      const [fetchedAccounts, fetchedTransactions] = await Promise.all([
        plaidService.getAccounts(accessToken),
        plaidService.getTransactions(accessToken),
      ]);

      console.log("=== BANK ACCOUNT INFO ===");
      console.log("Bank Name:", fetchedAccounts[0]?.name);
      console.log("Institution:", fetchedAccounts[0]?.official_name);
      console.log("Account Type:", fetchedAccounts[0]?.type);
      console.log("Current Balance:", fetchedAccounts[0]?.balances?.current);
      console.log("All Accounts:", fetchedAccounts);
      console.log("\n=== CALCULATIONS ===");

      setAccounts(fetchedAccounts);
      setTransactions(fetchedTransactions);

      const calculatedMetrics = financialService.calculateMetrics(
        fetchedAccounts,
        fetchedTransactions
      );

      console.log("Total Balance:", calculatedMetrics.totalBalance);
      console.log("Spending:", calculatedMetrics.spending);
      console.log("Income:", calculatedMetrics.income);
      console.log("Savings Rate:", calculatedMetrics.savingsRate + "%");
      console.log("Net Cash Flow:", calculatedMetrics.netCashFlow);
      console.log("Transaction Count:", calculatedMetrics.transactionCount);
      console.log("Category Breakdown:", calculatedMetrics.categoryData);
      console.log("========================");

      setMetrics(calculatedMetrics);
    } catch (err) {
      console.error("Error fetching Plaid data:", err);
      setError("Failed to load financial data");
      setHasBankAccount(false);
      setMetrics(EMPTY_METRICS);
      setTransactions([]);
      setAccounts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlaidData();
  }, [fetchPlaidData]);

  return {
    metrics,
    transactions,
    accounts,
    hasBankAccount,
    isLoading,
    error,
    refetch: fetchPlaidData,
  };
};