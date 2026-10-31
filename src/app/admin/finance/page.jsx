"use client";
import { useState } from "react";
import Link from "next/link";

const stats = {
  totalDue: 2458000,
  collectedThisMonth: 10235500,
  todayCollection: 185000,
  pendingInvoices: 342,
  overdueInvoices: 124,
  refundsThisMonth: 115000,
  scholarshipStudents: 186,
  activeGateways: 4
};

const feeTypeCollection = [
  { name: "Tuition Fee", icon: "🎓", target: 8000000, collected: 6250000, students: 1450, color: "green" },
  { name: "Semester Fee", icon: "📚", target: 2000000, collected: 1450000, students: 620, color: "blue" },
  { name: "Transport Fee", icon: "🚌", target: 600000, collected: 480000, students: 310, color: "yellow" },
  { name: "Hostel Fee", icon: "🏠", target: 900000, collected: 720000, students: 240, color: "purple" },
  { name: "Fine & Penalty", icon: "⚠️", target: 80000, collected: 45000, students: 96, color: "red" },
];

const recentTransactions = [
  { id: 1, txnId: "TRX-2025-0841", student: "Arif Hossain", class: "Class 10 - A", type: "Tuition Fee", amount: 5000, method: "bKash", status: "Success", time: "2 min ago", icon: "✅" },
  { id: 2, txnId: "TRX-2025-0840", student: "Nusrat Jahan", class: "Class 9 - B", type: "Semester Fee", amount: 12000, method: "SSLCommerz", status: "Success", time: "15 min ago", icon: "✅" },
  { id: 3, txnId: "TRX-2025-0839", student: "Rakibul Islam", class: "Class 12 - Sci", type: "Hostel Fee", amount: 15000, method: "Nagad", status: "Pending", time: "32 min ago", icon: "⏳" },
  { id: 4, txnId: "TRX-2025-0838", student: "Sadia Akter", class: "Class 8 - A", type: "Transport Fee", amount: 2500, method: "Cash", status: "Success", time: "1 hour ago", icon: "✅" },
  { id: 5, txnId: "TRX-2025-0837", student: "Tanvir Ahmed", class: "Class 11 - Com", type: "Tuition Fee", amount: 5500, method: "Card", status: "Failed", time: "2 hours ago", icon: "❌" },
  { id: 6, txnId: "TRX-2025-0836", student: "Mehedi Hasan", class: "Class 10 - B", type: "Fine", amount: 500, method: "Cash", status: "Success", time: "3 hours ago", icon: "✅" },
];

const pendingApprovals = [
  { id: 1, type: "Refund Request", student: "Kamal Uddin", detail: "Transport Fee Refund - Route Cancelled", amount: 7500, priority: "High", icon: "🔄" },
  { id: 2, type: "Discount Approval", student: "Sharmin Sultana", detail: "Sibling Discount 20% - Two Brothers", amount: 12000, priority: "Medium", icon: "🎯" },
  { id: 3, type: "Fine Waiver", student: "Rafiq Chowdhury", detail: "Late Fine Waiver - Medical Reason", amount: 500, priority: "Low", icon: "⚠️" },
  { id: 4, type: "Refund Request", student: "Nadia Haque", detail: "Hostel Fee Refund - Seat Cancelled", amount: 15000, priority: "High", icon: "🔄" },
  { id: 5, type: "Scholarship", student: "Imran Kabir", detail: "Merit Scholarship 50% - GPA 5.00", amount: 24000, priority: "Medium", icon: "🎓" },
];

const monthlyCollection = [
  { month: "Jan", collected: 82, target: 95 },
  { month: "Feb", collected: 75, target: 90 },
  { month: "Mar", collected: 91, target: 95 },
  { month: "Apr", collected: 68, target: 95 },
  { month: "May", collected: 89, target: 100 },
  { month: "Jun", collected: 76, target: 95 },
  { month: "Jul", collected: 102, target: 110 },
];

const quickActions = [
  { title: "Generate Invoice", icon: "🧾", href: "/admin/finance/invoices", color: "from-blue-500 to-blue-600", desc: "Bulk invoice" },
  { title: "Collect Payment", icon: "💳", href: "/admin/finance/payments", color: "from-green-500 to-green-600", desc: "Take payment" },
  { title: "Fee Structure", icon: "🏗️", href: "/admin/finance/fee-structure", color: "from-purple-500 to-purple-600", desc: "Manage fees" },
  { title: "Process Refund", icon: "🔄", href: "/admin/finance/refunds", color: "from-orange-500 to-orange-600", desc: "Refund money" },
  { title: "Add Discount", icon: "🎯", href: "/admin/finance/discounts", color: "from-pink-500 to-pink-600", desc: "Discount plans" },
  { title: "Scholarship", icon: "🎓", href: "/admin/finance/discounts", color: "from-teal-500 to-teal-600", desc: "Merit awards" },
  { title: "Payment Gateway", icon: "📱", href: "/admin/finance/payment-gateway", color: "from-cyan-500 to-cyan-600", desc: "bKash/Nagad" },
  { title: "Reports", icon: "📊", href: "/admin/finance", color: "from-red-500 to-red-600", desc: "Analytics" },
];

