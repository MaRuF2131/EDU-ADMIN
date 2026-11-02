
"use client";

import { useMemo, useState } from "react";

const initialLeaves = [
  { id: "LV-1001", student: "Rahim Ahmed", studentId: "ST-1001", type: "Medical Leave", from: "2026-11-03", to: "2026-11-07", days: 5, reason: "Medical treatment", status: "Pending" },
  { id: "LV-1002", student: "Nusrat Jahan", studentId: "ST-1002", type: "Personal Leave", from: "2026-11-05", to: "2026-11-06", days: 2, reason: "Family matter", status: "Approved" },
  { id: "LV-1003", student: "Sakib Hasan", studentId: "ST-1003", type: "Emergency Leave", from: "2026-11-08", to: "2026-11-10", days: 3, reason: "Emergency situation", status: "Processing" },
];

const statusStyle = {
  Pending: "bg-amber-100 text-amber-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Processing: "bg-blue-100 text-blue-700",
};

export default function LeaveManagementPage() {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(initialLeaves[0]);
  const [remarks, setRemarks] = useState("");

  const filtered = useMemo(() => leaves.filter((item) => {
    const matchSearch = `${item.id} ${item.student} ${item.studentId} ${item.type}`.toLowerCase().includes(search.toLowerCase());
    return matchSearch && (filter === "All" || item.status === filter);
  }), [leaves, search, filter]);

  const updateStatus = (status) => {
    setLeaves((prev) => prev.map((item) => item.id === selected?.id ? { ...item, status, remarks } : item));
    setSelected((prev) => prev ? { ...prev, status, remarks } : prev);
    setRemarks("");
  };

  const count = (status) => leaves.filter((item) => item.status === status).length;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Leave Management</h1>
        <p className="text-sm text-slate-500 mt-1">Manage and review student leave applications.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          ["Total Applications", leaves.length, "📋"],
          ["Pending", count("Pending"), "⏳"],
          ["Approved", count("Approved"), "✅"],
          ["Rejected", count("Rejected"), "❌"],
        ].map(([label, value, icon]) => (
          <div key={label} className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex justify-between"><p className="text-sm text-slate-500">{label}</p><span>{icon}</span></div>
            <h2 className="text-2xl font-bold text-slate-800 mt-3">{value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row gap-3 justify-between">
            <h2 className="font-semibold text-slate-800">Leave Applications</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search student..." className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500" />
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm">
                {["All", "Pending", "Processing", "Approved", "Rejected"].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500">
                <tr>{["Application", "Student", "Leave Type", "Duration", "Status", "Action"].map((h) => <th key={h} className="p-4 font-medium whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-700">{item.id}</td>
                    <td className="p-4"><p className="font-medium text-slate-800">{item.student}</p><p className="text-xs text-slate-400">{item.studentId}</p></td>
                    <td className="p-4 text-slate-600">{item.type}</td>
                    <td className="p-4 text-slate-600 whitespace-nowrap">{item.days} days</td>
                    <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[item.status]}`}>{item.status}</span></td>
                    <td className="p-4"><button onClick={() => { setSelected(item); setRemarks(item.remarks || ""); }} className="text-blue-600 hover:text-blue-800 font-medium">View</button></td>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan="6" className="p-8 text-center text-slate-500">No applications found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 h-fit">
          <h2 className="font-semibold text-slate-800 mb-4">Application Details</h2>
          {selected ? (
            <div className="space-y-4">
              <div><p className="text-xs text-slate-400">Application ID</p><p className="font-semibold text-slate-800">{selected.id}</p></div>
              <div><p className="text-xs text-slate-400">Student</p><p className="font-medium text-slate-800">{selected.student}</p></div>
              <div><p className="text-xs text-slate-400">Leave Type</p><p className="text-slate-700">{selected.type}</p></div>
              <div><p className="text-xs text-slate-400">Date</p><p className="text-slate-700">{selected.from} to {selected.to}</p></div>
              <div><p className="text-xs text-slate-400">Reason</p><p className="text-slate-700">{selected.reason}</p></div>
              <div><label className="text-xs text-slate-500">Admin Remarks</label><textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows="3" className="w-full border border-slate-200 rounded-lg p-3 mt-1 text-sm outline-none focus:border-blue-500" placeholder="Write remarks..." /></div>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => updateStatus("Approved")} className="bg-green-600 text-white rounded-lg py-2 text-xs font-medium hover:bg-green-700">Approve</button>
                <button onClick={() => updateStatus("Processing")} className="bg-blue-600 text-white rounded-lg py-2 text-xs font-medium hover:bg-blue-700">Process</button>
                <button onClick={() => updateStatus("Rejected")} className="bg-red-600 text-white rounded-lg py-2 text-xs font-medium hover:bg-red-700">Reject</button>
              </div>
            </div>
          ) : <p className="text-sm text-slate-500">Select an application.</p>}
        </div>
      </div>
    </div>
  );
}
