
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search, Plus, Download, Eye, X, ArrowLeft,
  Filter, RefreshCw, CheckCircle2, AlertCircle,
  Phone, Settings2,
} from "lucide-react";
import { voiceAIPageConfig } from "./voiceAIData";

const statusClass = {
  Active: "bg-emerald-50 text-emerald-700",
  Connected: "bg-emerald-50 text-emerald-700",
  Completed: "bg-emerald-50 text-emerald-700",
  Published: "bg-emerald-50 text-emerald-700",
  Available: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  "Pending Review": "bg-amber-50 text-amber-700",
  Draft: "bg-slate-100 text-slate-600",
  Busy: "bg-amber-50 text-amber-700",
  "In Progress": "bg-blue-50 text-blue-700",
  Transferred: "bg-blue-50 text-blue-700",
  "Complaint Detected": "bg-rose-50 text-rose-700",
  High: "bg-rose-50 text-rose-700",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-blue-50 text-blue-700",
  Passed: "bg-emerald-50 text-emerald-700",
};

function StatusBadge({ value }) {
  return (
    <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[value] || "bg-slate-100 text-slate-600"}`}>
      {value || "Not set"}
    </span>
  );
}

function titleCase(value) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, x => x.toUpperCase());
}

export default function VoiceAIWorkspace({ pageKey }) {
  const config = voiceAIPageConfig[pageKey];
  const [records, setRecords] = useState(config?.rows || []);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [notice, setNotice] = useState("");

  const columns = config?.columns || [];

  const filtered = useMemo(() => records.filter(record => {
    const matchesSearch = Object.values(record).some(value =>
      String(value).toLowerCase().includes(search.toLowerCase())
    );
    const matchesStatus = status === "All" || record.status === status;
    return matchesSearch && matchesStatus;
  }), [records, search, status]);

  if (!config) {
    return <div className="p-8 text-red-600">Voice AI page configuration not found.</div>;
  }

  const statuses = ["All", ...new Set(records.map(item => item.status).filter(Boolean))];

  const exportCSV = () => {
    const keys = columns;
    const escapeCSV = value => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const csv = [
      keys.map(escapeCSV).join(","),
      ...filtered.map(row => keys.map(key => escapeCSV(row[key])).join(",")),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${pageKey}-records.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveRecord = event => {
    event.preventDefault();
    const newRecord = {
      id: `DEMO-${Date.now()}`,
      ...formData,
      status: formData.status || "Pending",
    };
    setRecords(previous => [newRecord, ...previous]);
    setShowForm(false);
    setFormData({});
    setNotice("Demo record added successfully.");
    setTimeout(() => setNotice(""), 3000);
  };

  const updateStatus = (record) => {
    const next = record.status === "Pending" ? "In Progress" : "Completed";
    setRecords(previous => previous.map(item =>
      item.id === record.id ? { ...item, status: next } : item
    ));
    setSelected({ ...record, status: next });
    setNotice("Demo status updated.");
    setTimeout(() => setNotice(""), 3000);
  };

  const statCards = [
    { label: "Total Records", value: records.length, icon: "▦" },
    { label: "Active / Completed", value: records.filter(x => ["Active", "Connected", "Completed", "Published", "Passed"].includes(x.status)).length, icon: "✓" },
    { label: "Pending Review", value: records.filter(x => ["Pending", "Pending Review", "Draft"].includes(x.status)).length, icon: "◷" },
  ];

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <Link href="/admin/voice-ai" className="hover:text-blue-600">AI Voice Assistant</Link>
        <span>/</span>
        <span className="font-semibold text-slate-700">{config.title}</span>
      </div>

      {/* Page header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="flex gap-3">
          <Link href="/admin/voice-ai"
            className="mt-1 rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-100">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{config.title}</h1>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">{config.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={exportCSV}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <Download size={16} /> Export CSV
          </button>
          <button onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
            <Plus size={17} /> Add New
          </button>
        </div>
      </div>

      {notice && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
          <CheckCircle2 size={17} /> {notice}
        </div>
      )}

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {statCards.map(item => (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{item.label}</p>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-700">{item.icon}</span>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Main table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-bold text-slate-800">Records & Management</h2>
            <p className="mt-1 text-xs text-slate-500">{filtered.length} records found</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search records..."
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500 sm:w-64" />
            </div>
            <div className="relative">
              <Filter size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select value={status} onChange={e => setStatus(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm outline-none focus:border-blue-500 sm:w-44">
                {statuses.map(item => <option key={item}>{item}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                {columns.map(col => (
                  <th key={col} className="whitespace-nowrap px-5 py-3 font-semibold">
                    {titleCase(col)}
                  </th>
                ))}
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((record, index) => (
                <tr key={record.id || index} className="transition hover:bg-slate-50">
                  {columns.map(col => (
                    <td key={col} className="max-w-64 px-5 py-4 text-slate-600">
                      {col === "status" || col === "priority" || col === "availability"
                        ? <StatusBadge value={record[col]} />
                        : <span className="block truncate">{record[col] ?? "—"}</span>}
                    </td>
                  ))}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setSelected(record)}
                        title="View details"
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                        <Eye size={16} />
                      </button>
                      {record.status && ["Pending", "In Progress"].includes(record.status) && (
                        <button onClick={() => updateStatus(record)}
                          title="Update demo status"
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700">
                          <RefreshCw size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} className="px-5 py-16 text-center">
                    <Search className="mx-auto mb-3 text-slate-300" size={30} />
                    <p className="font-semibold text-slate-700">No records found</p>
                    <p className="mt-1 text-xs text-slate-500">Try changing your search or filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-100 bg-slate-50 px-5 py-3 text-xs text-slate-500">
          Showing {filtered.length} of {records.length} demo records
        </div>
      </div>

      {/* Demo notice */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
        <AlertCircle className="mt-0.5 shrink-0" size={18} />
        <div>
          <p className="text-sm font-semibold">Frontend Demo Mode</p>
          <p className="mt-1 text-xs leading-5">
            Records and status changes are stored only in component state. They will reset after refresh.
            Connect the backend API before using this module in production.
          </p>
        </div>
      </div>

      {/* Add form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <form onSubmit={saveRecord} className="my-8 w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="font-bold text-slate-900">Add New Record</h2>
                <p className="mt-1 text-xs text-slate-500">{config.title}</p>
              </div>
              <button type="button" onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={19} /></button>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              {columns.filter(col => col !== "id").map(col => (
                <label key={col} className="space-y-1.5">
                  <span className="text-xs font-semibold capitalize text-slate-700">{titleCase(col)}</span>
                  <input required={col !== "status"}
                    value={formData[col] || ""}
                    onChange={e => setFormData(old => ({ ...old, [col]: e.target.value }))}
                    placeholder={`Enter ${titleCase(col).toLowerCase()}`}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500" />
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-200 p-5">
              <button type="button" onClick={() => setShowForm(false)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700">Cancel</button>
              <button type="submit"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Save Demo Record</button>
            </div>
          </form>
        </div>
      )}

      {/* Details modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <div className="my-8 w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="font-bold text-slate-900">Record Details</h2>
                <p className="mt-1 text-xs text-slate-500">{selected.id}</p>
              </div>
              <button onClick={() => setSelected(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={19} /></button>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              {Object.entries(selected).map(([key, value]) => (
                <div key={key} className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs capitalize text-slate-500">{titleCase(key)}</p>
                  <div className="mt-1 break-words text-sm font-semibold text-slate-800">
                    {key === "status" || key === "priority"
                      ? <StatusBadge value={value} />
                      : String(value ?? "—")}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end border-t border-slate-200 p-5">
              <button onClick={() => setSelected(null)}
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
