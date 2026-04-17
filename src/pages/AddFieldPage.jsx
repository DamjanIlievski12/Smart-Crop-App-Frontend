import AppLayout from '../components/layout/AppLayout';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

const inputClass = 'w-full px-4 py-3 text-sm rounded-lg border outline-none transition-all';
const inputStyle = { background: '#f9f9f7', borderColor: 'var(--color-border)' };
const focusStyle = { borderColor: 'var(--color-primary)' };

function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function Input({ type = 'text', placeholder, ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={inputClass}
      style={inputStyle}
      onFocus={e => Object.assign(e.target.style, focusStyle)}
      onBlur={e => Object.assign(e.target.style, inputStyle)}
      {...props}
    />
  );
}

function Select({ children, ...props }) {
  return (
    <select
      className={inputClass}
      style={inputStyle}
      onFocus={e => Object.assign(e.target.style, focusStyle)}
      onBlur={e => Object.assign(e.target.style, inputStyle)}
      {...props}
    >
      {children}
    </select>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white border rounded-xl p-6" style={{ borderColor: 'var(--color-border)' }}>
      <h2 className="text-lg font-semibold text-gray-900 mb-5">{title}</h2>
      <div className="grid md:grid-cols-2 gap-5">{children}</div>
    </div>
  );
}

export default function AddFieldPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', size: '', unit: 'acres', location: '', coordinates: '',
    crop: '', plantingDate: '', soilType: '', irrigation: '', notes: '',
  });

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSave = (e) => {
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
          <Field label="Field Name" required>
            <Input placeholder="e.g., North Field" value={form.name} onChange={set('name')} required />
          </Field>
          <Field label="Field Size" required>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="15"
                value={form.size}
                onChange={set('size')}
                required
                className="flex-1 px-4 py-3 text-sm rounded-lg border outline-none transition-all"
                style={inputStyle}
                onFocus={e => Object.assign(e.target.style, focusStyle)}
                onBlur={e => Object.assign(e.target.style, inputStyle)}
              />
              <Select value={form.unit} onChange={set('unit')} className="px-4 py-3 text-sm rounded-lg border outline-none transition-all" style={{ ...inputStyle, width: 'auto' }}>
                <option>acres</option>
                <option>hectares</option>
              </Select>
            </div>
          </Field>
        </Section>

        {/* Location */}
        <Section title="Location Details">
          <Field label="Address / Location" required>
            <Input placeholder="e.g., Northern Valley, CA" value={form.location} onChange={set('location')} required />
          </Field>
          <Field label="Coordinates (Optional)">
            <Input placeholder="e.g., 37.7749, -122.4194" value={form.coordinates} onChange={set('coordinates')} />
          </Field>
        </Section>

        {/* Crop */}
        <Section title="Crop Information">
          <Field label="Crop Type" required>
            <Select value={form.crop} onChange={set('crop')} required>
              <option value="">Select crop type</option>
              {['Wheat','Corn','Rice','Tomato','Pepper','Cucumber','Lettuce','Carrot','Potato','Soybean','Cotton','Barley'].map(c => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </Field>
          <Field label="Planting Date">
            <Input type="date" value={form.plantingDate} onChange={set('plantingDate')} />
          </Field>
        </Section>

        {/* Soil & Irrigation */}
        <Section title="Soil & Irrigation">
          <Field label="Soil Type" required>
            <Select value={form.soilType} onChange={set('soilType')} required>
              <option value="">Select soil type</option>
              {['Sandy','Loamy','Clay','Sandy Loam','Clay Loam','Silty','Peaty'].map(s => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </Field>
          <Field label="Irrigation Type">
            <Select value={form.irrigation} onChange={set('irrigation')}>
              <option value="">Select irrigation type</option>
              {['Drip Irrigation','Sprinkler System','Surface Irrigation','Subsurface Drip','Rain-fed','Manual'].map(i => (
                <option key={i}>{i}</option>
              ))}
            </Select>
          </Field>
        </Section>

        {/* Notes */}
        <div className="bg-white border rounded-xl p-6" style={{ borderColor: 'var(--color-border)' }}>
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Additional Notes</h2>
          <Field label="Notes (Optional)">
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
          </Field>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            to="/app/fields"
            className="px-6 py-2.5 text-sm font-medium rounded-lg border transition-colors hover:bg-gray-50"
            style={{ borderColor: 'var(--color-border)' }}
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-lg transition-colors"
            style={{ background: 'var(--color-primary)' }}
            onMouseOver={e => (e.currentTarget.style.background = 'var(--color-primary-hover)')}
            onMouseOut={e => (e.currentTarget.style.background = 'var(--color-primary)')}
          >
            <Save className="w-4 h-4" />
            Save Field
          </button>
        </div>
      </form>
    </AppLayout>
  );
}