export default function FinanceDashboard() {
  const [approvals, setApprovals] = useState(pendingApprovals);

  const handleApprove = (id) => {
    setApprovals(approvals.filter(a => a.id !== id));
  };

  const getProgressColor = (percent) => {
    if (percent >= 80) return "bg-green-500";
    if (percent >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Success": return "bg-green-100 text-green-700";
      case "Pending": return "bg-yellow-100 text-yellow-700";
      case "Failed": return "bg-red-100 text-red-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Low": return "bg-green-100 text-green-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">💰 Finance &amp; Billing</h1>
          <p className="text-sm text-slate-500 mt-1">Fees, invoices, payments, refunds, scholarships &amp; gateways</p>
        </div>
        <Link href="/admin/finance/invoices" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm transition-colors">
          🧾 Generate Invoice
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
        {[
          { label: "Total Due", value: `৳${(stats.totalDue / 100000).toFixed(1)}L`, icon: "💸", color: "bg-red-50 border-red-200 text-red-700" },
          { label: "Collected (Month)", value: `৳${(stats.collectedThisMonth / 100000).toFixed(1)}L`, icon: "💰", color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Today Collection", value: `৳${stats.todayCollection.toLocaleString()}`, icon: "📅", color: "bg-teal-50 border-teal-200 text-teal-700" },
          { label: "Pending Invoices", value: stats.pendingInvoices, icon: "🧾", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
          { label: "Overdue", value: stats.overdueInvoices, icon: "⏰", color: "bg-orange-50 border-orange-200 text-orange-700" },
          { label: "Refunds (Month)", value: `৳${stats.refundsThisMonth.toLocaleString()}`, icon: "🔄", color: "bg-purple-50 border-purple-200 text-purple-700" },
          { label: "Scholarship Students", value: stats.scholarshipStudents, icon: "🎓", color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Active Gateways", value: stats.activeGateways, icon: "📱", color: "bg-cyan-50 border-cyan-200 text-cyan-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-3 rounded-lg border ${stat.color}`}>
            <span className="text-lg">{stat.icon}</span>
            <p className="text-xl font-bold mt-1">{stat.value}</p>
            <p className="text-[10px] opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-slate-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {quickActions.map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="bg-white rounded-lg border border-slate-200 p-3 hover:shadow-md transition-all group text-center"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-lg mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <p className="text-[10px] font-medium text-slate-700 leading-tight">{action.title}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fee Type Collection */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-bold text-slate-700">Fee Type Collection — July 2025</h2>
            <Link href="/admin/finance/fee-structure" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">Manage Fees →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Fee Type</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Target</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Collected</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Students</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {feeTypeCollection.map((fee, i) => {
                  const percent = Math.round((fee.collected / fee.target) * 100);
                  return (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{fee.icon}</span>
                          <span className="text-sm font-medium text-slate-800">{fee.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-center text-slate-600">৳{(fee.target / 100000).toFixed(1)}L</td>
                      <td className="px-4 py-3 text-sm text-center font-bold text-green-600">৳{(fee.collected / 100000).toFixed(1)}L</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-600">{fee.students}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div className={`h-2 rounded-full ${getProgressColor(percent)}`} style={{ width: `${percent}%` }}></div>
                          </div>
                          <span className="text-xs font-medium text-slate-600 w-9">{percent}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Monthly Mini Chart */}
          <div className="p-4 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-700 mb-3">Monthly Collection (in Lakh ৳)</h3>
            <div className="flex items-end gap-2 h-28">
              {monthlyCollection.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                  <div className="w-full flex items-end justify-center gap-0.5 h-24">
                    <div className="w-1/2 bg-slate-200 rounded-t relative" style={{ height: `${(m.target / 110) * 100}%` }}>
                      <div className="absolute bottom-0 w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t" style={{ height: `${Math.min((m.collected / m.target) * 100, 100)}%` }}></div>
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-500 font-medium">{m.month}</span>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-800 text-white text-[9px] px-2 py-1 rounded whitespace-nowrap z-10">
                    ৳{m.collected}L / Target ৳{m.target}L
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Transactions */}
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="font-bold text-slate-700">Recent Transactions</h2>
              <Link href="/admin/finance/payments" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">View All →</Link>
            </div>
            <div className="divide-y divide-slate-100 max-h-[280px] overflow-y-auto">
              {recentTransactions.map((t) => (
                <div key={t.id} className="p-3 flex items-start gap-3 hover:bg-slate-50">
                  <span className="text-lg mt-0.5">{t.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">{t.student} <span className="text-xs text-slate-400">({t.class})</span></p>
                    <p className="text-xs text-slate-500">{t.type} • {t.method}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{t.txnId} • {t.time}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-slate-800">৳{t.amount.toLocaleString()}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${getStatusBadge(t.status)}`}>{t.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="font-bold text-slate-700">Pending Approvals</h2>
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">{approvals.length}</span>
            </div>
            <div className="divide-y divide-slate-100 max-h-[320px] overflow-y-auto">
              {approvals.length === 0 ? (
                <div className="p-6 text-center">
                  <span className="text-3xl">🎉</span>
                  <p className="text-sm text-slate-500 mt-2">All caught up! No pending approvals.</p>
                </div>
              ) : (
                approvals.map((a) => (
                  <div key={a.id} className="p-3 hover:bg-slate-50">
                    <div className="flex items-start gap-2">
                      <span className="text-lg mt-0.5">{a.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">{a.type}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${getPriorityBadge(a.priority)}`}>{a.priority}</span>
                        </div>
                        <p className="text-xs text-slate-700 mt-1">{a.detail}</p>
                        <p className="text-[10px] text-slate-400">{a.student}</p>
                      </div>
                      <p className="text-sm font-bold text-slate-800 shrink-0">৳{a.amount.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2 mt-2 ml-7">
                      <button onClick={() => handleApprove(a.id)} className="flex-1 bg-green-500 hover:bg-green-600 text-white text-[10px] font-semibold py-1 rounded transition-colors">✓ Approve</button>
                      <button onClick={() => handleApprove(a.id)} className="flex-1 border border-slate-200 hover:bg-slate-100 text-slate-600 text-[10px] font-semibold py-1 rounded transition-colors">✗ Reject</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}