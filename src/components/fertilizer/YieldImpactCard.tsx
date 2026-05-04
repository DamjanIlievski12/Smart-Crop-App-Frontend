import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import type { YieldDataPoint } from '../../api/types/fertilizer';
import type React from 'react';

interface YieldImpactCardProps {
  data: YieldDataPoint[];
}

export default function YieldImpactCard({ data }: YieldImpactCardProps): React.ReactElement {
  return (
    <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-5">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Expected Yield Impact</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[0, 160]} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 12 }}
          />
          <Line type="monotone" dataKey="yield" stroke="#2e5d40" strokeWidth={2} dot={{ r: 5, fill: '#2e5d40' }} />
        </LineChart>
      </ResponsiveContainer>
      {data.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-4">No yield data available.</p>
      )}
    </div>
  );
}
