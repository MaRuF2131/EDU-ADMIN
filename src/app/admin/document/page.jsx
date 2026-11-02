
import Link from "next/link";

const documentModules = [
  {
    title: "Student Documents",
    description: "Manage student identity, academic and admission documents.",
    href: "/admin/document/student-documents",
    icon: "🎓",
    features: [
      "Student ID Documents",
      "Academic Transcripts",
      "Admission Documents",
      "Document Approval",
    ],
  },
  {
    title: "Teacher Documents",
    description: "Manage teacher qualifications and professional documents.",
    href: "/admin/document/teacher-documents",
    icon: "👨‍🏫",
    features: [
      "Academic Qualifications",
      "Employment Agreement",
      "Training Certificates",
      "Teacher Profiles",
    ],
  },
  {
    title: "Department Files",
    description: "Manage department-wise institutional files and records.",
    href: "/admin/document/department-files",
    icon: "🏢",
    features: [
      "Academic Files",
      "Department Reports",
      "Meeting Minutes",
      "Access Permissions",
    ],
  },
  {
    title: "Version Control",
    description: "Track document revisions and previous versions.",
    href: "/admin/document/version-control",
    icon: "🔄",
    features: [
      "Version History",
      "Document Revision",
      "Change Tracking",
      "Restore Previous Version",
    ],
  },
  {
    title: "Digital Archive",
    description: "Store and organize historical institutional documents.",
    href: "/admin/document/digital-archive",
    icon: "🗄️",
    features: [
      "Archive Documents",
      "Historical Records",
      "Document Search",
      "Archive Restoration",
    ],
  },
];

const recentActivities = [
  {
    title: "Academic Transcript",
    type: "Student Document",
    date: "2026-10-20",
    status: "Approved",
  },
  {
    title: "Academic Qualification",
    type: "Teacher Document",
    date: "2026-10-18",
    status: "Approved",
  },
  {
    title: "Academic Calendar 2026",
    type: "Department File",
    date: "2026-10-15",
    status: "Published",
  },
  {
    title: "Academic Policy Document",
    type: "Version Control",
    date: "2026-10-20",
    status: "Latest Version",
  },
];

export default function DocumentDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Document Management Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage, organize, track and archive institutional documents.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Documents",
              value: "12,450",
              icon: "📁",
            },
            {
              title: "Approved Documents",
              value: "9,820",
              icon: "✅",
            },
            {
              title: "Pending Documents",
              value: "245",
              icon: "⏳",
            },
            {
              title: "Archived Documents",
              value: "2,385",
              icon: "🗄️",
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
              Document Features
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Select a feature to manage document records.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {documentModules.map((module) => (
              <div
                key={module.href}
                className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm"
              >
                <span className="text-3xl">{module.icon}</span>

                <h3 className="mt-3 font-bold text-slate-800">
                  {module.title}
                </h3>

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
                  Manage Documents →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-bold text-slate-800">
              Recent Document Activities
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4">Document Name</th>
                  <th className="px-5 py-4">Document Type</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {recentActivities.map((activity) => (
                  <tr key={`${activity.title}-${activity.type}`}>
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
