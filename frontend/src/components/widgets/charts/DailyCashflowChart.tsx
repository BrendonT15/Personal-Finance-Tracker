import {
  BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis,
  YAxis, Tooltip, ReferenceLine, Cell, Legend
} from "recharts";

interface Props {
  data?: any[]; 
}

const DailyCashflowChart = ({ data = [] }: Props) => { 
  
  if (data.length === 0) {
    return (
      <div className="border border-gray-200 rounded-md p-4 w-full">
        <h3 className="text-lg font-medium mb-4">Daily Cash Flow</h3>
        <p className="text-gray-500">No transactions to display. Connect a bank account to view your cash flow.</p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-md p-4 w-full">
      <h3 className="text-lg font-medium mb-4">Daily Cash Flow</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(d) => new Date(d).toLocaleDateString()} />
          <YAxis />
          <Tooltip formatter={(v: number) => `$${v.toFixed(2)}`} />
          <Legend />
          <ReferenceLine y={0} stroke="#666" />
          <Bar dataKey="amount">
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.amount >= 0 ? "#22c55e" : "#ef4444"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyCashflowChart;
