
"use client";
import { useState } from "react";

const initialPrograms = [
  {
    id: "SCH-001",
    name: "Merit Excellence Scholarship",
    type: "Merit",
    sponsor: "Institution",
    amount: 25000,
    applicants: 145,
    seats: 200,
    status: "Active",
    deadline: "2026-11-15",
  },
  {
    id: "SCH-002",
    name: "Need Based Financial Support",
    type: "Need Based",
    sponsor: "Institution",
    amount: 15000,
    applicants: 89,
    seats: 150,
    status: "Active",
    deadline: "2026-11-20",
  },
  {
    id: "SCH-003",
    name: "Government Education Grant",
    type: "Government",
    sponsor: "Education Board",
    amount: 20000,
    applicants: 45,
    seats: 300,
    status: "Active",
    deadline: "2026-12-01",
  },
  {
    id: "SCH-004",
    name: "NGO Education Support",
    type: "NGO",
    sponsor: "ABC Foundation",
    amount: 30000,
    applicants: 32,
    seats: 100,
    status: "Active",
    deadline: "2026-12-10",
  },
  {
    id: "SCH-005",
    name: "Corporate Sponsor Scholarship",
    type: "Sponsor",
    sponsor: "XYZ Corporation",
    amount: 50000,
    applicants: 0,
    seats: 50,
    status: "Draft",
    deadline: "2027-01-15",
  },
];

const emptyForm = {
  name: "",
  type: "Merit",
  sponsor: "",
  amount: "",
  seats: "",
  deadline: "",
  description: "",
  minGPA: "3.50",
};

export default function ScholarshipProgramsPage() {
  const [programs, setPrograms] = useState(initialPrograms);
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState("All");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);

  const filteredPrograms = programs.filter((program) => {
    const matchesType =
      selectedType === "All" || program.type === selectedType;

    const matchesSearch =
      program.name.toLowerCase().includes(search.toLowerCase()) ||
      program.id.toLowerCase().includes(search.toLowerCase()) ||
      program.sponsor.toLowerCase().includes(search.toLowerCase());

    return matchesType && matchesSearch;
  });

  const handleCreate = (e) => {
    e.preventDefault();

    if (!form.name || !form.amount || !form.seats || !form.deadline) {
      return;
    }

    const newProgram = {
      id: `SCH-${String(programs.length + 1).padStart(3, "0")}`,
      ...form,
      amount: Number(form.amount),
      applicants: 0,
      seats: Number(form.seats),
      status: "Draft",
    };

    setPrograms((prev) => [...prev, newProgram]);
    setForm(emptyForm);
    setShowForm(false);
  };

  const toggleStatus = (id) => {
    setPrograms((prev) =>
      prev.map((program) =>
        program.id === id
          ? {
              ...program,
              status: program.status === "Active" ? "Paused" : "Active",
            }
          : program
      )
    );
  };

  return (
    <div className="p-6 min-h-[calc(100vh-4rem)] bg-slate-50">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Scholarship Programs
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create, configure and manage scholarship opportunities
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          + Create Program
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-white rounded-lg border border-slate-200 p-5 mb-6"
        >
          <h2 className="font-bold text-slate-700 mb-4">
            Create New Scholarship
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Scholarship Name *
              </label>
              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Enter scholarship name"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Scholarship Type
              </label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              >
                {["Merit", "Need Based", "Government", "NGO", "Sponsor"].map(
                  (type) => (
                    <option key={type}>{type}</option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Sponsor / Organization
              </label>
              <input
                value={form.sponsor}
                onChange={(e) =>
                  setForm({ ...form, sponsor: e.target.value })
                }
                placeholder="Sponsor name"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Scholarship Amount (BDT) *
              </label>
              <input
                required
                type="number"
                min="1"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
                }
                placeholder="25000"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Available Seats *
              </label>
              <input
                required
                type="number"
                min="1"
                value={form.seats}
                onChange={(e) =>
                  setForm({ ...form, seats: e.target.value })
                }
                placeholder="100"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Application Deadline *
              </label>
              <input
                required
                type="date"
                value={form.deadline}
                onChange={(e) =>
                  setForm({ ...form, deadline: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Minimum GPA
              </label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.01"
                value={form.minGPA}
                onChange={(e) =>
                  setForm({ ...form, minGPA: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Description
              </label>
              <input
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Scholarship description"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              Create Scholarship
            </button>
          </div>
        </form>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Total Programs",
            value: programs.length,
            color: "bg-blue-50 border-blue-200 text-blue-700",
          },
          {
            label: "Active Programs",
            value: programs.filter((p) => p.status === "Active").length,
            color: "bg-green-50 border-green-200 text-green-700",
          },
          {
            label: "Total Applicants",
            value: programs.reduce((sum, p) => sum + p.applicants, 0),
            color: "bg-purple-50 border-purple-200 text-purple-700",
          },
          {
            label: "Available Seats",
            value: programs.reduce(
              (sum, p) => sum + Math.max(p.seats - p.applicants, 0),
              0
            ),
            color: "bg-orange-50 border-orange-200 text-orange-700",
          },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-lg border ${stat.color}`}>
            <p className="text-xs font-medium opacity-80">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4">
        <div className="flex flex-col md:flex-row gap-3 justify-between">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search scholarship, ID or sponsor..."
            className="w-full md:max-w-sm px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-wrap gap-2">
            {["All", "Merit", "Need Based", "Government", "NGO", "Sponsor"].map(
              (type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    selectedType === type
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {type}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Programs Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-700">
            All Scholarship Programs
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                {[
                  "Program",
                  "Type",
                  "Sponsor",
                  "Amount",
                  "Applicants",
                  "Deadline",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase whitespace-nowrap"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredPrograms.map((program) => (
                <tr key={program.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-800">
                      {program.name}
                    </p>
                    <p className="text-xs text-slate-400">{program.id}</p>
                  </td>

                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium">
                      {program.type}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-sm text-slate-600">
                    {program.sponsor || "—"}
                  </td>

                  <td className="px-4 py-3 text-sm font-semibold text-slate-700 whitespace-nowrap">
                    ৳{program.amount.toLocaleString("en-BD")}
                  </td>

                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-700">
                      {program.applicants}/{program.seats}
                    </p>
                    <div className="w-24 bg-slate-200 rounded-full h-1.5 mt-1">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full"
                        style={{
                          width: `${Math.min(
                            (program.applicants / program.seats) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </td>

                  <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">
                    {program.deadline}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        program.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : program.status === "Paused"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {program.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus(program.id)}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
                    >
                      {program.status === "Active" ? "Pause" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}

              {filteredPrograms.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-10 text-sm text-slate-400"
                  >
                    No scholarship programs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
