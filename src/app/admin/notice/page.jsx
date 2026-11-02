
import Link from "next/link";

const noticeModules = [
  {
    title: "Notice Management",
    description: "Create, publish and manage institutional notices.",
    href: "/admin/notice/notices",
    icon: "📋",
    features: ["Create Notice", "Publish Notice", "Schedule Notice", "Notice History"],
  },
  {
    title: "Announcement Management",
    description: "Manage important academic and institutional announcements.",
    href: "/admin/notice/announcements",
    icon: "📢",
    features: ["Academic Announcement", "Event Announcement", "Admission Updates"],
  },
  {
    title: "Popup Management",
    description: "Manage website and dashboard popup messages.",
    href: "/admin/notice/popup",
    icon: "🪟",
    features: ["Welcome Popup", "Alert Popup", "Display Schedule", "Target Audience"],
  },
  {
    title: "SMS Management",
    description: "Send SMS notifications to students and staff.",
    href: "/admin/notice/sms",
    icon: "📱",
    features: ["Bulk SMS", "SMS Templates", "Delivery Reports", "SMS History"],
  },
  {
    title: "Email Management",
    description: "Manage institutional emails and email campaigns.",
    href: "/admin/notice/email",
    icon: "📧",
    features: ["Bulk Email", "Email Templates", "Email Campaign", "Delivery Reports"],
  },
  {
    title: "Push Notification",
    description: "Send notifications to web and mobile applications.",
    href: "/admin/notice/push-notification",
    icon: "🔔",
    features: ["Web Push", "Mobile Push", "Target Audience", "Delivery Status"],
  },
];

const recentActivities = [
  {
    title: "Semester Final Exam Routine",
    type: "Notice",
    date: "2026-11-01",
    status: "Published",
  },
  {
    title: "New Academic Session Registration",
    type: "Announcement",
    date: "2026-11-01",
    status: "Published",
  },
  {
    title: "Welcome to Student Portal",
    type: "Popup",
    date: "2026-11-01",
    status: "Active",
  },
  {
    title: "Monthly Newsletter",
    type: "Email",
    date: "2026-10-30",
    status: "Scheduled",
  },
];

export default function NoticeDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Notice Management Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage notices, announcements, popups and notifications.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Notices",
              value: "125",
              icon: "📋",
            },
            {
              title: "Published Notices",
              value: "85",
              icon: "✅",
            },
            {
              title: "Scheduled Notices",
              value: "18",
              icon: "⏳",
            },
            {
              title: "Notifications Sent",
              value: "2,450",
              icon: "📨",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {item.title}
                </p>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-800">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Modules */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-800">
              Notice Features
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Select a feature to manage its records.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {noticeModules.map((module) => (
              <div
                key={module.href}
                className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-3xl">{module.icon}</span>
                    <h3 className="mt-3 font-bold text-slate-800">
                      {module.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-2 min-h-10 text-sm text-slate-500">
                  {module.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {module.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Link
                  href={module.href}
                  className="mt-5 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Manage Records →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-bold text-slate-800">
              Recent Notice Activities
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4">Title</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentActivities.map((activity) => (
                  <tr key={activity.title}>
                    <td className="px-5 py-4 font-medium text-slate-800">
                      {activity.title}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {activity.type}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {activity.date}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
