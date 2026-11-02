"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { monitoringMenu } from "./monitoringData";

const statusStyles = {
  Healthy: "bg-green-100 text-green-700",
  Warning: "bg-yellow-100 text-yellow-700",
  Critical: "bg-red-100 text-red-700",
  Resolved: "bg-blue-100 text-blue-700",
  Failed: "bg-red-100 text-red-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Active: "bg-green-100 text-green-700",
};

export default function MonitoringList({ config }) {
  const [records, setRecords] = useState(config.records || []);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      const searchable = Object.values(item)
        .map((value) => String(value))
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchable.includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, search, statusFilter]);

  const stats = useMemo(() => ({
    total: records.length,
    healthy: records.filter((item) => item.status === "Healthy").length,
    warning: records.filter((item) =>
      ["Warning", "Pending"].includes(item.status)
    ).length,
    critical: records.filter((item) =>
      ["Critical", "Failed"].includes(item.status)
    ).length,
  }), [records]);

  const updateStatus = (id, status) => {
    setRecords((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    setSelected((prev) =>
      prev?.id === id ? { ...prev, status } : prev
    );
  };

  const exportCSV = () => {
    const columns = [
      "id",
      "name",
      "category",
      "metric",
      "value",
      "status",
      "lastChecked",
      "description",
    ];

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-sm text-slate-500">
            Admin / System Monitoring
          </p>

          <h1 className="text-2xl font-bold text-slate-800">
            {config.title}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {config.description}
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Export CSV
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Monitors", value: stats.total },
          { label: "Healthy", value: stats.healthy },
          { label: "Warning", value: stats.warning },
          { label: "Critical / Failed", value: stats.critical },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <p className="text-sm text-slate-500">{item.label}</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-800">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Monitoring navigation */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="mb-3 font-semibold text-slate-800">
          Monitoring Modules
        </h2>

        <div className="flex flex-wrap gap-2">
          {monitoringMenu.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              {item.icon} {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search monitoring records..."
          className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-blue-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-blue-500"
        >
          <option value="All">All Status</option>
          {[...new Set(records.map((item) => item.status))].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Monitoring table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h2 className="font-semibold text-slate-800">
            Monitoring Records
          </h2>

          <span className="text-sm text-slate-500">
            {filteredRecords.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Service / ID</th>
                <th className="px-5 py-4">Metric</th>
                <th className="px-5 py-4">Value</th>
                <th className="px-5 py-4">Last Checked</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.id}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {item.metric}
                  </td>

                  <td className="px-5 py-4 font-medium text-slate-700">
                    {item.value}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {item.lastChecked}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        statusStyles[item.status] ||
                        "bg-slate-100 text-slate-600"
                      }`}
                    >
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
                  <td
                    colSpan="6"
                    className="px-5 py-10 text-center text-slate-500"
                  >
                    No monitoring records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">
                Monitoring Details
              </h2>

              <button
                onClick={() => setSelected(null)}
                className="text-xl text-slate-400"
              >
                ×
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(selected).map(([key, value]) => (
                <div key={key} className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs capitalize text-slate-500">
                    {key.replace(/([A-Z])/g, " $1")}
                  </p>

                  <p className="mt-1 break-words text-sm font-medium text-slate-800">
                    {String(value)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap justify-end gap-2">
              {selected.status !== "Healthy" && (
                <button
                  onClick={() => updateStatus(selected.id, "Healthy")}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white"
                >
                  Mark Healthy
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
        Demo mode: monitoring values are sample data. Live monitoring requires
        backend metrics collection and scheduled health checks.
      </p>
    </div>
  );
}