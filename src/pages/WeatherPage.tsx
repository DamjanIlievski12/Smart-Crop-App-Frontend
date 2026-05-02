import AppLayout from '../components/layout/AppLayout';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import {
  Sun, Cloud, CloudRain, Droplets, Wind, Eye, Gauge,
  Thermometer, CloudDrizzle,
} from 'lucide-react';
import type {
  CurrentWeatherMetric, ForecastDay, TemperaturePoint,
  HumidityPoint, RainfallPoint, WeatherImpact,
} from '../api/types/weather';
import type React from 'react';

/* ── Data ─────────────────────────────────────────────── */
const currentMetrics: CurrentWeatherMetric[] = [
  { label: 'Humidity',   value: '65%',      icon: Droplets },
  { label: 'Wind Speed', value: '12 km/h',  icon: Wind     },
  { label: 'Visibility', value: '10 km',    icon: Eye      },
  { label: 'Pressure',   value: '1013 mb',  icon: Gauge    },
];

const forecast: ForecastDay[] = [
  { day: 'Mon', date: 'Mar 24', icon: Sun,       temp: 26, humidity: 65, rainfall: 5  },
  { day: 'Tue', date: 'Mar 25', icon: Sun,       temp: 28, humidity: 60                },
  { day: 'Wed', date: 'Mar 26', icon: CloudRain, temp: 24, humidity: 75, rainfall: 12 },
  { day: 'Thu', date: 'Mar 27', icon: Cloud,     temp: 25, humidity: 70, rainfall: 8  },
  { day: 'Fri', date: 'Mar 28', icon: Sun,       temp: 27, humidity: 65, rainfall: 2  },
  { day: 'Sat', date: 'Mar 29', icon: Sun,       temp: 29, humidity: 58                },
  { day: 'Sun', date: 'Mar 30', icon: Sun,       temp: 28, humidity: 62                },
];

const temperatureData: TemperaturePoint[] = [
  { time: '00:00', temp: 17 },
  { time: '03:00', temp: 15 },
  { time: '06:00', temp: 16 },
  { time: '09:00', temp: 21 },
  { time: '12:00', temp: 25 },
  { time: '15:00', temp: 28 },
  { time: '18:00', temp: 26 },
  { time: '21:00', temp: 22 },
];

const humidityData: HumidityPoint[] = [
  { day: 'Mon', humidity: 65 },
  { day: 'Tue', humidity: 60 },
  { day: 'Wed', humidity: 75 },
  { day: 'Thu', humidity: 70 },
  { day: 'Fri', humidity: 65 },
  { day: 'Sat', humidity: 58 },
  { day: 'Sun', humidity: 62 },
];

const rainfallData: RainfallPoint[] = [
  { month: 'Jan', rainfall: 45 },
  { month: 'Feb', rainfall: 38 },
  { month: 'Mar', rainfall: 52 },
  { month: 'Apr', rainfall: 68 },
  { month: 'May', rainfall: 85 },
  { month: 'Jun', rainfall: 72 },
];

const impacts: WeatherImpact[] = [
  {
    label: 'Temperature',
    description: 'Current conditions are optimal for crop growth',
    level: 'Excellent',
    percent: 92,
    icon: Thermometer,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    barColor: 'bg-green-500',
    levelColor: 'text-green-600',
  },
  {
    label: 'Moisture',
    description: 'Soil moisture levels need monitoring',
    level: 'Good',
    percent: 75,
    icon: Droplets,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    barColor: 'bg-yellow-500',
    levelColor: 'text-yellow-600',
  },
  {
    label: 'Rainfall',
    description: 'Expected rain in 2 days - plan irrigation accordingly',
    level: 'Moderate',
    percent: 55,
    icon: CloudDrizzle,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    barColor: 'bg-blue-500',
    levelColor: 'text-blue-600',
  },
];

