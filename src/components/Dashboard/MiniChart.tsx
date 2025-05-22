
import React from 'react';
import { Line, Bar, LineChart, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface MiniChartProps {
  data: Array<{ period: string; value: number; goal?: number }>;
  progressPercentage: number;
  isInverse?: boolean;
}

const MiniChart: React.FC<MiniChartProps> = ({ data, progressPercentage, isInverse }) => {
  // Determine chart color based on progress percentage
  const getChartColorClass = () => {
    if (progressPercentage < 30) return "#FF6B6B"; // danger
    if (progressPercentage < 60) return "#FFC857"; // warning
    if (progressPercentage < 90) return "#4EA8DE"; // info
    return "#1DB954"; // good
  };

  const chartColor = getChartColorClass();
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <XAxis 
          dataKey="period" 
          tick={{ fontSize: 8, fill: '#6c757d' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          hide 
          domain={isInverse ? ['dataMax', 'dataMin'] : ['dataMin', 'dataMax']} 
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1E1E1E', 
            border: '1px solid #2C2C2C',
            borderRadius: '0.5rem',
            fontSize: '10px'
          }} 
          labelStyle={{ color: '#e9ecef' }}
          itemStyle={{ color: chartColor }}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={chartColor} 
          strokeWidth={2} 
          dot={{ r: 2, fill: chartColor }}
          activeDot={{ r: 4 }}
        />
        {data.some(item => item.goal !== undefined) && (
          <Line 
            type="monotone" 
            dataKey="goal" 
            stroke="#6c757d" 
            strokeWidth={1} 
            strokeDasharray="3 3"
            dot={false}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MiniChart;
