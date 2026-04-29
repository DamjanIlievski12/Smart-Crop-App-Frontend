import AppLayout from '../components/layout/AppLayout';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, MapPin, TrendingUp } from 'lucide-react';
import type { Field } from '../types/field';
import type { StatCard } from '../types/ui';
import type { ChangeEvent, MouseEvent } from 'react';

const initialFields: Field[] = [
  { id: 1, name: 'North Field',    crop: 'Wheat',   location: 'Northern Valley, CA', size: '15 acres', status: 'Healthy',    soilType: 'Loamy',      lastAnalysis: '2 days ago',  health: 94, risk: 'Low' },
  { id: 2, name: 'South Valley',   crop: 'Tomato',  location: 'South Ridge, CA',     size: '8 acres',  status: 'Good',       soilType: 'Clay',       lastAnalysis: '1 week ago',  health: 87, risk: 'Medium' },
  { id: 3, name: 'East Garden',    crop: 'Pepper',  location: 'East Hills, CA',      size: '5 acres',  status: 'Excellent',  soilType: 'Sandy Loam', lastAnalysis: '1 day ago',   health: 96, risk: 'Low' },
  { id: 4, name: 'West Orchard',   crop: 'Corn',    location: 'West Plains, CA',     size: '20 acres', status: 'Good',       soilType: 'Loamy',      lastAnalysis: '3 days ago',  health: 89, risk: 'Low' },
  { id: 5, name: 'Central Farm',   crop: 'Rice',    location: 'Central Valley, CA',  size: '12 acres', status: 'Monitoring', soilType: 'Clay',       lastAnalysis: '5 days ago',  health: 82, risk: 'Medium' },
  { id: 6, name: 'Hilltop Field',  crop: 'Soybean', location: 'Highland Ridge, CA',  size: '10 acres', status: 'Healthy',    soilType: 'Sandy',      lastAnalysis: '2 days ago',  health: 91, risk: 'Low' },
];

const allCrops: string[] = ['All Crops', 'Wheat', 'Tomato', 'Pepper', 'Corn', 'Rice', 'Soybean'];
const allStatuses: string[] = ['All Status', 'Healthy', 'Good', 'Excellent', 'Monitoring'];

const inputStyle: React.CSSProperties = {
  background: 'white',
  borderColor: 'var(--color-border)',
  color: 'var(--color-text-primary)',
};

export default function FieldsPage(): React.ReactElement {
  const [search, setSearch] = useState<string>('');
  const [cropFilter, setCropFilter] = useState<string>('All Crops');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const filtered: Field[] = initialFields.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
                        f.location.toLowerCase().includes(search.toLowerCase());
    const matchCrop   = cropFilter === 'All Crops'   || f.crop === cropFilter;
    const matchStatus = statusFilter === 'All Status' || f.status === statusFilter;
    return matchSearch && matchCrop && matchStatus;
  });

  const totalAcres: number = initialFields.reduce((sum, f) => sum + parseInt(f.size), 10);
  const avgHealth: number = Math.round(initialFields.reduce((sum, f) => sum + f.health, 0) / initialFields.length);
  const alerts: number = initialFields.filter(f => f.risk === 'Medium').length;

  const stats: StatCard[] = [
    { label: 'Total Fields', value: initialFields.length, color: 'text-gray-900' },
    { label: 'Total Area',   value: `${totalAcres} acres`, color: 'text-gray-900' },
    { label: 'Avg Health',   value: `${avgHealth}%`,       color: 'text-green-600' },
    { label: 'Active Alerts',value: alerts,                 color: 'text-orange-500' },
  ];

  const handleLinkMouseOver = (e: MouseEvent<HTMLElement>): void => {
    e.currentTarget.style.background = 'var(--color-primary-hover)';
  };

  const handleLinkMouseOut = (e: MouseEvent<HTMLElement>): void => {
    e.currentTarget.style.background = 'var(--color-primary)';
  };

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex items-center justify-between my-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Field Management</h1>
          <p className="text-sm text-gray-500">Manage and monitor all your agricultural fields</p>
        </div>
        <Link
          to="/fields/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors"
          style={{ background: 'var(--color-primary)' }}
          onMouseOver={handleLinkMouseOver}
          onMouseOut={handleLinkMouseOut}
        >
          <Plus className="w-4 h-4" />
          Add New Field
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="bg-white border rounded-xl p-5" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4 flex-wrap my-5">
        <div className="relative flex-1 min-w-md max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search fields..."
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border outline-none"
            style={inputStyle}
          />
        </div>
        <select
          value={cropFilter}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setCropFilter(e.target.value)}
          className="px-4 py-3 text-sm rounded-lg border outline-none"
          style={inputStyle}
        >
          {allCrops.map(c => <option key={c}>{c}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
          className="px-4 py-3 text-sm rounded-lg border outline-none"
          style={inputStyle}
        >
          {allStatuses.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Fields Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <MapPin className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No fields match your search.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
          {filtered.map(field => (
            <div
              key={field.id}
              className="bg-white border rounded-xl p-5 hover:shadow-md transition-all"
              style={{ borderColor: 'var(--color-border)' }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(46,93,64,0.08)' }}
                >
                  <MapPin className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    field.risk === 'Low'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-yellow-50 text-yellow-700'
                  }`}
                >
                  {field.risk} Risk
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-0.5">{field.name}</h3>
              <p className="text-xs text-gray-400 mb-4">{field.location}</p>

              {/* Details */}
              <div className="space-y-2 mb-4">
                {(
                  [
                    { label: 'Crop Type', value: field.crop },
                    { label: 'Field Size', value: field.size },
                    { label: 'Soil Type', value: field.soilType },
                  ] as { label: string; value: string }[]
                ).map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-400">{label}</span>
                    <span className="font-medium text-gray-800">{value}</span>
                  </div>
                ))}
              </div>

              {/* Health bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-400">Health Score</span>
                  <span className="font-medium text-gray-800">{field.health}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      field.health >= 90 ? 'bg-green-500' :
                      field.health >= 80 ? 'bg-yellow-400' : 'bg-orange-400'
                    }`}
                    style={{ width: `${field.health}%` }}
                  />
                </div>
              </div>

              {/* Last analysis */}
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Last analysis: {field.lastAnalysis}</span>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/crop-analysis"
                  className="py-2 text-center text-sm font-medium rounded-lg text-white transition-colors"
                  style={{ background: 'var(--color-primary)' }}
                  onMouseOver={handleLinkMouseOver}
                  onMouseOut={handleLinkMouseOut}
                >
                  Analyze
                </Link>
                <button
                  className="py-2 text-sm font-medium rounded-lg border transition-colors hover:bg-gray-50"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}