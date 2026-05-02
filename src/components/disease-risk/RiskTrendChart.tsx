import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import type { TrendDataPoint } from '../../api/types/disease';
import type React from 'react';

interface RiskTrendChartProps {
  data: TrendDataPoint[];
}

export default function RiskTrendChart({ data }: RiskTrendChartProps): React.ReactElement {
  return (
    <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-5">
      <h2 className="text-sm font-semibold text-gray-800 mb-4">Risk Trend (6 Months)</h2>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} barSize={28}>
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[0, 40]} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 12 }}
            cursor={{ fill: '#f3f4f2' }}
          />
          <Bar dataKey="risk" fill="#2e5d40" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
