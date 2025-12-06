import { useState, useEffect } from "react";
import ConnectBankBanner from "../widgets/ConnectBankBanner";
import {
  AccountBalanceWalletOutlined,
  TrendingDownOutlined,
  TrendingUpOutlined,
  SavingsOutlined,
  ReceiptOutlined,
  AccountBalanceOutlined,
  RemoveOutlined,
  CreditCard,
  TrendingFlat,
} from "@mui/icons-material";
import StatWidget from "../widgets/StatWidget";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import PlaidButton from "../plaid/PlaidButton";
import { usePlaidData } from "../../hooks/usePlaidData";

const pieColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57"];

const AnalyticsPage = () => {
  const [firstName, setFirstName] = useState<string>("");
  const { metrics, hasBankAccount, isLoading, error, refetch } = usePlaidData();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setFirstName(user.user_metadata?.first_name || "User");
    }
  }, []);

  // Sample data - replace with your actual data
  const monthlyData = [
    { month: "Jan", income: 4500, spending: 3200, savings: 1300 },
    { month: "Feb", income: 4800, spending: 3100, savings: 1700 },
    { month: "Mar", income: 5200, spending: 3800, savings: 1400 },
    { month: "Apr", income: 4900, spending: 2900, savings: 2000 },
    { month: "May", income: 5100, spending: 3500, savings: 1600 },
    { month: "Jun", income: 5300, spending: 3700, savings: 1600 },
  ];

  const spendingByCategory = [
    { category: "Food & Dining", amount: 850, percentage: 25 },
    { category: "Shopping", amount: 650, percentage: 19 },
    { category: "Transportation", amount: 420, percentage: 12 },
    { category: "Entertainment", amount: 380, percentage: 11 },
    { category: "Bills & Utilities", amount: 320, percentage: 9 },
    { category: "Healthcare", amount: 210, percentage: 6 },
    { category: "Other", amount: 570, percentage: 17 },
  ];

  const cashFlowData = [
    { month: "Jan", income: 4500, expenses: 3200 },
    { month: "Feb", income: 4800, expenses: 3100 },
    { month: "Mar", income: 5200, expenses: 3800 },
    { month: "Apr", income: 4900, expenses: 2900 },
    { month: "May", income: 5100, expenses: 3500 },
    { month: "Jun", income: 5300, expenses: 3700 },
  ];

  const accountBalances = [
    { account: "Checking", balance: 12500 },
    { account: "Savings", balance: 25400 },
    { account: "Investment", balance: 18500 },
    { account: "Credit Card", balance: -2500 },
  ];

  const spendingTrend = [
    { day: "Mon", amount: 85 },
    { day: "Tue", amount: 120 },
    { day: "Wed", amount: 95 },
    { day: "Thu", amount: 150 },
    { day: "Fri", amount: 220 },
    { day: "Sat", amount: 180 },
    { day: "Sun", amount: 90 },
  ];

  // Calculate average transaction
  const avgTransaction = metrics.transactionCount > 0 
    ? metrics.spending / metrics.transactionCount 
    : 0;

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center h-96">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 col gap-4 min-h-screen">
      <h2 className="text-4xl font-medium mb-4">
        Analytics
      </h2>

      {!hasBankAccount && (
        <div className="mb-4">
          <ConnectBankBanner>
            <PlaidButton onSuccess={refetch} />
          </ConnectBankBanner>
        </div>
      )}

      {/* All 8 Key Metrics in a grid */}
      <div className="grid grid-cols-4 gap-4">
        {/* Row 1 */}
        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Account Balance"
          widgetValue={metrics.totalBalance}
          widgetPercentChange={6.5}
          widgetPercentIcon={TrendingUpOutlined}
          percentColor="text-green-500"
        />

        <StatWidget
          widgetIcon={ReceiptOutlined}
          widgetTitle="Transactions"
          widgetValue={metrics.transactionCount}
          widgetPercentChange={-2.5}
          widgetPercentIcon={TrendingDownOutlined}
          percentColor="text-red-500"
        />

        <StatWidget
          widgetIcon={CreditCard}
          widgetTitle="Spending"
          widgetValue={metrics.spending}
          widgetPercentChange={-2.5}
          widgetPercentIcon={TrendingDownOutlined}
          percentColor="text-red-500"
        />

        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Income"
          widgetValue={metrics.income}
          widgetPercentChange={8.2}
          widgetPercentIcon={TrendingUpOutlined}
          percentColor="text-green-500"
        />

        {/* Row 2 */}
        <StatWidget
          widgetIcon={SavingsOutlined}
          widgetTitle="Savings Rate"
          widgetValue={metrics.savingsRate}
          isPercentage={true}
          widgetPercentChange={2.1}
          widgetPercentIcon={TrendingUpOutlined}
          percentColor="text-green-500"
        />

        <StatWidget
          widgetIcon={AccountBalanceOutlined}
          widgetTitle="Net Cash Flow"
          widgetValue={metrics.netCashFlow}
          widgetPercentChange={3.5}
          widgetPercentIcon={
            metrics.netCashFlow >= 0 ? TrendingUpOutlined : TrendingDownOutlined
          }
          percentColor={metrics.netCashFlow >= 0 ? "text-green-500" : "text-red-500"}
        />

        <StatWidget
          widgetIcon={ReceiptOutlined}
          widgetTitle="Avg Transaction"
          widgetValue={avgTransaction}
          widgetPercentChange={-1.2}
          widgetPercentIcon={TrendingDownOutlined}
          percentColor="text-red-500"
        />

        <StatWidget
          widgetIcon={RemoveOutlined}
          widgetTitle="Subscriptions"
          widgetValue={0}
          widgetPercentChange={0}
          widgetPercentIcon={RemoveOutlined}
          percentColor="text-gray-500"
        />
      </div>

      {/* First Row Charts - Income vs Spending Trends */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-md h-full p-4">
          <h3 className="text-lg font-medium mb-2">Income vs Spending Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Amount']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#82ca9d" 
                strokeWidth={2}
                name="Income"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="spending" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="Spending"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-gray-200 rounded-md h-full p-4">
          <h3 className="text-lg font-medium mb-2">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={spendingByCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Amount']}
                labelFormatter={(label) => `Category: ${label}`}
              />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" name="Amount Spent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row Charts - Cash Flow & Account Breakdown */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-md h-full p-4">
          <h3 className="text-lg font-medium mb-2">Monthly Cash Flow</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Amount']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="income" 
                stackId="1"
                stroke="#82ca9d" 
                fill="#82ca9d" 
                fillOpacity={0.6}
                name="Income"
              />
              <Area 
                type="monotone" 
                dataKey="expenses" 
                stackId="1"
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.6}
                name="Expenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-gray-200 rounded-md h-full p-4">
          <h3 className="text-lg font-medium mb-2">Account Balances</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={accountBalances} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="account" width={100} />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Balance']}
                labelFormatter={(label) => `Account: ${label}`}
              />
              <Legend />
              <Bar 
                dataKey="balance" 
                fill={(data) => data.balance >= 0 ? "#82ca9d" : "#ff8042"}
                name="Balance"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Third Row - Spending Breakdown & Weekly Trends */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-md h-full p-4">
          <h3 className="text-lg font-medium mb-2">Spending Breakdown</h3>
          <div className="flex items-center justify-between h-full">
            <ResponsiveContainer width="40%" height={250}>
              <PieChart>
                <Pie
                  data={spendingByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="amount"
                  nameKey="category"
                  label={(entry) => `${entry.category}: $${entry.amount}`}
                >
                  {spendingByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="w-3/5 pl-4">
              <div className="space-y-2">
                {spendingByCategory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: pieColors[index % pieColors.length] }}
                      />
                      <span className="text-sm">{item.category}</span>
                    </div>
                    <div className="text-sm font-medium">${item.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-md h-full p-4">
          <h3 className="text-lg font-medium mb-2">Weekly Spending Pattern</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={spendingTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Spent']}
                labelFormatter={(label) => `Day: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="Daily Spending"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;