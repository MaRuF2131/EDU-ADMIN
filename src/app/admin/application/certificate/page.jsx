
"use client";

import { useMemo, useState } from "react";

const initialCertificates = [
  { id: "CT-3001", student: "Rahim Ahmed", studentId: "ST-1001", type: "Character Certificate", program: "BSc in CSE", date: "2026-10-25", status: "Pending" },
  { id: "CT-3002", student: "Nusrat Jahan", studentId: "ST-1002", type: "Bonafide Certificate", program: "BBA", date: "2026-10-26", status: "Approved" },
  { id: "CT-3003", student: "Sakib Hasan", studentId: "ST-1003", type: "Completion Certificate", program: "BSc in CSE", date: "2026-10-27", status: "Processing" },
];

const styles = {
  Pending: "bg-amber-100 text-amber-700",
  Approved: "bg-green-100 text-green-700",
  Processing: "bg-blue-100 text-blue-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function CertificatePage() {
  const [items, setItems] = useState(initialCertificates);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(initialCertificates[0]);
  const [remarks, setRemarks] = useState("");

  const filtered = useMemo(() => items.filter((x) =>
    `${x.id} ${x.student} ${x.type} ${x.studentId}`.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "All" || x.status === filter)
  ), [items, search, filter]);

  const update = (status) => {
    setItems((prev) => prev.map((x) => x.id === selected.id ? { ...x, status, remarks } : x));
    setSelected((prev) => ({ ...prev, status, remarks }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-800">Certificate Management</h1><p className="text-sm text-slate-500 mt-1">Manage student certificate requests and issuance.</p></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[["Total Requests", items.length], ["Pending", items.filter(x => x.status === "Pending").length], ["Approved", items.filter(x => x.status === "Approved").length], ["Processing", items.filter(x => x.status === "Processing").length]].map(([label, value]) => <div key={label} className="bg-white border border-slate-200 rounded-xl p-5"><p className="text-sm text-slate-500">{label}</p><p className="text-2xl font-bold text-slate-800 mt-3">{value}</p></div>)}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row gap-3 justify-between"><h2 className="font-semibold text-slate-800">Certificate Applications</h2>
            <div className="flex gap-2 flex-col sm:flex-row"><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="border border-slate-200 rounded-lg px-3 py-2 text-sm" /><select value={filter} onChange={e => setFilter(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm">{["All", "Pending", "Approved", "Processing", "Rejected"].map(s => <option key={s}>{s}</option>)}</select></div>
          </div>
          <div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead className="bg-slate-50 text-slate-500"><tr>{["ID", "Student", "Certificate Type", "Program", "Date", "Status", "Action"].map(h => <th key={h} className="p-4 font-medium whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody>{filtered.map(x => <tr key={x.id} className="border-t border-slate-100"><td className="p-4 font-medium">{x.id}</td><td className="p-4"><p className="font-medium text-slate-800">{x.student}</p><p className="text-xs text-slate-400">{x.studentId}</p></td><td className="p-4">{x.type}</td><td className="p-4">{x.program}</td><td className="p-4">{x.date}</td><td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs ${styles[x.status]}`}>{x.status}</span></td><td className="p-4"><button onClick={() => { setSelected(x); setRemarks(x.remarks || ""); }} className="text-blue-600 font-medium">View</button></td></tr>)}
              {filtered.length === 0 && <tr><td colSpan="7" className="p-8 text-center text-slate-500">No requests found.</td></tr>}</tbody></table></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 h-fit"><h2 className="font-semibold text-slate-800 mb-4">Request Details</h2>
          {selected && <div className="space-y-4">
            {[["Application ID", selected.id], ["Student", selected.student], ["Student ID", selected.studentId], ["Certificate", selected.type], ["Program", selected.program], ["Applied Date", selected.date]].map(([k, v]) => <div key={k}><p className="text-xs text-slate-400">{k}</p><p className="text-sm font-medium text-slate-700">{v}</p></div>)}
            <div><label className="text-xs text-slate-500">Remarks</label><textarea value={remarks} onChange={e => setRemarks(e.target.value)} className="w-full border border-slate-200 rounded-lg p-3 mt-1 text-sm" rows="3" placeholder="Write remarks..." /></div>
            <button onClick={() => update("Approved")} className="w-full bg-green-600 text-white rounded-lg py-2 text-sm">Approve</button>
            <button onClick={() => update("Processing")} className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm">Start Processing</button>
            <button onClick={() => update("Rejected")} className="w-full bg-red-50 text-red-600 rounded-lg py-2 text-sm">Reject</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
