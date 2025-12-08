import {
  ComposedChart,
  Area,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CashFlowAnalysisChartProps {
  timeSeriesData: Array<{ date: string; income: number; spending: number }>;
}

export const CashFlowAnalysisChart = ({
  timeSeriesData,
}: CashFlowAnalysisChartProps) => {
  const composedData =
    timeSeriesData?.map((day: any) => ({
      date: day.date,
      income: day.income,
      spending: day.spending,
      netFlow: day.income - day.spending,
    })) || [];

  return (
    <div className="border border-gray-200 rounded-md p-4">
      <h3 className="font-medium mb-2">Cash Flow Analysis</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={composedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(v) => `$${v}`} />
          <Legend />
          <Area
            type="monotone"
            dataKey="netFlow"
            fill="#8884d8"
            stroke="#8884d8"
            fillOpacity={0.3}
          />
          <Bar dataKey="income" fill="#82ca9d" />
          <Bar dataKey="spending" fill="#ff8042" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
