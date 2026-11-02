
import Link from "next/link";

const analyticsFeatures = [
  {
    title: "Grade Prediction",
    description: "Predict student grades and future academic performance.",
    icon: "🎓",
    href: "/admin/ai-analytics/grade-prediction",
    color: "bg-blue-50",
  },
  {
    title: "Risk Score",
    description: "Identify students who may need academic support.",
    icon: "⚠️",
    href: "/admin/ai-analytics/risk-score",
    color: "bg-red-50",
  },
  {
    title: "Dropout Prediction",
    description: "Analyze student engagement and retention risks.",
    icon: "📉",
    href: "/admin/ai-analytics/dropout-prediction",
    color: "bg-orange-50",
  },
  {
    title: "Attendance Prediction",
    description: "Forecast future student attendance patterns.",
    icon: "📅",
    href: "/admin/ai-analytics/attendance-prediction",
    color: "bg-green-50",
  },
  {
    title: "Learning Gap",
    description: "Find weak topics and knowledge gaps.",
    icon: "📚",
    href: "/admin/ai-analytics/learning-gap",
    color: "bg-purple-50",
  },
  {
    title: "Teacher Analytics",
    description: "Analyze teaching performance and engagement.",
    icon: "👨‍🏫",
    href: "/admin/ai-analytics/teacher-analytics",
    color: "bg-indigo-50",
  },
  {
    title: "Department Analytics",
    description: "Compare academic performance across departments.",
    icon: "🏢",
    href: "/admin/ai-analytics/department-analytics",
    color: "bg-cyan-50",
  },
  {
    title: "University Analytics",
    description: "Monitor university-wide academic indicators.",
    icon: "🏛️",
    href: "/admin/ai-analytics/university-analytics",
    color: "bg-amber-50",
  },
  {
    title: "AI Recommendation",
    description: "Generate personalized academic recommendations.",
    icon: "💡",
    href: "/admin/ai-analytics/recommendation",
    color: "bg-pink-50",
  },
  {
    title: "Natural Language Query",
    description: "Ask questions about university data in plain language.",
    icon: "💬",
    href: "/admin/ai-analytics/natural-language-query",
    color: "bg-teal-50",
  },
];

const stats = [
  { title: "Total AI Analyses", value: "12,450", icon: "🧠" },
  { title: "Students Analyzed", value: "8,920", icon: "👨‍🎓" },
  { title: "High Risk Students", value: "245", icon: "⚠️" },
  { title: "AI Recommendations", value: "1,280", icon: "💡" },
];

const activities = [
  {
    title: "Grade Prediction Analysis",
    description: "Academic performance analysis completed.",
    time: "Today, 10:30 AM",
    status: "Completed",
  },
  {
    title: "Student Risk Assessment",
    description: "Student risk indicators updated.",
    time: "Today, 09:45 AM",
    status: "Completed",
  },
  {
    title: "Learning Gap Analysis",
    description: "Learning gaps identified for sample students.",
    time: "Yesterday",
    status: "Completed",
  },
  {
    title: "Department Performance",
    description: "Department analytics report generated.",
    time: "Yesterday",
    status: "Under Review",
  },
];

export default function AIAnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-blue-600">
            Module 23 / AI Analytics Engine
          </p>
          <h1 className="text-2xl font-bold text-slate-800">
            AI Analytics Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Intelligent academic analytics and institutional insights.
          </p>
        </div>

        <button
          onClick={() =>
            alert("AI model execution will be connected with the backend.")
          }
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Run AI Analysis
        </button>
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
            AI Analytics Features
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Select an analytics feature to explore its records and insights.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {analyticsFeatures.map((feature) => (
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
                Explore Analytics →
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-800">
            Recent AI Activities
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Latest analytics activities (sample data).
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

      {/* Information */}
      <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <h3 className="font-semibold text-blue-900">
          AI Engine Integration
        </h3>
        <p className="mt-1 text-sm leading-6 text-blue-800">
          Dashboard statistics and activities are demonstration data.
          Real-time analytics will require student records, examination
          results, attendance history, validated AI models and backend APIs.
        </p>
      </div>
    </div>
  );
}
