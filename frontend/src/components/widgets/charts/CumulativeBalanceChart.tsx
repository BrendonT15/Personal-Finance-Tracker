import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CumulativeBalanceChartProps {
  timeSeriesData: Array<{ date: string; income: number; spending: number }>;
  totalBalance: number;
}

export const CumulativeBalanceChart = ({
  timeSeriesData,
  totalBalance,
}: CumulativeBalanceChartProps) => {
  const cumulativeData =
    timeSeriesData?.reduce((acc: any[], curr: any, idx: number) => {
      const previousBalance =
        idx > 0 ? acc[idx - 1].balance : totalBalance;
      const netChange = curr.income - curr.spending;
      const newBalance = previousBalance + netChange;

      acc.push({
        date: curr.date,
        balance: newBalance,
      });
      return acc;
    }, []) || [];

  return (
    <div className="border border-gray-200 rounded-md p-4">
      <h3 className="font-medium mb-2">Projected Balance Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={cumulativeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(v) => `$${Number(v).toFixed(2)}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};