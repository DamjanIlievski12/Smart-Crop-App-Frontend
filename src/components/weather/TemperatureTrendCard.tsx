import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Thermometer } from "lucide-react";
import type { TemperaturePoint } from "../../api/types/weather";
import type React from "react";

interface TemperatureTrendCardProps {
  data: TemperaturePoint[];
}

export default function TemperatureTrendCard({
  data,
}: TemperatureTrendCardProps): React.ReactElement {
  return (
    <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4">
        <Thermometer size={15} className="text-orange-500" />
        Temperature Trend (5 days)
      </h2>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb923c" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#fb923c" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke="#f3f4f6"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            domain={[0, 28]}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#fb923c"
            strokeWidth={2}
            fill="url(#tempGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
