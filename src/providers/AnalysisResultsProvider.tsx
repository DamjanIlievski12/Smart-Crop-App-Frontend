import { useCallback, useState, type ReactNode } from "react";
import {
  AnalysisResultsContext,
  type FieldAnalysisResult,
} from "../context/analysis/analysisResultsContexts";

interface Props {
  children: ReactNode;
}

export default function AnalysisResultsProvider({
  children,
}: Props): React.ReactElement {
  const [results, setResults] = useState<Record<number, FieldAnalysisResult>>(
    {},
  );

  const saveResult = useCallback((result: FieldAnalysisResult) => {
    setResults((prev) => ({
      ...prev,
      [result.fieldId]: result,
    }));
  }, []);

  return (
    <AnalysisResultsContext.Provider value={{ results, saveResult }}>
      {children}
    </AnalysisResultsContext.Provider>
  );
}
