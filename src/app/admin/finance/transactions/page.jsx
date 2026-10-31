"use client";
import { useState } from "react";

const mockTransactions = [
  { id: "TXN-001", studentId: "STU-001", studentName: "Imran Ahmed", feeType: "Tuition Fee", amount: 25000, paid: 25000, due: 0, method: "bKash", ref: "BK-789456", status: "paid", date: "2024-01-20 14:30", semester: "Fall 2023" },
  { id: "TXN-002", studentId: "STU-002", studentName: "Susmita Das", feeType: "Semester Fee", amount: 15000, paid: 0, due: 15000, method: "—", ref: "—", status: "pending", date: "2024-01-19", semester: "Fall 2023" },
  { id: "TXN-003", studentId: "STU-003", studentName: "Rahim Uddin", feeType: "Hostel Fee", amount: 8000, paid: 0, due: 8000, method: "—", ref: "—", status: "overdue", date: "2024-01-01", semester: "Fall 2023" },
  { id: "TXN-004", studentId: "STU-004", studentName: "Karim Hossain", feeType: "Tuition Fee", amount: 25000, paid: 15000, due: 10000, method: "Bank", ref: "TXF-456789", status: "partial", date: "2024-01-18", semester: "Fall 2023" },
  { id: "TXN-005", studentId: "STU-005", studentName: "Fatima Begum", feeType: "Transport Fee", amount: 5000, paid: 5000, due: 0, method: "Nagad", ref: "NG-123456", status: "paid", date: "2024-01-17", semester: "Fall 2023" },
  { id: "TXN-006", studentId: "STU-006", studentName: "Nasir Khan", feeType: "Library Fine", amount: 500, paid: 500, due: 0, method: "bKash", ref: "BK-987654", status: "paid", date: "2024-01-16", semester: "Fall 2023" },
  { id: "TXN-007", studentId: "STU-007", studentName: "Priya Sharma", feeType: "Tuition Fee", amount: 25000, paid: 25000, due: 0, method: "SSLCommerz", ref: "SSL-321654", status: "paid", date: "2024-01-15", semester: "Fall 2023" },
  { id: "TXN-008", studentId: "STU-008", studentName: "Arif Islam", feeType: "Lab Fee", amount: 3000, paid: 0, due: 3000, method: "—", ref: "—", status: "pending", date: "2024-01-14", semester: "Fall 2023" },
];

