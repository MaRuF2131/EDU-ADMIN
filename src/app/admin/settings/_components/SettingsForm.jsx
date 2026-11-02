
"use client";

import { useState } from "react";

export default function SettingsForm({ config }) {
  const [formData, setFormData] = useState(() =>
    Object.fromEntries(
      config.fields.map((field) => [field.name, field.value])
    )
  );

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);

    // Demo only: connect your settings API here.
    setTimeout(() => {
      setSaving(false);
      setMessage("Settings updated in demo mode.");
    }, 500);
  };

  const renderField = (field) => {
    const commonClass =
      "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500";

    if (field.type === "checkbox") {
      return (
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={Boolean(formData[field.name])}
            onChange={(e) =>
              handleChange(field.name, e.target.checked)
            }
            className="h-4 w-4 accent-blue-600"
          />
          <span className="text-sm text-slate-700">
            {formData[field.name] ? "Enabled" : "Disabled"}
          </span>
        </label>
      );
    }

    if (field.type === "select") {
      return (
        <select
          value={formData[field.name]}
          onChange={(e) =>
            handleChange(field.name, e.target.value)
          }
          className={commonClass}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "textarea") {
      return (
        <textarea
          rows={4}
          value={formData[field.name]}
          onChange={(e) =>
            handleChange(field.name, e.target.value)
          }
          className={commonClass}
        />
      );
    }

    if (field.type === "file") {
      return (
        <div>
          <input
            type="file"
            accept="image/*,.ico"
            onChange={(e) =>
              handleChange(field.name, e.target.files?.[0] || null)
            }
            className="w-full rounded-lg border border-slate-200 p-2 text-sm"
          />
          {formData[field.name]?.name && (
            <p className="mt-2 text-xs text-slate-500">
              Selected: {formData[field.name].name}
            </p>
          )}
        </div>
      );
    }

    if (field.type === "color") {
      return (
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={formData[field.name]}
            onChange={(e) =>
              handleChange(field.name, e.target.value)
            }
            className="h-10 w-16 cursor-pointer rounded border border-slate-200"
          />
          <span className="text-sm text-slate-600">
            {formData[field.name]}
          </span>
        </div>
      );
    }

    return (
      <input
        type={field.type || "text"}
        value={formData[field.name] ?? ""}
        onChange={(e) =>
          handleChange(field.name, e.target.value)
        }
        className={commonClass}
      />
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          {config.title}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {config.description}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {config.fields.map((field) => (
            <div
              key={field.name}
              className={
                field.type === "textarea" ||
                field.type === "file" ||
                field.type === "checkbox"
                  ? "md:col-span-2"
                  : ""
              }
            >
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {field.label}
              </label>
              {renderField(field)}
            </div>
          ))}
        </div>

        {message && (
          <p className="mt-5 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
            {message}
          </p>
        )}

        <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={() => {
              setFormData(
                Object.fromEntries(
                  config.fields.map((field) => [
                    field.name,
                    field.value,
                  ])
                )
              );
              setMessage("");
            }}
            className="rounded-lg border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <strong>Demo Mode:</strong> Changes are currently stored only in
        component state. Connect the backend API for persistent settings.
        Sensitive credentials must be saved securely on the server.
      </div>
    </div>
  );
}
