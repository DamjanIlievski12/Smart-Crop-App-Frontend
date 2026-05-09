import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { CloudRain } from "lucide-react";
import type { RainfallPoint } from "../../api/types/weather";
import type React from "react";

interface RainfallCardProps {
  data: RainfallPoint[];
}

export default function RainfallCard({
  data,
}: RainfallCardProps): React.ReactElement {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4">
        <CloudRain size={15} className="text-blue-500" />
        Rainfall Analysis (5 days)
      </h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={data}
          barSize={48}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            stroke="#f3f4f6"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              fontSize: 12,
            }}
            cursor={{ fill: "#f3f4f6" }}
          />
          <Bar dataKey="rainfall" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
