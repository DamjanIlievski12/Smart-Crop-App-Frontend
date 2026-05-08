import { ArrowRight, MapPin, Plus } from "lucide-react";
import type React from "react";
import { Link } from "react-router-dom";

export default function NoFieldsPrompt(): React.ReactElement {
  return (
    <div className="bg-white border-2 border-dashed border-[#2e5d40]/25 rounded-2xl p-10 flex flex-col items-center text-center gap-5">
      {/* Illustration */}
      <div className="w-16 h-16 rounded-full bg-[#2e5d40]/8 flex items-center justify-center">
        <MapPin className="w-8 h-8 text-[#2e5d40]" />
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Add your first field
        </h2>
        <p className="text-sm text-gray-500 max-w-sm">
          Get started by adding a field. Smart Crop will then give you
          AI-powered recommendations, weather insights, and disease risk
          analysis.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/fields/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#2e5d40] text-white rounded-lg text-sm font-medium hover:bg-[#245033] transition-colors"
        >
          <Plus size={16} />
          Add Field
        </Link>
        <Link
          to="/fields"
          className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          View Fields
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
