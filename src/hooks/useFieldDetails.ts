import { useCallback, useEffect, useRef, useState } from "react";
import type {
  DeleteState,
  EditFieldForm,
  UseFieldDetailsReturn,
} from "../api/types/fieldDetails";
import type { Field, FieldPayload } from "../api/types/field";
import { apiDeleteField, apiGetField, apiUpdateField } from "../api/fieldsApi";
import {
  dtoToEditForm,
  dtoToField,
} from "../components/field-details/utils/fieldDetailsHelpers";
import { useNavigate } from "react-router-dom";
import { useAnalysisResults } from "../context/analysis/analysisResultsContexts";

const DELETE_COUNTDOWN = 10; // second before auto-delete

export function useFieldDetails(fieldId: number): UseFieldDetailsReturn {
  const navigate = useNavigate();
  const { results: analysisResults } = useAnalysisResults();

  const [rawField, setRawField] = useState<Field | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<EditFieldForm>({
    name: "",
    crop_type: "",
    location: "",
    size: "",
    size_unit: "hectares",
    soil_type: "",
    irrigations_type: "",
    planting_date: "",
    notes: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // Delete
  const [deleteState, setDeleteState] = useState<DeleteState>({
    phase: "idle",
  });
  const countdownRef = useRef<ReturnType<typeof setInterval>>(null);
  const secondRef = useRef(DELETE_COUNTDOWN);

  // Fetch
  const fetchField = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiGetField(fieldId);
      const mapped = dtoToField(response.field);
      setRawField(mapped);
      setEditForm(dtoToEditForm(response.field));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load field.");
    } finally {
      setIsLoading(false);
    }
  }, [fieldId]);

  useEffect(() => {
    void fetchField();
  }, [fetchField]);

  // Cleanup countdown on unmount
  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  // Edit handlers
  const openEdit = useCallback(() => {
    if (rawField) {
      setEditForm(dtoToEditForm(rawField._raw));
    }
    setUpdateError(null);
    setIsEditOpen(true);
  }, [rawField]);

  const closeEdit = useCallback(() => {
    setIsEditOpen(false);
  }, []);

  const setEditField = useCallback(
    <K extends keyof EditFieldForm>(key: K, value: EditFieldForm[K]) => {
      setEditForm((f) => ({ ...f, [key]: value }));
    },
    [],
  );

  const submitEdit = useCallback(
    async (e: React.SubmitEvent) => {
      e.preventDefault();
      setIsUpdating(true);
      setUpdateError(null);

      try {
        const sizeNum = parseFloat(editForm.size);
        if (isNaN(sizeNum) || sizeNum <= 0) {
          setUpdateError("Size must be a positive number.");
          return;
        }

        const payload: Partial<FieldPayload> = {
          name: editForm.name.trim(),
          crop_type: editForm.crop_type.trim(),
          size: sizeNum,
          size_unit: editForm.size_unit,
        };

        if (editForm.location.trim()) {
          payload.location = editForm.location.trim();
        }

        if (editForm.soil_type) {
          payload.soil_type = editForm.soil_type;
        }

        if (editForm.irrigations_type) {
          payload.irrigation_type = editForm.irrigations_type;
        }

        if (editForm.planting_date) {
          payload.planting_date = editForm.planting_date;
        }

        if (editForm.notes) {
          payload.notes = editForm.notes;
        }

        const response = await apiUpdateField(fieldId, payload);
        setRawField(dtoToField(response.field));
        setEditForm(dtoToEditForm(response.field));
        setIsEditOpen(false);
      } catch (err) {
        setUpdateError(
          err instanceof Error ? err.message : "Failed to update field.",
        );
      } finally {
        setIsUpdating(false);
      }
    },
    [fieldId, editForm],
  );

  // Delete handlers
  const stopCountdown = useCallback(() => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  }, []);

  const startCountdown = useCallback(() => {
    secondRef.current = DELETE_COUNTDOWN;
    setDeleteState({ phase: "confirming", secondsLeft: DELETE_COUNTDOWN });

    countdownRef.current = setInterval(() => {
      secondRef.current -= 1;
      if (secondRef.current <= 0) {
        stopCountdown();
        // Auto-confirm delete when countdown reaches 0
        setDeleteState({ phase: "deleting" });
        void apiDeleteField(fieldId)
          .then(() => navigate("/fields"))
          .catch(() => {
            setDeleteState({ phase: "idle" });
          });
      } else {
        setDeleteState({ phase: "confirming", secondsLeft: secondRef.current });
      }
    }, 1000);
  }, [fieldId, navigate, stopCountdown]);

  const openDeleteDialog = useCallback(() => {
    startCountdown();
  }, [startCountdown]);

  const cancelDelete = useCallback(() => {
    stopCountdown();
    setDeleteState({ phase: "idle" });
  }, [stopCountdown]);

  const confirmDelete = useCallback(async () => {
    stopCountdown();
    setDeleteState({ phase: "deleting" });
    try {
      await apiDeleteField(fieldId);
      navigate("/fields");
    } catch {
      setDeleteState({ phase: "idle" });
    }
  }, [fieldId, navigate, stopCountdown]);

  const undoDelete = useCallback(() => {
    stopCountdown();
    setDeleteState({ phase: "idle" });
  }, [stopCountdown]);

  // Merge cached analysis results into field data for real-time updates
  const field: Field | null = rawField
    ? (() => {
        const cached = analysisResults[rawField.id];
        if (!cached) return rawField;
        return {
          ...rawField,
          health: cached.healthScore,
          risk: cached.riskLevel,
          lastAnalysis: new Date(cached.lastAnalyzed).toLocaleDateString(
            "en-GB",
            { day: "2-digit", month: "short", year: "numeric" },
          ),
        };
      })()
    : null;

  return {
    field,
    isLoading,
    error,
    isEditOpen,
    editForm,
    isUpdating,
    updateError,
    openEdit,
    closeEdit,
    setEditField,
    submitEdit,
    deleteState,
    openDeleteDialog,
    cancelDelete,
    confirmDelete,
    undoDelete,
  };
}
