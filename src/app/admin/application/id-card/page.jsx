
"use client";

import { useMemo, useState } from "react";

const initialCards = [
  { id: "ID-4001", student: "Rahim Ahmed", studentId: "ST-1001", program: "BSc in CSE", requestType: "New ID Card", reason: "New admission", date: "2026-10-25", status: "Pending" },
  { id: "ID-4002", student: "Nusrat Jahan", studentId: "ST-1002", program: "BBA", requestType: "Replacement", reason: "Lost ID card", date: "2026-10-26", status: "Processing" },
  { id: "ID-4003", student: "Sakib Hasan", studentId: "ST-1003", program: "BSc in CSE", requestType: "Renewal", reason: "Card expired", date: "2026-10-27", status: "Approved" },
];

const badge = {
  Pending: "bg-amber-100 text-amber-700",
  Processing: "bg-blue-100 text-blue-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Issued: "bg-purple-100 text-purple-700",
};

export default function IDCardPage() {
  const [cards, setCards] = useState(initialCards);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(initialCards[0]);

  const filtered = useMemo(() => cards.filter(x =>
    `${x.id} ${x.student} ${x.studentId}`.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "All" || x.status === filter)
  ), [cards, search, filter]);

  const update = (status) => {
    setCards(prev => prev.map(x => x.id === selected.id ? { ...x, status } : x));
    setSelected(prev => ({ ...prev, status }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-800">ID Card Management</h1><p className="text-sm text-slate-500 mt-1">Manage new ID cards, replacements and renewals.</p></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[["Total Requests", cards.length], ["Pending", cards.filter(x => x.status === "Pending").length], ["Processing", cards.filter(x => x.status === "Processing").length], ["Issued", cards.filter(x => x.status === "Issued").length]].map(([k, v]) => <div key={k} className="bg-white border border-slate-200 rounded-xl p-5"><p className="text-sm text-slate-500">{k}</p><p className="text-2xl font-bold mt-3 text-slate-800">{v}</p></div>)}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row gap-3 justify-between"><h2 className="font-semibold text-slate-800">ID Card Applications</h2><div className="flex gap-2 flex-col sm:flex-row"><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student..." className="border border-slate-200 rounded-lg px-3 py-2 text-sm" /><select value={filter} onChange={e => setFilter(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm">{["All", "Pending", "Processing", "Approved", "Rejected", "Issued"].map(s => <option key={s}>{s}</option>)}</select></div></div>
          <div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead className="bg-slate-50 text-slate-500"><tr>{["Request ID", "Student", "Request Type", "Reason", "Status", "Action"].map(h => <th key={h} className="p-4 font-medium whitespace-nowrap">{h}</th>)}</tr></thead><tbody>{filtered.map(x => <tr key={x.id} className="border-t border-slate-100"><td className="p-4 font-medium">{x.id}</td><td className="p-4"><p className="font-medium">{x.student}</p><p className="text-xs text-slate-400">{x.studentId}</p></td><td className="p-4">{x.requestType}</td><td className="p-4">{x.reason}</td><td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs ${badge[x.status]}`}>{x.status}</span></td><td className="p-4"><button onClick={() => setSelected(x)} className="text-blue-600 font-medium">View</button></td></tr>)}{filtered.length === 0 && <tr><td colSpan="6" className="p-8 text-center text-slate-500">No requests found.</td></tr>}</tbody></table></div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 h-fit"><h2 className="font-semibold mb-4 text-slate-800">Request Details</h2>{selected && <div className="space-y-4">
          {[["Request ID", selected.id], ["Student", selected.student], ["Student ID", selected.studentId], ["Program", selected.program], ["Request Type", selected.requestType], ["Reason", selected.reason], ["Applied Date", selected.date]].map(([k, v]) => <div key={k}><p className="text-xs text-slate-400">{k}</p><p className="text-sm font-medium text-slate-700">{v}</p></div>)}
          <button onClick={() => update("Approved")} className="w-full bg-green-600 text-white rounded-lg py-2 text-sm">Approve Request</button>
          <button onClick={() => update("Processing")} className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm">Send for Printing</button>
          <button onClick={() => update("Issued")} className="w-full bg-purple-600 text-white rounded-lg py-2 text-sm">Mark as Issued</button>
          <button onClick={() => update("Rejected")} className="w-full bg-red-50 text-red-600 rounded-lg py-2 text-sm">Reject Request</button>
        </div>}</div>
      </div>
    </div>
  );
}
