
"use client";

import { useMemo, useState } from "react";

const initialApplications = [
  { id: "HS-5001", student: "Rahim Ahmed", studentId: "ST-1001", gender: "Male", hostel: "Sheikh Russel Hall", roomType: "Single", semester: "8th", date: "2026-10-25", status: "Pending" },
  { id: "HS-5002", student: "Nusrat Jahan", studentId: "ST-1002", gender: "Female", hostel: "Begum Rokeya Hall", roomType: "Shared", semester: "6th", date: "2026-10-26", status: "Approved" },
  { id: "HS-5003", student: "Sakib Hasan", studentId: "ST-1003", gender: "Male", hostel: "Sheikh Russel Hall", roomType: "Shared", semester: "7th", date: "2026-10-27", status: "Processing" },
];

const badge = {
  Pending: "bg-amber-100 text-amber-700",
  Approved: "bg-green-100 text-green-700",
  Processing: "bg-blue-100 text-blue-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function HostelPage() {
  const [applications, setApplications] = useState(initialApplications);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(initialApplications[0]);
  const [room, setRoom] = useState("");

  const filtered = useMemo(() => applications.filter(x =>
    `${x.id} ${x.student} ${x.hostel}`.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "All" || x.status === filter)
  ), [applications, search, filter]);

  const update = (status) => {
    setApplications(prev => prev.map(x => x.id === selected.id ? { ...x, status, room: status === "Approved" ? room : x.room } : x));
    setSelected(prev => ({ ...prev, status, room: status === "Approved" ? room : prev.room }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-800">Hostel Applications</h1><p className="text-sm text-slate-500 mt-1">Review hostel applications and allocate rooms.</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">{[["Total Applications", applications.length], ["Pending", applications.filter(x => x.status === "Pending").length], ["Approved", applications.filter(x => x.status === "Approved").length], ["Processing", applications.filter(x => x.status === "Processing").length]].map(([k, v]) => <div key={k} className="bg-white border border-slate-200 rounded-xl p-5"><p className="text-sm text-slate-500">{k}</p><p className="text-2xl font-bold text-slate-800 mt-3">{v}</p></div>)}</div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row gap-3 justify-between"><h2 className="font-semibold text-slate-800">Hostel Requests</h2><div className="flex flex-col sm:flex-row gap-2"><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="border border-slate-200 rounded-lg px-3 py-2 text-sm" /><select value={filter} onChange={e => setFilter(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm">{["All", "Pending", "Processing", "Approved", "Rejected"].map(s => <option key={s}>{s}</option>)}</select></div></div>
          <div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead className="bg-slate-50 text-slate-500"><tr>{["Application", "Student", "Hostel", "Room Type", "Status", "Action"].map(h => <th key={h} className="p-4 font-medium whitespace-nowrap">{h}</th>)}</tr></thead><tbody>{filtered.map(x => <tr key={x.id} className="border-t border-slate-100"><td className="p-4 font-medium">{x.id}</td><td className="p-4"><p className="font-medium">{x.student}</p><p className="text-xs text-slate-400">{x.studentId}</p></td><td className="p-4">{x.hostel}</td><td className="p-4">{x.roomType}</td><td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs ${badge[x.status]}`}>{x.status}</span></td><td className="p-4"><button onClick={() => { setSelected(x); setRoom(x.room || ""); }} className="text-blue-600 font-medium">View</button></td></tr>)}{filtered.length === 0 && <tr><td colSpan="6" className="p-8 text-center text-slate-500">No applications found.</td></tr>}</tbody></table></div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 h-fit"><h2 className="font-semibold text-slate-800 mb-4">Application Details</h2>{selected && <div className="space-y-4">
          {[["Application ID", selected.id], ["Student", selected.student], ["Student ID", selected.studentId], ["Gender", selected.gender], ["Hostel", selected.hostel], ["Room Preference", selected.roomType], ["Semester", selected.semester]].map(([k, v]) => <div key={k}><p className="text-xs text-slate-400">{k}</p><p className="text-sm font-medium text-slate-700">{v}</p></div>)}
          <div><label className="text-xs text-slate-500">Allocated Room</label><input value={room} onChange={e => setRoom(e.target.value)} placeholder="e.g. Room 204" className="w-full border border-slate-200 rounded-lg p-2.5 mt-1 text-sm" /></div>
          <button onClick={() => update("Approved")} className="w-full bg-green-600 text-white rounded-lg py-2 text-sm">Approve & Allocate</button>
          <button onClick={() => update("Processing")} className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm">Processing</button>
          <button onClick={() => update("Rejected")} className="w-full bg-red-50 text-red-600 rounded-lg py-2 text-sm">Reject</button>
        </div>}</div>
      </div>
    </div>
  );
}
