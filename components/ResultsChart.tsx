import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PayoffResult } from '../types';

interface ResultsChartProps {
  snowballResult: PayoffResult;
  avalancheResult: PayoffResult;
  currentMethod: 'SNOWBALL' | 'AVALANCHE';
}

const ResultsChartComponent: React.FC<ResultsChartProps> = ({ snowballResult, avalancheResult, currentMethod }) => {
  const maxMonths = Math.max(snowballResult.monthlyData.length, avalancheResult.monthlyData.length);
  
  // Downsample if too many data points for performance and clarity
  const step = maxMonths > 100 ? Math.ceil(maxMonths / 100) : 1;
  
  const data = Array.from({ length: maxMonths }).map((_, i) => {
    if (i % step !== 0 && i !== maxMonths - 1) return null; // Skip some points

    const sData = snowballResult.monthlyData[i];
    const aData = avalancheResult.monthlyData[i];
    
    // Safety check for undefined if one array is shorter
    const sBal = sData ? sData.totalBalance : 0;
    const aBal = aData ? aData.totalBalance : 0;

    return {
      name: `Month ${i}`,
      displayDate: sData ? new Date(sData.date).toLocaleDateString(undefined, { month: 'short', year: '2-digit' }) : i,
      monthIndex: i,
      Snowball: Math.round(sBal),
      Avalanche: Math.round(aBal),
    };
  }).filter(Boolean); // Remove nulls

  const formatCurrency = (value: number) => {
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
    return `$${value}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md text-sm">
          <p className="font-bold text-gray-700 mb-1">{payload[0].payload.displayDate}</p>
          {payload.map((entry: any) => (
            <div key={entry.name} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
              <span className="text-gray-600">{entry.name}:</span>
              <span className="font-semibold text-gray-900">${entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[350px] w-full mt-4 select-none">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis 
            dataKey="displayDate" 
            tick={{fontSize: 10, fill: '#9ca3af'}} 
            tickLine={false}
            axisLine={false}
            minTickGap={30}
          />
          <YAxis 
            tickFormatter={formatCurrency} 
            stroke="#9ca3af"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            width={35}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ fontSize: '12px', color: '#4b5563' }}
          />
          
          <Area 
            type="monotone" 
            dataKey="Snowball" 
            stackId="1" 
            stroke="#0ea5e9" 
            fill="url(#colorSnowball)" 
            fillOpacity={0.2}
            strokeWidth={2}
            activeDot={{ r: 6, strokeWidth: 0 }}
            animationDuration={1000}
            isAnimationActive={false} /* Disable animation for better performance on mobile */
          />
          <Area 
            type="monotone" 
            dataKey="Avalanche" 
            stackId="2"
            stroke="#10b981" 
            fill="url(#colorAvalanche)" 
            fillOpacity={0.2}
            strokeWidth={2}
            activeDot={{ r: 6, strokeWidth: 0 }}
            animationDuration={1000}
            isAnimationActive={false}
          />

          <defs>
            <linearGradient id="colorSnowball" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorAvalanche" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ResultsChart = React.memo(ResultsChartComponent);