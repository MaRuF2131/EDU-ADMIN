
"use client";

import { useMemo, useState } from "react";

const statusStyles = {
  "High Confidence": "bg-green-100 text-green-700",
  "Medium Confidence": "bg-yellow-100 text-yellow-700",
  "Needs Review": "bg-red-100 text-red-700",
  "High Risk": "bg-red-100 text-red-700",
  "Medium Risk": "bg-yellow-100 text-yellow-700",
  "Low Risk": "bg-green-100 text-green-700",
  Positive: "bg-green-100 text-green-700",
  "Needs Attention": "bg-red-100 text-red-700",
  "Gap Identified": "bg-red-100 text-red-700",
  Improving: "bg-blue-100 text-blue-700",
  Excellent: "bg-green-100 text-green-700",
  Good: "bg-blue-100 text-blue-700",
  Suggested: "bg-blue-100 text-blue-700",
  "Under Review": "bg-yellow-100 text-yellow-700",
  Answered: "bg-green-100 text-green-700",
};

const getStatusClass = (status) =>
  statusStyles[status] || "bg-slate-100 text-slate-700";

const formatValue = (value) => {
  if (Array.isArray(value)) return value.join(", ");
  if (value === null || value === undefined || value === "") return "N/A";
  return String(value);
};

export default function AIAnalyticsList({ config }) {
  const [records, setRecords] = useState(config.records || []);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const statuses = useMemo(
    () => ["All", ...new Set(records.map((item) => item.status))],
    [records]
  );

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const searchableText = Object.values(record)
        .flat()
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || record.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, search, statusFilter]);

  const stats = [
    {
      label: "Total Records",
      value: records.length,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "High Score (80+)",
      value: records.filter((item) => Number(item.score) >= 80).length,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Needs Attention",
      value: records.filter((item) =>
        ["High Risk", "Needs Review", "Needs Attention", "Gap Identified"].includes(
          item.status
        )
      ).length,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Filtered Results",
      value: filteredRecords.length,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  const handleStatusChange = (id, status) => {
    setRecords((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    setSelectedRecord((previous) =>
      previous?.id === id ? { ...previous, status } : previous
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 text-sm font-medium text-blue-600">
            AI Analytics Engine
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            {config.title}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {config.description}
          </p>
        </div>

        <button
          onClick={() =>
            alert("AI analysis and model integration will be connected later.")
          }
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          + Run AI Analysis
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <div className={`rounded-lg p-2 ${stat.bg}`}>
                <span className={`text-lg font-bold ${stat.color}`}>
                  #
                </span>
              </div>
            </div>
            <h2 className="mt-3 text-2xl font-bold text-slate-800">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* AI Notice */}
      <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <span className="text-xl">🧠</span>
          <div>
            <h3 className="font-semibold text-blue-900">
              AI Analytics Information
            </h3>
            <p className="mt-1 text-sm text-blue-800">
              These records use demonstration data. AI scores and predictions
              are not real student assessments and should not be used for
              academic decisions until validated with real data.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 md:flex-row">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={config.searchPlaceholder || "Search records..."}
          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 md:flex-1"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status === "All" ? "All Statuses" : status}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-800">Analytics Records</h2>
          <p className="mt-1 text-xs text-slate-500">
            Showing {filteredRecords.length} of {records.length} records
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Reference</th>
                <th className="px-5 py-4">Name / Title</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">AI Score</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 font-medium text-blue-600">
                    {record.id}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-800">
                      {record.title}
                    </p>
                    <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                      {record.description}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {record.category}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700">
                        {record.score}%
                      </span>
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(0, Number(record.score) || 0)
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500">
                    {record.createdAt}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRecords.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-slate-500"
                  >
                    No analytics records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white p-5">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Analytics Details
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {selectedRecord.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="rounded-lg px-3 py-1.5 text-xl text-slate-500 hover:bg-slate-100"
                aria-label="Close details"
              >
                ×
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  {selectedRecord.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedRecord.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {Object.entries(selectedRecord).map(([key, value]) => {
                  if (["id", "title", "description"].includes(key)) return null;

                  return (
                    <div
                      key={key}
                      className="rounded-lg border border-slate-200 p-3"
                    >
                      <p className="mb-1 text-xs capitalize text-slate-500">
                        {key.replace(/([A-Z])/g, " $1")}
                      </p>
                      <p className="break-words text-sm font-medium text-slate-800">
                        {formatValue(value)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-slate-200 pt-4">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Update Record Status
                </label>
                <select
                  value={selectedRecord.status}
                  onChange={(e) =>
                    handleStatusChange(selectedRecord.id, e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                  {[...new Set([
                    ...statuses.filter((item) => item !== "All"),
                    selectedRecord.status,
                  ])].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-slate-400">
                  Status changes are temporary and stored only in frontend state.
                </p>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-200 p-5">
              <button
                onClick={() => setSelectedRecord(null)}
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
