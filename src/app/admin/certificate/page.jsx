
import Link from "next/link";

const certificateModules = [
  {
    title: "Certificate Templates",
    description: "Create and manage academic and institutional certificate designs.",
    href: "/admin/certificate/templates",
    icon: "📄",
    features: [
      "Create Template",
      "Edit Template",
      "Degree Certificate",
      "Transcript Template",
    ],
  },
  {
    title: "Digital Signature",
    description: "Manage authorized signatories and certificate signatures.",
    href: "/admin/certificate/digital-signature",
    icon: "✍️",
    features: [
      "Authorized Signatory",
      "Digital Signing",
      "Signature Validity",
      "Signature History",
    ],
  },
  {
    title: "QR Verification",
    description: "Manage QR codes linked to issued certificates.",
    href: "/admin/certificate/qr-verification",
    icon: "🔳",
    features: [
      "QR Generation",
      "QR Scanning",
      "Certificate Linking",
      "Scan History",
    ],
  },
  {
    title: "Online Verification",
    description: "Verify certificate authenticity through an online portal.",
    href: "/admin/certificate/online-verification",
    icon: "🌐",
    features: [
      "Certificate Lookup",
      "Verification Requests",
      "Verification History",
      "Verification Status",
    ],
  },
];

const recentActivities = [
  {
    title: "Bachelor Degree Certificate",
    type: "Template",
    date: "2026-10-20",
    status: "Active",
  },
  {
    title: "Registrar Signature",
    type: "Digital Signature",
    date: "2026-10-20",
    status: "Active",
  },
  {
    title: "Bachelor Degree Certificate",
    type: "QR Verification",
    date: "2026-10-25",
    status: "Generated",
  },
  {
    title: "Academic Transcript",
    type: "Online Verification",
    date: "2026-10-30",
    status: "Pending",
  },
];

export default function CertificateDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Certificate Management Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage certificate templates, digital signatures and online verification.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Certificates",
              value: "2,450",
              icon: "📜",
            },
            {
              title: "Active Templates",
              value: "18",
              icon: "📄",
            },
            {
              title: "Generated QR Codes",
              value: "1,850",
              icon: "🔳",
            },
            {
              title: "Verification Requests",
              value: "125",
              icon: "🔍",
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
              Certificate Features
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Select a feature to manage certificate records.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {certificateModules.map((module) => (
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
              Recent Certificate Activities
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
