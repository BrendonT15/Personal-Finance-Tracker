import { useState, useEffect } from "react";
import {
  AccountBalanceWalletOutlined,
  TrendingDownOutlined,
  TrendingUpOutlined,
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
import { supabase } from "../../services/supabaseClient";
import axios from "axios";

const pieColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const DashboardPage = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [accountBalance, setAccountBalance] = useState<number>(0);
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [spending, setSpending] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setFirstName(user.user_metadata?.first_name || "User");
    }

    // Fetch Plaid data on mount
    fetchPlaidData();
  }, []);

  const fetchPlaidData = async () => {
    try {
      // Get user session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) return;

      // Get access token from database
      const { data: plaidItems, error } = await supabase
        .from("plaid_items")
        .select("access_token")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (error || !plaidItems || plaidItems.length === 0) {
        console.log("No Plaid items found");
        return;
      }

      const accessToken = plaidItems[0].access_token;

      // Fetch accounts
      const accountsRes = await axios.post(
        "http://localhost:8000/api/get-accounts",
        { access_token: accessToken }
      );

      console.log("📊 ACCOUNTS DATA:", accountsRes.data);

      // Calculate total balance
      const totalBalance = accountsRes.data.accounts.reduce(
        (sum: number, account: any) => {
          return sum + (account.balances.current || 0);
        },
        0
      );
      setAccountBalance(totalBalance);

      // Fetch transactions
      const transactionsRes = await axios.post(
        "http://localhost:8000/api/get-transactions",
        { access_token: accessToken }
      );

      console.log("💰 TRANSACTIONS DATA:", transactionsRes.data);

      const transactions = transactionsRes.data.transactions;
      setTransactionCount(transactions.length);

      // Calculate spending and income
      let totalSpending = 0;
      let totalIncome = 0;
      const categoryMap: { [key: string]: number } = {};

      transactions.forEach((txn: any) => {
        if (txn.amount > 0) {
          totalSpending += txn.amount;
          
          // Group by category
          const category = txn.category?.[0] || "Other";
          categoryMap[category] = (categoryMap[category] || 0) + txn.amount;
        } else {
          totalIncome += Math.abs(txn.amount);
        }
      });

      setSpending(totalSpending);
      setIncome(totalIncome);

      // Convert category map to array for pie chart
      const categoryArray = Object.entries(categoryMap).map(([name, value]) => ({
        name,
        value,
      }));
      setCategoryData(categoryArray);

      console.log("📈 PROCESSED DATA:", {
        totalBalance,
        transactionCount: transactions.length,
        totalSpending,
        totalIncome,
        categories: categoryArray,
      });

    } catch (err) {
      console.error("Error fetching Plaid data:", err);
    }
  };

  return (
    <div className="p-4 col gap-4 min-h-screen">
      <h2 className="text-4xl font-medium mb-4">
        Dashboard - Welcome {firstName}
      </h2>

      <PlaidButton onSuccess={fetchPlaidData} />

      <div className="flex items-center gap-2">
        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Account Balance"
          widgetValue={accountBalance}
          widgetPercentChange={6.5}
          widgetPercentIcon={TrendingUpOutlined}
          percentColor="text-green-500"
        />

        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Transactions"
          widgetValue={transactionCount}
          widgetPercentChange={-2.5}
          widgetPercentIcon={TrendingDownOutlined}
          percentColor="text-red-500"
        />
        
        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Spending"
          widgetValue={spending}
          widgetPercentChange={-2.5}
          widgetPercentIcon={TrendingDownOutlined}
          percentColor="text-red-500"
        />
        
        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Income"
          widgetValue={income}
          widgetPercentChange={8.2}
          widgetPercentIcon={TrendingUpOutlined}
          percentColor="text-green-500"
        />
      </div>

      <div className="border border-gray-200 rounded-md h-full p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={monthlyData.length > 0 ? monthlyData : [
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
                data={categoryData.length > 0 ? categoryData : [
                  { name: "No data", value: 100 }
                ]}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {(categoryData.length > 0 ? categoryData : [{ name: "No data", value: 100 }]).map((entry, index) => (
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