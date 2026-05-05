import { useState, useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';
import {
  RadialBarChart, RadialBar, ResponsiveContainer
} from 'recharts';
import {
  TrendingUp, Droplets, ThermometerSun, AlertTriangle,
  CheckCircle2, Sparkles, Calendar, MapPin, ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import type { Priority, Recommendation, RecommendationType } from '../api/types/analysis';
import { apiGetFields } from '../api/fieldsApi';
import type { FieldDTO } from '../api/types/field';
import axiosInstance from '../axios/axios';
import type React from 'react';

/* ── Helpers ──────────────────────────────────────────── */

function colorToStatus(value: number): { status: string; statusBadge: string } {
  if (value >= 80) return { status: 'Optimal', statusBadge: 'bg-emerald-100 text-emerald-700' };
  if (value >= 60) return { status: 'Good', statusBadge: 'bg-green-100 text-green-700' };
  if (value >= 40) return { status: 'Moderate', statusBadge: 'bg-yellow-100 text-yellow-700' };
  return { status: 'Low', statusBadge: 'bg-blue-100 text-blue-700' };
}

function riskLevel(pct: number): { level: string; bar: string } {
  if (pct >= 60) return { level: 'High', bar: 'bg-red-500' };
  if (pct >= 30) return { level: 'Medium', bar: 'bg-yellow-500' };
  return { level: 'Low', bar: 'bg-green-500' };
}

function deriveHealthLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 50) return 'Moderate';
  return 'Poor';
}

/* ── Types ────────────────────────────────────────────── */

interface Condition {
  label: string;
  value: number;
  status: string;
  statusBadge: string;
  bg: string;
  iconBg: string;
  Icon: LucideIcon;
  iconColor: string;
}

interface DiseaseRisk {
  label: string;
  level: string;
  pct: number;
  bar: string;
}

interface AnalysisData {
  healthScore: number;
  healthLabel: string;
  conditions: Condition[];
  diseaseRisks: DiseaseRisk[];
  recommendations: Recommendation[];
}

/* ── Icon map for conditions ──────────────────────────── */

const conditionIconMap: Record<string, { bg: string; iconBg: string; Icon: LucideIcon; iconColor: string }> = {
  Temperature: { bg: 'bg-blue-50', iconBg: 'bg-blue-500/10', Icon: ThermometerSun, iconColor: 'text-blue-500' },
  Humidity:    { bg: 'bg-cyan-50',  iconBg: 'bg-cyan-500/10',  Icon: Droplets,      iconColor: 'text-cyan-500' },
  Rainfall:    { bg: 'bg-indigo-50',iconBg: 'bg-indigo-500/10',Icon: Droplets,      iconColor: 'text-indigo-500' },
};