const paymentMethods = ["bKash", "Nagad", "Bank Transfer", "SSLCommerz", "Cash", "Card"];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [showCollectForm, setShowCollectForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [collectData, setCollectData] = useState({ studentId: "", feeType: "", amount: "", method: "bKash", ref: "" });

  const filteredTransactions = transactions.filter(t => {
    const statusMatch = filterStatus === "all" || t.status === filterStatus;
    const searchMatch = t.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || t.studentId.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  const stats = {
    total: transactions.length,
    paid: transactions.filter(t => t.status === "paid").length,
    pending: transactions.filter(t => t.status === "pending").length,
    overdue: transactions.filter(t => t.status === "overdue").length,
    partial: transactions.filter(t => t.status === "partial").length,
    totalCollected: transactions.reduce((sum, t) => sum + t.paid, 0),
    totalDue: transactions.reduce((sum, t) => sum + t.due, 0),
  };

  const handleCollect = () => {
    if (!collectData.studentId || !collectData.amount) return;
    const newTxn = {
      id: `TXN-${String(Date.now()).slice(-6)}`,
      studentId: collectData.studentId,
      studentName: "Student",
      feeType: collectData.feeType || "Tuition Fee",
      amount: parseInt(collectData.amount),
      paid: parseInt(collectData.amount),
      due: 0,
      method: collectData.method,
      ref: collectData.ref || `REF-${Date.now()}`,
      status: "paid",
      date: new Date().toLocaleString(),
      semester: "Fall 2023"
    };
    setTransactions([newTxn, ...transactions]);
    setCollectData({ studentId: "", feeType: "", amount: "", method: "bKash", ref: "" });
    setShowCollectForm(false);
  };

  const getStatusBadge = (s) => ({
    paid: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    overdue: "bg-red-100 text-red-700",
    partial: "bg-orange-100 text-orange-700"
  }[s] || "bg-slate-100 text-slate-600");

  const getMethodBadge = (m) => ({
    bKash: "bg-pink-100 text-pink-700",
    Nagad: "bg-orange-100 text-orange-700",
    "Bank Transfer": "bg-blue-100 text-blue-700",
    SSLCommerz: "bg-purple-100 text-purple-700",
    Cash: "bg-green-100 text-green-700",
    Card: "bg-slate-100 text-slate-700"
  }[m] || "bg-slate-100 text-slate-600");

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Payment Transactions</h1>
          <p className="text-sm text-slate-500 mt-1">Collect payments, track invoices, and manage all financial transactions</p>
        </div>
        <button onClick={() => setShowCollectForm(!showCollectForm)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm transition-colors">
          {showCollectForm ? "✕ Cancel" : "💰 Collect Payment"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
        {[
          { label: "Total", value: stats.total, icon: "📋", color: "bg-slate-50 border-slate-200 text-slate-700" },
          { label: "Paid", value: stats.paid, icon: "✅", color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Pending", value: stats.pending, icon: "⏳", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
          { label: "Overdue", value: stats.overdue, icon: "⚠️", color: "bg-red-50 border-red-200 text-red-700" },
          { label: "Partial", value: stats.partial, icon: "🔄", color: "bg-orange-50 border-orange-200 text-orange-700" },
          { label: "Collected", value: `৳${(stats.totalCollected / 1000).toFixed(0)}K`, icon: "💰", color: "bg-teal-50 border-teal-200 text-teal-700" },
          { label: "Due", value: `৳${(stats.totalDue / 1000).toFixed(0)}K`, icon: "💸", color: "bg-pink-50 border-pink-200 text-pink-700" },
          { label: "Collection %", value: `${Math.round((stats.totalCollected / (stats.totalCollected + stats.totalDue)) * 100)}%`, icon: "📊", color: "bg-indigo-50 border-indigo-200 text-indigo-700" },
        ].map((s, i) => (
          <div key={i} className={`p-3 rounded-lg border ${s.color}`}>
            <span className="text-lg">{s.icon}</span>
            <p className="text-xl font-bold mt-1">{s.value}</p>
            <p className="text-[10px] opacity-80">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Collect Payment Form */}
      {showCollectForm && (
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6 shadow-sm">
          <h3 className="font-bold text-slate-700 mb-4">Collect Payment</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Student ID *</label>
              <input type="text" value={collectData.studentId} onChange={(e) => setCollectData({...collectData, studentId: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" placeholder="STU-XXX or scan card" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Fee Type</label>
              <select value={collectData.feeType} onChange={(e) => setCollectData({...collectData, feeType: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Fee Type</option>
                <option>Tuition Fee</option><option>Semester Fee</option><option>Hostel Fee</option><option>Transport Fee</option><option>Lab Fee</option><option>Library Fee</option><option>Fine</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Amount (৳) *</label>
              <input type="number" value={collectData.amount} onChange={(e) => setCollectData({...collectData, amount: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" min="0" placeholder="Enter amount" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Payment Method *</label>
              <select value={collectData.method} onChange={(e) => setCollectData({...collectData, method: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500">
                {paymentMethods.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Transaction Ref</label>
              <input type="text" value={collectData.ref} onChange={(e) => setCollectData({...collectData, ref: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" placeholder="Payment reference/ID" />
            </div>
            <div className="flex items-end">
              <button onClick={handleCollect} disabled={!collectData.studentId || !collectData.amount} className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-sm disabled:opacity-50">
                ✅ Collect Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <div className="flex-1 min-w-[250px]">
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search by student name, ID, or transaction ID..." />
        </div>
        <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-1">
          {["all", "paid", "pending", "overdue", "partial"].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-md text-xs font-medium ${filterStatus === s ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>{s === "all" ? "All" : s}</button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Transaction</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Student</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Fee Type</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Paid</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Due</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Method</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map(t => (
                <tr key={t.id} className={`hover:bg-slate-50 ${t.status === "overdue" ? "bg-red-50/30" : ""}`}>
                  <td className="px-4 py-3">
                    <p className="text-xs font-mono text-blue-600 font-medium">{t.id}</p>
                    <p className="text-[10px] text-slate-400">{t.date}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-800">{t.studentName}</p>
                    <p className="text-xs text-slate-500">{t.studentId}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs">{t.feeType}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-center font-bold text-slate-700">৳{t.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-center font-medium text-green-700">৳{t.paid.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-center font-medium text-red-700">৳{t.due.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getMethodBadge(t.method)}`}>{t.method}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(t.status)}`}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing {filteredTransactions.length} of {transactions.length} transactions</p>
          <div className="flex gap-2">
            <button className="text-xs text-slate-600 hover:text-slate-700 font-medium px-3 py-1.5 bg-white border border-slate-200 rounded-md">📥 Export CSV</button>
            <button className="text-xs text-slate-600 hover:text-slate-700 font-medium px-3 py-1.5 bg-white border border-slate-200 rounded-md">📄 Print</button>
          </div>
        </div>
      </div>
    </div>
  );
}