
import Link from "next/link";
import { settingsMenu } from "./_components/settingsData";

const stats = [
  { label: "Total Settings", value: "12", icon: "🛠️" },
  { label: "Configured Services", value: "08", icon: "✅" },
  { label: "Active Gateways", value: "03", icon: "🔗" },
  { label: "Pending Configuration", value: "02", icon: "⏳" },
];

const systemStatus = [
  { name: "Institution Profile", status: "Configured" },
  { name: "Academic Calendar", status: "Configured" },
  { name: "SMTP Service", status: "Not Verified" },
  { name: "SMS Gateway", status: "Pending" },
  { name: "Payment Gateway", status: "Sandbox" },
  { name: "Automatic Backup", status: "Enabled" },
];

export default function SettingsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          System Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage institution information, application preferences and
          external service configurations.
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
            Settings Categories
          </h2>
          <Link
            href="/admin/settings/features"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {settingsMenu.map((item) => (
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
                Configure →
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-bold text-slate-800">
          Configuration Overview
        </h2>

        <div className="space-y-4">
          {systemStatus.map((item) => (
            <div
              key={item.name}
              className="flex flex-col justify-between gap-2 border-b border-slate-100 pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-center"
            >
              <span className="text-sm font-medium text-slate-700">
                {item.name}
              </span>
              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <h3 className="font-semibold text-blue-800">
          System Configuration
        </h3>
        <p className="mt-1 text-sm text-blue-700">
          Changes to global settings may affect all users. Restrict access
          to authorized administrators and keep a configuration audit log.
        </p>
      </div>
    </div>
  );
}
