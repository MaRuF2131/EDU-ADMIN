
"use client";

import Link from "next/link";

const modules = [
  { title: "Result Challenge", description: "Review examination results, marks and grading disputes.", icon: "📝", href: "/admin/objection/result-challenge", color: "bg-blue-50" },
  { title: "Attendance Challenge", description: "Review attendance correction and absence disputes.", icon: "📅", href: "/admin/objection/attendance-challenge", color: "bg-purple-50" },
  { title: "Payment Issue", description: "Investigate payment failures and transaction mismatches.", icon: "💳", href: "/admin/objection/payment-issue", color: "bg-amber-50" },
  { title: "Complaint Management", description: "Manage student and guardian complaints.", icon: "📢", href: "/admin/objection/complaint", color: "bg-red-50" },
  { title: "Appeal Management", description: "Review appeals against previous decisions.", icon: "⚖️", href: "/admin/objection/appeal", color: "bg-indigo-50" },
  { title: "Resolution Center", description: "Track investigations and final resolutions.", icon: "✅", href: "/admin/objection/resolution", color: "bg-green-50" },
  { title: "AI Voice Notices", description: "Review AI-generated notices from voice-call interactions.", icon: "🤖", href: "/admin/objection/ai-notices", color: "bg-cyan-50" },
];

const activities = [
  { title: "Result challenge submitted", user: "Rahim Ahmed", time: "10 minutes ago", status: "Pending" },
  { title: "Payment issue updated", user: "Nusrat Jahan", time: "35 minutes ago", status: "Processing" },
  { title: "Complaint resolved", user: "Sakib Hasan", time: "1 hour ago", status: "Resolved" },
  { title: "AI voice notice generated", user: "System AI", time: "2 hours ago", status: "Generated" },
];

const badge = {
  Pending: "bg-amber-100 text-amber-700",
  Processing: "bg-blue-100 text-blue-700",
  Resolved: "bg-green-100 text-green-700",
  Generated: "bg-purple-100 text-purple-700",
};

export default function ObjectionDashboard() {
  const stats = [
    { label: "Total Objections", value: "248", icon: "📋", change: "+12 this month" },
    { label: "Pending Review", value: "42", icon: "⏳", change: "Needs attention" },
    { label: "Under Investigation", value: "28", icon: "🔍", change: "Currently active" },
    { label: "Resolved Cases", value: "178", icon: "✅", change: "This academic year" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Objection Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage challenges, complaints, appeals and resolutions.</p>
        </div>
        <Link href="/admin/objection/result-challenge" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2.5 text-sm font-medium text-center">
          + New Review
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item) => (
          <div key={item.label} className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{item.label}</p>
              <span className="text-xl">{item.icon}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mt-3">{item.value}</h2>
            <p className="text-xs text-slate-400 mt-2">{item.change}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Objection Features</h2>
            <p className="text-sm text-slate-500">Select a section to manage its applications.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {modules.map((item) => (
            <Link key={item.title} href={item.href} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition group">
              <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-2xl`}>
                {item.icon}
              </div>
              <div className="flex items-center justify-between mt-4">
                <h3 className="font-semibold text-slate-800 group-hover:text-blue-600">{item.title}</h3>
                <span className="text-slate-400 group-hover:text-blue-600">→</span>
              </div>
              <p className="text-sm text-slate-500 mt-2 leading-6">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <h2 className="font-semibold text-slate-800">Recent Activities</h2>
          <p className="text-sm text-slate-500 mt-1">Latest objection management activities.</p>
        </div>
        <div className="divide-y divide-slate-100">
          {activities.map((item, index) => (
            <div key={index} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-medium text-sm text-slate-800">{item.title}</p>
                <p className="text-xs text-slate-400 mt-1">{item.user} · {item.time}</p>
              </div>
              <span className={`w-fit px-2.5 py-1 rounded-full text-xs font-medium ${badge[item.status]}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
