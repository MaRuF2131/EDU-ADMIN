
import Link from "next/link";

const reportFeatures = [
  {
    title: "Student Report",
    description: "Student profiles, results, GPA and academic history.",
    icon: "🎓",
    href: "/admin/reports/student-report",
    color: "bg-blue-50",
  },
  {
    title: "Teacher Report",
    description: "Teacher workload, performance and course reports.",
    icon: "👨‍🏫",
    href: "/admin/reports/teacher-report",
    color: "bg-indigo-50",
  },
  {
    title: "Department Report",
    description: "Department-level academic and operational reports.",
    icon: "🏢",
    href: "/admin/reports/department-report",
    color: "bg-purple-50",
  },
  {
    title: "Finance Report",
    description: "Income, expenses, tuition fees and financial summaries.",
    icon: "💰",
    href: "/admin/reports/finance-report",
    color: "bg-green-50",
  },
  {
    title: "Attendance Report",
    description: "Student and teacher attendance statistics.",
    icon: "📅",
    href: "/admin/reports/attendance-report",
    color: "bg-cyan-50",
  },
  {
    title: "Admission Report",
    description: "Applications, approvals and enrollment statistics.",
    icon: "📝",
    href: "/admin/reports/admission-report",
    color: "bg-orange-50",
  },
  {
    title: "Custom Report Builder",
    description: "Create reports using selected data sources.",
    icon: "🛠️",
    href: "/admin/reports/custom-report-builder",
    color: "bg-pink-50",
  },
  {
    title: "Excel Export",
    description: "Export report data into Excel spreadsheets.",
    icon: "📗",
    href: "/admin/reports/excel-export",
    color: "bg-emerald-50",
  },
  {
    title: "PDF Export",
    description: "Generate printable PDF reports.",
    icon: "📕",
    href: "/admin/reports/pdf-export",
    color: "bg-red-50",
  },
  {
    title: "CSV Export",
    description: "Export structured data into CSV files.",
    icon: "📄",
    href: "/admin/reports/csv-export",
    color: "bg-teal-50",
  },
  {
    title: "Power BI Integration",
    description: "Connect external BI dashboards and datasets.",
    icon: "📊",
    href: "/admin/reports/power-bi",
    color: "bg-amber-50",
  },
];

const stats = [
  { title: "Total Reports", value: "12,450", icon: "📊" },
  { title: "Generated Reports", value: "9,820", icon: "📄" },
  { title: "Pending Reports", value: "245", icon: "⏳" },
  { title: "Connected BI Dashboards", value: "08", icon: "📈" },
];

const recentActivities = [
  {
    title: "Student Academic Report",
    description: "Student academic report generated.",
    time: "Today, 10:30 AM",
    status: "Completed",
  },
  {
    title: "Finance Summary",
    description: "Monthly financial report is awaiting review.",
    time: "Today, 09:45 AM",
    status: "Pending",
  },
  {
    title: "Attendance CSV Export",
    description: "Attendance data exported successfully.",
    time: "Yesterday",
    status: "Completed",
  },
  {
    title: "Power BI Integration",
    description: "Finance dashboard connection needs configuration.",
    time: "Yesterday",
    status: "Under Review",
  },
];

export default function ReportsDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-blue-600">
            Module 24 / Reports & BI Dashboard
          </p>
          <h1 className="text-2xl font-bold text-slate-800">
            Reports & BI Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage institutional reports, data exports and business intelligence.
          </p>
        </div>

        <Link
          href="/admin/reports/custom-report-builder"
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700"
        >
          + Create Custom Report
        </Link>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
            <p className="mt-1 text-xs text-slate-400">
              Sample dashboard data
            </p>
          </div>
        ))}
      </div>

      {/* Report Features */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-800">
            Report Features
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Select a report category or integration.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {reportFeatures.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className={`rounded-xl p-3 text-2xl ${feature.color}`}>
                  {feature.icon}
                </div>
                <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600">
                  →
                </span>
              </div>

              <h3 className="mt-4 font-semibold text-slate-800">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {feature.description}
              </p>
              <p className="mt-4 text-sm font-medium text-blue-600">
                Explore Reports →
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-800">
            Recent Report Activities
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Latest report generation and export activities.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-sm font-medium text-slate-800">
                  {activity.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {activity.description}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {activity.time}
                </p>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                  activity.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Notice */}
      <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <h3 className="font-semibold text-blue-900">
          Reports & BI Integration
        </h3>
        <p className="mt-1 text-sm leading-6 text-blue-800">
          Dashboard statistics are sample data. Live reports, scheduled
          generation, Excel/PDF exports and Power BI connections require
          backend integration.
        </p>
      </div>
    </div>
  );
}
