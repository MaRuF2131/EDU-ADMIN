"use client";
import { useState } from "react";

const mockFines = [
  { id: 1, studentId: "STU-004", studentName: "Karim Hossain", bookTitle: "Clean Code", daysLate: 18, finePerDay: 5, totalFine: 90, paid: 0, remaining: 90, status: "unpaid", dueDate: "2024-01-03" },
  { id: 2, studentId: "STU-002", studentName: "Susmita Das", bookTitle: "Database System Concepts", daysLate: 1, finePerDay: 15, totalFine: 15, paid: 15, remaining: 0, status: "paid", dueDate: "2024-01-19" },
  { id: 3, studentId: "STU-006", studentName: "Nasir Khan", bookTitle: "Data Structures", daysLate: 12, finePerDay: 10, totalFine: 120, paid: 50, remaining: 70, status: "partial", dueDate: "2023-12-29" },
];

export default function FinesPage() {
  const [fines, setFines] = useState(mockFines);
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredFines = filterStatus === "all" ? fines : fines.filter(f => f.status === filterStatus);

  const stats = {
    totalUnpaid: fines.reduce((sum, f) => sum + f.remaining, 0),
    totalCollected: fines.reduce((sum, f) => sum + f.paid, 0),
    studentsWithFines: fines.filter(f => f.remaining > 0).length,
    totalFinesIssued: fines.reduce((sum, f) => sum + f.totalFine, 0),
  };

  const collectFine = (id, amount) => {
    setFines(fines.map(f => {
      if (f.id !== id) return f;
      const newPaid = f.paid + amount;
      const newRemaining = f.totalFine - newPaid;
      return { ...f, paid: newPaid, remaining: Math.max(0, newRemaining), status: newRemaining <= 0 ? "paid" : "partial" };
    }));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-700";
      case "unpaid": return "bg-red-100 text-red-700";
      case "partial": return "bg-yellow-100 text-yellow-700";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Fine Management</h1>
          <p className="text-sm text-slate-500 mt-1">Track and collect library fines</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Unpaid", value: `৳${stats.totalUnpaid}`, icon: "💰", color: "bg-red-50 border-red-200 text-red-700" },
          { label: "Total Collected", value: `৳${stats.totalCollected}`, icon: "✅", color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Students with Fines", value: stats.studentsWithFines, icon: "👥", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
          { label: "Total Fines Issued", value: `৳${stats.totalFinesIssued}`, icon: "📊", color: "bg-blue-50 border-blue-200 text-blue-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-lg border ${stat.color}`}>
            <span className="text-lg">{stat.icon}</span>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className="text-xs opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {["all", "unpaid", "partial", "paid"].map(status => (
          <button key={status} onClick={() => setFilterStatus(status)} className={`px-3 py-1.5 rounded-md text-sm font-medium ${filterStatus === status ? "bg-blue-600 text-white" : "bg-white text-slate-600 border border-slate-200"}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Fines Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-1`0">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Student</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Book</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Days Late</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Total Fine</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Paid</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Remaining</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFines.map(fine => (
                <tr key={fine.id} className={`hover:bg-slate-50 ${fine.status === "unpaid" ? "bg-red-50/30" : ""}`}>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-800">{fine.studentName}</p>
                    <p className="text-xs text-slate-500">{fine.studentId}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{fine.bookTitle}</td>
                  <td className="px-4 py-3 text-sm text-center text-red-600 font-medium">{fine.daysLate}</td>
                  <td className="px-4 py-3 text-sm text-center font-bold text-slate-700">৳{fine.totalFine}</td>
                  <td className="px-4 py-3 text-sm text-center text-green-600 font-medium">৳{fine.paid}</td>
                  <td className="px-4 py-3 text-sm text-center font-bold text-red-600">৳{fine.remaining}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(fine.status)}`}>{fine.status}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {fine.remaining > 0 && (
                      <button onClick={() => collectFine(fine.id, fine.remaining)} className="text-xs text-green-600 hover:text-green-700 font-medium px-2 py-1 bg-green-50 rounded">
                        💰 Collect ৳{fine.remaining}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fine Settings */}
      <div className="mt-6 bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="font-bold text-slate-700 mb-4">Fine Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Fine Per Day (৳)</label>
            <input type="number" defaultValue={5} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Max Fine (৳)</label>
            <input type="number" defaultValue={500} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Default Loan Period (days)</label>
            <input type="number" defaultValue={14} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">💾 Save Settings</button>
      </div>
    </div>
  );
}