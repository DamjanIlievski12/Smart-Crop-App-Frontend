import type React from "react";
import type { AddFieldForm } from "../../api/types/field";
import { FieldWrapper, Section, Select } from "./FormPrimitives";

const soilOptions = [
  "Sandy",
  "Loamy",
  "Clay",
  "Sandy Loam",
  "Clay Loam",
  "Silty",
  "Peaty",
];
const irrigationOptions = [
  "Drip Irrigation",
  "Sprinkler System",
  "Surface Irrigation",
  "Subsurface Drip",
  "Rain-fed",
  "Manual",
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
}

export default function SoilIrrigationSection({
  form,
  set,
}: Props): React.ReactElement {
  return (
    <Section title="Soil & Irrigation">
      <FieldWrapper label="Soil Type">
        <Select value={form.soil_type} onChange={set("soil_type")}>
          <option value="">Select soil type</option>
          {soilOptions.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Select>
      </FieldWrapper>

      <FieldWrapper label="Irrigation Type">
        <Select value={form.irrigation_type} onChange={set("irrigation_type")}>
          <option value="">Select irrigation type</option>
          {irrigationOptions.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </Select>
      </FieldWrapper>
    </Section>
  );
}
