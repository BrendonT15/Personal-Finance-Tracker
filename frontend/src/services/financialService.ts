export interface CategoryData {
  name: string;
  value: number;
}

export interface TimeSeriesData {
  date: string;
  spending: number;
  income: number;
}

export interface FinancialMetrics {
  totalBalance: number;
  transactionCount: number;
  spending: number;
  income: number;
  categoryData: CategoryData[];
  savingsRate: number;
  netCashFlow: number;
  timeSeriesData: TimeSeriesData[]; 
  dailyCashFlow: { date: string; amount: number }[]; 
}

export const financialService = {
  formatCategoryName(category: string): string {
    return category
      .split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  },

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

        let category = "Other";
        
        if (txn.personal_finance_category?.primary) {
          category = this.formatCategoryName(txn.personal_finance_category.primary);
        }
        else if (txn.category && Array.isArray(txn.category) && txn.category.length > 0) {
          category = txn.category[0];
        }
        
        categoryMap[category] = (categoryMap[category] || 0) + txn.amount;
      } else {
        income += Math.abs(txn.amount);
      }
    });

    const categoryData = Object.entries(categoryMap)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value); 

    return { spending, income, categoryData };
  },

  generateTimeSeriesData(transactions: any[]): TimeSeriesData[] {
    const dailyMap: { [key: string]: { spending: number; income: number } } = {};

    transactions.forEach((txn) => {
      const date = txn.date; 
      
      if (!dailyMap[date]) {
        dailyMap[date] = { spending: 0, income: 0 };
      }

      if (txn.amount > 0) {
        dailyMap[date].spending += txn.amount;
      } else {
        dailyMap[date].income += Math.abs(txn.amount);
      }
    });

    const timeSeriesData = Object.entries(dailyMap)
      .map(([date, data]) => ({
        date,
        spending: data.spending,
        income: data.income,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return timeSeriesData;
  },

  generateDailyCashFlow(transactions: any[]): { date: string; amount: number }[] {
    const dailyMap: { [key: string]: number } = {};

    transactions.forEach((txn) => {
      const date = txn.date;
      
      if (!dailyMap[date]) {
        dailyMap[date] = 0;
      }

      if (txn.amount > 0) {
        dailyMap[date] -= txn.amount; 
      } else {
        dailyMap[date] += Math.abs(txn.amount); 
      }
    });

    const cashFlowData = Object.entries(dailyMap)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return cashFlowData;
  },

  calculateMetrics(accounts: any[], transactions: any[]): FinancialMetrics {
    const totalBalance = this.calculateTotalBalance(accounts);
    const { spending, income, categoryData } = this.processTransactions(transactions);
    
    const savingsRate = income > 0 ? ((income - spending) / income) * 100 : 0;
    const netCashFlow = income - spending;

    const timeSeriesData = this.generateTimeSeriesData(transactions);
    const dailyCashFlow = this.generateDailyCashFlow(transactions);

    return {
      totalBalance,
      transactionCount: transactions.length,
      spending,
      income,
      categoryData,
      savingsRate,
      netCashFlow,
      timeSeriesData,
      dailyCashFlow,
    };
  },
};