
"use client";
import { useState } from "react";

const initialCriteria = [
  {
    id: 1,
    name: "Minimum GPA",
    category: "Academic",
    condition: "Greater than or equal",
    value: "3.50",
    required: true,
    active: true,
  },
  {
    id: 2,
    name: "Enrollment Status",
    category: "Academic",
    condition: "Must be",
    value: "Currently Enrolled",
    required: true,
    active: true,
  },
  {
    id: 3,
    name: "Financial Need",
    category: "Financial",
    condition: "Monthly Family Income",
    value: "Below ৳30,000",
    required: false,
    active: true,
  },
  {
    id: 4,
    name: "Attendance Percentage",
    category: "Academic",
    condition: "Greater than or equal",
    value: "75%",
    required: true,
    active: true,
  },
  {
    id: 5,
    name: "Previous Scholarship",
    category: "Other",
    condition: "Must be",
    value: "No Previous Scholarship",
    required: false,
    active: false,
  },
];

export default function EligibilityPage() {
  const [criteria, setCriteria] = useState(initialCriteria);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "Academic",
    condition: "Greater than or equal",
    value: "",
    required: true,
  });

  const addCriteria = (e) => {
    e.preventDefault();

    if (!form.name || !form.value) return;

    setCriteria((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...form,
        active: true,
      },
    ]);

    setForm({
      name: "",
      category: "Academic",
      condition: "Greater than or equal",
      value: "",
      required: true,
    });

    setShowForm(false);
  };

  const toggleCriteria = (id) => {
    setCriteria((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  const removeCriteria = (id) => {
    setCriteria((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 min-h-[calc(100vh-4rem)] bg-slate-50">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Eligibility Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure scholarship eligibility requirements
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          + Add Criteria
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          ["Total Criteria", criteria.length, "bg-blue-50 border-blue-200 text-blue-700"],
          ["Active", criteria.filter((c) => c.active).length, "bg-green-50 border-green-200 text-green-700"],
          ["Required", criteria.filter((c) => c.required).length, "bg-orange-50 border-orange-200 text-orange-700"],
          ["Optional", criteria.filter((c) => !c.required).length, "bg-purple-50 border-purple-200 text-purple-700"],
        ].map(([label, value, color]) => (
          <div key={label} className={`p-4 rounded-lg border ${color}`}>
            <p className="text-xs font-medium opacity-80">{label}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
        ))}
      </div>

      {showForm && (
        <form
          onSubmit={addCriteria}
          className="bg-white rounded-lg border border-slate-200 p-5 mb-6"
        >
          <h2 className="font-bold text-slate-700 mb-4">
            New Eligibility Criteria
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              required
              placeholder="Criteria name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["Academic", "Financial", "Personal", "Other"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={form.condition}
              onChange={(e) => setForm({ ...form, condition: e.target.value })}
              className="px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[
                "Greater than or equal",
                "Less than or equal",
                "Must be",
                "Must not be",
                "Equal to",
              ].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <input
              required
              placeholder="Required value"
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
              className="px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <label className="flex items-center gap-2 mt-4 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={form.required}
              onChange={(e) =>
                setForm({ ...form, required: e.target.checked })
              }
              className="accent-blue-600"
            />
            Mandatory criteria
          </label>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
            >
              Save Criteria
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-700">
            Eligibility Criteria List
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                {["Criteria", "Category", "Condition", "Value", "Type", "Status", "Action"].map((heading) => (
                  <th key={heading} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase whitespace-nowrap">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {criteria.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">
                    {item.name}
                  </td>

                  <td className="px-4 py-3 text-sm text-slate-600">
                    {item.category}
                  </td>

                  <td className="px-4 py-3 text-xs text-slate-500">
                    {item.condition}
                  </td>

                  <td className="px-4 py-3 text-sm font-medium text-slate-700">
                    {item.value}
                  </td>

                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${item.required ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-600"}`}>
                      {item.required ? "Required" : "Optional"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleCriteria(item.id)}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${item.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}
                    >
                      {item.active ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => removeCriteria(item.id)}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      🗑️ Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
