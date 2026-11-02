
"use client";

import { useMemo, useState } from "react";

export default function ImportExportList({ config, mode = "history" }) {
  const [records, setRecords] = useState(config.records || []);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [file, setFile] = useState(null);
  const [entity, setEntity] = useState("Students");
  const [message, setMessage] = useState("");

  const statuses = [
    "All",
    ...new Set(records.map((item) => item.status)),
  ];

  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      const text = Object.values(item).join(" ").toLowerCase();
      return (
        text.includes(search.toLowerCase()) &&
        (statusFilter === "All" || item.status === statusFilter)
      );
    });
  }, [records, search, statusFilter]);

  const totalRecords = records.reduce(
    (sum, item) => sum + item.totalRecords,
    0
  );

  const totalProcessed = records.reduce(
    (sum, item) => sum + item.processed,
    0
  );

  const totalFailed = records.reduce(
    (sum, item) => sum + item.failed,
    0
  );

  const stats = [
    { label: "Total Operations", value: records.length },
    { label: "Total Records", value: totalRecords },
    { label: "Processed Records", value: totalProcessed },
    { label: "Failed Records", value: totalFailed },
  ];

  const statusStyle = (status) => {
    const styles = {
      Completed: "bg-green-100 text-green-700",
      Processing: "bg-blue-100 text-blue-700",
      Pending: "bg-amber-100 text-amber-700",
      Failed: "bg-red-100 text-red-700",
    };

    return styles[status] || "bg-slate-100 text-slate-600";
  };

  const exportCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Operation",
      "Entity",
      "Total Records",
      "Processed",
      "Failed",
      "Status",
      "Date",
    ];

    const rows = filteredRecords.map((item) =>
      [
        item.id,
        item.name,
        item.operation,
        item.entity,
        item.totalRecords,
        item.processed,
        item.failed,
        item.status,
        item.date,
      ]
        .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
        .join(",")
    );

    const blob = new Blob(
      ["\uFEFF" + [headers.join(","), ...rows].join("\n")],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${config.title.toLowerCase().replaceAll(" ", "-")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleFile = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const extension = selectedFile.name.split(".").pop().toLowerCase();

    if (mode === "excel" && !["xlsx", "xls"].includes(extension)) {
      setMessage("Please select an Excel file (.xlsx or .xls).");
      setFile(null);
      return;
    }

    if (mode === "csv" && extension !== "csv") {
      setMessage("Please select a CSV file.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setMessage("");
  };

  const startImport = () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const newRecord = {
      id: Date.now(),
      name: file.name,
      operation: config.title,
      entity,
      totalRecords: 0,
      processed: 0,
      failed: 0,
      status: "Pending",
      date: new Date().toISOString().slice(0, 10),
      description:
        "File selected successfully. Backend processing is not connected.",
      fileType: `.${file.name.split(".").pop()}`,
      uploadedBy: "Current Admin",
      fileSize: `${(file.size / 1024).toFixed(1)} KB`,
    };

    setRecords((prev) => [newRecord, ...prev]);
    setFile(null);
    setMessage("File added to demo operation history.");
  };

  const startBulkOperation = () => {
    const newRecord = {
      id: Date.now(),
      name: `${config.title} - ${entity}`,
      operation: config.title,
      entity,
      totalRecords: 0,
      processed: 0,
      failed: 0,
      status: "Pending",
      date: new Date().toISOString().slice(0, 10),
      description:
        "Demo operation created. Connect backend before executing real changes.",
    };

    setRecords((prev) => [newRecord, ...prev]);
    setMessage("Demo operation added to history.");
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-800">
              {stat.value.toLocaleString()}
            </h2>
          </div>
        ))}
      </div>

      {(mode === "excel" || mode === "csv") && (
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            Upload {mode === "excel" ? "Excel" : "CSV"} File
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Select Entity
              </label>
              <select
                value={entity}
                onChange={(e) => setEntity(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                {[
                  "Students",
                  "Teachers",
                  "Departments",
                  "Courses",
                  "Attendance",
                  "Payments",
                ].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Upload File
              </label>
              <input
                type="file"
                accept={mode === "excel" ? ".xlsx,.xls" : ".csv"}
                onChange={handleFile}
                className="w-full rounded-lg border border-slate-200 p-2 text-sm"
              />
            </div>
          </div>

          {file && (
            <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
              <strong>Selected:</strong> {file.name}
              <span className="ml-2 text-slate-500">
                ({(file.size / 1024).toFixed(1)} KB)
              </span>
            </div>
          )}

          <button
            onClick={startImport}
            className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Add Import Job
          </button>
        </div>
      )}

      {mode === "bulk" && (
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            Create Bulk Operation
          </h2>

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Select Entity
          </label>

          <select
            value={entity}
            onChange={(e) => setEntity(e.target.value)}
            className="w-full max-w-md rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            {[
              "Students",
              "Teachers",
              "Departments",
              "Courses",
              "Attendance",
              "Payments",
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <p className="mt-3 text-sm text-slate-500">
            Create a demo operation record. Real changes require backend
            validation and confirmation.
          </p>

          <button
            onClick={startBulkOperation}
            className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Create Operation
          </button>
        </div>
      )}

      {message && (
        <p className="rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
          {message}
        </p>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row">
          <input
            type="text"
            placeholder="Search operations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-blue-500 md:max-w-sm"
          />

          <div className="flex flex-wrap gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>

            <button
              onClick={exportCSV}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="px-4 py-3">Operation</th>
                <th className="px-4 py-3">Entity</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Processed</th>
                <th className="px-4 py-3">Failed</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-4 py-4 font-medium text-slate-800">
                    {item.name}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {item.entity}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {item.totalRecords}
                  </td>
                  <td className="px-4 py-4 text-green-700">
                    {item.processed}
                  </td>
                  <td className="px-4 py-4 text-red-600">
                    {item.failed}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {item.date}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => setSelected(item)}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-4 py-10 text-center text-slate-500">
                    No operation records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">
                Operation Details
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="text-xl text-slate-500"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              {Object.entries(selected).map(([key, value]) => (
                <div
                  key={key}
                  className="flex flex-col gap-1 border-b border-slate-100 pb-3 sm:flex-row sm:justify-between"
                >
                  <span className="text-sm capitalize text-slate-500">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="break-words text-sm font-medium text-slate-800 sm:max-w-[60%] sm:text-right">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-5 w-full rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <strong>Demo Mode:</strong> This page uses mock data. File selection
        and operation creation are local demonstrations only. No database
        records are imported, updated or deleted.
      </div>
    </div>
  );
}
