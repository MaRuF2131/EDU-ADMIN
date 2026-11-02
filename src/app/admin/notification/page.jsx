
import Link from "next/link";

const notificationFeatures = [
  {
    title: "SMS Notification",
    description: "Send and manage SMS messages to students and teachers.",
    icon: "📱",
    href: "/admin/notification/sms",
    color: "bg-blue-50",
  },
  {
    title: "Email Notification",
    description: "Manage email templates and institutional communication.",
    icon: "📧",
    href: "/admin/notification/email",
    color: "bg-indigo-50",
  },
  {
    title: "WhatsApp Notification",
    description: "Manage WhatsApp Business messages and templates.",
    icon: "💬",
    href: "/admin/notification/whatsapp",
    color: "bg-green-50",
  },
  {
    title: "Push Notification",
    description: "Send web and mobile app push notifications.",
    icon: "🔔",
    href: "/admin/notification/push",
    color: "bg-purple-50",
  },
  {
    title: "Telegram Notification",
    description: "Manage Telegram bot and channel notifications.",
    icon: "✈️",
    href: "/admin/notification/telegram",
    color: "bg-cyan-50",
  },
  {
    title: "Scheduled Notification",
    description: "Schedule messages for future delivery.",
    icon: "🗓️",
    href: "/admin/notification/scheduled",
    color: "bg-orange-50",
  },
  {
    title: "AI Alert",
    description: "Monitor automated academic and system alerts.",
    icon: "🧠",
    href: "/admin/notification/ai-alert",
    color: "bg-pink-50",
  },
  {
    title: "Voice Call Routing Alert",
    description: "Manage automated voice alerts and call routing events.",
    icon: "📞",
    href: "/admin/notification/voice-call-alert",
    color: "bg-amber-50",
  },
];

const stats = [
  { title: "Total Notifications", value: "25,450", icon: "🔔" },
  { title: "Delivered", value: "22,820", icon: "✅" },
  { title: "Pending", value: "1,245", icon: "⏳" },
  { title: "Failed", value: "385", icon: "❌" },
];

const activities = [
  {
    title: "Exam Routine SMS",
    description: "Examination announcement sent to students.",
    time: "Today, 10:30 AM",
    status: "Delivered",
  },
  {
    title: "Monthly Fee Email",
    description: "Monthly fee reminder is waiting for delivery.",
    time: "Today, 09:45 AM",
    status: "Pending",
  },
  {
    title: "AI Attendance Alert",
    description: "Attendance monitoring alert generated.",
    time: "Yesterday",
    status: "Active",
  },
  {
    title: "Voice Call Routing",
    description: "Campus security alert routing completed.",
    time: "Yesterday",
    status: "Completed",
  },
];

export default function NotificationDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-blue-600">
            Module 25 / Notification Center
          </p>

          <h1 className="text-2xl font-bold text-slate-800">
            Notification Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage communication channels, automated alerts and notifications.
          </p>
        </div>

        <Link
          href="/admin/notification/sms"
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700"
        >
          + Create Notification
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

      {/* Features */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-800">
            Notification Features
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select a communication channel or alert management feature.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {notificationFeatures.map((feature) => (
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
                Manage Notifications →
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-800">
            Recent Notification Activities
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Latest notification delivery and alert activities.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {activities.map((activity, index) => (
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
                  ["Delivered", "Completed"].includes(activity.status)
                    ? "bg-green-100 text-green-700"
                    : activity.status === "Active"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Information */}
      <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <h3 className="font-semibold text-blue-900">
          Notification Provider Integration
        </h3>

        <p className="mt-1 text-sm leading-6 text-blue-800">
          Dashboard values are sample data. Actual SMS, Email, WhatsApp,
          Telegram, Push and Voice Call delivery requires provider APIs,
          backend processing and delivery-status webhooks.
        </p>
      </div>
    </div>
  );
}
