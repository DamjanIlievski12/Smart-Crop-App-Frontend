import type React from "react";
import type { AddFieldForm } from "../../api/types/field";
import {
  FieldWrapper,
  focusStyle,
  Input,
  inputStyle,
  Section,
  Select,
} from "./FormPrimitives";

const cropOptions = [
  "Wheat",
  "Corn",
  "Rice",
  "Tomato",
  "Pepper",
  "Cucumber",
  "Lettuce",
  "Carrot",
  "Potato",
  "Soybean",
  "Cotton",
  "Barley",
];

interface Props {
  form: AddFieldForm;
  set: <K extends keyof AddFieldForm>(
    key: K,
  ) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onUnitChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function BasicInfoSection({
  form,
  set,
  onUnitChange,
}: Props): React.ReactElement {
  return (
    <Section title="Basic Information">
      <FieldWrapper label="Field Name" required>
        <Input
          placeholder="e.g., North Field"
          value={form.name}
          onChange={set("name")}
          required
        />
      </FieldWrapper>
      <FieldWrapper label="Field Size" required>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="e.g., 2.5"
            value={form.size}
            onChange={set("size")}
            required
            min="0"
            step="any"
            className="flex-1 px-4 py-3 text-sm rounded-lg border outline-none transition-all"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
          <Select
            value={form.unit}
            onChange={onUnitChange}
            style={{ ...inputStyle, width: "auto" }}
          >
            <option value="hectares">ha</option>
            <option value="acres">acres</option>
          </Select>
        </div>
      </FieldWrapper>

      <FieldWrapper label="Crop Type" required>
        <Select value={form.crop_type} onChange={set("crop_type")} required>
          <option value="">Select crop type</option>
          {cropOptions.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
      </FieldWrapper>

      <FieldWrapper label="Planting Date">
        <Input
          type="date"
          value={form.plantingDate}
          onChange={set("plantingDate")}
        />
      </FieldWrapper>
    </Section>
  );
}
