import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Droplets } from "lucide-react";
import type { HumidityPoint } from "../../api/types/weather";
import type React from "react";

interface HumidityTrendCardProps {
  data: HumidityPoint[];
}

export default function HumidityTrendCard({
  data,
}: HumidityTrendCardProps): React.ReactElement {
  return (
    <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4">
        <Droplets size={15} className="text-cyan-500" />
        Humidity Trend (5 days)
      </h2>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            stroke="#f3f4f6"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            domain={[0, 80]}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#06b6d4"
            strokeWidth={2}
            dot={{ r: 4, fill: "#06b6d4" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
