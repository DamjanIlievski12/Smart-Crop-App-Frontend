import { createContext, useContext } from "react";

export interface FieldAnalysisResult {
  fieldId: number;
  healthScore: number;
  riskLevel: "Low" | "Medium" | "High";
  lastAnalyzed: string; // ISO timestamp
}

export interface AnalysisResultsContextValue {
  results: Record<number, FieldAnalysisResult>;
  saveResult: (result: FieldAnalysisResult) => void;
}

export const AnalysisResultsContext =
  createContext<AnalysisResultsContextValue | null>(null);

export function useAnalysisResults(): AnalysisResultsContextValue {
  const ctx = useContext(AnalysisResultsContext);
  if (!ctx) {
    throw new Error(
      "useAnalysisResults must be used inside <AnalysisResultsProvider>",
    );
  }
  return ctx;
}
