import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface Props {
  data: any[];
  colors?: string[];
}

const SpendingPieChart = ({ data, colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"] }: Props) => {
  const chartData = data.length > 0 ? data : [{ name: "No data", value: 100 }];

  return (
    <div className="border border-gray-200 rounded-md p-4 w-full">
      <h3 className="text-lg font-medium mb-4">Spending by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={chartData} dataKey="value" cx="50%" cy="50%" outerRadius={100}
               label={(entry) => `${entry.name}: $${entry.value.toFixed(0)}`}>
            {chartData.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
          </Pie>
          <Tooltip formatter={(v: number) => `$${v.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingPieChart;
