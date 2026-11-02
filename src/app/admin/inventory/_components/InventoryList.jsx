
"use client";

import { useMemo, useState } from "react";

const statusStyles = {
  Available: "bg-green-100 text-green-700",
  Assigned: "bg-blue-100 text-blue-700",
  "Under Repair": "bg-orange-100 text-orange-700",
  Damaged: "bg-red-100 text-red-700",
  "In Stock": "bg-green-100 text-green-700",
  "Low Stock": "bg-yellow-100 text-yellow-700",
  "Out of Stock": "bg-red-100 text-red-700",
  "In Use": "bg-blue-100 text-blue-700",
  "In Transit": "bg-purple-100 text-purple-700",
  Generated: "bg-green-100 text-green-700",
  "Not Generated": "bg-yellow-100 text-yellow-700",
};

const statusOptions = {
  computers: ["Available", "Assigned", "Under Repair", "Damaged"],
  labEquipment: ["Available", "Assigned", "Under Repair", "Damaged"],
  furniture: ["Available", "Assigned", "Damaged", "Under Repair"],
  stationery: ["In Stock", "Low Stock", "Out of Stock"],
  assetTracking: ["Assigned", "In Use", "In Transit", "Available"],
  barcode: ["Generated", "Not Generated"],
};

const money = (value) =>
  `৳${Number(value || 0).toLocaleString("en-BD")}`;

const excludedKeys = [
  "id",
  "title",
  "category",
  "date",
  "status",
  "description",
];

export default function InventoryList({ config }) {
  const [records, setRecords] = useState(config.records);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const searchableText = [
        record.id,
        record.title,
        record.category,
        record.description,
        record.assetTag,
        record.serialNumber,
        record.sku,
        record.barcode,
        record.brand,
        record.model,
        record.location,
        record.assignedTo,
        record.department,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || record.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, search, statusFilter]);

  const updateStatus = (id, status) => {
    setRecords((previous) =>
      previous.map((record) =>
        record.id === id ? { ...record, status } : record
      )
    );

    setSelected((previous) =>
      previous?.id === id ? { ...previous, status } : previous
    );
  };

  const totalQuantity = records.reduce(
    (sum, record) => sum + Number(record.quantity || 1),
    0
  );

  const activeCount = records.filter((record) =>
    ["Available", "Assigned", "In Stock", "In Use", "Generated"].includes(
      record.status
    )
  ).length;

  const attentionCount = records.filter((record) =>
    [
      "Under Repair",
      "Damaged",
      "Low Stock",
      "Out of Stock",
      "In Transit",
      "Not Generated",
    ].includes(record.status)
  ).length;

  const getPrimaryInfo = (record) => {
    if (config.type === "stationery") {
      return `${record.quantity} ${record.unit || "Units"}`;
    }

    if (config.type === "labEquipment" || config.type === "furniture") {
      return `${record.availableQuantity ?? 0}/${record.quantity ?? 0} Available`;
    }

    if (config.type === "computers") {
      return record.brand || "N/A";
    }

    if (config.type === "assetTracking") {
      return record.currentLocation || "N/A";
    }

    if (config.type === "barcode") {
      return record.barcode || "N/A";
    }

    return record.assetTag || "N/A";
  };

  const getDetailValue = (key, value) => {
    if (
      typeof value === "number" &&
      ["purchasePrice", "unitPrice"].includes(key)
    ) {
      return money(value);
    }

    return String(value);
  };

  const formatLabel = (key) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());

  const selectedDetails = selected
    ? Object.entries(selected).filter(
        ([key, value]) => !excludedKeys.includes(key) && value !== undefined
      )
    : [];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <a href="/admin" className="hover:text-blue-600">
              Admin
            </a>
            <span>/</span>
            <a href="/admin/inventory" className="hover:text-blue-600">
              Inventory Management
            </a>
            <span>/</span>
            <span className="text-slate-700">{config.title}</span>
          </div>

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
              onClick={() =>
                alert("Create form can be connected with the backend later.")
              }
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              + Add New Record
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total Records</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-800">
              {records.length}
            </h2>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total Quantity</p>
            <h2 className="mt-2 text-2xl font-bold text-blue-600">
              {totalQuantity}
            </h2>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Needs Attention</p>
            <h2 className="mt-2 text-2xl font-bold text-orange-600">
              {attentionCount}
            </h2>
          </div>
        </div>

        {/* Records Table */}
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-4 flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by asset, ID, brand, serial..."
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 md:max-w-md"
            />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
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

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                  <th className="px-4 py-3">Reference</th>
                  <th className="px-4 py-3">Asset Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Details</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-4 py-4 font-medium text-blue-600">
                      {record.id}
                    </td>

                    <td className="px-4 py-4 font-medium text-slate-800">
                      {record.title}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {record.category}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {getPrimaryInfo(record)}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {record.date}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          statusStyles[record.status] ||
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <button
                        onClick={() => setSelected(record)}
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
                      No inventory records found.
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
                  Asset Details
                </h2>
                <p className="text-sm text-slate-500">{selected.id}</p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-xs text-slate-500">Asset Name</p>
                <p className="mt-1 font-medium text-slate-800">
                  {selected.title}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Category</p>
                <p className="mt-1 font-medium text-slate-800">
                  {selected.category}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Date</p>
                <p className="mt-1 font-medium text-slate-800">
                  {selected.date}
                </p>
              </div>

              {selectedDetails.map(([key, value]) => (
                <div key={key}>
                  <p className="text-xs text-slate-500">
                    {formatLabel(key)}
                  </p>
                  <p className="mt-1 break-words font-medium text-slate-800">
                    {getDetailValue(key, value)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <p className="mb-1 text-xs text-slate-500">Description</p>
              <p className="text-sm text-slate-700">
                {selected.description}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <label className="text-sm font-medium text-slate-700">
                Update Status:
              </label>

              <select
                value={selected.status}
                onChange={(event) =>
                  updateStatus(selected.id, event.target.value)
                }
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
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
