"use client";
import { useState } from "react";
import Link from "next/link";

const stats = {
  totalInvoices: 2480,
  paid: 1980,
  pending: 342,
  overdue: 124,
  partiallyPaid: 34,
  totalAmount: 18500000,
  collectedAmount: 14200000,
  dueAmount: 4300000
};

const classOptions = ["Play - KG 2", "Class 1 - 2", "Class 3 - 5", "Class 6 - 8", "Class 9 - 10", "Class 11 - 12 (Science)", "Class 11 - 12 (Commerce)", "Class 11 - 12 (Arts)"];
const feeTypeOptions = ["Tuition Fee", "Semester Fee", "Transport Fee", "Hostel Fee", "Exam Fee", "Fine"];
const monthOptions = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const initialInvoices = [
  { id: 1, invoiceId: "INV-2025-0001", student: "Arif Hossain", studentId: "STD-1012", class: "Class 10 - A", feeType: "Tuition Fee", month: "July", issueDate: "2025-07-01", dueDate: "2025-07-10", amount: 5000, paid: 5000, status: "Paid", method: "bKash" },
  { id: 2, invoiceId: "INV-2025-0002", student: "Nusrat Jahan", studentId: "STD-1088", class: "Class 9 - B", feeType: "Semester Fee", month: "July", issueDate: "2025-07-01", dueDate: "2025-07-15", amount: 12000, paid: 12000, status: "Paid", method: "SSLCommerz" },
  { id: 3, invoiceId: "INV-2025-0003", student: "Rakibul Islam", studentId: "STD-1103", class: "Class 12 - Sci", feeType: "Hostel Fee", month: "July", issueDate: "2025-07-01", dueDate: "2025-07-10", amount: 15000, paid: 0, status: "Pending", method: null },
  { id: 4, invoiceId: "INV-2025-0004", student: "Sadia Akter", studentId: "STD-1150", class: "Class 8 - A", feeType: "Transport Fee", month: "July", issueDate: "2025-07-01", dueDate: "2025-07-10", amount: 2500, paid: 2500, status: "Paid", method: "Cash" },
  { id: 5, invoiceId: "INV-2025-0005", student: "Tanvir Ahmed", studentId: "STD-1177", class: "Class 11 - Com", feeType: "Tuition Fee", month: "June", issueDate: "2025-06-01", dueDate: "2025-06-10", amount: 5500, paid: 2000, status: "Partially Paid", method: "Card" },
  { id: 6, invoiceId: "INV-2025-0006", student: "Mehedi Hasan", studentId: "STD-1201", class: "Class 10 - B", feeType: "Fine", month: "July", issueDate: "2025-07-05", dueDate: "2025-07-20", amount: 500, paid: 500, status: "Paid", method: "Cash" },
  { id: 7, invoiceId: "INV-2025-0007", student: "Fatema Begum", studentId: "STD-1215", class: "Class 7 - A", feeType: "Tuition Fee", month: "May", issueDate: "2025-05-01", dueDate: "2025-05-10", amount: 10000, paid: 0, status: "Overdue", method: null },
  { id: 8, invoiceId: "INV-2025-0008", student: "Imran Kabir", studentId: "STD-1230", class: "Class 12 - Sci", feeType: "Semester Fee", month: "June", issueDate: "2025-06-01", dueDate: "2025-06-15", amount: 12500, paid: 0, status: "Overdue", method: null },
  { id: 9, invoiceId: "INV-2025-0009", student: "Sharmin Sultana", studentId: "STD-1244", class: "Class 6 - B", feeType: "Tuition Fee", month: "July", issueDate: "2025-07-01", dueDate: "2025-07-10", amount: 3000, paid: 1500, status: "Partially Paid", method: "Nagad" },
  { id: 10, invoiceId: "INV-2025-0010", student: "Kamal Uddin", studentId: "STD-1260", class: "Class 9 - A", feeType: "Transport Fee", month: "July", issueDate: "2025-07-01", dueDate: "2025-07-10", amount: 2500, paid: 0, status: "Cancelled", method: null },
  { id: 11, invoiceId: "INV-2025-0011", student: "Nadia Haque", studentId: "STD-1275", class: "Class 11 - Arts", feeType: "Hostel Fee", month: "July", issueDate: "2025-07-01", dueDate: "2025-07-10", amount: 11000, paid: 5500, status: "Partially Paid", method: "bKash" },
  { id: 12, invoiceId: "INV-2025-0012", student: "Rafiq Chowdhury", studentId: "STD-1290", class: "Class 8 - C", feeType: "Tuition Fee", month: "July", issueDate: "2025-07-01", dueDate: "2025-07-10", amount: 3000, paid: 3000, status: "Paid", method: "Rocket" },
];

