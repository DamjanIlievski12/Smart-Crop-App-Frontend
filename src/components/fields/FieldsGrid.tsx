import type React from "react";
import type { Field } from "../../api/types/field";
import { MapPin } from "lucide-react";
import FieldCard from "./FieldCard";

interface Props {
  fields: Field[];
}

export default function FieldsGrid({ fields }: Props): React.ReactElement {
  if (fields.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <MapPin className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p className="text-sm">No fields match your search.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
      {fields.map((field) => (
        <FieldCard key={field.id} field={field} />
      ))}
    </div>
  );
}
