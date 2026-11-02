
"use client";

import Link from "next/link";

const features = [
  {
    title: "Student Election",
    description: "Manage student council elections, candidates and student voting.",
    href: "/admin/voting/student-election",
    icon: "🎓",
    color: "bg-blue-50 text-blue-600",
    count: "03 Elections",
  },
  {
    title: "Teacher Election",
    description: "Manage teacher elections, nominations and faculty voting.",
    href: "/admin/voting/teacher-election",
    icon: "👨‍🏫",
    color: "bg-purple-50 text-purple-600",
    count: "03 Elections",
  },
  {
    title: "Survey Management",
    description: "Create surveys and collect student or teacher feedback.",
    href: "/admin/voting/survey",
    icon: "📝",
    color: "bg-green-50 text-green-600",
    count: "03 Surveys",
  },
  {
    title: "Referendum",
    description: "Manage important institutional decisions through voting.",
    href: "/admin/voting/referendum",
    icon: "📋",
    color: "bg-amber-50 text-amber-600",
    count: "03 Referendums",
  },
  {
    title: "Anonymous Vote",
    description: "Conduct confidential voting without displaying voter identities.",
    href: "/admin/voting/anonymous-vote",
    icon: "🔒",
    color: "bg-pink-50 text-pink-600",
    count: "03 Voting Activities",
  },
  {
    title: "Result Analytics",
    description: "Review election results, participation and voting statistics.",
    href: "/admin/voting/result-analytics",
    icon: "📊",
    color: "bg-indigo-50 text-indigo-600",
    count: "03 Result Records",
  },
];

const activities = [
  {
    title: "Student Council President 2026",
    description: "Student election is currently active.",
    date: "Nov 01, 2026",
    status: "Active",
  },
  {
    title: "Campus Timing Change Proposal",
    description: "Referendum voting has started.",
    date: "Nov 01, 2026",
    status: "Active",
  },
  {
    title: "General Secretary Election",
    description: "Final election results have been completed.",
    date: "Oct 30, 2026",
    status: "Completed",
  },
  {
    title: "Student Campus Experience Survey",
    description: "Survey responses are being collected.",
    date: "Oct 25, 2026",
    status: "Active",
  },
];

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
};

export default function VotingFeaturesPage() {
  const stats = [
    {
      label: "Total Voting Activities",
      value: "18",
      icon: "🗳️",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Active Voting",
      value: "06",
      icon: "🟢",
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Upcoming Voting",
      value: "04",
      icon: "🕒",
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Total Votes Cast",
      value: "3,140",
      icon: "📊",
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
            Voting Management
          </span>
        </div>

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Voting Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage elections, surveys, referendums and voting results.
            </p>
          </div>

          <Link
            href="/admin/voting/student-election"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            + Manage Voting
          </Link>
        </div>
      </div>

      {/* Stats */}
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
            Voting Features
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Select a feature to manage its voting activities.
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
            Recent Voting Activities
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Latest updates from voting management.
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
                  statusStyles[activity.status]
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
