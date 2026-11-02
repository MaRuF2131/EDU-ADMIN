import Link from "next/link";
import { monitoringMenu } from "./_components/monitoringData";

const stats = [
  { title: "Monitored Services", value: "32", icon: "📡" },
  { title: "Healthy Services", value: "26", icon: "🟢" },
  { title: "Warnings", value: "04", icon: "⚠️" },
  { title: "Critical Issues", value: "02", icon: "🔴" },
];

const systemMetrics = [
  { label: "CPU Usage", value: "42%", width: "42%", status: "Healthy" },
  { label: "Memory Usage", value: "68%", width: "68%", status: "Healthy" },
  { label: "Disk Usage", value: "78%", width: "78%", status: "Warning" },
  { label: "API Availability", value: "99.8%", width: "99.8%", status: "Healthy" },
];

const activities = [
  {
    title: "Main application server checked",
    description: "Server health check completed successfully.",
    time: "Today, 10:30 AM",
    status: "Healthy",
  },
  {
    title: "Notification queue backlog",
    description: "Pending notification jobs are above the expected threshold.",
    time: "Today, 10:25 AM",
    status: "Warning",
  },
  {
    title: "Payment API response delay",
    description: "Payment API response time is higher than normal.",
    time: "Today, 10:20 AM",
    status: "Warning",
  },
  {
    title: "Backup cron job failed",
    description: "The scheduled backup job requires investigation.",
    time: "Today, 08:00 AM",
    status: "Critical",
  },
];

export default function MonitoringDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm text-slate-500">
          Admin / System Monitoring
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-800">
          System Monitoring Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor server infrastructure, databases, APIs and application performance.
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

      {/* System metrics */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-5">
          <h2 className="font-semibold text-slate-800">
            System Resource Overview
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Sample resource utilization metrics.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {systemMetrics.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-slate-700">
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {item.value}
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${
                    item.status === "Warning"
                      ? "bg-yellow-500"
                      : "bg-blue-600"
                  }`}
                  style={{ width: item.width }}
                />
              </div>

              <p className="mt-1 text-xs text-slate-400">
                {item.status}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Monitoring features */}
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Monitoring Features
            </h2>
            <p className="text-sm text-slate-500">
              Select a monitoring module to inspect detailed records.
            </p>
          </div>

          <Link
            href="/admin/monitoring/features"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            View All Features
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {monitoringMenu.map((item) => (
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
                Monitor and review {item.title.toLowerCase()}.
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activities */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-5">
          <h2 className="font-semibold text-slate-800">
            Recent Monitoring Activities
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Latest system health checks and alerts.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {activities.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {item.description}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {item.time}
                </p>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                  item.status === "Healthy"
                    ? "bg-green-100 text-green-700"
                    : item.status === "Warning"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Notice */}
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
        <h3 className="font-semibold text-blue-900">
          Monitoring Information
        </h3>

        <p className="mt-1 text-sm text-blue-800">
          Dashboard metrics are sample values. Connect server-side monitoring
          agents and health-check services to display actual infrastructure data.
        </p>
      </div>
    </div>
  );
}