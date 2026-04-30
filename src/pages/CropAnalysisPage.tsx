import AppLayout from '../components/layout/AppLayout';
import {
  RadialBarChart, RadialBar, ResponsiveContainer
} from 'recharts';
import {
  TrendingUp, Droplets, ThermometerSun, AlertTriangle,
  CheckCircle2, Sparkles, Calendar, MapPin, ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import type { Priority, Recommendation, RecommendationType } from '../types/analysis';
import type React from 'react';
 
/* ── Data ─────────────────────────────────────────────── */
interface RadialData {
  name: string;
  value: number;
  fill: string;
}

const healthData: RadialData[] = [{ name: 'Health', value: 92, fill: '#2e5d40' }];
 
const recommendations: Recommendation[] = [
  {
    title: 'Optimal Irrigation Schedule',
    description: 'Increase watering by 15% during next 5 days due to rising temperatures.',
    priority: 'High',
    type: 'irrigation',
  },
  {
    title: 'Fertilizer Application',
    description: 'Apply nitrogen-rich fertilizer in the next 3 days for optimal growth.',
    priority: 'Medium',
    type: 'fertilizer',
  },
  {
    title: 'Disease Prevention',
    description: 'Monitor for early blight signs. Preventive fungicide recommended.',
    priority: 'High',
    type: 'disease',
  },
];

interface Condition {
  label: string;
  value: number;
  status: string;
  statusColor: string;
  bg: string;
  iconBg: string;
  Icon: LucideIcon;
  iconColor: string;
}

const conditions: Condition[] = [
  { label: 'Temperature', value: 26, status: 'Optimal', statusColor: 'text-green-600', bg: 'bg-blue-50', iconBg: 'bg-blue-500/10', Icon: ThermometerSun, iconColor: 'text-blue-500' },
  { label: 'Humidity', value: 65, status: 'Good', statusColor: 'text-green-600', bg: 'bg-cyan-50', iconBg: 'bg-cyan-500/10', Icon: Droplets, iconColor: 'text-cyan-500' },
  { label: 'Rainfall (7d)', value: 12, status: 'Low', statusColor: 'text-yellow-600', bg: 'bg-indigo-50', iconBg: 'bg-indigo-500/10', Icon: Droplets, iconColor: 'text-indigo-500' },
];

interface DiseaseRisk {
  label: string;
  level: string;
  pct: number;
  bar: string;
}

const diseaseRisks: DiseaseRisk[] = [
  { label: 'Fungal Disease', level: 'Low', pct: 20, bar: 'bg-green-500' },
  { label: 'Pest Infestation', level: 'Medium', pct: 50, bar: 'bg-yellow-500' },
  { label: 'Bacterial', level: 'Low', pct: 18, bar: 'bg-green-500' },
];
 
/* ── Sub-components ───────────────────────────────────── */
 
interface RecIconProps {
  type: RecommendationType;
  priority: Priority;
}

function RecIcon({ type, priority }: RecIconProps): React.ReactElement {
  const isHigh = priority === 'High';
  const bg = isHigh ? 'bg-orange-50' : 'bg-blue-50';
  const color = isHigh ? 'text-orange-500' : 'text-blue-500';
  const Icon: LucideIcon = type === 'irrigation' ? Droplets : type === 'fertilizer' ? TrendingUp : AlertTriangle;
  return (
    <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
      <Icon size={16} className={color} />
    </div>
  );
}
 
/* ── Page ──────────────────────────────────────────────── */
export default function CropAnalysisPage(): React.ReactElement {
  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Crop Analysis</h1>
        <p className="text-sm text-gray-500 mt-1">Detailed analysis and AI-powered recommendations for your crops</p>
      </div>
 
      {/* ── Field Selector ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <div className="grid grid-cols-4 gap-4">
          {/* Select Field */}
          <div>
            <p className="text-xs text-gray-400 mb-2">Select Field</p>
            <div className="relative">
              <select className="w-full appearance-none text-sm font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pr-9 outline-none focus:border-[#2e5d40] focus:ring-2 focus:ring-[#2e5d40]/10 transition-colors cursor-pointer">
                <option>North Field</option>
                <option>South Valley</option>
                <option>East Garden</option>
                <option>West Orchard</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
 
          {/* Crop Type */}
          <div>
            <p className="text-xs text-gray-400 mb-2">Crop Type</p>
            <div className="text-sm font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
              Wheat
            </div>
          </div>
 
          {/* Location */}
          <div>
            <p className="text-xs text-gray-400 mb-2">Location</p>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
              <MapPin size={13} className="text-gray-400 flex-shrink-0" />
              Northern Valley, CA
            </div>
          </div>
 
          {/* Last Updated */}
          <div>
            <p className="text-xs text-gray-400 mb-2">Last Updated</p>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
              <Calendar size={13} className="text-gray-400 flex-shrink-0" />
              2 hours ago
            </div>
          </div>
        </div>
      </div>
 
      {/* ── Row 2: Health Score (hero) + Conditions + Disease Risk ── */}
      <div className="flex gap-4 mb-4">
 
        {/* Health Score – accent card */}
        <div className="w-[260px] flex-shrink-0 rounded-2xl bg-gradient-to-b from-[#2e5d40] to-[#1c3d28] p-6 flex flex-col items-center justify-center gap-4">
          <p className="text-sm font-medium text-white/70">Crop Health Score</p>
          <div className="relative w-36 h-36">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%" cy="50%"
                innerRadius="65%" outerRadius="100%"
                data={healthData}
                startAngle={90} endAngle={-270}
              >
                <RadialBar dataKey="value" cornerRadius={6} fill="#7cb342" background={{ fill: 'rgba(255,255,255,0.1)' }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white">92%</span>
              <span className="text-xs text-white/60 mt-0.5">Excellent</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-medium text-[#7cb342]">
            <CheckCircle2 size={15} />
            Crop is Healthy
          </div>
        </div>
 
        {/* Current Conditions */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Current Conditions</h2>
          <div className="flex flex-col gap-3">
            {conditions.map(({ label, value, status, statusColor, bg, iconBg, Icon, iconColor }) => (
              <div key={label} className={`flex items-center justify-between px-4 py-3 rounded-xl ${bg}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center`}>
                    <Icon size={15} className={iconColor} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="text-sm font-semibold text-gray-900">{value}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium ${statusColor}`}>{status}</span>
              </div>
            ))}
          </div>
        </div>
 
        {/* Disease Risk */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Disease Risk</h2>
 
          {/* Overall badge */}
          <div className="flex flex-col items-center justify-center py-3 mb-4">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-2">
              <span className="text-xl font-bold text-green-600">Low</span>
            </div>
            <p className="text-xs text-gray-400">15% risk based on current conditions</p>
          </div>
 
          <div className="flex flex-col gap-3">
            {diseaseRisks.map(({ label, level, pct, bar }) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">{label}</span>
                  <span className={level === 'Medium' ? 'text-yellow-600' : 'text-green-600'}>{level}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${bar} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      {/* ── Row 3: AI Recommendations ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
            <Sparkles size={18} className="text-[#2e5d40]" />
            AI-Generated Recommendations
          </h2>
          <button className="flex items-center gap-2 bg-[#2e5d40] hover:bg-[#245033] text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors active:scale-[0.98]">
            <Sparkles size={14} />
            Generate New Analysis
          </button>
        </div>
 
        <div className="flex flex-col gap-3">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 border border-gray-100 rounded-xl p-4 hover:border-[#2e5d40]/30 transition-colors"
            >
              <RecIcon type={rec.type} priority={rec.priority} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <p className="text-sm font-semibold text-gray-900">{rec.title}</p>
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0 ${
                      rec.priority === 'High'
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {rec.priority}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{rec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}