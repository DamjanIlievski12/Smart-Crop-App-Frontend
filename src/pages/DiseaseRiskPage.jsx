import AppLayout from '../components/layout/AppLayout';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import { TrendingDown, TriangleAlert, CheckCircle2 } from 'lucide-react';

/* ── Data ─────────────────────────────────────────────── */
const riskMetrics = [
  { label: 'Fungal Risk',   value: 15 },
  { label: 'Viral Risk',    value: 22 },
  { label: 'Bacterial Risk',value: 12 },
  { label: 'Soil Risk',     value: 8  },
];

const trendData = [
  { month: 'Jan', risk: 28 },
  { month: 'Feb', risk: 22 },
  { month: 'Mar', risk: 30 },
  { month: 'Apr', risk: 25 },
  { month: 'May', risk: 20 },
  { month: 'Jun', risk: 18 },
];

const vulnerabilityData = [
  { factor: 'Temperature',   value: 65 },
  { factor: 'Humidity',      value: 72 },
  { factor: 'Rainfall',      value: 48 },
  { factor: 'Soil Moisture', value: 55 },
  { factor: 'Wind',          value: 30 },
];

const diseaseAlerts = [
  {
    name: 'Early Blight',
    probability: 35,
    severity: 'Medium',
    symptoms: 'Brown spots with concentric rings on leaves',
    prevention: 'Apply fungicide, improve air circulation',
    barColor: '#f97316',
  },
  {
    name: 'Powdery Mildew',
    probability: 20,
    severity: 'Low',
    symptoms: 'White powdery coating on leaves and stems',
    prevention: 'Reduce humidity, apply sulfur-based fungicide',
    barColor: '#eab308',
  },
  {
    name: 'Leaf Spot',
    probability: 15,
    severity: 'Low',
    symptoms: 'Small dark spots on leaves',
    prevention: 'Remove affected leaves, ensure proper spacing',
    barColor: '#eab308',
  },
];

const recommendations = [
  { title: 'Crop Rotation',   description: 'Rotate with non-solanaceous crops to break disease cycles',   badge: 'Recommended' },
  { title: 'Proper Spacing',  description: 'Maintain 18-24 inch spacing for better air circulation',       badge: 'Active' },
  { title: 'Mulching',        description: 'Apply organic mulch to prevent soil splash',                   badge: 'Recommended' },
  { title: 'Early Detection', description: 'Regular monitoring and quick removal of infected plants',      badge: 'Active' },
];

/* ── Helpers ───────────────────────────────────────────── */
function SeverityBadge({ level }) {
  const styles = {
    Medium: 'bg-orange-100 text-orange-600',
    Low:    'bg-yellow-100 text-yellow-600',
    High:   'bg-red-100 text-red-600',
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${styles[level] ?? styles.Low}`}>
      {level}
    </span>
  );
}

function RecommendationBadge({ type }) {
  return type === 'Active'
    ? <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-700">Active</span>
    : <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-600">Recommended</span>;
}

/* ── Page ──────────────────────────────────────────────── */
export default function DiseaseRiskPage() {
  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Disease Risk Prediction</h1>
        <p className="text-sm text-gray-500 mt-1">AI powered disease detection and prevention recommendations</p>
      </div>

      {/* ── Row 1: Overall risk + metrics (single card) ── */}
      <div className="rounded-2xl p-6 mb-4 bg-gradient-to-r from-[#1ea34c] to-[#2ecc71] flex gap-6">
        {/* Left – overall assessment */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-white/20 px-3 py-1 rounded-full">
              <CheckCircle2 size={12} /> Overall Risk Assessment
            </span>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-bold text-white">18%</span>
            <span className="flex items-center gap-1 text-sm text-white/80 font-medium mb-1">
              <TrendingDown size={15} /> -5% from last month
            </span>
          </div>
          <p className="text-sm text-white/70 mt-2">
            Low risk level. Your crops are in good health with minimal disease threat.
          </p>
        </div>

        {/* Right – 4 risk metrics inside the card */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {riskMetrics.map(({ label, value }) => (
            <div key={label} className="bg-white/15 backdrop-blur-sm rounded-xl p-5 flex flex-col justify-center">
              <p className="text-sm text-white/80 mb-1">{label}</p>
              <p className="text-3xl font-bold text-white">{value}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Row 2: Charts ── */}
      <div className="flex gap-4 mb-4">
        {/* Risk Trend */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Risk Trend (6 Months)</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={trendData} barSize={28}>
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

        {/* Vulnerability Factors */}
        <div className="w-[320px] bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">Vulnerability Factors</h2>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={vulnerabilityData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="factor" tick={{ fontSize: 10, fill: '#6b7280' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="value" stroke="#2e5d40" fill="#2e5d40" fillOpacity={0.25} strokeWidth={1.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Row 3: Disease Alerts ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-4">
          <TriangleAlert size={18} className="text-orange-500" />
          Possible Disease Alerts
        </h2>
        <div className="flex flex-col gap-4">
          {diseaseAlerts.map((disease) => (
            <div key={disease.name} className="border border-gray-100 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center text-base flex-shrink-0">
                    🌿
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{disease.name}</p>
                    <p className="text-xs text-gray-400">Probability: {disease.probability}%</p>
                  </div>
                </div>
                <SeverityBadge level={disease.severity} />
              </div>

              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Symptoms</p>
                  <p className="text-sm text-gray-700">{disease.symptoms}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Prevention</p>
                  <p className="text-sm text-gray-700">{disease.prevention}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                  <span>Risk Level</span>
                  <span>{disease.probability}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${disease.probability}%`, backgroundColor: disease.barColor }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Row 4: Prevention Recommendations ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-4">
          <CheckCircle2 size={18} className="text-[#2e5d40]" />
          Prevention Recommendations
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.title} className="border border-gray-100 rounded-xl p-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">{rec.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{rec.description}</p>
              </div>
              <div className="flex-shrink-0">
                <RecommendationBadge type={rec.badge} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
