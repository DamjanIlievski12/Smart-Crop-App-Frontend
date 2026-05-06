import { Bell, LogOut, Search, MapPin, FileText } from "lucide-react";
import Sidebar from "./Sidebar";
import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../../context/auth/authContext";
import { useNavigate } from "react-router-dom";
import { apiGetFields } from "../../api/fieldsApi";
import type { FieldDTO } from "../../api/types/field";
import { apiGetReports } from "../../api/reportApi";
import { useGlobalSearch } from "../../hooks/useGlobalSearch";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps): React.ReactElement {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const {
    query,
    isOpen,
    fieldResults,
    reportResults,
    containerRef,
    handleInputChange,
    handleKeyDown,
    handleFocus,
    selectField,
    selectReport,
  } = useGlobalSearch();

  const handleLogout = (): void => {
    void logout().then(() => navigate("/login", { replace: true }));
  };

  // Derive initial for the avatar from user's full name
  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  const hasResults = fieldResults.length > 0 || reportResults.length > 0;

  return (
    <div className="flex min-h-screen bg-[#f5f6f4]">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0">
          {/* Search */}
          <div className="relative w-[420px]" ref={containerRef}>
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
            />
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              placeholder="Search fields, crops, reports..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#2e5d40] focus:ring-2 focus:ring-[#2e5d40]/10 transition-colors placeholder:text-gray-400"
            />

            {isOpen && hasResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg z-50 overflow-hidden">
                {fieldResults.length > 0 && (
                  <div>
                    <p className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                      Fields
                    </p>
                    {fieldResults.map((f) => (
                      <button
                        key={f.id}
                        onClick={selectField}
                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
                      >
                        <MapPin
                          size={14}
                          className="text-[#2e5d40] flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {f.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {f.crop} · {f.location}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {reportResults.length > 0 && (
                  <div>
                    <p className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                      Reports
                    </p>
                    {reportResults.map((r) => (
                      <button
                        key={r.id}
                        onClick={selectReport}
                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
                      >
                        <FileText
                          size={14}
                          className="text-blue-500 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {r.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {r.type} · {r.field}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {user && (
              <span className="text-sm text-gray-600 font-medium hidden sm:block">
                {user.fullName}
              </span>
            )}

            {/* Notification bell */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell size={18} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Avatar with initials */}
            <div
              className="w-9 h-9 rounded-full bg-[#2e5d40] flex items-center justify-center cursor-default select-none"
              title={user?.fullName ?? ""}
            >
              <span className="text-white text-xs font-semibold">
                {initials}
              </span>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-red-600"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
