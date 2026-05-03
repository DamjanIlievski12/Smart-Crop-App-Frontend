import type React from "react";

export const inputClass =
  "w-full px-4 py-3 text-sm rounded-lg border outline-none transition-all";
export const inputStyle: React.CSSProperties = {
  background: "#f9f9f7",
  borderColor: "var(--color-border)",
};
export const focusStyle: React.CSSProperties = {
  borderColor: "var(--color-primary)",
};

interface FieldWrapperProps {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

export function FieldWrapper({
  label,
  required = false,
  hint,
  children,
}: FieldWrapperProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export function Input({
  type = "text",
  placeholder,
  ...props
}: InputProps): React.ReactElement {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={inputClass}
      style={inputStyle}
      onFocus={(e) => Object.assign(e.target.style, focusStyle)}
      onBlur={(e) => Object.assign(e.target.style, inputStyle)}
      {...props}
    />
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export function Select({
  children,
  ...props
}: SelectProps): React.ReactElement {
  return (
    <select
      className={inputClass}
      style={inputStyle}
      onFocus={(e) => Object.assign(e.target.style, focusStyle)}
      onBlur={(e) => Object.assign(e.target.style, inputStyle)}
      {...props}
    >
      {children}
    </select>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function Section({
  title,
  children,
  fullWidth = false,
}: SectionProps): React.ReactElement {
  return (
    <div
      className="bg-white border rounded-xl p-6"
      style={{ borderColor: "var(--color-border)" }}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-5">{title}</h2>
      {fullWidth ? (
        <div className="flex flex-col gap-5">{children}</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">{children}</div>
      )}
    </div>
  );
}
