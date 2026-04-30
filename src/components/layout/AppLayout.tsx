import { Bell, Search, User } from 'lucide-react';
import Sidebar from './Sidebar';
import type React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps): React.ReactElement {
  return (
    <div className="flex min-h-screen bg-[#f5f6f4]">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0">
          {/* Search */}
          <div className="relative w-[420px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search fields, crops, reports..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#2e5d40] focus:ring-2 focus:ring-[#2e5d40]/10 transition-colors placeholder:text-gray-400"
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell size={18} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-[#2e5d40] flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
