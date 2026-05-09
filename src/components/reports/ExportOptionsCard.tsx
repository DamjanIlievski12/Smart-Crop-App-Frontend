import type { ExportOption } from "../../api/types/report";
import type React from "react";

interface ExportOptionsCardProps {
  options: ExportOption[];
}

export default function ExportOptionsCard({
  options,
}: ExportOptionsCardProps): React.ReactElement {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Export Options
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {options.map(
          ({
            title,
            description,
            buttonLabel,
            primary,
            icon: Icon,
            iconBg,
            iconColor,
            onAction,
          }) => (
            <div
              key={title}
              className="border border-gray-100 rounded-xl p-5 flex flex-col"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${iconBg}`}
              >
                <Icon size={20} className={iconColor} />
              </div>
              <p className="text-base font-semibold text-gray-900 mb-1">
                {title}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">
                {description}
              </p>
              <button
                onClick={onAction}
                disabled={!onAction}
                className={
                  primary
                    ? "w-full bg-[#2e5d40] hover:bg-[#264c34] text-white text-sm font-medium py-2.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    : "w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                }
              >
                {buttonLabel}
              </button>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
