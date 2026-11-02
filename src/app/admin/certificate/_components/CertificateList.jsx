
"use client";

import { useMemo, useState } from "react";

const statusOptions = {
  templates: ["Draft", "Active", "Inactive", "Archived"],
  digitalSignature: ["Pending", "Active", "Expired", "Revoked"],
  qrVerification: ["Generated", "Not Generated", "Inactive"],
  onlineVerification: ["Pending", "Verified", "Rejected"],
};

const statusStyles = {
  Draft: "bg-slate-100 text-slate-700",
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-slate-100 text-slate-600",
  Archived: "bg-slate-200 text-slate-700",
  Pending: "bg-amber-100 text-amber-700",
  Expired: "bg-red-100 text-red-700",
  Revoked: "bg-red-100 text-red-700",
  Generated: "bg-green-100 text-green-700",
  "Not Generated": "bg-amber-100 text-amber-700",
  Verified: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function CertificateList({ config }) {
  const [records, setRecords] = useState(config.records);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      const searchableText = [
        item.id,
        item.title,
        item.category,
        item.description,
        item.certificateNumber,
        item.studentName,
        item.studentId,
        item.signerName,
        item.designation,
        item.templateCode,
        item.requestedBy,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(
        search.toLowerCase()
      );

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, search, statusFilter]);

  const activeCount = records.filter((item) =>
    ["Active", "Generated", "Verified"].includes(item.status)
  ).length;

  const pendingCount = records.filter((item) =>
    ["Draft", "Pending", "Not Generated"].includes(item.status)
  ).length;

  const updateStatus = (id, status) => {
    setRecords((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    setSelected((previous) =>
      previous?.id === id ? { ...previous, status } : previous
    );
  };

  const handleAdd = () => {
    alert("Create form will be connected with the backend later.");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {config.title}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {config.subtitle}
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            + Add New Record
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Records"
            value={records.length}
            icon="📜"
          />
          <StatCard
            title="Active / Verified"
            value={activeCount}
            icon="✅"
          />
          <StatCard
            title="Pending / Draft"
            value={pendingCount}
            icon="⏳"
          />
          <StatCard
            title="Filtered Records"
            value={filteredRecords.length}
            icon="🔎"
          />
        </div>

        {/* Search and Filter */}
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <input
              type="text"
              placeholder="Search by title, ID, student, certificate number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 md:col-span-2"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              {statusOptions[config.type]?.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Records Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold text-slate-800">
              {config.title} Records
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4">Reference</th>
                  <th className="px-5 py-4">Title</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Student / Signer</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-700">
                      {item.id}
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        {item.title}
                      </p>
                      <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                        {item.description}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {item.category}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {item.studentName ||
                        item.signerName ||
                        item.department ||
                        "—"}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                      {item.date}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          statusStyles[item.status] ||
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => setSelected(item)}
                        className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50"
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
                      className="px-5 py-10 text-center text-slate-500"
                    >
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Panel */}
        {selected && (
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Certificate Record Details
                </h2>
                <p className="text-sm text-slate-500">
                  {selected.id}
                </p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(selected)
                .filter(
                  ([key]) =>
                    !["id", "description", "status"].includes(key)
                )
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-lg bg-slate-50 p-3"
                  >
                    <p className="text-xs capitalize text-slate-500">
                      {key.replace(/([A-Z])/g, " $1")}
                    </p>
                    <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                      {String(value)}
                    </p>
                  </div>
                ))}
            </div>

            <div className="mt-4 rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Description</p>
              <p className="mt-1 text-sm text-slate-700">
                {selected.description}
              </p>
            </div>

            <div className="mt-5 max-w-sm">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Update Status
              </label>

              <select
                value={selected.status}
                onChange={(e) =>
                  updateStatus(selected.id, e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                {statusOptions[config.type]?.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}
