import type React from "react";
import useDashboard from "../hooks/useDashboard";
import AppLayout from "../components/layout/AppLayout";
import DashboardWelcome from "../components/dashboard/DashboardWelcome";
import { AlertCircle, Loader2 } from "lucide-react";
import NoFieldsPrompt from "../components/dashboard/NoFieldsPrompt";
import DashboardAlertBanner from "../components/dashboard/DashboardAlertBanner";
import DashboardStatsBar from "../components/dashboard/DashboardStatsBar";
import WeatherSummaryCards from "../components/dashboard/WeatherSummaryCards";
import QuickActionsCard from "../components/dashboard/QuickActionsCard";
import ActiveFieldsSection from "../components/dashboard/ActiveFieldsSection";
import RecentReportsCard from "../components/dashboard/RecentReportsCard";

export default function DashboardPage(): React.ReactElement {
  const {
    fields,
    recentFields,
    stats,
    weather,
    recentReports,
    isLoadingFields,
    isLoadingWeather,
    isLoadingReports,
    errorFields,
    refresh,
  } = useDashboard();

  const hasFields = !isLoadingFields && fields.length > 0;
  const noFields = !isLoadingFields && !errorFields && fields.length === 0;

  return (
    <AppLayout>
      <div className="space-y-6 max-w-7xl">
        {/* Welcome */}
        <div className="flex items-start justify-between">
          <DashboardWelcome />
          {!isLoadingFields && (
            <button
              onClick={refresh}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors mt-1"
            >
              Refresh
            </button>
          )}
        </div>

        {/* Error */}
        {errorFields && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorFields}</span>
            <button
              onClick={refresh}
              className="underline ml-auto hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading skeleton for initial load */}
        {isLoadingFields && !errorFields && (
          <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        )}

        {/* No fields empty state */}
        {noFields && <NoFieldsPrompt />}

        {/* Main content — shown once fields load (even with 0 for weather etc) */}
        {!isLoadingFields && !errorFields && (
          <>
            {/* Alert banner */}
            {hasFields && <DashboardAlertBanner stats={stats} />}

            {/* Stats bar */}
            {hasFields && <DashboardStatsBar stats={stats} isLoading={false} />}

            {/* Weather cards */}
            <WeatherSummaryCards
              weather={weather}
              isLoading={isLoadingWeather}
            />

            {/* Main grid: quick actions */}
            {hasFields && (
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Quick actions */}
                <QuickActionsCard />
              </div>
            )}

            {/* If no fields, still show quick actions */}
            {!hasFields && (
              <div className="flex justify-end">
                <div className="w-full lg:w-64">
                  <QuickActionsCard />
                </div>
              </div>
            )}

            {/* Bottom grid: active fields + recent reports */}
            {hasFields && (
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Active fields: 2/3 */}
                <div className="lg:col-span-2">
                  <ActiveFieldsSection
                    fields={recentFields}
                    isLoading={isLoadingFields}
                  />
                </div>

                {/* Recent reports: 1/3 */}
                <RecentReportsCard
                  reports={recentReports}
                  isLoading={isLoadingReports}
                />
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}
