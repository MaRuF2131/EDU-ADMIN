
"use client";

import { useMemo, useState } from "react";

const statusStyles = {
  Generated: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Draft: "bg-slate-100 text-slate-700",
  Completed: "bg-green-100 text-green-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Connected: "bg-green-100 text-green-700",
  Disconnected: "bg-red-100 text-red-700",
};

const formatValue = (value) => {
  if (Array.isArray(value)) return value.join(", ");
  if (value === null || value === undefined || value === "") return "N/A";
  return String(value);
};

const escapeCSV = (value) => {
  const text = formatValue(value).replace(/"/g, '""');
  return `"${text}"`;
};

export default function ReportList({ config }) {
  const [records, setRecords] = useState(config.records || []);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [reportName, setReportName] = useState("");
  const [dataSource, setDataSource] = useState("Students");
  const [exportFormat, setExportFormat] = useState("Excel");
  const [showBuilder, setShowBuilder] = useState(false);

  const statuses = useMemo(
    () => ["All", ...new Set(records.map((item) => item.status))],
    [records]
  );

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const searchable = Object.values(record)
        .flat()
        .join(" ")
        .toLowerCase();

      return (
        searchable.includes(search.toLowerCase()) &&
        (statusFilter === "All" || record.status === statusFilter)
      );
    });
  }, [records, search, statusFilter]);

  const stats = [
    {
      label: "Total Reports",
      value: records.length,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Completed",
      value: records.filter((item) =>
        ["Completed", "Generated", "Approved", "Connected"].includes(item.status)
      ).length,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Pending / Processing",
      value: records.filter((item) =>
        ["Pending", "Processing", "Draft"].includes(item.status)
      ).length,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      label: "Filtered Results",
      value: filteredRecords.length,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  const updateStatus = (id, status) => {
    setRecords((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    setSelectedRecord((previous) =>
      previous?.id === id ? { ...previous, status } : previous
    );
  };

  const exportCSV = (items = filteredRecords) => {
    if (!items.length) {
      alert("No records available to export.");
      return;
    }

    const headers = Object.keys(items[0]);
    const rows = items.map((item) =>
      headers.map((header) => escapeCSV(item[header])).join(",")
    );

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows,
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${config.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const handleCustomReport = (event) => {
    event.preventDefault();

    if (!reportName.trim()) {
      alert("Please enter a report name.");
      return;
    }

    const newRecord = {
      id: `CUS-${Date.now().toString().slice(-6)}`,
      title: reportName,
      category: "Custom Report",
      generatedBy: "Admin",
      date: new Date().toISOString().slice(0, 10),
      status: "Draft",
      description: `Custom report created using ${dataSource} data.`,
      dataSources: [dataSource],
      format: exportFormat,
    };

    setRecords((previous) => [newRecord, ...previous]);
    setReportName("");
    setShowBuilder(false);
  };

  const isCustomBuilder = config.mode === "builder";
  const isExportPage = config.mode === "export";

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-blue-600">
            Reports & BI Dashboard
          </p>
          <h1 className="text-2xl font-bold text-slate-800">
            {config.title}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {config.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => exportCSV()}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Export CSV
          </button>

          {isCustomBuilder && (
            <button
              onClick={() => setShowBuilder(true)}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              + Create Report
            </button>
          )}

          {isExportPage && (
            <button
              onClick={() =>
                alert("Connect the backend export service to generate this file format.")
              }
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              + New Export
            </button>
          )}
        </div>
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
              <span className={`rounded-lg p-2 ${stat.bg}`}>
                <span className={`font-bold ${stat.color}`}>#</span>
              </span>
            </div>
            <h2 className="mt-3 text-2xl font-bold text-slate-800">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Information */}
      <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <h3 className="font-semibold text-blue-900">
          Report & Data Export
        </h3>
        <p className="mt-1 text-sm leading-6 text-blue-800">
          Report records are currently demonstration data. CSV export works
          with the displayed records. Excel, PDF and Power BI require their
          respective integrations for production use.
        </p>
      </div>

      {/* Custom Report Builder */}
      {isCustomBuilder && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-4">
            <h2 className="font-semibold text-slate-800">
              Custom Report Builder
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Create a basic custom report definition.
            </p>
          </div>

          <form
            onSubmit={handleCustomReport}
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Report Name
              </label>
              <input
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                placeholder="Enter report name"
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Data Source
              </label>
              <select
                value={dataSource}
                onChange={(e) => setDataSource(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                {[
                  "Students",
                  "Teachers",
                  "Departments",
                  "Finance",
                  "Attendance",
                  "Admissions",
                ].map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Export Format
              </label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option>Excel</option>
                <option>PDF</option>
                <option>CSV</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                Save Report Definition
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Filter */}
      <div className="mb-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 md:flex-row">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={config.searchPlaceholder || "Search reports..."}
          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 md:flex-1"
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

      {/* Report Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-800">
            {config.title} Records
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Showing {filteredRecords.length} of {records.length} records
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Reference</th>
                <th className="px-5 py-4">Report Name</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Generated By</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Status</th>
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
                  <td className="px-5 py-4 text-slate-600">
                    {record.generatedBy}
                  </td>
                  <td className="px-5 py-4 text-slate-500">
                    {record.date}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
                        statusStyles[record.status] ||
                        "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {record.status}
                    </span>
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
                    No report records found.
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
                  Report Details
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
                  Update Report Status
                </label>
                <select
                  value={selectedRecord.status}
                  onChange={(e) =>
                    updateStatus(selectedRecord.id, e.target.value)
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

              <button
                onClick={() => exportCSV([selectedRecord])}
                className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
              >
                Export This Record as CSV
              </button>
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
