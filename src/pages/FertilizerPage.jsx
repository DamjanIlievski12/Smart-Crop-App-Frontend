import AppLayout from '../components/layout/AppLayout';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  Download, Sparkles, ChevronDown, CalendarDays, Info,
  Sprout, TrendingUp,
} from 'lucide-react';

/* ── Mock Data ────────────────────────────────────────── */
const nutrients = [
  { name: 'Nitrogen (N)',   current: 65, optimal: 85, status: 'Low',  barColor: '#2e5d40', statusColor: 'bg-orange-100 text-orange-600' },
  { name: 'Phosphorus (P)', current: 78, optimal: 90, status: 'Good', barColor: '#2e5d40', statusColor: 'bg-green-100 text-green-700' },
  { name: 'Potassium (K)',  current: 90, optimal: 95, status: 'Good', barColor: '#2e5d40', statusColor: 'bg-green-100 text-green-700' },
];

const schedule = [
  { week: 'Week 1', dates: 'March 28 - April 3',  type: 'Urea (46-0-0)',     rate: '50 kg/acre', status: 'Pending',   statusColor: 'bg-orange-100 text-orange-600' },
  { week: 'Week 4', dates: 'April 18 - 24',       type: 'NPK (15-15-15)',    rate: '40 kg/acre', status: 'Scheduled', statusColor: 'bg-blue-100 text-blue-600' },
  { week: 'Week 8', dates: 'May 16 - 22',         type: 'Potash (0-0-60)',   rate: '30 kg/acre', status: 'Scheduled', statusColor: 'bg-blue-100 text-blue-600' },
];

const yieldData = [
  { stage: 'Current',           yield: 95  },
  { stage: 'After Application', yield: 120 },
  { stage: 'Expected Peak',     yield: 145 },
];

const guidelines = [
  { title: 'Best Time to Apply',  text: 'Early morning or late evening when temperature is below 25°C' },
  { title: 'Application Method',  text: 'Broadcast evenly and incorporate into top 2-3 inches of soil' },
  { title: 'Precautions',         text: 'Avoid application before heavy rain. Water crops lightly after application' },
  { title: 'Monitoring',          text: 'Check soil nutrient levels 2 weeks after each application' },
];

/* ── Page ──────────────────────────────────────────────── */
export default function FertilizerPage() {
  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Fertilizer Recommendations</h1>
        <p className="text-sm text-gray-500 mt-1">AI-powered fertilizer optimization for maximum crop yield</p>
      </div>

      {/* ── Field selector row ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-400 mb-2">Select Field</p>
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2.5">
              <span className="text-sm font-medium text-gray-900">North Field - Wheat</span>
              <ChevronDown size={15} className="text-gray-400" />
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-2">Growth Stage</p>
            <div className="bg-[#ece8e1] rounded-lg px-4 py-2.5">
              <span className="text-sm font-medium text-gray-900">Vegetative</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-2">Last Application</p>
            <div className="bg-[#ece8e1] rounded-lg px-4 py-2.5">
              <span className="text-sm font-medium text-gray-900">15 days ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── AI Recommendation Card ── */}
      <div className="rounded-2xl bg-[#2e5d40] p-6 mb-4">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <p className="text-base font-semibold text-white">AI Fertilizer Recommendation</p>
              <p className="text-xs text-white/60">Based on soil analysis, crop type, and growth stage</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-white text-gray-800 text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={14} /> Export PDF
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Recommended Type', value: 'NPK 15-15-15' },
            { label: 'Application Rate',  value: '120 kg/acre' },
            { label: 'Expected Yield Increase', value: '+25-45%' },
          ].map((m) => (
            <div key={m.label} className="bg-white/15 rounded-xl p-4">
              <p className="text-xs text-white/70 mb-1">{m.label}</p>
              <p className="text-xl font-bold text-white">{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Current Nutrient Status ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-5">Current Nutrient Status</h2>
        <div className="flex flex-col gap-6">
          {nutrients.map((n) => {
            const pct = Math.round((n.current / n.optimal) * 100);
            return (
              <div key={n.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#e4ebe5] flex items-center justify-center">
                      <Sprout size={15} className="text-[#2e5d40]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{n.name}</p>
                      <p className="text-xs text-gray-400">Current: {n.current} kg/acre / Optimal: {n.optimal} kg/acre</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${n.statusColor}`}>
                    {n.status}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: n.barColor }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0</span>
                    <span>Target: {n.optimal} kg/acre</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Application Schedule ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-900">Application Schedule</h2>
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <CalendarDays size={13} /> 12-Week Plan
          </span>
        </div>
        <div className="flex flex-col gap-4">
          {schedule.map((s) => (
            <div key={s.week} className="border border-gray-100 rounded-xl p-5 flex items-center">
              <div className="w-10 h-10 rounded-xl bg-[#e4ebe5] flex items-center justify-center mr-5 flex-shrink-0">
                <CalendarDays size={16} className="text-[#2e5d40]" />
              </div>
              <div className="grid grid-cols-4 flex-1 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Period</p>
                  <p className="text-sm font-semibold text-gray-900">{s.week}</p>
                  <p className="text-xs text-gray-400">{s.dates}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Fertilizer Type</p>
                  <p className="text-sm font-semibold text-gray-900">{s.type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Application Rate</p>
                  <p className="text-sm font-semibold text-gray-900">{s.rate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Status</p>
                  <span className={`inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full mt-0.5 ${s.statusColor}`}>
                    {s.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Row: Yield Impact + Guidelines ── */}
      <div className="flex gap-4">
        {/* Expected Yield Impact */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Expected Yield Impact</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={yieldData}>
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

        {/* Application Guidelines */}
        <div className="w-[380px] bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Application Guidelines</h2>
          <div className="flex flex-col gap-3">
            {guidelines.map((g) => (
              <div key={g.title} className="bg-green-50 rounded-xl p-4 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Info size={13} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-800">{g.title}</p>
                  <p className="text-xs text-green-600 leading-relaxed">{g.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
