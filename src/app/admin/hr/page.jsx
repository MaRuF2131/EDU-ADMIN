
"use client";

import Link from "next/link";

const features = [
  {
    title: "Employee Management",
    description: "Manage employee profiles, departments, designations and employment records.",
    href: "/admin/hr/employees",
    icon: "👨‍💼",
    color: "bg-blue-50 text-blue-600",
    count: "Employee Directory",
  },
  {
    title: "Payroll Management",
    description: "Manage monthly salaries, allowances, deductions and payment records.",
    href: "/admin/hr/payroll",
    icon: "💰",
    color: "bg-green-50 text-green-600",
    count: "Salary & Payments",
  },
  {
    title: "Leave Management",
    description: "Review leave applications, approve requests and monitor leave balances.",
    href: "/admin/hr/leave",
    icon: "🏖️",
    color: "bg-amber-50 text-amber-600",
    count: "Leave Applications",
  },
  {
    title: "Attendance Management",
    description: "Monitor employee attendance, check-in, check-out and working hours.",
    href: "/admin/hr/attendance",
    icon: "⏰",
    color: "bg-purple-50 text-purple-600",
    count: "Daily Attendance",
  },
  {
    title: "Promotion Management",
    description: "Manage promotion requests, recommendations and approval decisions.",
    href: "/admin/hr/promotion",
    icon: "📈",
    color: "bg-indigo-50 text-indigo-600",
    count: "Career Progression",
  },
  {
    title: "Recruitment Management",
    description: "Manage vacancies, applicants, interviews and hiring activities.",
    href: "/admin/hr/recruitment",
    icon: "📋",
    color: "bg-pink-50 text-pink-600",
    count: "Hiring & Applicants",
  },
  {
    title: "Performance Management",
    description: "Evaluate employee performance, goals, reviews and feedback.",
    href: "/admin/hr/performance",
    icon: "🎯",
    color: "bg-orange-50 text-orange-600",
    count: "Performance Reviews",
  },
];

const activities = [
  {
    title: "Rahim Ahmed",
    description: "Submitted a casual leave application.",
    date: "Nov 02, 2026",
    status: "Pending",
  },
  {
    title: "Nusrat Jahan",
    description: "November salary payment is awaiting processing.",
    date: "Nov 01, 2026",
    status: "Pending",
  },
  {
    title: "Software Engineer",
    description: "New recruitment vacancy is open.",
    date: "Oct 10, 2026",
    status: "Open",
  },
  {
    title: "Rahim Ahmed",
    description: "Annual performance review has been completed.",
    date: "Oct 15, 2026",
    status: "Completed",
  },
];

const statusStyles = {
  Pending: "bg-amber-100 text-amber-700",
  Open: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
};

export default function HRDashboardPage() {
  const stats = [
    {
      label: "Total Employees",
      value: "248",
      icon: "👥",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Present Today",
      value: "218",
      icon: "🟢",
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Pending Leave",
      value: "12",
      icon: "🕒",
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Open Vacancies",
      value: "08",
      icon: "📋",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-7">
        <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/admin" className="hover:text-blue-600">
            Dashboard
          </Link>
          <span>/</span>
          <span className="font-medium text-slate-700">
            HR Management
          </span>
        </div>

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              HR Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage employees, payroll, attendance, recruitment and performance.
            </p>
          </div>

          <Link
            href="/admin/hr/employees"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            + Manage Employees
          </Link>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-800">
                  {stat.value}
                </h2>
              </div>

              <div className={`rounded-xl p-3 text-xl ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <div className="mb-7">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-800">
            HR Features
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Select a module to manage HR activities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className={`rounded-xl p-3 text-2xl ${feature.color}`}>
                  {feature.icon}
                </div>

                <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600">
                  →
                </span>
              </div>

              <h3 className="font-semibold text-slate-800 transition group-hover:text-blue-600">
                {feature.title}
              </h3>

              <p className="mt-2 min-h-[42px] text-sm leading-6 text-slate-500">
                {feature.description}
              </p>

              <div className="mt-4 border-t border-slate-100 pt-3">
                <span className="text-xs font-medium text-blue-600">
                  {feature.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <h2 className="font-bold text-slate-800">
            Recent HR Activities
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Latest updates from human resource management.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  {activity.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {activity.description}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {activity.date}
                </p>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                  statusStyles[activity.status] ||
                  "bg-slate-100 text-slate-700"
                }`}
              >
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
