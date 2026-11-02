
"use client";

import { useMemo, useState } from "react";

const statusStyles = {
  Delivered: "bg-green-100 text-green-700",
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Scheduled: "bg-blue-100 text-blue-700",
  Failed: "bg-red-100 text-red-700",
  Active: "bg-green-100 text-green-700",
  "Under Review": "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-slate-100 text-slate-700",
};

const formatValue = (value) => {
  if (Array.isArray(value)) return value.join(", ");
  if (value === null || value === undefined || value === "") return "N/A";
  return String(value);
};

const escapeCSV = (value) =>
  `"${formatValue(value).replace(/"/g, '""')}"`;

export default function NotificationList({ config }) {
  const [records, setRecords] = useState(config.records || []);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    recipient: "",
    message: "",
    date: "",
    time: "",
    repeat: "Once",
  });

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
      label: "Total Notifications",
      value: records.length,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Delivered / Completed",
      value: records.filter((item) =>
        ["Delivered", "Completed"].includes(item.status)
      ).length,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Pending / Scheduled",
      value: records.filter((item) =>
        ["Pending", "Scheduled", "Under Review"].includes(item.status)
      ).length,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      label: "Failed",
      value: records.filter((item) => item.status === "Failed").length,
      color: "text-red-600",
      bg: "bg-red-50",
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

  const exportCSV = () => {
    if (!filteredRecords.length) {
      alert("No notifications available to export.");
      return;
    }

    const headers = Object.keys(filteredRecords[0]);

    const csvRows = [
      headers.map(escapeCSV).join(","),
      ...filteredRecords.map((record) =>
        headers.map((header) => escapeCSV(record[header])).join(",")
      ),
    ];

    const blob = new Blob(["\uFEFF" + csvRows.join("\n")], {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.recipient.trim()) {
      alert("Please enter notification title and recipient.");
      return;
    }

    const scheduled = config.mode === "scheduled";

    const newRecord = {
      id: `NTF-${Date.now().toString().slice(-6)}`,
      title: formData.title,
      recipient: formData.recipient,
      type: config.title,
      date: formData.date || new Date().toISOString().slice(0, 10),
      status: scheduled ? "Scheduled" : "Pending",
      description: formData.message || "New notification created.",
      message: formData.message,
      ...(scheduled && {
        scheduledTime: formData.time || "09:00 AM",
        timezone: "Asia/Dhaka",
        repeat: formData.repeat,
      }),
      createdBy: "Admin",
    };

    setRecords((previous) => [newRecord, ...previous]);

    setFormData({
      title: "",
      recipient: "",
      message: "",
      date: "",
      time: "",
      repeat: "Once",
    });

    setShowForm(false);
  };

  const updateForm = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const isScheduled = config.mode === "scheduled";

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-blue-600">
            Notification Center
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
            onClick={exportCSV}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Export CSV
          </button>

          <button
            onClick={() => setShowForm(true)}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            {isScheduled ? "+ Schedule Notification" : "+ New Notification"}
          </button>
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
          Notification Management
        </h3>
        <p className="mt-1 text-sm leading-6 text-blue-800">
          This page currently uses demonstration records. Creating a
          notification or schedule only updates frontend state. Actual
          delivery requires the respective messaging provider and backend
          integration.
        </p>
      </div>

      {/* New Notification Form */}
      {showForm && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-800">
                {isScheduled ? "Schedule Notification" : "Create Notification"}
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Enter the notification details below.
              </p>
            </div>

            <button
              onClick={() => setShowForm(false)}
              className="text-xl text-slate-500 hover:text-slate-800"
            >
              ×
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Notification Title
              </label>
              <input
                value={formData.title}
                onChange={(e) => updateForm("title", e.target.value)}
                placeholder="Enter title"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Recipient
              </label>
              <input
                value={formData.recipient}
                onChange={(e) => updateForm("recipient", e.target.value)}
                placeholder="Student, group, phone or email"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => updateForm("message", e.target.value)}
                placeholder="Write notification message..."
                rows={3}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {isScheduled && (
              <>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Schedule Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => updateForm("date", e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Schedule Time
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => updateForm("time", e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Repeat
                  </label>
                  <select
                    value={formData.repeat}
                    onChange={(e) => updateForm("repeat", e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  >
                    <option>Once</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
              </>
            )}

            <div className="flex flex-wrap gap-2 md:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                {isScheduled ? "Save Schedule" : "Save Notification"}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
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
          placeholder={config.searchPlaceholder || "Search notifications..."}
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

      {/* Notification Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-800">
            {config.title} Records
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Showing {filteredRecords.length} of {records.length} notifications
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Reference</th>
                <th className="px-5 py-4">Notification</th>
                <th className="px-5 py-4">Recipient</th>
                <th className="px-5 py-4">Type</th>
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
                    {record.recipient}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {record.type}
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
                    No notifications found.
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
                  Notification Details
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
                  Update Status
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
                  Changes are temporary and stored only in frontend state.
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
