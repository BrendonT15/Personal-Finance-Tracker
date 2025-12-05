import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  {
    subject: 'Math',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Chinese',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'English',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Geography',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Physics',
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: 'History',
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

const TestRadarChart = () => {
  return (
      <ResponsiveContainer width="100%" height={250}>
      <RadarChart data={data}>
        {/* UPDATE THESE LINES */}
        <PolarGrid stroke="var(--grid-color)" />
        <PolarAngleAxis dataKey="subject" stroke="var(--axis-color)" />
        <PolarRadiusAxis stroke="var(--axis-color)" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'var(--tooltip-bg)',
            border: '1px solid var(--tooltip-border)',
            color: 'var(--tooltip-text)'
          }}
        />
        
        <Radar name="Score" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
    );
};

export default TestRadarChart;
