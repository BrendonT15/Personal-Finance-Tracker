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
  ReferenceLine,
} from "recharts";
import { usePlaidData } from "../../hooks/usePlaidData";
import PlaidDisconnectButton from "../plaid/PlaidDisconnectButton";

const pieColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const DashboardPage = () => {
  const [firstName, setFirstName] = useState<string>("");
  const { metrics, hasBankAccount, isLoading, error, refetch } = usePlaidData();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setFirstName(user.user_metadata?.first_name || "User");
    }
  }, []);

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Loading dashboard data...</p>
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
    <div className="p-4 flex flex-col gap-4 min-h-screen">
      <h2 className="text-4xl font-medium flex items-center gap-3">
        Dashboard
      </h2>

      {hasBankAccount ? (
        <div className="rounded-md p-4 bg-green-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-800">
                Bank Account Connected
              </h3>
              <p className="text-sm text-green-600">
                Your financial data is synced and up to date
              </p>
            </div>
            <PlaidDisconnectButton onSuccess={refetch} />
          </div>
        </div>
      ) : (
        <ConnectBankBanner onSuccess={refetch} />
      )}

      <div className="flex items-center gap-2 flex-wrap">
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

      {/* Income vs Spending Over Time */}
      <div className="border border-gray-200 rounded-md p-4">
        <h3 className="text-lg font-medium mb-4">Income vs Spending Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={metrics.timeSeriesData || []}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => {
                const d = new Date(date);
                return `${d.getMonth() + 1}/${d.getDate()}`;
              }}
            />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => `$${value.toFixed(2)}`}
              labelFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="spending"
              stroke="#ef4444"
              strokeWidth={2}
              name="Spending"
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={2}
              name="Income"
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-start justify-between gap-4">
        {/* Spending Breakdown Pie Chart */}
        <div className="border border-gray-200 rounded-md p-4 w-1/2">
          <h3 className="text-lg font-medium mb-4">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={
                  metrics.categoryData.length > 0
                    ? metrics.categoryData
                    : [{ name: "No data", value: 100 }]
                }
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={(entry) => `${entry.name}: $${entry.value.toFixed(0)}`}
              >
                {(metrics.categoryData.length > 0
                  ? metrics.categoryData
                  : [{ name: "No data", value: 100 }]
                ).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={pieColors[index % pieColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Cash Flow Bar Chart */}
        <div className="border border-gray-200 rounded-md p-4 w-1/2">
          <h3 className="text-lg font-medium mb-4">Daily Cash Flow</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metrics.dailyCashFlow || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date"
                tickFormatter={(date) => {
                  const d = new Date(date);
                  return `${d.getMonth() + 1}/${d.getDate()}`;
                }}
              />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => `$${value.toFixed(2)}`}
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <ReferenceLine y={0} stroke="#666" />
              <Bar 
                dataKey="amount" 
                fill="#8884d8"
                name="Net Cash Flow"
              >
                {(metrics.dailyCashFlow || []).map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.amount >= 0 ? "#22c55e" : "#ef4444"} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;