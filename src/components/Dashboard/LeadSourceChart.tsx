
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartData } from '@/data/mockData';
import { ChartPie } from 'lucide-react';

interface LeadSourceChartProps {
  data: ChartData[];
}

const LeadSourceChart: React.FC<LeadSourceChartProps> = ({ data }) => {
  const COLORS = ['#1DB954', '#4ECDC4', '#88D498', '#C7F9CC', '#8A9BA8', '#43AA8B'];
  const totalLeads = data.reduce((sum, source) => sum + source.value, 0);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text 
        x={x} 
        y={y} 
        fill="#fff" 
        textAnchor="middle" 
        dominantBaseline="middle" 
        fontSize={12}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-dark-100 p-3 rounded-lg shadow-lg border border-dark-200 text-sm">
          <p className="font-medium text-white">{data.name}</p>
          <p className="text-gray-300">{`${data.value} leads (${(data.value / totalLeads * 100).toFixed(1)}%)`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-card p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <ChartPie className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-white">Origem dos Leads</h3>
      </div>
      <div className="chart-container glow-chart">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeadSourceChart;
