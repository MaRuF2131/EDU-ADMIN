import Link from "next/link";
import { integrationMenu } from "./_components/integrationData";

const stats = [
  { title: "Total Integrations", value: "42", icon: "🔗" },
  { title: "Active Connections", value: "28", icon: "🟢" },
  { title: "Pending Setup", value: "08", icon: "⏳" },
  { title: "Failed Connections", value: "06", icon: "🔴" },
];

const activities = [
  {
    title: "Twilio Voice Gateway connected",
    description: "Voice gateway configuration updated.",
    time: "Today, 10:30 AM",
    status: "Success",
  },
  {
    title: "Google Drive synchronization",
    description: "Google Drive integration synchronized.",
    time: "Today, 09:15 AM",
    status: "Success",
  },
  {
    title: "Nagad Payment Gateway",
    description: "Waiting for provider credentials.",
    time: "Yesterday, 04:20 PM",
    status: "Pending",
  },
  {
    title: "Microsoft Teams Integration",
    description: "Permission review is pending.",
    time: "Yesterday, 02:10 PM",
    status: "Review",
  },
];

export default function ApiDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">Admin / API & Integration</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-800">
          API & Integration Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage APIs, external services, gateways and third-party connections.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{item.title}</p>
              <span className="text-2xl">{item.icon}</span>
            </div>
            <h2 className="mt-3 text-2xl font-bold text-slate-800">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Integration Features
            </h2>
            <p className="text-sm text-slate-500">
              Select a feature to manage its configurations.
            </p>
          </div>

          <Link
            href="/admin/api/features"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            View All Features
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {integrationMenu.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600">
                  →
                </span>
              </div>
              <h3 className="mt-4 font-semibold text-slate-800">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Manage {item.title.toLowerCase()} configuration and connections.
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-5">
          <h2 className="font-semibold text-slate-800">Recent Activities</h2>
          <p className="mt-1 text-sm text-slate-500">
            Latest integration events and configuration updates.
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
                <p className="mt-1 text-xs text-slate-400">
                  {activity.time}
                </p>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                  activity.status === "Success"
                    ? "bg-green-100 text-green-700"
                    : activity.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
        <h3 className="font-semibold text-blue-900">
          Integration Security Notice
        </h3>
        <p className="mt-1 text-sm text-blue-800">
          Store API keys, client secrets, access tokens and webhook signing
          secrets securely on the backend. Never expose private credentials
          in frontend code.
        </p>
      </div>
    </div>
  );
}