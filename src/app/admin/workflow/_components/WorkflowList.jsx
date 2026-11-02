
"use client";

import { useMemo, useState } from "react";

export default function WorkflowList({ config }) {
  const [records, setRecords] = useState(config.records || []);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const statuses = ["All", ...new Set(records.map((item) => item.status))];

  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      const searchText = Object.values(item)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, search, statusFilter]);

  const stats = [
    { label: "Total Workflows", value: records.length },
    {
      label: "Pending",
      value: records.filter((item) => item.status === "Pending").length,
    },
    {
      label: "Approved / Active",
      value: records.filter((item) =>
        ["Approved", "Active"].includes(item.status)
      ).length,
    },
    {
      label: "In Review",
      value: records.filter((item) => item.status === "In Review").length,
    },
  ];

  const updateStatus = (id) => {
    setRecords((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Approved" } : item
      )
    );
    setSelected(null);
  };

  const exportCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Category",
      "Initiator",
      "Assigned To",
      "Status",
      "Date",
      "Description",
    ];

    const rows = filteredRecords.map((item) =>
      [
        item.id,
        item.name,
        item.category,
        item.initiator,
        item.assignedTo,
        item.status,
        item.date,
        item.description,
      ]
        .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
        .join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${config.title.toLowerCase().replaceAll(" ", "-")}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const statusClass = (status) => {
    const styles = {
      Pending: "bg-amber-100 text-amber-700",
      Approved: "bg-green-100 text-green-700",
      Active: "bg-green-100 text-green-700",
      "In Review": "bg-blue-100 text-blue-700",
      Disabled: "bg-slate-100 text-slate-600",
      Rejected: "bg-red-100 text-red-700",
    };

    return styles[status] || "bg-slate-100 text-slate-600";
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
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row">
          <input
            type="text"
            placeholder="Search workflow..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-blue-500 md:max-w-sm"
          />

          <div className="flex flex-wrap gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
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
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="px-4 py-3 font-semibold">Name / ID</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Initiator</th>
                <th className="px-4 py-3 font-semibold">Assigned To</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Action</th>
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
                    {item.category}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {item.initiator}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {item.assignedTo}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {item.date}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => setSelected(item)}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRecords.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-10 text-center text-slate-500"
                  >
                    No workflow records found.
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
                Workflow Details
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="text-xl text-slate-500 hover:text-slate-800"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
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

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600"
              >
                Close
              </button>

              {["Pending", "In Review"].includes(selected.status) && (
                <button
                  onClick={() => updateStatus(selected.id)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Mark Approved
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <strong>Demo Mode:</strong> These are sample records. Status changes
        are temporary and will reset after refreshing the page. Connect the
        backend API to enable real workflow processing.
      </div>
    </div>
  );
}
