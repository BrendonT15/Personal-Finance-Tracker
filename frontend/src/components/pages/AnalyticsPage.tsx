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
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import PlaidButton from "../plaid/PlaidButton";
import { usePlaidData } from "../../hooks/usePlaidData";

const pieColors = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
];

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

  const avgTransaction =
    metrics.transactionCount > 0
      ? metrics.spending / metrics.transactionCount
      : 0;

  if (isLoading)
    return <div className="p-4 flex justify-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 min-h-screen space-y-6">
      <h2 className="text-4xl font-medium">Analytics</h2>

      {!hasBankAccount && (
        <ConnectBankBanner>
          <PlaidButton onSuccess={refetch} />
        </ConnectBankBanner>
      )}

      {/* SUMMARY METRICS */}
      <div className="grid grid-cols-4 gap-2">
        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Account Balance"
          widgetValue={metrics.totalBalance}
          widgetPercentChange={6.5}
          widgetPercentIcon={TrendingUpOutlined}
          percentColor="text-green-500"
          isCurrency={true}
        />

        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Transactions"
          widgetValue={metrics.transactionCount}
          widgetPercentChange={-2.5}
          widgetPercentIcon={TrendingDownOutlined}
          percentColor="text-red-500"
          isCurrency={false}
        />

        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Spending"
          widgetValue={metrics.spending}
          widgetPercentChange={-2.5}
          widgetPercentIcon={TrendingDownOutlined}
          percentColor="text-red-500"
          isCurrency={true}
        />

        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Income"
          widgetValue={metrics.income}
          widgetPercentChange={8.2}
          widgetPercentIcon={TrendingUpOutlined}
          percentColor="text-green-500"
          isCurrency={true}
        />

        <StatWidget
          widgetIcon={SavingsOutlined}
          widgetTitle="Savings Rate"
          widgetValue={metrics.savingsRate}
          isPercentage={true}
          widgetPercentChange={2.1}
          widgetPercentIcon={TrendingUpOutlined}
          percentColor="text-green-500"
          isCurrency={false}
        />

        <StatWidget
          widgetIcon={AccountBalanceOutlined}
          widgetTitle="Net Cash Flow"
          widgetValue={metrics.netCashFlow}
          widgetPercentChange={3.5}
          widgetPercentIcon={
            metrics.netCashFlow >= 0 ? TrendingUpOutlined : TrendingDownOutlined
          }
          percentColor={
            metrics.netCashFlow >= 0 ? "text-green-500" : "text-red-500"
          }
          isCurrency={true}
        />

        <StatWidget
          widgetIcon={ReceiptOutlined}
          widgetTitle="Avg Transaction"
          widgetValue={metrics.spending / (metrics.transactionCount || 1)}
          widgetPercentChange={-1.2}
          widgetPercentIcon={TrendingDownOutlined}
          percentColor="text-red-500"
          isCurrency={true}
        />

        <StatWidget
          widgetIcon={RemoveOutlined}
          widgetTitle="Subscriptions"
          widgetValue={0}
          widgetPercentChange={0}
          widgetPercentIcon={RemoveOutlined}
          percentColor="text-gray-500"
          isCurrency={false}
        />
      </div>

      {/* REAL DATA CHARTS */}
      <div className="grid grid-cols-2 gap-4">
        {/* Income vs Spending */}
        <div className="border border-gray-200 rounded-md p-4">
          <h3 className="font-medium mb-2">Income vs Spending (Actual)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metrics.timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(v) => `$${v}`} />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#82ca9d" />
              <Line type="monotone" dataKey="spending" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Spending By Category */}
        <div className="border border-gray-200 rounded-md p-4">
          <h3 className="font-medium mb-2">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metrics.categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(v) => `$${v}`} />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cashflow + Pie Breakdown */}
      <div className="grid grid-cols-2 gap-4">
        {/* Daily Net Flow */}
        <div className="border border-gray-200 rounded-md p-4">
          <h3 className="font-medium mb-2">Daily Cash Flow</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={metrics.dailyCashFlow}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(v) => `$${v}`} />
              <Legend />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="border border-gray-200 rounded-md p-4 flex flex-col justify-center">
          <h3 className="font-medium mb-4 text-center">Category Share</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={metrics.categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
              >
                {metrics.categoryData?.map((_, i) => (
                  <Cell key={i} fill={pieColors[i % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `$${v}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
