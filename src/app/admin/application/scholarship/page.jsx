
"use client";

import { useMemo, useState } from "react";

const initialScholarships = [
  { id: "SC-6001", student: "Rahim Ahmed", studentId: "ST-1001", scholarship: "Merit Scholarship", category: "Merit", cgpa: "3.90", amount: "৳25,000", date: "2026-10-25", status: "Pending" },
  { id: "SC-6002", student: "Nusrat Jahan", studentId: "ST-1002", scholarship: "Need Based Support", category: "Need Based", cgpa: "3.65", amount: "৳15,000", date: "2026-10-26", status: "Approved" },
  { id: "SC-6003", student: "Sakib Hasan", studentId: "ST-1003", scholarship: "Government Scholarship", category: "Government", cgpa: "3.75", amount: "৳20,000", date: "2026-10-27", status: "Processing" },
];

const badge = {
  Pending: "bg-amber-100 text-amber-700",
  Approved: "bg-green-100 text-green-700",
  Processing: "bg-blue-100 text-blue-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function ScholarshipApplicationsPage() {
  const [items, setItems] = useState(initialScholarships);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(initialScholarships[0]);
  const [remarks, setRemarks] = useState("");

  const filtered = useMemo(() => items.filter(x =>
    `${x.id} ${x.student} ${x.scholarship}`.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "All" || x.status === filter)
  ), [items, search, filter]);

  const update = (status) => {
    setItems(prev => prev.map(x => x.id === selected.id ? { ...x, status, remarks } : x));
    setSelected(prev => ({ ...prev, status, remarks }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-800">Scholarship Applications</h1><p className="text-sm text-slate-500 mt-1">Evaluate student eligibility and manage scholarship awards.</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">{[["Total Applications", items.length], ["Pending", items.filter(x => x.status === "Pending").length], ["Approved", items.filter(x => x.status === "Approved").length], ["Processing", items.filter(x => x.status === "Processing").length]].map(([k, v]) => <div key={k} className="bg-white border border-slate-200 rounded-xl p-5"><p className="text-sm text-slate-500">{k}</p><p className="text-2xl font-bold text-slate-800 mt-3">{v}</p></div>)}</div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row gap-3 justify-between"><h2 className="font-semibold text-slate-800">Scholarship Requests</h2><div className="flex flex-col sm:flex-row gap-2"><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student..." className="border border-slate-200 rounded-lg px-3 py-2 text-sm" /><select value={filter} onChange={e => setFilter(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm">{["All", "Pending", "Processing", "Approved", "Rejected"].map(s => <option key={s}>{s}</option>)}</select></div></div>
          <div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead className="bg-slate-50 text-slate-500"><tr>{["Application", "Student", "Scholarship", "CGPA", "Amount", "Status", "Action"].map(h => <th key={h} className="p-4 font-medium whitespace-nowrap">{h}</th>)}</tr></thead><tbody>{filtered.map(x => <tr key={x.id} className="border-t border-slate-100"><td className="p-4 font-medium">{x.id}</td><td className="p-4"><p className="font-medium">{x.student}</p><p className="text-xs text-slate-400">{x.studentId}</p></td><td className="p-4">{x.scholarship}</td><td className="p-4">{x.cgpa}</td><td className="p-4">{x.amount}</td><td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs ${badge[x.status]}`}>{x.status}</span></td><td className="p-4"><button onClick={() => { setSelected(x); setRemarks(x.remarks || ""); }} className="text-blue-600 font-medium">View</button></td></tr>)}{filtered.length === 0 && <tr><td colSpan="7" className="p-8 text-center text-slate-500">No applications found.</td></tr>}</tbody></table></div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 h-fit"><h2 className="font-semibold text-slate-800 mb-4">Application Review</h2>{selected && <div className="space-y-4">
          {[["Application ID", selected.id], ["Student", selected.student], ["Student ID", selected.studentId], ["Scholarship", selected.scholarship], ["Category", selected.category], ["CGPA", selected.cgpa], ["Requested Amount", selected.amount]].map(([k, v]) => <div key={k}><p className="text-xs text-slate-400">{k}</p><p className="text-sm font-medium text-slate-700">{v}</p></div>)}
          <div><label className="text-xs text-slate-500">Review Remarks</label><textarea rows="3" value={remarks} onChange={e => setRemarks(e.target.value)} className="w-full border border-slate-200 rounded-lg p-3 mt-1 text-sm" placeholder="Write review..." /></div>
          <button onClick={() => update("Approved")} className="w-full bg-green-600 text-white rounded-lg py-2 text-sm">Approve Scholarship</button>
          <button onClick={() => update("Processing")} className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm">Under Review</button>
          <button onClick={() => update("Rejected")} className="w-full bg-red-50 text-red-600 rounded-lg py-2 text-sm">Reject Application</button>
        </div>}</div>
      </div>
    </div>
  );
}
