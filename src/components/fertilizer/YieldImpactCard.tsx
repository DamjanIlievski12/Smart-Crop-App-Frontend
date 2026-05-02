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
      <div className="mt-4 bg-green-50 rounded-xl p-3 flex items-start gap-2">
        <TrendingUp size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-green-700">Projected yield increase: 25-45%</p>
          <p className="text-xs text-green-600">With optimal fertilizer application</p>
        </div>
      </div>
    </div>
  );
}
