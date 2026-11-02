
import Link from "next/link";
import { importExportMenu } from "./_components/importExportData";

const stats = [
  { label: "Total Operations", value: "1,250", icon: "🔄" },
  { label: "Imported Records", value: "85,420", icon: "📥" },
  { label: "Exported Records", value: "42,680", icon: "📤" },
  { label: "Failed Operations", value: "18", icon: "⚠️" },
];

const recentActivities = [
  {
    name: "Student Data October.xlsx",
    type: "Excel Import",
    records: "500",
    status: "Completed",
    date: "Today, 10:30 AM",
  },
  {
    name: "Student Attendance.csv",
    type: "CSV Import",
    records: "1,000",
    status: "Completed",
    date: "Today, 09:45 AM",
  },
  {
    name: "Class 9 to Class 10",
    type: "Bulk Promotion",
    records: "200",
    status: "Processing",
    date: "Yesterday",
  },
];

export default function ImportExportDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Data Import / Export
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Import, export, update, delete and manage bulk institutional data.
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
            Import / Export Features
          </h2>
          <Link
            href="/admin/import-export/features"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View All Features →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {importExportMenu.map((item) => (
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
                Open Module →
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-bold text-slate-800">
          Recent Operations
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="px-4 py-3">Operation</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Records</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((item) => (
                <tr key={item.name} className="border-b border-slate-100">
                  <td className="px-4 py-4 font-medium text-slate-800">
                    {item.name}
                  </td>
                  <td className="px-4 py-4 text-slate-600">{item.type}</td>
                  <td className="px-4 py-4 text-slate-600">{item.records}</td>
                  <td className="px-4 py-4 text-slate-600">{item.date}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <h3 className="font-semibold text-blue-800">
          Data Management Guidelines
        </h3>
        <p className="mt-1 text-sm text-blue-700">
          Always validate uploaded files, review duplicate records and
          confirm destructive bulk operations before processing.
        </p>
      </div>
    </div>
  );
}
