
"use client";

import { useMemo, useState } from "react";

const statusStyles = {
  Pending: "bg-amber-100 text-amber-700",
  Processing: "bg-blue-100 text-blue-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Resolved: "bg-emerald-100 text-emerald-700",
  Generated: "bg-purple-100 text-purple-700",
  "Under Review": "bg-indigo-100 text-indigo-700",
};

const priorityStyles = {
  High: "text-red-600 bg-red-50",
  Medium: "text-amber-600 bg-amber-50",
  Low: "text-slate-600 bg-slate-100",
};

export default function ObjectionList({ config }) {
  const [items, setItems] = useState(config.items);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selected, setSelected] = useState(config.items[0] || null);
  const [remarks, setRemarks] = useState("");

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const searchText = `${item.id} ${item.student} ${item.studentId} ${item.subject} ${item.description}`.toLowerCase();
      return (
        searchText.includes(search.toLowerCase()) &&
        (statusFilter === "All" || item.status === statusFilter) &&
        (priorityFilter === "All" || item.priority === priorityFilter)
      );
    });
  }, [items, search, statusFilter, priorityFilter]);

  const updateStatus = (status) => {
    if (!selected) return;

    const updated = {
      ...selected,
      status,
      remarks,
      updatedAt: new Date().toLocaleString(),
    };

    setItems((prev) =>
      prev.map((item) => item.id === selected.id ? updated : item)
    );
    setSelected(updated);
  };

  const count = (status) => items.filter((item) => item.status === status).length;

  const stats = [
    { label: "Total Requests", value: items.length, icon: "📋" },
    { label: "Pending", value: count("Pending"), icon: "⏳" },
    { label: "Processing", value: count("Processing") + count("Under Review"), icon: "🔍" },
    { label: "Resolved", value: count("Resolved") + count("Approved"), icon: "✅" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span>Objection Management</span>
            <span>/</span>
            <span>{config.title}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">{config.title}</h1>
          <p className="text-sm text-slate-500 mt-1">{config.description}</p>
        </div>
        <button
          onClick={() => {
            setSearch("");
            setStatusFilter("All");
            setPriorityFilter("All");
          }}
          className="border border-slate-200 bg-white hover:bg-slate-50 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item) => (
          <div key={item.label} className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex justify-between">
              <p className="text-sm text-slate-500">{item.label}</p>
              <span>{item.icon}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mt-3">{item.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-200 space-y-3">
            <h2 className="font-semibold text-slate-800">{config.listTitle || "Applications"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ID, student..."
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
              >
                {["All", "Pending", "Processing", "Under Review", "Approved", "Rejected", "Resolved", "Generated"].map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
              >
                {["All", "High", "Medium", "Low"].map((priority) => (
                  <option key={priority}>{priority}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  {["Reference", "Student", "Subject", "Date", "Priority", "Status", "Action"].map((heading) => (
                    <th key={heading} className="p-4 font-medium whitespace-nowrap">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className={`border-t border-slate-100 hover:bg-slate-50 ${selected?.id === item.id ? "bg-blue-50/40" : ""}`}>
                    <td className="p-4 font-medium text-slate-700 whitespace-nowrap">{item.id}</td>
                    <td className="p-4 whitespace-nowrap">
                      <p className="font-medium text-slate-800">{item.student}</p>
                      <p className="text-xs text-slate-400">{item.studentId}</p>
                    </td>
                    <td className="p-4 text-slate-600 max-w-40 truncate">{item.subject}</td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">{item.date}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityStyles[item.priority] || priorityStyles.Low}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[item.status] || "bg-slate-100 text-slate-600"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => {
                          setSelected(item);
                          setRemarks(item.remarks || "");
                        }}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan="7" className="p-8 text-center text-slate-500">No records found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-100 text-xs text-slate-500">
            Showing {filtered.length} of {items.length} records
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">Review Details</h2>
            {selected && (
              <span className={`px-2.5 py-1 rounded-full text-xs ${statusStyles[selected.status] || "bg-slate-100 text-slate-600"}`}>
                {selected.status}
              </span>
            )}
          </div>

          {selected ? (
            <div className="space-y-4">
              {[
                ["Reference ID", selected.id],
                ["Student Name", selected.student],
                ["Student ID", selected.studentId],
                ["Subject", selected.subject],
                ["Submitted Date", selected.date],
                ["Priority", selected.priority],
                ["Description", selected.description],
                ...(selected.extra || []),
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="text-sm text-slate-700 font-medium mt-1 break-words">{value || "—"}</p>
                </div>
              ))}

              {selected.audio && (
                <div>
                  <p className="text-xs text-slate-400 mb-2">Voice Call Recording</p>
                  <audio controls className="w-full">
                    <source src={selected.audio} />
                  </audio>
                </div>
              )}

              {selected.aiSummary && (
                <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
                  <p className="text-xs font-semibold text-purple-700 mb-1">AI Summary</p>
                  <p className="text-sm text-purple-800">{selected.aiSummary}</p>
                </div>
              )}

              <div>
                <label className="text-xs text-slate-500">Admin Remarks / Resolution Notes</label>
                <textarea
                  rows="3"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Write review remarks..."
                  className="w-full border border-slate-200 rounded-lg p-3 mt-1 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => updateStatus("Processing")} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 text-sm">Process</button>
                <button onClick={() => updateStatus("Under Review")} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 text-sm">Under Review</button>
                <button onClick={() => updateStatus("Approved")} className="bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 text-sm">Approve</button>
                <button onClick={() => updateStatus("Rejected")} className="bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 text-sm">Reject</button>
                <button onClick={() => updateStatus("Resolved")} className="col-span-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg py-2 text-sm">Mark as Resolved</button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">Select a record to review.</p>
          )}
        </div>
      </div>
    </div>
  );
}
