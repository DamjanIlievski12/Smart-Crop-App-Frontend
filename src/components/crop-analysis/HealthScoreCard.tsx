import { CheckCircle2 } from "lucide-react";
import type React from "react";
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

interface Props {
  healthScore: number;
  healthLabel: string;
}

export default function HealthScoreCard({
  healthScore,
  healthLabel,
}: Props): React.ReactElement {
  const radialData = [{ name: "Health", value: healthScore, fill: "#7cb342" }];

  return (
    <div className="w-[260px] flex-shrink-0 rounded-2xl bg-gradient-to-b from-[#2e5d40] to-[#1c3d28] p-6 flex flex-col items-center justify-center gap-4">
      <p className="text-sm font-medium text-white/70">Crop Health Score</p>
      <div className="relative w-36 h-36">
        <ResponsiveContainer width="100%" height={144}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="65%"
            outerRadius="100%"
            data={radialData}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              dataKey="value"
              cornerRadius={6}
              fill="#7cb342"
              background={{ fill: "rgba(255,255,255,0.1)" }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white">{healthScore}%</span>
          <span className="text-xs text-white/60 mt-0.5">{healthLabel}</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-sm font-medium text-[#7cb342]">
        <CheckCircle2 size={15} />
      </div>
    </div>
  );
}
