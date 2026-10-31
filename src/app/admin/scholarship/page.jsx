
"use client";
import Link from "next/link";
import { useState } from "react";

const scholarshipStats = {
  totalPrograms: 24,
  activePrograms: 12,
  totalApplications: 1250,
  pendingApplications: 186,
  approvedApplications: 845,
  totalDisbursed: "৳45.8L",
};

const recentActivities = [
  {
    id: 1,
    message: "Rahim Uddin submitted Merit Scholarship application",
    time: "5 min ago",
    icon: "📥",
  },
  {
    id: 2,
    message: "25 applications approved for Need Based Scholarship",
    time: "20 min ago",
    icon: "✅",
  },
  {
    id: 3,
    message: "New Government Scholarship program created",
    time: "1 hour ago",
    icon: "🏛️",
  },
  {
    id: 4,
    message: "ABC Foundation sponsor payment received",
    time: "2 hours ago",
    icon: "💰",
  },
  {
    id: 5,
    message: "12 applications sent for final approval",
    time: "3 hours ago",
    icon: "📋",
  },
];

const quickActions = [
  {
    title: "Scholarship Programs",
    icon: "🏅",
    href: "/admin/scholarship/programs",
    color: "from-blue-500 to-blue-600",
    desc: "Create & Manage",
  },
  {
    title: "Applications",
    icon: "📄",
    href: "/admin/scholarship/applications",
    color: "from-purple-500 to-purple-600",
    desc: "View Applications",
  },
  {
    title: "Eligibility",
    icon: "📊",
    href: "/admin/scholarship/eligibility",
    color: "from-green-500 to-green-600",
    desc: "Set Criteria",
  },
  {
    title: "Sponsors",
    icon: "🤝",
    href: "/admin/scholarship/sponsors",
    color: "from-cyan-500 to-cyan-600",
    desc: "Manage Sponsors",
  },
  {
    title: "Approvals",
    icon: "✅",
    href: "/admin/scholarship/approvals",
    color: "from-orange-500 to-orange-600",
    desc: "Approval Workflow",
  },
  {
    title: "Disbursements",
    icon: "💰",
    href: "/admin/scholarship/disbursements",
    color: "from-pink-500 to-pink-600",
    desc: "Payment Tracking",
  },
];

const upcomingDeadlines = [
  {
    name: "Merit Scholarship 2026",
    deadline: "2026-11-15",
    applications: "145/200",
    urgent: true,
  },
  {
    name: "Need Based Scholarship",
    deadline: "2026-11-20",
    applications: "89/150",
    urgent: true,
  },
  {
    name: "Government Scholarship",
    deadline: "2026-12-01",
    applications: "45/300",
    urgent: false,
  },
  {
    name: "NGO Education Support",
    deadline: "2026-12-10",
    applications: "32/100",
    urgent: false,
  },
];

export default function ScholarshipDashboard() {
  const [activities] = useState(recentActivities);

  const stats = [
    {
      label: "Total Programs",
      value: scholarshipStats.totalPrograms,
      icon: "🏅",
      color: "bg-blue-50 border-blue-200 text-blue-700",
    },
    {
      label: "Active Programs",
      value: scholarshipStats.activePrograms,
      icon: "🟢",
      color: "bg-green-50 border-green-200 text-green-700",
    },
    {
      label: "Applications",
      value: scholarshipStats.totalApplications,
      icon: "📄",
      color: "bg-purple-50 border-purple-200 text-purple-700",
    },
    {
      label: "Pending",
      value: scholarshipStats.pendingApplications,
      icon: "⏳",
      color: "bg-orange-50 border-orange-200 text-orange-700",
    },
    {
      label: "Approved",
      value: scholarshipStats.approvedApplications,
      icon: "✅",
      color: "bg-teal-50 border-teal-200 text-teal-700",
    },
    {
      label: "Disbursed",
      value: scholarshipStats.totalDisbursed,
      icon: "💰",
      color: "bg-pink-50 border-pink-200 text-pink-700",
    },
  ];

  return (
    <div className="p-6 min-h-[calc(100vh-4rem)] bg-slate-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Scholarship Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage scholarship programs, applications, sponsors and approvals
          </p>
        </div>

        <Link
          href="/admin/scholarship/programs"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors"
        >
          + New Scholarship
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`p-4 rounded-lg border ${stat.color}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-lg">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs opacity-80 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-slate-700 mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="bg-white rounded-lg border border-slate-200 p-3 hover:shadow-md transition-all group text-center"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-xl mx-auto mb-2 group-hover:scale-110 transition-transform`}
              >
                {action.icon}
              </div>

              <p className="text-xs font-medium text-slate-700">
                {action.title}
              </p>

              <p className="text-[10px] text-slate-400 mt-0.5">
                {action.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Activities & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-700">
              Recent Activities
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="p-4 flex items-start gap-3 hover:bg-slate-50"
              >
                <span className="text-xl mt-0.5">
                  {activity.icon}
                </span>

                <div className="flex-1">
                  <p className="text-sm text-slate-700">
                    {activity.message}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-700">
              Upcoming Deadlines
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {upcomingDeadlines.map((item, i) => {
              const [submitted, total] = item.applications
                .split("/")
                .map(Number);

              const percentage = Math.round(
                (submitted / total) * 100
              );

              return (
                <div key={i} className="p-4 hover:bg-slate-50">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {item.name}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        Due: {item.deadline}
                      </p>
                    </div>

                    {item.urgent && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        Urgent
                      </span>
                    )}
                  </div>

                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>{item.applications} applications</span>
                      <span>{percentage}%</span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-blue-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scholarship Types */}
      <div className="mt-6 bg-white rounded-lg border border-slate-200 p-4">
        <h2 className="font-bold text-slate-700 mb-4">
          Scholarship Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              name: "Merit Based",
              desc: "Academic excellence",
              icon: "🏆",
              count: 8,
            },
            {
              name: "Need Based",
              desc: "Financial assistance",
              icon: "❤️",
              count: 6,
            },
            {
              name: "Government",
              desc: "Government funded",
              icon: "🏛️",
              count: 5,
            },
            {
              name: "NGO & Sponsor",
              desc: "External funding",
              icon: "🤝",
              count: 5,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-sm font-bold text-slate-700">
                {item.name}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {item.desc}
              </p>
              <p className="text-xs text-blue-600 font-semibold mt-2">
                {item.count} Programs
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
