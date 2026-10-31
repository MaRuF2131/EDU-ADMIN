
"use client";

import { useMemo, useState } from "react";

const initialApprovals = [
  { id: "AP-8001", reference: "LV-1001", student: "Rahim Ahmed", type: "Leave", submitted: "2026-10-25", priority: "Normal", status: "Pending", assignedTo: "Department Admin" },
  { id: "AP-8002", reference: "TR-2001", student: "Nusrat Jahan", type: "Transcript", submitted: "2026-10-26", priority: "High", status: "Pending", assignedTo: "Academic Office" },
  { id: "AP-8003", reference: "SC-6001", student: "Sakib Hasan", type: "Scholarship", submitted: "2026-10-27", priority: "High", status: "Processing", assignedTo: "Scholarship Committee" },
  { id: "AP-8004", reference: "CT-3001", student: "Ayesha Rahman", type: "Certificate", submitted: "2026-10-28", priority: "Normal", status: "Approved", assignedTo: "Registrar Office" },
  { id: "AP-8005", reference: "HS-5001", student: "Tanvir Hasan", type: "Hostel", submitted: "2026-10-29", priority: "Low", status: "Rejected", assignedTo: "Hostel Admin" },
];

const badge = {
  Pending: "bg-amber-100 text-amber-700",
  Processing: "bg-blue-100 text-blue-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function ApprovalWorkflowPage() {
  const [approvals, setApprovals] = useState(initialApprovals);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selected, setSelected] = useState(initialApprovals[0]);
  const [remarks, setRemarks] = useState("");

  const filtered = useMemo(() => approvals.filter(x =>
    `${x.id} ${x.reference} ${x.student}`.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "All" || x.status === filter) &&
    (typeFilter === "All" || x.type === typeFilter)
  ), [approvals, search, filter, typeFilter]);

  const update = (status) => {
    setApprovals(prev => prev.map(x => x.id === selected.id ? { ...x, status, remarks } : x));
    setSelected(prev => ({ ...prev, status, remarks }));
  };

  const count = (status) => approvals.filter(x => x.status === status).length;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-800">Approval Workflow</h1><p className="text-sm text-slate-500 mt-1">Centralized approval management for all student applications.</p></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[["Total Applications", approvals.length], ["Pending Approval", count("Pending")], ["In Processing", count("Processing")], ["Approved", count("Approved")]].map(([k, v]) => <div key={k} className="bg-white border border-slate-200 rounded-xl p-5"><p className="text-sm text-slate-500">{k}</p><p className="text-2xl font-bold text-slate-800 mt-3">{v}</p></div>)}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-200 space-y-4">
          <h2 className="font-semibold text-slate-800">All Approval Requests</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search application or student..." className="border border-slate-200 rounded-lg px-3 py-2 text-sm" />
            <select value={filter} onChange={e => setFilter(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm">{["All", "Pending", "Processing", "Approved", "Rejected"].map(s => <option key={s}>{s}</option>)}</select>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm">{["All", "Leave", "Transcript", "Certificate", "ID Card", "Hostel", "Scholarship", "Objection"].map(s => <option key={s}>{s}</option>)}</select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500"><tr>{["Workflow ID", "Reference", "Student", "Application Type", "Assigned To", "Priority", "Status", "Action"].map(h => <th key={h} className="p-4 font-medium whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map(x => <tr key={x.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="p-4 font-medium">{x.id}</td><td className="p-4">{x.reference}</td><td className="p-4 font-medium text-slate-800">{x.student}</td><td className="p-4">{x.type}</td><td className="p-4">{x.assignedTo}</td>
                <td className="p-4"><span className={`text-xs font-medium ${x.priority === "High" ? "text-red-600" : x.priority === "Low" ? "text-slate-500" : "text-blue-600"}`}>{x.priority}</span></td>
                <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs ${badge[x.status]}`}>{x.status}</span></td>
                <td className="p-4"><button onClick={() => { setSelected(x); setRemarks(x.remarks || ""); }} className="text-blue-600 font-medium">Review</button></td>
              </tr>)}
              {filtered.length === 0 && <tr><td colSpan="8" className="p-8 text-center text-slate-500">No approval requests found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex flex-col sm:flex-row justify-between gap-3 mb-5"><div><h2 className="font-semibold text-slate-800">Review Application</h2><p className="text-sm text-slate-500 mt-1">{selected.id} · {selected.reference}</p></div><span className={`px-3 py-1 rounded-full text-xs font-medium h-fit ${badge[selected.status]}`}>{selected.status}</span></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {[["Student", selected.student], ["Application Type", selected.type], ["Assigned To", selected.assignedTo], ["Submitted Date", selected.submitted]].map(([k, v]) => <div key={k} className="bg-slate-50 rounded-lg p-4"><p className="text-xs text-slate-400">{k}</p><p className="font-medium text-slate-800 mt-1">{v}</p></div>)}
          </div>
          <div><label className="text-xs text-slate-500">Approval Remarks</label><textarea value={remarks} onChange={e => setRemarks(e.target.value)} rows="3" className="w-full border border-slate-200 rounded-lg p-3 mt-1 text-sm outline-none focus:border-blue-500" placeholder="Write approval notes or feedback..." /></div>
          <div className="flex flex-wrap gap-2 mt-4">
            <button onClick={() => update("Approved")} className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-green-700">Approve</button>
            <button onClick={() => update("Processing")} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700">Send for Processing</button>
            <button onClick={() => update("Rejected")} className="bg-red-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-red-700">Reject</button>
          </div>
        </div>
      )}
    </div>
  );
}
