import { useState, useEffect, useCallback } from "react";
import { supabase } from "../services/supabaseClient";
import { plaidService } from "../services/plaidService";
import {
  financialService,
  type FinancialMetrics,
} from "../services/financialService";

export const usePlaidData = () => {
  const [metrics, setMetrics] = useState<FinancialMetrics>({
    totalBalance: 0,
    transactionCount: 0,
    spending: 0,
    income: 0,
    categoryData: [],
    savingsRate: 0,
    netCashFlow: 0,
  });
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
        setIsLoading(false); // ← Add this
        return;
      }

      // Get access token
      const accessToken = await plaidService.getAccessToken(session.user.id);

      if (!accessToken) {
        console.log("No Plaid items found");
        setHasBankAccount(false);
        setIsLoading(false); // ← Add this
        return;
      }

      setHasBankAccount(true);

      // Rename the destructured variables to avoid shadowing state
      const [fetchedAccounts, fetchedTransactions] = await Promise.all([
        plaidService.getAccounts(accessToken),
        plaidService.getTransactions(accessToken),
      ]);

      // Now use the correct variable names
      setAccounts(fetchedAccounts);
      setTransactions(fetchedTransactions);

      const calculatedMetrics = financialService.calculateMetrics(
        fetchedAccounts,
        fetchedTransactions
      );

      setMetrics(calculatedMetrics);
    } catch (err) {
      console.error("Error fetching Plaid data:", err);
      setError("Failed to load financial data");
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
