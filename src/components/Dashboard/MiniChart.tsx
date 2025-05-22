
import React from 'react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface MiniChartProps {
  data: Array<{ period: string; value: number; goal?: number }>;
  progressPercentage: number;
  isInverse?: boolean;
}

const MiniChart: React.FC<MiniChartProps> = ({ data, progressPercentage, isInverse }) => {
  // Analyze trend direction
  const getTrendDirection = () => {
    if (data.length < 2) return "neutral";
    
    // Compare first and last values to determine overall trend
    const firstValue = data[0].value;
    const lastValue = data[data.length - 1].value;
    
    // Calculate average of period
    const sum = data.reduce((acc, item) => acc + item.value, 0);
    const average = sum / data.length;
    
    // Determine if last value is close to average (within 5%)
    const isCloseToAverage = Math.abs(lastValue - average) / average < 0.05;
    
    if (isCloseToAverage) return "neutral";
    if (lastValue > firstValue) return isInverse ? "negative" : "positive";
    return isInverse ? "positive" : "negative";
  };

  // Get chart color based on trend direction
  const getChartColor = () => {
    const trend = getTrendDirection();
    
    switch(trend) {
      case "positive": return "#1DB954"; // green for upward trend (good)
      case "negative": return "#FF6B6B"; // red for downward trend (bad)
      case "neutral": return "#FFC857"; // yellow for neutral/average
      default: return "#4EA8DE"; // default blue
    }
  };

  const chartColor = getChartColor();
  
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