const statusConfig = {
  "Paid": { badge: "bg-green-100 text-green-700", icon: "✅" },
  "Pending": { badge: "bg-yellow-100 text-yellow-700", icon: "⏳" },
  "Overdue": { badge: "bg-red-100 text-red-700", icon: "⚠️" },
  "Partially Paid": { badge: "bg-orange-100 text-orange-700", icon: "🟠" },
  "Cancelled": { badge: "bg-slate-100 text-slate-500", icon: "🚫" },
};

export default function Invoices() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [statusFilter, setStatusFilter] = useState("All");
  const [classFilter, setClassFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [search, setSearch] = useState("");
  const [showGenerate, setShowGenerate] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [genForm, setGenForm] = useState({ class: "", feeType: "Tuition Fee", month: "July", amount: "", dueDate: "", sendSms: true });
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const filtered = invoices.filter((inv) => {
    if (statusFilter !== "All" && inv.status !== statusFilter) return false;
    if (classFilter && inv.class !== classFilter) return false;
    if (monthFilter && inv.month !== monthFilter) return false;
    if (search && !(inv.student.toLowerCase().includes(search.toLowerCase()) || inv.invoiceId.toLowerCase().includes(search.toLowerCase()) || inv.studentId.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  const toggleSelect = (id) => {
    setSelectedInvoices(selectedInvoices.includes(id) ? selectedInvoices.filter(s => s !== id) : [...selectedInvoices, id]);
  };

  const toggleSelectAll = () => {
    if (selectedInvoices.length === filtered.length) setSelectedInvoices([]);
    else setSelectedInvoices(filtered.map(f => f.id));
  };

  const handleGenerate = () => {
    if (!genForm.class || !genForm.amount || !genForm.dueDate) {
      showToast("⚠️ Class, amount & due date required!");
      return;
    }
    setGenerating(true);
    setTimeout(() => {
      const demoStudents = [
        { student: "Abdullah Al Noman", studentId: "STD-1301", class: genForm.class },
        { student: "Ayesha Siddika", studentId: "STD-1302", class: genForm.class },
        { student: "Bappy Rahman", studentId: "STD-1303", class: genForm.class },
        { student: "Chandni Akter", studentId: "STD-1304", class: genForm.class },
        { student: "Dipto Das", studentId: "STD-1305", class: genForm.class },
      ];
      const year = new Date().getFullYear();
      const startNum = 100 + invoices.length + 1;
      const newInvoices = demoStudents.map((s, i) => ({
        id: Date.now() + i,
        invoiceId: `INV-${year}-${String(startNum + i).padStart(4, "0")}`,
        ...s,
        feeType: genForm.feeType,
        month: genForm.month,
        issueDate: new Date().toISOString().split("T")[0],
        dueDate: genForm.dueDate,
        amount: Number(genForm.amount),
        paid: 0,
        status: "Pending",
        method: null,
      }));
      setInvoices([...newInvoices, ...invoices]);
      setGenerating(false);
      setShowGenerate(false);
      setGenForm({ class: "", feeType: "Tuition Fee", month: "July", amount: "", dueDate: "", sendSms: true });
      showToast(`🧾 ${demoStudents.length} invoices generated${genForm.sendSms ? " + SMS sent!" : "!"}`);
    }, 1500);
  };

  const sendReminder = (inv) => {
    showToast(`📱 Payment reminder sent to ${inv.student}'s guardian!`);
  };

  const bulkRemind = () => {
    if (selectedInvoices.length === 0) { showToast("⚠️ Select invoices first!"); return; }
    showToast(`📱 Reminders sent for ${selectedInvoices.length} invoices!`);
    setSelectedInvoices([]);
  };

  const cancelInvoice = (id) => {
    setInvoices(invoices.map(i => i.id === id ? { ...i, status: "Cancelled" } : i));
    showToast("🚫 Invoice cancelled!");
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">🧾 Invoices</h1>
          <p className="text-sm text-slate-500 mt-1">Generate, track &amp; manage student fee invoices</p>
        </div>
        <div className="flex gap-2">
          <button onClick={bulkRemind} className="px-4 py-2 border border-slate-300 bg-white text-slate-600 rounded-lg hover:bg-slate-50 font-medium text-sm transition-colors">
            📱 Send Reminders {selectedInvoices.length > 0 && `(${selectedInvoices.length})`}
          </button>
          <button onClick={() => setShowGenerate(true)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm transition-colors">
            + Generate Invoice
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
        {[
          { label: "Total Invoices", value: stats.totalInvoices.toLocaleString(), icon: "🧾", color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Paid", value: stats.paid.toLocaleString(), icon: "✅", color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Pending", value: stats.pending, icon: "⏳", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
          { label: "Overdue", value: stats.overdue, icon: "⚠️", color: "bg-red-50 border-red-200 text-red-700" },
          { label: "Partial", value: stats.partiallyPaid, icon: "🟠", color: "bg-orange-50 border-orange-200 text-orange-700" },
          { label: "Total Amount", value: `৳${(stats.totalAmount / 10000000).toFixed(2)}Cr`, icon: "💰", color: "bg-teal-50 border-teal-200 text-teal-700" },
          { label: "Collected", value: `৳${(stats.collectedAmount / 10000000).toFixed(2)}Cr`, icon: "📥", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
          { label: "Due Amount", value: `৳${(stats.dueAmount / 100000).toFixed(1)}L`, icon: "💸", color: "bg-rose-50 border-rose-200 text-rose-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-3 rounded-lg border ${stat.color}`}>
            <span className="text-lg">{stat.icon}</span>
            <p className="text-lg font-bold mt-1">{stat.value}</p>
            <p className="text-[10px] opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {["All", "Paid", "Pending", "Overdue", "Partially Paid", "Cancelled"].map((s) => {
          const count = s === "All" ? invoices.length : invoices.filter(i => i.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${statusFilter === s ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
            >
              {statusConfig[s]?.icon} {s} <span className={`ml-1 px-1.5 rounded-full ${statusFilter === s ? "bg-white/20" : "bg-slate-100"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search student / invoice ID..."
          className="px-4 py-2 border border-slate-300 rounded-lg text-sm w-64 focus:outline-none focus:border-emerald-500"
        />
        <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-500">
          <option value="">All Classes</option>
          {classOptions.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-500">
          <option value="">All Months</option>
          {monthOptions.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        {(classFilter || monthFilter || search || statusFilter !== "All") && (
          <button onClick={() => { setClassFilter(""); setMonthFilter(""); setSearch(""); setStatusFilter("All"); }} className="text-xs text-red-500 hover:text-red-700 font-medium">
            ✕ Clear filters
          </button>
        )}
        <span className="ml-auto text-xs text-slate-500">Showing <b>{filtered.length}</b> of {invoices.length}</span>
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-4 py-3">
                  <input type="checkbox" checked={filtered.length > 0 && selectedInvoices.length === filtered.length} onChange={toggleSelectAll} className="rounded border-slate-300" />
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Invoice ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Student</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Fee Type</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Month</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Due Date</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Paid</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-4 py-12 text-center">
                    <span className="text-4xl">🧾</span>
                    <p className="text-sm text-slate-500 mt-2">No invoices found matching your filters</p>
                  </td>
                </tr>
              ) : (
                filtered.map((inv) => {
                  const dueAmount = inv.amount - inv.paid;
                  return (
                    <tr key={inv.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <input type="checkbox" checked={selectedInvoices.includes(inv.id)} onChange={() => toggleSelect(inv.id)} className="rounded border-slate-300" />
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => setShowDetail(inv)} className="text-sm font-mono font-medium text-blue-600 hover:text-blue-800 hover:underline">{inv.invoiceId}</button>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-slate-800">{inv.student}</p>
                        <p className="text-xs text-slate-400">{inv.studentId} • {inv.class}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{inv.feeType}</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-600">{inv.month}</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-600">{inv.dueDate}</td>
                      <td className="px-4 py-3 text-sm text-center font-bold text-slate-800">৳{Number(inv.amount).toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-center">
                        {inv.paid > 0 ? (
                          <span className="text-green-600 font-medium">৳{Number(inv.paid).toLocaleString()}</span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                        {dueAmount > 0 && inv.status !== "Cancelled" && (
                          <p className="text-[10px] text-red-500">Due: ৳{dueAmount.toLocaleString()}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusConfig[inv.status]?.badge || "bg-slate-100 text-slate-600"}`}>
                          {statusConfig[inv.status]?.icon} {inv.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        <button onClick={() => setShowDetail(inv)} className="text-sm mr-1 hover:scale-110 transition-transform" title="View">👁️</button>
                        {inv.status !== "Paid" && inv.status !== "Cancelled" && (
                          <button onClick={() => sendReminder(inv)} className="text-sm mr-1 hover:scale-110 transition-transform" title="Send reminder">📱</button>
                        )}
                        {inv.status !== "Cancelled" && inv.status !== "Paid" && (
                          <button onClick={() => cancelInvoice(inv.id)} className="text-sm hover:scale-110 transition-transform" title="Cancel">🚫</button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* GENERATE MODAL */}
      {showGenerate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => !generating && setShowGenerate(false)}>
          <div className="bg-white rounded-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-800">🧾 Generate Bulk Invoices</h3>
              <button onClick={() => !generating && setShowGenerate(false)} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
            </div>
            {generating ? (
              <div className="p-8 text-center">
                <div className="text-4xl mb-4 animate-bounce">🧾</div>
                <p className="font-semibold text-slate-700">Generating invoices...</p>
                <p className="text-xs text-slate-400 mt-1">Please wait</p>
                <div className="mt-4 bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full w-2/3 animate-pulse"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="p-4 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Class *</label>
                    <select value={genForm.class} onChange={(e) => setGenForm({ ...genForm, class: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-emerald-500">
                      <option value="">Select class</option>
                      {classOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Fee Type *</label>
                      <select value={genForm.feeType} onChange={(e) => setGenForm({ ...genForm, feeType: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-emerald-500">
                        {feeTypeOptions.map((f) => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Month *</label>
                      <select value={genForm.month} onChange={(e) => setGenForm({ ...genForm, month: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-emerald-500">
                        {monthOptions.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Amount (৳) *</label>
                      <input type="number" value={genForm.amount} onChange={(e) => setGenForm({ ...genForm, amount: e.target.value })} placeholder="3000" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Due Date *</label>
                      <input type="date" value={genForm.dueDate} onChange={(e) => setGenForm({ ...genForm, dueDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-emerald-500" />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={genForm.sendSms} onChange={(e) => setGenForm({ ...genForm, sendSms: e.target.checked })} className="rounded border-slate-300" />
                    <span className="text-xs text-slate-600">📱 Send SMS notification to guardians</span>
                  </label>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-[11px] text-blue-700">ℹ️ Invoices will be generated for all <b>active students</b> of the selected class. Demo will create 5 sample invoices.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 border-t border-slate-200">
                  <button onClick={handleGenerate} className="flex-1 bg-emerald-600 text-white py-2.5 rounded-lg hover:bg-emerald-700 font-medium text-sm transition-colors">Generate Now</button>
                  <button onClick={() => setShowGenerate(false)} className="px-6 border border-slate-300 text-slate-600 py-2.5 rounded-lg hover:bg-slate-50 font-medium text-sm transition-colors">Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetail(null)}>
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <h3 className="font-bold text-slate-800">🧾 Invoice Details</h3>
              <button onClick={() => setShowDetail(null)} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
            </div>
            <div className="p-6">
              <div className="text-center border-b border-dashed border-slate-300 pb-4 mb-4">
                <p className="text-lg font-bold text-slate-800">🎓 EduERP International School</p>
                <p className="text-xs text-slate-500">House 12, Road 5, Dhanmondi, Dhaka-1205</p>
                <p className="text-xs text-slate-500">Phone: 02-9123456 • Email: accounts@eduerp.edu</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${statusConfig[showDetail.status]?.badge || "bg-slate-100"}`}>
                  {statusConfig[showDetail.status]?.icon} {showDetail.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
                <div><p className="text-xs text-slate-400">Invoice ID</p><p className="font-mono font-semibold text-slate-800">{showDetail.invoiceId}</p></div>
                <div className="text-right"><p className="text-xs text-slate-400">Issue Date</p><p className="font-semibold text-slate-800">{showDetail.issueDate}</p></div>
                <div><p className="text-xs text-slate-400">Student Name</p><p className="font-semibold text-slate-800">{showDetail.student}</p></div>
                <div className="text-right"><p className="text-xs text-slate-400">Due Date</p><p className="font-semibold text-slate-800">{showDetail.dueDate}</p></div>
                <div><p className="text-xs text-slate-400">Student ID</p><p className="font-semibold text-slate-800">{showDetail.studentId}</p></div>
                <div className="text-right"><p className="text-xs text-slate-400">Month</p><p className="font-semibold text-slate-800">{showDetail.month} 2025</p></div>
                <div><p className="text-xs text-slate-400">Class</p><p className="font-semibold text-slate-800">{showDetail.class}</p></div>
                {showDetail.method && <div className="text-right"><p className="text-xs text-slate-400">Payment Method</p><p className="font-semibold text-slate-800">{showDetail.method}</p></div>}
              </div>
              <table className="w-full mb-4">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-3 py-2 text-xs font-semibold text-slate-500 uppercase">Description</th>
                    <th className="text-right px-3 py-2 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-3 py-2 text-sm text-slate-700">{showDetail.feeType} — {showDetail.month} 2025</td>
                    <td className="px-3 py-2 text-sm text-right font-medium text-slate-800">৳{Number(showDetail.amount).toLocaleString()}</td>
                  </tr>
                  {showDetail.paid > 0 && (
                    <tr>
                      <td className="px-3 py-2 text-sm text-green-600">Amount Paid ({showDetail.method})</td>
                      <td className="px-3 py-2 text-sm text-right font-medium text-green-600">-৳{Number(showDetail.paid).toLocaleString()}</td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-300">
                    <td className="px-3 py-2.5 text-sm font-bold text-slate-800">Total Due</td>
                    <td className="px-3 py-2.5 text-lg font-bold text-right text-red-600">৳{(showDetail.amount - showDetail.paid).toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
              <div className="bg-slate-50 rounded-lg p-3 mb-4">
                <p className="text-[10px] text-slate-500 leading-relaxed">• Payment must be made by the due date to avoid late fines (৳50/day after 10 days grace).<br/>• Please keep this invoice for future reference.<br/>• For queries contact accounts office: 02-9123456</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => showToast("🖨️ Sending to printer...")} className="flex-1 bg-slate-800 text-white py-2.5 rounded-lg hover:bg-slate-900 font-medium text-sm transition-colors">🖨️ Print</button>
                <button onClick={() => showToast("⬇️ Invoice downloaded as PDF!")} className="flex-1 bg-emerald-600 text-white py-2.5 rounded-lg hover:bg-emerald-700 font-medium text-sm transition-colors">⬇️ Download PDF</button>
                {showDetail.status !== "Paid" && showDetail.status !== "Cancelled" && (
                  <button onClick={() => sendReminder(showDetail)} className="flex-1 border border-slate-300 text-slate-600 py-2.5 rounded-lg hover:bg-slate-50 font-medium text-sm transition-colors">📱 Remind</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-slate-800 text-white px-4 py-3 rounded-lg shadow-lg text-sm font-medium z-50">
          {toast}
        </div>
      )}
    </div>
  );
}