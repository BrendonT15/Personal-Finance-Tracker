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
} from "recharts";
import TestAreaChart from "../widgets/charts/TestAreaChart";
import TestPosNegBarChart from "../widgets/charts/TestPosNegBarChart";
import TestRadarChart from "./TestRadarChart";
import PlaidButton from "../plaid/PlaidButton";
import { usePlaidData } from "../../hooks/usePlaidData";
import PlaidDisconnectButton from "../plaid/PlaidDisconnectButton";

const pieColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const DashboardPage = () => {
  const [firstName, setFirstName] = useState<string>("");
  const {
    metrics,
    hasBankAccount,
    isLoading,
    error,
    refetch,
  } = usePlaidData();

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
    <div className="p-4 col gap-4 min-h-screen">
      <h2 className="text-4xl font-medium mb-4 flex items-center gap-3">
        Dashboard - Welcome {firstName}
      </h2>

      {hasBankAccount ? (
        <div className="border border-gray-200 rounded-md p-4 bg-green-50">
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

      <div className="flex items-center gap-2">
        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Account Balance"
          widgetValue={metrics.totalBalance}
          widgetPercentChange={6.5}
          widgetPercentIcon={TrendingUpOutlined}
          percentColor="text-green-500"
        />

        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Transactions"
          widgetValue={metrics.transactionCount}
          widgetPercentChange={-2.5}
          widgetPercentIcon={TrendingDownOutlined}
          percentColor="text-red-500"
        />

        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
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
          percentColor={
            metrics.netCashFlow >= 0 ? "text-green-500" : "text-red-500"
          }
        />

        <StatWidget
          widgetIcon={ReceiptOutlined}
          widgetTitle="Avg Transaction"
          widgetValue={metrics.spending / (metrics.transactionCount || 1)}
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

      <div className="border border-gray-200 rounded-md h-full p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={[
              { name: "Jan", uv: 400, pv: 2400 },
              { name: "Feb", uv: 300, pv: 1398 },
              { name: "Mar", uv: 200, pv: 9800 },
            ]}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              strokeWidth={2}
              name="Spending"
            />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#82ca9d"
              strokeWidth={2}
              name="Income"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between gap-4 mt-4">
        <div className="border border-gray-200 rounded-md h-full p-4 w-full">
          <h3 className="text-lg font-medium mb-2">Spending Breakdown</h3>
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
                label
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
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-gray-200 rounded-md h-full p-4 w-full">
          <h3 className="text-lg font-medium mb-2">Test Area Chart</h3>
          <TestAreaChart />
        </div>
      </div>

      <div className="grid grid-cols-[25%_auto] gap-1">
        <div className="border border-gray-200 rounded-md h-full p-4 w-full">
          <h3 className="text-lg font-medium mb-2">Test Area Chart</h3>
          <TestPosNegBarChart />
        </div>
        <div className="border border-gray-200 rounded-md h-full p-4 w-full">
          <h3 className="text-lg font-medium mb-2">Test Area Chart</h3>
          <TestRadarChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
