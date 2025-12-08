import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface WeeklySpendingChartProps {
  timeSeriesData: Array<{ date: string; spending: number }>;
}

export const WeeklySpendingChart = ({
  timeSeriesData,
}: WeeklySpendingChartProps) => {
  const weeklyData: { [key: string]: number } = {};
  timeSeriesData?.forEach((day: any) => {
    const date = new Date(day.date);
    const weekNum = Math.floor(date.getDate() / 7) + 1;
    const month = date.toLocaleString("default", { month: "short" });
    const weekKey = `${month} W${weekNum}`;

    weeklyData[weekKey] = (weeklyData[weekKey] || 0) + day.spending;
  });

  const weeklyChartData = Object.entries(weeklyData).map(
    ([week, spending]) => ({
      week,
      spending,
    })
  );

  return (
    <div className="border border-gray-200 rounded-md p-4">
      <h3 className="font-medium mb-2">Weekly Spending Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={weeklyChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip formatter={(v) => `$${v}`} />
          <Legend />
          <Bar dataKey="spending" fill="#ff8042" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};