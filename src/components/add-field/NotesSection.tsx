import type { AddFieldForm } from "../../api/types/field";
import type React from "react";
import { FieldWrapper, focusStyle, inputStyle } from "./FormPrimitives";

interface Props {
  form: AddFieldForm;
  set: <K extends keyof AddFieldForm>(
    key: K,
  ) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
}

export default function NotesSection({ form, set }: Props): React.ReactElement {
  return (
    <div
      className="bg-white border rounded-xl p-6"
      style={{ borderColor: "var(--color-border)" }}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-5">
        Additional Notes
      </h2>
      <FieldWrapper label="Notes (Optional)">
        <textarea
          rows={4}
          placeholder="Add any additional information about this field..."
          value={form.notes}
          onChange={set("notes")}
          className="w-full px-4 py-3 text-sm rounded-lg border outline-none transition-all resize-none"
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, focusStyle)}
          onBlur={(e) => Object.assign(e.target.style, inputStyle)}
        />
      </FieldWrapper>
    </div>
  );
}
