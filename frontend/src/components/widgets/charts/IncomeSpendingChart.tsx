import {
  LineChart, Line, CartesianGrid, XAxis, YAxis,
  Legend, Tooltip, ResponsiveContainer
} from "recharts";

interface Props {
  data: any[];
}

const IncomeSpendingChart = ({ data }: Props) => {
  return (
    <div className="border border-gray-200 rounded-md p-4">
      <h3 className="text-lg font-medium mb-4">Income vs Spending Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="date" tickFormatter={(d) => new Date(d).toLocaleDateString()} />
          <YAxis />
          <Tooltip formatter={(v: number) => `$${v.toFixed(2)}`} />
          <Legend />
          <Line type="monotone" dataKey="spending" stroke="#ef4444" strokeWidth={2} />
          <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeSpendingChart;
