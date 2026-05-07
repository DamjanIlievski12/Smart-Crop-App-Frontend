import type { Field, SizeUnit } from "./field";

export interface EditFieldForm {
  name: string;
  crop_type: string;
  location: string;
  size: string;
  size_unit: SizeUnit;
  soil_type: string;
  irrigations_type: string;
  planting_date: string;
  notes: string;
}

// State machine for the delete flow
export type DeleteState =
  | { phase: "idle" }
  | { phase: "confirming"; secondsLeft: number }
  | { phase: "deleting" }
  | { phase: "undone" };

export interface UseFieldDetailsReturn {
  field: Field | null;
  isLoading: boolean;
  error: string | null;

  // Edit
  isEditOpen: boolean;
  editForm: EditFieldForm;
  isUpdating: boolean;
  updateError: string | null;
  openEdit: () => void;
  closeEdit: () => void;
  setEditField: <K extends keyof EditFieldForm>(
    key: K,
    value: EditFieldForm[K],
  ) => void;
  submitEdit: (e: React.SubmitEvent<HTMLFormElement>) => void;

  // Delete
  deleteState: DeleteState;
  openDeleteDialog: () => void;
  cancelDelete: () => void;
  confirmDelete: () => void;
  undoDelete: () => void;
}
