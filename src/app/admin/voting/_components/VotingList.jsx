
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Upcoming: "bg-amber-100 text-amber-700",
  Draft: "bg-slate-100 text-slate-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function VotingList({ config }) {
  const [items, setItems] = useState(config.items);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(config.items[0] || null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [items, search, statusFilter]);

  const count = (status) =>
    items.filter((item) => item.status === status).length;

  const updateStatus = (id, status) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    setSelected((prev) =>
      prev?.id === id ? { ...prev, status } : prev
    );
  };

  const statCards = [
    {
      label: "Total Records",
      value: items.length,
      icon: "📊",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Active",
      value: count("Active"),
      icon: "🟢",
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Upcoming",
      value: count("Upcoming"),
      icon: "🕒",
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Completed",
      value: count("Completed"),
      icon: "✅",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/admin" className="hover:text-blue-600">
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/admin/voting/features" className="hover:text-blue-600">
            Voting Management
          </Link>
          <span>/</span>
          <span className="font-medium text-slate-700">{config.title}</span>
        </div>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {config.title}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {config.description}
            </p>
          </div>

          <button
            onClick={() =>
              alert("Create form UI can be connected with backend later.")
            }
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            + Create New
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-800">
                  {stat.value}
                </h2>
              </div>
              <div className={`rounded-xl p-3 text-xl ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            placeholder="Search by title, reference or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Draft">Draft</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4">
          <h2 className="font-semibold text-slate-800">
            {config.listTitle}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Showing {filteredItems.length} of {items.length} records
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Reference</th>
                <th className="px-5 py-4">Title</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Voting Period</th>
                <th className="px-5 py-4">Votes</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className={`transition hover:bg-slate-50 ${
                    selected?.id === item.id ? "bg-blue-50/50" : ""
                  }`}
                >
                  <td className="px-5 py-4 font-medium text-blue-600">
                    {item.id}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-800">
                      {item.title}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {item.category}
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500">
                    <p>{item.startDate}</p>
                    <p className="mt-1">To: {item.endDate}</p>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-700">
                    {item.votes.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
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
                      className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}

              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-5 py-10 text-center text-slate-500">
                    No voting records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Panel */}
      {selected && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-blue-600">
                Selected Record: {selected.id}
              </p>
              <h2 className="mt-1 text-lg font-bold text-slate-800">
                {selected.title}
              </h2>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                statusStyles[selected.status] ||
                "bg-slate-100 text-slate-700"
              }`}
            >
              {selected.status}
            </span>
          </div>

          <p className="mb-5 text-sm leading-6 text-slate-600">
            {selected.description}
          </p>

          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Category</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {selected.category}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Total Votes</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {selected.votes.toLocaleString()}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Start Date</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {selected.startDate}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-500">End Date</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {selected.endDate}
              </p>
            </div>
          </div>

          {selected.extra &&
            Object.entries(selected.extra).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col justify-between gap-1 border-b border-slate-100 py-2 text-sm sm:flex-row"
              >
                <span className="capitalize text-slate-500">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
                <span className="font-medium text-slate-800">{value}</span>
              </div>
            ))}

          <div className="mt-5">
            <p className="mb-3 text-sm font-semibold text-slate-700">
              Manage Status
            </p>

            <div className="flex flex-wrap gap-2">
              {["Active", "Upcoming", "Completed", "Draft", "Cancelled"].map(
                (status) => (
                  <button
                    key={status}
                    disabled={selected.status === status}
                    onClick={() => updateStatus(selected.id, status)}
                    className={`rounded-lg border px-3 py-2 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
                      selected.status === status
                        ? "border-slate-200 bg-slate-100 text-slate-400"
                        : "border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
