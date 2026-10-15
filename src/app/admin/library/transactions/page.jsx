"use client";
import { useState } from "react";

const mockTransactions = [
  { id: 1, bookTitle: "Introduction to Algorithms", bookIsbn: "978-0262033848", studentId: "STU-001", studentName: "Imran Ahmed", borrowDate: "2024-01-10", dueDate: "2024-01-24", returnDate: null, status: "borrowed", fine: 0, copyId: "COPY-001" },
  { id: 2, bookTitle: "Database System Concepts", bookIsbn: "978-0078022159", studentId: "STU-002", studentName: "Susmita Das", borrowDate: "2024-01-05", dueDate: "2024-01-19", returnDate: "2024-01-20", status: "returned_late", fine: 15, copyId: "COPY-002" },
  { id: 3, bookTitle: "Machine Learning", bookIsbn: "978-0387310732", studentId: "STU-003", studentName: "Rahim Uddin", borrowDate: "2024-01-15", dueDate: "2024-01-29", returnDate: null, status: "borrowed", fine: 0, copyId: "COPY-003" },
  { id: 4, bookTitle: "Clean Code", bookIsbn: "978-0132350884", studentId: "STU-004", studentName: "Karim Hossain", borrowDate: "2023-12-20", dueDate: "2024-01-03", returnDate: null, status: "overdue", fine: 75, copyId: "COPY-004" },
  { id: 5, bookTitle: "Discrete Mathematics", bookIsbn: "978-0073383095", studentId: "STU-005", studentName: "Fatima Begum", borrowDate: "2024-01-18", dueDate: "2024-02-01", returnDate: null, status: "borrowed", fine: 0, copyId: "COPY-005" },
  { id: 6, bookTitle: "Data Structures", bookIsbn: "978-0470383276", studentId: "STU-006", studentName: "Nasir Khan", borrowDate: "2023-12-15", dueDate: "2023-12-29", returnDate: "2024-01-10", status: "returned_late", fine: 120, copyId: "COPY-006" },
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [activeTab, setActiveTab] = useState("borrow");
  const [showBorrowForm, setShowBorrowForm] = useState(false);
  const [borrowData, setBorrowData] = useState({ bookIsbn: "", studentId: "", days: 14 });

  const handleBorrow = () => {
    if (!borrowData.bookIsbn || !borrowData.studentId) return;
    const newTransaction = {
      id: transactions.length + 1,
      bookTitle: "New Book",
      bookIsbn: borrowData.bookIsbn,
      studentId: borrowData.studentId,
      studentName: "Student",
      borrowDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + borrowData.days * 86400000).toISOString().split('T')[0],
      returnDate: null,
      status: "borrowed",
      fine: 0,
      copyId: `COPY-${Date.now()}`
    };
    setTransactions([newTransaction, ...transactions]);
    setBorrowData({ bookIsbn: "", studentId: "", days: 14 });
    setShowBorrowForm(false);
  };

  const handleReturn = (id) => {
    setTransactions(transactions.map(t => {
      if (t.id !== id) return t;
      const isLate = new Date() > new Date(t.dueDate);
      const daysLate = isLate ? Math.ceil((new Date() - new Date(t.dueDate)) / 86400000) : 0;
      return { ...t, returnDate: new Date().toISOString().split('T')[0], status: isLate ? "returned_late" : "returned", fine: daysLate * 15 };
    }));
  };

  const stats = {
    borrowed: transactions.filter(t => t.status === "borrowed").length,
    overdue: transactions.filter(t => t.status === "overdue").length,
    returned: transactions.filter(t => t.status.includes("returned")).length,
    totalFines: transactions.reduce((sum, t) => sum + t.fine, 0),
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "borrowed": return "bg-blue-100 text-blue-700";
      case "overdue": return "bg-red-100 text-red-700";
      case "returned": return "bg-green-100 text-green-700";
      case "returned_late": return "bg-yellow-100 text-yellow-700";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Borrow & Return</h1>
          <p className="text-sm text-slate-500 mt-1">Issue and collect books, track overdue</p>
        </div>
        <button onClick={() => setShowBorrowForm(!showBorrowForm)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm transition-colors">
          {showBorrowForm ? "✕ Cancel" : "📤 Borrow Book"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Currently Borrowed", value: stats.borrowed, icon: "📤", color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Overdue", value: stats.overdue, icon: "⚠️", color: "bg-red-50 border-red-200 text-red-700" },
          { label: "Returned", value: stats.returned, icon: "📥", color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Total Fines", value: `৳${stats.totalFines}`, icon: "💰", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-lg border ${stat.color}`}>
            <span className="text-lg">{stat.icon}</span>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className="text-xs opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Borrow Form */}
      {showBorrowForm && (
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6 shadow-sm">
          <h3 className="font-bold text-slate-700 mb-4">Issue Book to Student</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Book ISBN / Scan *</label>
              <input type="text" value={borrowData.bookIsbn} onChange={(e) => setBorrowData({...borrowData, bookIsbn: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" placeholder="Scan or type ISBN..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Student ID / Card *</label>
              <input type="text" value={borrowData.studentId} onChange={(e) => setBorrowData({...borrowData, studentId: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" placeholder="Scan or type ID..." />
            </div>
            <div>
           <label className="block text-xs font-medium text-slate-500 mb-1">Loan Period (days)</label>
              <select value={borrowData.days} onChange={(e) => setBorrowData({...borrowData, days: parseInt(e.target.value)})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500">
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="21">21 days</option>
                <option value="30">30 days</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex gap-3 justify-end">
            <button onClick={() => setShowBorrowForm(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 text-sm font-medium">Cancel</button>
            <button onClick={handleBorrow} disabled={!borrowData.bookIsbn || !borrowData.studentId} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium disabled:opacity-50">📤 Issue Book</button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-1 mb-4 w-fit">
        {["all", "borrowed", "overdue", "returned"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === tab ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
            {tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Book</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Student</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Borrow Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Due Date</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Fine</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.filter(t => activeTab === "all" || t.status === activeTab || (activeTab === "returned" && t.status.includes("returned"))).map(t => (
                <tr key={t.id} className={`hover:bg-slate-50 ${t.status === "overdue" ? "bg-red-50/30" : ""}`}>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-sCate-800">{t.bookTitle}</p>
                    <p className="text-xs text-slate-500">{t.copyId}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-800">{t.studentName}</p>
                    <p className="text-xs text-slate-500">{t.studentId}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{t.borrowDate}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm ${t.status === "overdue" ? "text-red-600 font-medium" : "text-slate-600"}`}>{t.dueDate}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-sm font-bold ${t.fine > 0 ? "text-red-600" : "text-slate-400"}`}>৳{t.fine}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(t.status)}`}>
                      {t.status === "returned_late" ? "Late Return" : t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {(t.status === "borrowed" || t.status === "overdue") && (
                      <button onClick={() => handleReturn(t.id)} className="text-xs text-green-600 hover:text-green-700 font-medium px-2 py-1 bg-green-50 rounded">📥 Return</button>
                    )}
                    {t.returnDate && <span className="text-xs text-slate-500">{t.returnDate}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}