/* ── Page ──────────────────────────────────────────────── */
export default function WeatherPage(): React.ReactElement {
  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Weather Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time weather monitoring and forecasting for your fields</p>
      </div>

      {/* ── Current Weather Card ── */}
      <div className="rounded-2xl bg-gradient-to-r from-[#3b82f6] to-[#2563eb] p-6 mb-4 flex gap-6">
        {/* Left – current conditions */}
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-sm text-white/80 mb-3">Current Weather</p>
          <div className="flex items-center gap-5 mb-5">
            <Sun size={64} className="text-white" strokeWidth={1.5} />
            <div>
              <p className="text-5xl font-bold text-white leading-none">26°C</p>
              <p className="text-base text-white/90 mt-2">Partly Cloudy</p>
            </div>
          </div>
          <p className="text-sm text-white font-medium">Northern Valley, CA</p>
          <p className="text-xs text-white/70 mt-1">Last updated: 2 minutes ago</p>
        </div>

        {/* Right – metrics 2x2 */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {currentMetrics.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white/15 backdrop-blur-sm rounded-xl p-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <Icon size={15} className="text-white/90" />
                <p className="text-sm text-white/90">{label}</p>
              </div>
              <p className="text-2xl font-bold text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 7-Day Forecast ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-4">7-Day Forecast</h2>
        <div className="grid grid-cols-7 gap-3">
          {forecast.map(({ day, date, icon: Icon, temp, humidity, rainfall }, idx) => {
            const selected = idx === 0;
            return (
              <div
                key={day}
                className={`rounded-xl p-4 flex flex-col items-center text-center transition-colors ${
                  selected ? 'bg-[#2e5d40] text-white' : 'bg-[#ece8e1] text-gray-900'
                }`}
              >
                <p className={`text-sm font-semibold ${selected ? 'text-white' : 'text-gray-900'}`}>{day}</p>
                <p className={`text-xs mb-3 ${selected ? 'text-white/70' : 'text-gray-500'}`}>{date}</p>
                <Icon
                  size={32}
                  strokeWidth={1.5}
                  className={selected ? 'text-white' : 'text-gray-700'}
                />
                <p className={`text-2xl font-bold mt-3 ${selected ? 'text-white' : 'text-gray-900'}`}>{temp}°</p>
                <div className={`flex items-center gap-1 text-xs mt-2 ${selected ? 'text-white/80' : 'text-gray-500'}`}>
                  <Droplets size={11} />
                  <span>{humidity}%</span>
                </div>
                {rainfall !== undefined && (
                  <div className={`flex items-center gap-1 text-xs mt-1 ${selected ? 'text-white/80' : 'text-gray-500'}`}>
                    <CloudRain size={11} />
                    <span>{rainfall}mm</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Row: Temperature + Humidity Trends ── */}
      <div className="flex gap-4 mb-4">
        {/* Temperature Trend */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4">
            <Thermometer size={15} className="text-orange-500" />
            Temperature Trend (24h)
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={temperatureData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fb923c" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#fb923c" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[0, 28]} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 12 }}
              />
              <Area type="monotone" dataKey="temp" stroke="#fb923c" strokeWidth={2} fill="url(#tempGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Humidity Trend */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4">
            <Droplets size={15} className="text-cyan-500" />
            Humidity Trend (7 days)
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={humidityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[0, 80]} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 12 }}
              />
              <Line type="monotone" dataKey="humidity" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4, fill: '#06b6d4' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Rainfall Analysis ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4">
          <CloudRain size={15} className="text-blue-500" />
          Rainfall Analysis (6 months)
        </h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={rainfallData} barSize={48} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 12 }}
              cursor={{ fill: '#f3f4f6' }}
            />
            <Bar dataKey="rainfall" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Weather Impact on Crops ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Weather Impact on Crops</h2>
        <div className="grid grid-cols-3 gap-4">
          {impacts.map(({ label, description, level, percent, icon: Icon, iconBg, iconColor, barColor, levelColor }) => (
            <div key={label} className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>
                  <Icon size={16} className={iconColor} />
                </div>
                <p className="text-sm font-semibold text-gray-900">{label}</p>
              </div>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">{description}</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${barColor}`} style={{ width: `${percent}%` }} />
                </div>
                <span className={`text-xs font-medium ${levelColor}`}>{level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
