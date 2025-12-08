import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface CategoryRadarChartProps {
  categoryData: Array<{ name: string; value: number }>;
}

export const CategoryRadarChart = ({
  categoryData,
}: CategoryRadarChartProps) => {
  const maxValue = Math.max(
    ...(categoryData?.map((c: any) => c.value) || [0])
  );
  const radarData =
    categoryData?.slice(0, 6).map((cat: any) => ({
      category:
        cat.name.length > 12 ? cat.name.substring(0, 12) + "..." : cat.name,
      value: (cat.value / maxValue) * 100,
      actualValue: cat.value,
    })) || [];

  return (
    <div className="border border-gray-200 rounded-md p-4">
      <h3 className="font-medium mb-2">Top Categories Radar</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" />
          <PolarRadiusAxis angle={90} domain={[0, 100]} />
          <Radar
            name="Spending %"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Tooltip
            formatter={(_value: any, _name: any, props: any) => [
              `$${props.payload.actualValue.toFixed(2)}`,
              "Amount",
            ]}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};