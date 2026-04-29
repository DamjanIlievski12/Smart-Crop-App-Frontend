import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Activity,
  TriangleAlert,
  Sprout,
  Cloud,
  FileText,
  Settings,
  User,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard',     icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Fields',        icon: MapPin,           to: '/fields' },
  { label: 'Crop Analysis', icon: Activity,         to: '/crop-analysis' },
  { label: 'Disease Risk',  icon: TriangleAlert,    to: '/disease-risk' },
  { label: 'Fertilizer',    icon: Sprout,           to: '/fertilizer' },
  { label: 'Weather',       icon: Cloud,            to: '/weather' },
  { label: 'Reports',       icon: FileText,         to: '/reports' },
  { label: 'Settings',      icon: Settings,         to: '/settings' },
];

export default function Sidebar(): React.ReactElement {
  return (
    <aside className="w-[230px] h-screen bg-[#2e5d40] flex flex-col flex-shrink-0 sticky top-0">
      {/* Brand */}
      <div className="px-5 py-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 2C9 2 3 5 3 10C3 13.3 5.7 16 9 16C12.3 16 15 13.3 15 10C15 5 9 2 9 2Z"
              fill="white"
              fillOpacity="0.9"
            />
            <path
              d="M9 16V9M9 9C9 9 6 7 4.5 5"
              stroke="#2e5d40"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-white font-bold text-sm tracking-tight">Smart Crop</span>
          <span className="text-white/60 text-xs">Advisor</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 flex flex-col gap-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 ${
                isActive
                  ? 'bg-white/15 text-white font-medium'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon size={17} strokeWidth={1.75} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User profile */}
      <div className="px-4 py-4 border-t border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
          <User size={15} className="text-white/80" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-white text-xs font-medium">John Farmer</span>
          <span className="text-white/50 text-xs">Premium Plan</span>
        </div>
      </div>
    </aside>
  );
}
