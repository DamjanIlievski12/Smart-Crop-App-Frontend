import AppLayout from '../components/layout/AppLayout';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import type { AddFieldForm } from '../api/types/field';
import type React from 'react';

const inputClass = 'w-full px-4 py-3 text-sm rounded-lg border outline-none transition-all';
const inputStyle: React.CSSProperties = { background: '#f9f9f7', borderColor: 'var(--color-border)' };
const focusStyle: React.CSSProperties = { borderColor: 'var(--color-primary)' };

interface FieldWrapperProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

function FieldWrapper({ label, required = false, children }: FieldWrapperProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

function Input({ type = 'text', placeholder, ...props }: InputProps): React.ReactElement {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    Object.assign(e.target.style, focusStyle);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    Object.assign(e.target.style, inputStyle);
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={inputClass}
      style={inputStyle}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

function Select({ children, ...props }: SelectProps): React.ReactElement {
  const handleFocus = (e: React.FocusEvent<HTMLSelectElement>): void => {
    Object.assign(e.target.style, focusStyle);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>): void => {
    Object.assign(e.target.style, inputStyle);
  };

  return (
    <select
      className={inputClass}
      style={inputStyle}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    >
      {children}
    </select>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps): React.ReactElement {
  return (
    <div className="bg-white border rounded-xl p-6" style={{ borderColor: 'var(--color-border)' }}>
      <h2 className="text-lg font-semibold text-gray-900 mb-5">{title}</h2>
      <div className="grid md:grid-cols-2 gap-5">{children}</div>
    </div>
  );
}

const cropOptions: string[] = [
  'Wheat', 'Corn', 'Rice', 'Tomato', 'Pepper', 'Cucumber', 'Lettuce', 'Carrot',
  'Potato', 'Soybean', 'Cotton', 'Barley'
];

const soilOptions: string[] = [
  'Sandy', 'Loamy', 'Clay', 'Sandy Loam', 'Clay Loam', 'Silty', 'Peaty'
];

const irrigationOptions: string[] = [
  'Drip Irrigation', 'Sprinkler System', 'Surface Irrigation',
  'Subsurface Drip', 'Rain-fed', 'Manual'
];

export default function AddFieldPage(): React.ReactElement {
  const navigate = useNavigate();
  const [form, setForm] = useState<AddFieldForm>({
    name: '',
    size: '',
    unit: 'acres',
    location: '',
    coordinates: '',
    crop: '',
    plantingDate: '',
    soilType: '',
    irrigation: '',
    notes: '',
  });

  const set = 
  <K extends keyof AddFieldForm>(key: K) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
      setForm((f) => ({ ...f, [key]: e.target.value as AddFieldForm[K] }));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // TODO: send form data to your API
    console.log('New field:', form);
    navigate('/fields');
  };

  return (
    <AppLayout>
      {/* Header */}
      <div>
        <Link
          to="/fields"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Fields
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Add New Field</h1>
        <p className="text-sm text-gray-500">Enter details about your new agricultural field</p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">

        {/* Basic Information */}
        <Section title="Basic Information">
          <FieldWrapper label="Field Name" required>
            <Input placeholder="e.g., North Field" value={form.name} onChange={set('name')} required />
          </FieldWrapper>
          <FieldWrapper label="Field Size" required>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="15"
                value={form.size}
                onChange={set('size')}
                required
                className="flex-1 px-4 py-3 text-sm rounded-lg border outline-none transition-all"
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
              <Select
                value={form.unit}
                onChange={set('unit')}
                className="px-4 py-3 text-sm rounded-lg border outline-none transition-all"
                style={{ ...inputStyle, width: 'auto' }}>
                <option value="acres">acres</option>
                <option value="hectares">hectares</option>
              </Select>
            </div>
          </FieldWrapper>
        </Section>

        {/* Location */}
        <Section title="Location Details">
          <FieldWrapper label="Address / Location" required>
            <Input placeholder="e.g., Northern Valley, CA" value={form.location} onChange={set('location')} required />
          </FieldWrapper>
          <FieldWrapper label="Coordinates (Optional)">
            <Input placeholder="e.g., 37.7749, -122.4194" value={form.coordinates} onChange={set('coordinates')} />
          </FieldWrapper>
        </Section>

        {/* Crop */}
        <Section title="Crop Information">
          <FieldWrapper label="Crop Type" required>
            <Select value={form.crop} onChange={set('crop')} required>
              <option value="">Select crop type</option>
              {cropOptions.map((c) => <option key={c}>
                {c}
              </option>)}
            </Select>
          </FieldWrapper>
          <FieldWrapper label="Planting Date">
            <Input type="date" value={form.plantingDate} onChange={set('plantingDate')} />
          </FieldWrapper>
        </Section>

        {/* Soil & Irrigation */}
        <Section title="Soil & Irrigation">
          <FieldWrapper label="Soil Type" required>
            <Select value={form.soilType} onChange={set('soilType')} required>
              <option value="">Select soil type</option>
              {soilOptions.map((s) => <option key={s}>
                {s}
              </option>)}
            </Select>
          </FieldWrapper>
          <FieldWrapper label="Irrigation Type">
            <Select value={form.irrigation} onChange={set('irrigation')}>
              <option value="">Select irrigation type</option>
              {irrigationOptions.map((i) => (<option key={i}>
                {i}
              </option>
              ))}
            </Select>
          </FieldWrapper>
        </Section>

        {/* Notes */}
        <div className="bg-white border rounded-xl p-6" style={{ borderColor: 'var(--color-border)' }}>
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Additional Notes</h2>
          <FieldWrapper label="Notes (Optional)">
            <textarea
              rows={4}
              placeholder="Add any additional information about this field..."
              value={form.notes}
              onChange={set('notes')}
              className="w-full px-4 py-3 text-sm rounded-lg border outline-none transition-all resize-none"
              style={inputStyle}
              onFocus={e => Object.assign(e.target.style, focusStyle)}
              onBlur={e => Object.assign(e.target.style, inputStyle)}
            />
          </FieldWrapper>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            to="/fields"
            className="px-6 py-2.5 text-sm font-medium rounded-lg border transition-colors hover:bg-gray-50"
            style={{ borderColor: 'var(--color-border)' }}
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-lg transition-colors"
            style={{ background: 'var(--color-primary)' }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'var(--color-primary-hover)')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'var(--color-primary)')}
          >
            <Save className="w-4 h-4" />
            Save Field
          </button>
        </div>
      </form>
    </AppLayout>
  );
}