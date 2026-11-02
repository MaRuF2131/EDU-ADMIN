
"use client";

import Link from "next/link";

const features = [
  {
    title: "Publication Management",
    description: "Manage research papers, journals, articles and publications.",
    href: "/admin/research/publication",
    icon: "📚",
    color: "bg-blue-50 text-blue-600",
    count: "03 Publications",
  },
  {
    title: "Conference Management",
    description: "Organize academic conferences, submissions and participation.",
    href: "/admin/research/conference",
    icon: "🎤",
    color: "bg-purple-50 text-purple-600",
    count: "03 Conferences",
  },
  {
    title: "Patent Management",
    description: "Track intellectual property and patent applications.",
    href: "/admin/research/patent",
    icon: "💡",
    color: "bg-amber-50 text-amber-600",
    count: "03 Patent Records",
  },
  {
    title: "Research Grant",
    description: "Manage research funding, grant applications and approvals.",
    href: "/admin/research/research-grant",
    icon: "💰",
    color: "bg-green-50 text-green-600",
    count: "03 Grant Records",
  },
  {
    title: "Research Group",
    description: "Manage research teams, members and supervisors.",
    href: "/admin/research/research-group",
    icon: "👥",
    color: "bg-pink-50 text-pink-600",
    count: "03 Research Groups",
  },
  {
    title: "Citation Management",
    description: "Track citations, DOI references and research impact.",
    href: "/admin/research/citation",
    icon: "🔗",
    color: "bg-indigo-50 text-indigo-600",
    count: "03 Citation Records",
  },
];

const activities = [
  {
    title: "Artificial Intelligence in Education",
    description: "New research publication has been added.",
    date: "Oct 15, 2026",
    status: "Published",
  },
  {
    title: "AI Based Learning Analytics Project",
    description: "Research grant application has been approved.",
    date: "Sep 10, 2026",
    status: "Approved",
  },
  {
    title: "International AI Research Conference 2026",
    description: "Conference schedule is upcoming.",
    date: "Nov 15, 2026",
    status: "Upcoming",
  },
  {
    title: "Smart Attendance Verification System",
    description: "Patent application has been filed.",
    date: "Aug 10, 2026",
    status: "Filed",
  },
];

const statusStyles = {
  Published: "bg-green-100 text-green-700",
  Approved: "bg-green-100 text-green-700",
  Upcoming: "bg-amber-100 text-amber-700",
  Filed: "bg-blue-100 text-blue-700",
};

export default function ResearchFeaturesPage() {
  const stats = [
    {
      label: "Total Research Records",
      value: "18",
      icon: "🔬",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Published Research",
      value: "05",
      icon: "📚",
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Active Research Projects",
      value: "06",
      icon: "🧪",
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Pending Reviews",
      value: "04",
      icon: "🕒",
      color: "bg-amber-50 text-amber-600",
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
            Research Management
          </span>
        </div>

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Research Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage publications, conferences, patents, research grants and academic activities.
            </p>
          </div>

          <Link
            href="/admin/research/publication"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            + Manage Research
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
            Research Features
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Select a feature to manage research activities.
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
            Recent Research Activities
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Latest updates from research management.
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
