
import Link from "next/link";
import { workflowMenu } from "./_components/workflowData";

const stats = [
  { label: "Total Workflows", value: "24", icon: "⚡" },
  { label: "Pending Approvals", value: "18", icon: "⏳" },
  { label: "Completed Workflows", value: "156", icon: "✅" },
  { label: "Active Automations", value: "12", icon: "⚙️" },
];

const activities = [
  {
    title: "Admission application submitted",
    user: "Sakib Hasan",
    time: "Today, 10:30 AM",
    status: "Pending",
  },
  {
    title: "Payment workflow approved",
    user: "Finance Officer",
    time: "Today, 09:45 AM",
    status: "Approved",
  },
  {
    title: "Leave request under review",
    user: "Abdul Karim",
    time: "Yesterday",
    status: "In Review",
  },
];

export default function WorkflowDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dynamic Workflow Engine
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage institutional processes, approvals and automation rules.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <h2 className="mt-3 text-2xl font-bold text-slate-800">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">
            Workflow Management
          </h2>
          <Link
            href="/admin/workflow/features"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View All Features →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {workflowMenu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-2xl">
                {item.icon}
              </div>
              <h3 className="font-semibold text-slate-800">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                {item.description}
              </p>
              <p className="mt-4 text-sm font-medium text-blue-600">
                Manage Workflow →
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-bold text-slate-800">
          Recent Workflow Activities
        </h2>

        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex flex-col justify-between gap-2 border-b border-slate-100 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  {activity.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {activity.user} · {activity.time}
                </p>
              </div>
              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <h3 className="font-semibold text-blue-800">
          Workflow Engine Information
        </h3>
        <p className="mt-1 text-sm text-blue-700">
          Configure approval levels, workflow stages, automatic triggers
          and actions to reduce manual administrative work.
        </p>
      </div>
    </div>
  );
}
