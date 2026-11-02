"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-slate-100 text-slate-600",
  Pending: "bg-yellow-100 text-yellow-700",
  "Under Review": "bg-blue-100 text-blue-700",
  Failed: "bg-red-100 text-red-700",
};

export default function IntegrationList({ config }) {
  const [records, setRecords] = useState(config.records || []);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    endpoint: "",
    description: "",
  });

  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      const searchText = Object.values(item).join(" ").toLowerCase();
      const matchesSearch = searchText.includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, search, statusFilter]);

  const stats = useMemo(() => ({
    total: records.length,
    active: records.filter((item) => item.status === "Active").length,
    pending: records.filter((item) =>
      ["Pending", "Under Review"].includes(item.status)
    ).length,
    inactive: records.filter((item) =>
      ["Inactive", "Failed"].includes(item.status)
    ).length,
  }), [records]);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.endpoint.trim()) return;

    const newRecord = {
      id: `INT-${Date.now()}`,
      name: form.name,
      category: config.title,
      endpoint: form.endpoint,
      status: "Pending",
      lastSync: "Not synchronized yet",
      description: form.description || "New integration configuration.",
    };

    setRecords((prev) => [newRecord, ...prev]);
    setForm({ name: "", endpoint: "", description: "" });
    setShowForm(false);
  };

  const exportCSV = () => {
    const columns = ["id", "name", "category", "endpoint", "status", "lastSync", "description"];
    const csv = [
      columns.join(","),
      ...filteredRecords.map((record) =>
        columns.map((key) =>
          `"${String(record[key] ?? "").replaceAll('"', '""')}"`
        ).join(",")
      ),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${config.title.toLowerCase().replaceAll(" ", "-")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const updateStatus = (id, status) => {
    setRecords((prev) =>
      prev.map((item) => item.id === id ? { ...item, status } : item)
    );
    setSelected((prev) => prev?.id === id ? { ...prev, status } : prev);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 text-sm text-slate-500">
            Admin / API & Integration
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            {config.title}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {config.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={exportCSV}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Export CSV
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Add Integration
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Integrations", value: stats.total },
          { label: "Active", value: stats.active },
          { label: "Pending / Review", value: stats.pending },
          { label: "Inactive / Failed", value: stats.inactive },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">{item.label}</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-800">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Integration navigation */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="mb-3 font-semibold text-slate-800">Integration Modules</h2>
        <div className="flex flex-wrap gap-2">
          {integrationLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              {item.icon} {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search integration..."
          className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-blue-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-blue-500"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Under Review">Under Review</option>
          <option value="Inactive">Inactive</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h2 className="font-semibold text-slate-800">Integration Records</h2>
          <span className="text-sm text-slate-500">
            {filteredRecords.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">ID / Name</th>
                <th className="px-5 py-4">Endpoint / Provider</th>
                <th className="px-5 py-4">Last Sync</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">{item.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.id}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-slate-700">{item.endpoint}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.category}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{item.lastSync}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[item.status] || statusStyles.Pending}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelected(item)}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-5 py-10 text-center text-slate-500">
                    No integration records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Integration Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={handleAdd}
            className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Add Integration</h2>
              <button type="button" onClick={() => setShowForm(false)} className="text-xl text-slate-400">×</button>
            </div>

            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Integration name"
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
            />

            <input
              required
              value={form.endpoint}
              onChange={(e) => setForm({ ...form, endpoint: e.target.value })}
              placeholder="Endpoint / Provider"
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
            />

            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Description"
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
            />

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm">
                Cancel
              </button>
              <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                Save Integration
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Details Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Integration Details</h2>
              <button onClick={() => setSelected(null)} className="text-xl text-slate-400">×</button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(selected).map(([key, value]) => (
                <div key={key} className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs capitalize text-slate-500">
                    {key.replaceAll(/([A-Z])/g, " $1")}
                  </p>
                  <p className="mt-1 break-words text-sm font-medium text-slate-800">
                    {String(value)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap justify-end gap-2">
              {selected.status !== "Active" && (
                <button
                  onClick={() => updateStatus(selected.id, "Active")}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white"
                >
                  Mark Active
                </button>
              )}
              {selected.status === "Active" && (
                <button
                  onClick={() => updateStatus(selected.id, "Inactive")}
                  className="rounded-lg bg-slate-700 px-4 py-2 text-sm text-white"
                >
                  Deactivate
                </button>
              )}
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-slate-400">
        Demo mode: changes are stored in local component state only. Connect the backend to persist records and perform real API operations.
      </p>
    </div>
  );
}

const integrationLinks = [
  { title: "REST API", href: "/admin/api/rest-api", icon: "🔌" },
  { title: "GraphQL", href: "/admin/api/graphql", icon: "◈" },
  { title: "Webhook", href: "/admin/api/webhook", icon: "🪝" },
  { title: "ERP", href: "/admin/api/erp-integration", icon: "🏢" },
  { title: "Payment", href: "/admin/api/payment-gateway", icon: "💳" },
  { title: "SMS", href: "/admin/api/sms-gateway", icon: "💬" },
  { title: "Google", href: "/admin/api/google-workspace", icon: "🌐" },
  { title: "Microsoft 365", href: "/admin/api/microsoft-365", icon: "🪟" },
  { title: "Voice", href: "/admin/api/voice-gateway", icon: "📞" },
];