import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { ChangeEvent, KeyboardEvent, FocusEvent } from "react";
import { apiGetFields } from "../api/fieldsApi";
import { apiGetReports } from "../api/reportApi";
import type { FieldDTO } from "../api/types/field";

export interface SearchReportResult {
  id: number;
  name: string;
  type: string;
  field: string;
}

export interface UseGlobalSearchReturn {
  query: string;
  isOpen: boolean;
  fieldResults: FieldDTO[];
  reportResults: SearchReportResult[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleFocus: (e: FocusEvent<HTMLInputElement>) => void;
  selectField: () => void;
  selectReport: () => void;
}

export function useGlobalSearch(): UseGlobalSearchReturn {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [allFields, setAllFields] = useState<FieldDTO[]>([]);
  const [allReports, setAllReports] = useState<SearchReportResult[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [fieldResults, setFieldResults] = useState<FieldDTO[]>([]);
  const [reportResults, setReportResults] = useState<SearchReportResult[]>([]);

  const loadData = useCallback(async () => {
    if (dataLoaded) return;
    try {
      const [fieldsRes, reportRows] = await Promise.all([
        apiGetFields(),
        apiGetReports(),
      ]);
      setAllFields(fieldsRes.fields ?? []);
      setAllReports(
        reportRows.map((r) => ({
          id: r.id ?? 0,
          name: r.name,
          type: r.type,
          field: r.field,
        })),
      );
      setDataLoaded(true);
    } catch {
      // search won't show results - acceptable silent feature
    }
  }, [dataLoaded]);

  // Filter whenever query or cached data changes
  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setFieldResults([]);
      setReportResults([]);
      setIsOpen(false);
      return;
    }
    setFieldResults(
      allFields
        .filter(
          (f) =>
            f.name.toLowerCase().includes(trimmed) ||
            f.crop.toLowerCase().includes(trimmed) ||
            f.location.toLowerCase().includes(trimmed),
        )
        .slice(0, 5),
    );
    setReportResults(
      allReports
        .filter(
          (r) =>
            r.name.toLowerCase().includes(trimmed) ||
            r.type.toLowerCase().includes(trimmed) ||
            r.field.toLowerCase().includes(trimmed),
        )
        .slice(0, 5),
    );
  }, [query, allFields, allReports]);

  // Open/close dropdowns based on results
  useEffect(() => {
    setIsOpen(fieldResults.length > 0 || reportResults.length > 0);
  }, [fieldResults, reportResults]);

  // Close on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setQuery(val);
    if (val.trim() && !dataLoaded) void loadData();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
    }
  }

  function handleFocus(_e: FocusEvent<HTMLInputElement>) {
    if (query.trim()) {
      if (!dataLoaded) void loadData();
      if (fieldResults.length > 0 || reportResults.length > 0) setIsOpen(true);
    }
  }

  function selectField() {
    setIsOpen(false);
    setQuery("");
    navigate("/fields");
  }

  function selectReport() {
    setIsOpen(false);
    setQuery("");
    navigate("/reports");
  }

  return {
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
  };
}
