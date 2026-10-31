
"use client";

import { useMemo, useState } from "react";

const initialRequests = [
  { id: "TR-2001", student: "Rahim Ahmed", studentId: "ST-1001", program: "BSc in CSE", semester: "8th Semester", purpose: "Higher Studies", copies: 2, date: "2026-10-25", status: "Pending" },
  { id: "TR-2002", student: "Nusrat Jahan", studentId: "ST-1002", program: "BBA", semester: "6th Semester", purpose: "Job Application", copies: 1, date: "2026-10-26", status: "Processing" },
  { id: "TR-2003", student: "Sakib Hasan", studentId: "ST-1003", program: "BSc in CSE", semester: "7th Semester", purpose: "Personal", copies: 3, date: "2026-10-27", status: "Completed" },
];

const badge = {
  Pending: "bg-amber-100 text-amber-700",
  Processing: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function TranscriptPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(initialRequests[0]);

  const filtered = useMemo(() => requests.filter((r) =>
    `${r.id} ${r.student} ${r.studentId} ${r.program}`.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "All" || r.status === filter)
  ), [requests, search, filter]);

  const update = (status) => {
    setRequests((prev) => prev.map((r) => r.id === selected.id ? { ...r, status } : r));
    setSelected((prev) => ({ ...prev, status }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-800">Transcript Requests</h1><p className="text-sm text-slate-500 mt-1">Review, process and issue academic transcripts.</p></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          ["Total Requests", requests.length],
          ["Pending", requests.filter((r) => r.status === "Pending").length],
          ["Processing", requests.filter((r) => r.status === "Processing").length],
          ["Completed", requests.filter((r) => r.status === "Completed").length],
        ].map(([label, value]) => <div key={label} className="bg-white border border-slate-200 rounded-xl p-5"><p className="text-sm text-slate-500">{label}</p><p className="text-2xl font-bold text-slate-800 mt-3">{value}</p></div>)}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row justify-between gap-3">
            <h2 className="font-semibold text-slate-800">Transcript Applications</h2>
            <div className="flex gap-2 flex-col sm:flex-row">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="border border-slate-200 rounded-lg px-3 py-2 text-sm" />
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm">{["All", "Pending", "Processing", "Completed", "Rejected"].map((s) => <option key={s}>{s}</option>)}</select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500"><tr>{["Request ID", "Student", "Program", "Purpose", "Copies", "Status", "Action"].map((h) => <th key={h} className="p-4 font-medium whitespace-nowrap">{h}</th>)}</tr></thead>
              <tbody>{filtered.map((r) => <tr key={r.id} className="border-t border-slate-100">
                <td className="p-4 font-medium">{r.id}</td>
                <td className="p-4"><p className="font-medium text-slate-800">{r.student}</p><p className="text-xs text-slate-400">{r.studentId}</p></td>
                <td className="p-4 text-slate-600">{r.program}</td><td className="p-4 text-slate-600">{r.purpose}</td><td className="p-4">{r.copies}</td>
                <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs ${badge[r.status]}`}>{r.status}</span></td>
                <td className="p-4"><button onClick={() => setSelected(r)} className="text-blue-600 font-medium">View</button></td>
              </tr>)}
              {filtered.length === 0 && <tr><td colSpan="7" className="p-8 text-center text-slate-500">No requests found.</td></tr>}</tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 h-fit">
          <h2 className="font-semibold text-slate-800 mb-4">Request Details</h2>
          {selected && <div className="space-y-4">
            {[["Request ID", selected.id], ["Student", selected.student], ["Student ID", selected.studentId], ["Program", selected.program], ["Semester", selected.semester], ["Purpose", selected.purpose], ["Requested Copies", selected.copies], ["Request Date", selected.date]].map(([k, v]) => <div key={k}><p className="text-xs text-slate-400">{k}</p><p className="text-sm font-medium text-slate-700">{v}</p></div>)}
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => update("Processing")} className="bg-blue-600 text-white rounded-lg py-2 text-sm">Process</button>
              <button onClick={() => update("Completed")} className="bg-green-600 text-white rounded-lg py-2 text-sm">Complete</button>
            </div>
            <button onClick={() => update("Rejected")} className="w-full bg-red-50 text-red-600 rounded-lg py-2 text-sm">Reject Request</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