const defaultConditionStyle = {
  bg: 'bg-gray-50', iconBg: 'bg-gray-500/10', Icon: ThermometerSun, iconColor: 'text-gray-500',
};

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
  const [fields, setFields] = useState<FieldDTO[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load fields on mount
  useEffect(() => {
    async function loadFields() {
      try {
        const res = await apiGetFields();
        const loaded = res.fields ?? [];
        setFields(loaded);
        if (loaded[0]) setSelectedFieldId(loaded[0].id);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load fields.');
        setIsLoading(false);
      }
    }
    void loadFields();
  }, []);

  // Trigger analysis when selected field changes or refresh requested
  useEffect(() => {
    if (selectedFieldId === null) return;

    async function analyze() {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await axiosInstance.post('/crop-analysis/analyze', { field_id: selectedFieldId });

        const healthScore: number = data.healthData?.[0]?.value ?? 0;
        const healthLabel = deriveHealthLabel(healthScore);

        const conditions: Condition[] = (data.conditions ?? []).map(
          (c: { label: string; value: string; color?: string }) => {
            const numericValue = parseFloat(c.value);
            const style = conditionIconMap[c.label] ?? defaultConditionStyle;
            const { status, statusBadge } = colorToStatus(isNaN(numericValue) ? 0 : numericValue);
            return { label: c.label, value: c.value, status, statusBadge, ...style };
          },
        );

        const diseaseRisks: DiseaseRisk[] = (data.diseaseRisks ?? data.disease_risks ?? []).map(
          (d: { name?: string; label?: string; risk?: number; pct?: number }) => {
            const label = d.name ?? d.label ?? '';
            const pct = d.risk ?? d.pct ?? 0;
            const { level, bar } = riskLevel(pct);
            return { label, pct, level, bar };
          },
        );

        const recommendations: Recommendation[] = data.recommendations ?? [];

        setAnalysis({ healthScore, healthLabel, conditions, diseaseRisks, recommendations });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to run crop analysis.');
      } finally {
        setIsLoading(false);
      }
    }
    void analyze();
  }, [selectedFieldId, refreshTick]);

  const selectedField = fields.find((f) => f.id === selectedFieldId);
  const radialData = [{ name: 'Health', value: analysis?.healthScore ?? 0, fill: '#2e5d40' }];

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
          <div>
            <p className="text-xs text-gray-400 mb-2">Select Field</p>
            <div className="relative">
              <select
                className="w-full appearance-none text-sm font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pr-9 outline-none focus:border-[#2e5d40] focus:ring-2 focus:ring-[#2e5d40]/10 transition-colors cursor-pointer"
                value={selectedFieldId ?? ''}
                onChange={(e) => setSelectedFieldId(Number(e.target.value))}
              >
                {fields.map((f) => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-2">Crop Type</p>
            <div className="text-sm font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
              {selectedField?.crop ?? '—'}
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-2">Location</p>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
              <MapPin size={13} className="text-gray-400 flex-shrink-0" />
              {selectedField?.location ?? '—'}
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-2">Last Updated</p>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
              <Calendar size={13} className="text-gray-400 flex-shrink-0" />
              {selectedField?.lastAnalysis ?? '—'}
            </div>
          </div>
        </div>
      </div>

      {/* Loading / Error */}
      {isLoading && (
        <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
          Running analysis…
        </div>
      )}

      {error && !isLoading && (
        <div className="flex items-center justify-center py-10 text-red-500 text-sm">{error}</div>
      )}

      {/* ── Row 2: Health Score + Conditions + Disease Risk ── */}
      {analysis && !isLoading && (
        <>
          <div className="flex gap-4 mb-4">
            {/* Health Score */}
            <div className="w-[260px] flex-shrink-0 rounded-2xl bg-gradient-to-b from-[#2e5d40] to-[#1c3d28] p-6 flex flex-col items-center justify-center gap-4">
              <p className="text-sm font-medium text-white/70">Crop Health Score</p>
              <div className="relative w-36 h-36">
                <ResponsiveContainer width="100%" height={144}>
                  <RadialBarChart
                    cx="50%" cy="50%"
                    innerRadius="65%" outerRadius="100%"
                    data={radialData}
                    startAngle={90} endAngle={-270}
                  >
                    <RadialBar dataKey="value" cornerRadius={6} fill="#7cb342" background={{ fill: 'rgba(255,255,255,0.1)' }} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-white">{analysis.healthScore}%</span>
                  <span className="text-xs text-white/60 mt-0.5">{analysis.healthLabel}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-[#7cb342]">
                <CheckCircle2 size={15} />
                {analysis.healthLabel}
              </div>
            </div>

            {/* Current Conditions */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Current Conditions</h2>
              <div className="flex flex-col gap-3">
                {analysis.conditions.map(({ label, value, status, statusBadge, bg, iconBg, Icon, iconColor }) => (
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
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge}`}>{status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disease Risk */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Disease Risk</h2>
              <div className="flex flex-col gap-3">
                {analysis.diseaseRisks.map(({ label, level, pct, bar }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">{label}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${level === 'High' ? 'bg-red-100 text-red-600' : level === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>{level}</span>
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
              <button
                className="flex items-center gap-2 bg-[#2e5d40] hover:bg-[#245033] text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors active:scale-[0.98]"
                onClick={() => setRefreshTick((t) => t + 1)}
              >
                <Sparkles size={14} />
                Generate New Analysis
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {analysis.recommendations.map((rec, idx) => (
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
                          rec.priority === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
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
        </>
      )}
    </AppLayout>
  );
}
