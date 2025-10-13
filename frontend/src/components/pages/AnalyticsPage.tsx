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
  BarChart,
  Bar,
} from "recharts";

const data = [
  { name: "Jan", uv: 400, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 300, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 200, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 278, pv: 3908, amt: 2000 },
  { name: "May", uv: 189, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 239, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 349, pv: 4300, amt: 2100 },
];

// Sample data for Pie Chart
const pieData = [
  { name: "Groceries", value: 400 },
  { name: "Utilities", value: 300 },
  { name: "Clothes", value: 200 },
  { name: "Healthcare", value: 278 },
  { name: "Travel", value: 189 },
];

const pieColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const barData = [
  { name: "Jan", transactions: 400 },
  { name: "Feb", transactions: 350 },
  { name: "Mar", transactions: 200 },
  { name: "Apr", transactions: 500 },
  { name: "May", transactions: 250 },
  { name: "Jun", transactions: 300 },
  { name: "Jul", transactions: 450 },
];

const AnalyicsPage = () => {
  return (
    <div className="p-4 col gap-4">
      <h2 className="text-4xl font-medium mb-4">Analyics</h2>

      {/* --- Top Widgets --- */}
      <div className="flex items-center gap-2">
        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Revenue"
          widgetValue={123234}
          widgetPercentChange={-2.5}
          widgetPercentIcon={TrendingDownOutlined}
          percentColor="text-red-500"
        />
        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Revenue"
          widgetValue={123234}
          widgetPercentChange={-2.5}
          widgetPercentIcon={TrendingDownOutlined}
          percentColor="text-red-500"
        />
        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Revenue"
          widgetValue={123234}
          widgetPercentChange={-2.5}
          widgetPercentIcon={TrendingDownOutlined}
          percentColor="text-red-500"
        />
        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Revenue"
          widgetValue={123234}
          widgetPercentChange={-2.5}
          widgetPercentIcon={TrendingDownOutlined}
          percentColor="text-red-500"
        />
        <StatWidget
          widgetIcon={AccountBalanceWalletOutlined}
          widgetTitle="Revenue"
          widgetValue={123234}
          widgetPercentChange={-2.5}
          widgetPercentIcon={TrendingDownOutlined}
          percentColor="text-red-500"
        />
      </div>

      {/* --- Line Chart --- */}
      <div className="border border-gray-200 rounded-md h-full p-4 mt-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
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
              name="Unique Visitors"
            />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#82ca9d"
              strokeWidth={2}
              name="Page Views"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* --- Two Bottom Charts --- */}
      <div className="flex items-center justify-between gap-4 mt-4">
        {/* Pie Chart */}
        <div className="border border-gray-200 rounded-md h-full p-4 w-full">
          <h3 className="text-lg font-medium mb-2">Spending Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
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

        {/* Bar Chart */}
        <div className="border border-gray-200 rounded-md h-full p-4 w-full">
          <h3 className="text-lg font-medium mb-2">Monthly Transactions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="transactions" fill="#82ca9d" name="Transactions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyicsPage;
