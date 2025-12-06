export interface CategoryData {
  name: string;
  value: number;
}

export interface FinancialMetrics {
  totalBalance: number;
  transactionCount: number;
  spending: number;
  income: number;
  categoryData: CategoryData[];
  savingsRate: number;
  netCashFlow: number;
}

export const financialService = {
  calculateTotalBalance(accounts: any[]): number {
    return accounts.reduce((sum, account) => {
      return sum + (account.balances.current || 0);
    }, 0);
  },

  processTransactions(transactions: any[]): {
    spending: number;
    income: number;
    categoryData: CategoryData[];
  } {
    let spending = 0;
    let income = 0;
    const categoryMap: { [key: string]: number } = {};

    transactions.forEach((txn) => {
      if (txn.amount > 0) {
        spending += txn.amount;

        const category = txn.category?.[0] || "Other";
        categoryMap[category] = (categoryMap[category] || 0) + txn.amount;
      } else {
        income += Math.abs(txn.amount);
      }
    });

    const categoryData = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));

    return { spending, income, categoryData };
  },

  calculateMetrics(accounts: any[], transactions: any[]): FinancialMetrics {
    const totalBalance = this.calculateTotalBalance(accounts);
    const { spending, income, categoryData } = this.processTransactions(transactions);
    
    const savingsRate = income > 0 ? ((income - spending) / income) * 100 : 0;
    const netCashFlow = income - spending;

    return {
      totalBalance,
      transactionCount: transactions.length,
      spending,
      income,
      categoryData,
      savingsRate,
      netCashFlow,
    };
  },
};