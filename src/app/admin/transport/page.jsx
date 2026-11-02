
import Link from "next/link";

const stats = [
  {
    title: "Total Buses",
    value: "35",
    description: "Registered university buses",
    color: "text-blue-600",
  },
  {
    title: "Active Routes",
    value: "18",
    description: "Currently running routes",
    color: "text-green-600",
  },
  {
    title: "Total Drivers",
    value: "32",
    description: "Registered transport drivers",
    color: "text-indigo-600",
  },
  {
    title: "Student Passes",
    value: "850",
    description: "Issued transport passes",
    color: "text-orange-600",
  },
];

const features = [
  {
    title: "Bus Management",
    description: "Manage buses, registration, capacity and vehicle status.",
    href: "/admin/transport/buses",
    icon: "🚌",
    count: "35 Buses",
  },
  {
    title: "Route Management",
    description: "Create routes, stops, schedules and assign buses.",
    href: "/admin/transport/routes",
    icon: "🗺️",
    count: "18 Routes",
  },
  {
    title: "Driver Management",
    description: "Manage driver information, licenses and assignments.",
    href: "/admin/transport/drivers",
    icon: "👨‍✈️",
    count: "32 Drivers",
  },
  {
    title: "GPS Management",
    description: "Manage GPS devices and monitor device connectivity.",
    href: "/admin/transport/gps",
    icon: "📡",
    count: "GPS Devices",
  },
  {
    title: "Live Bus Tracking",
    description: "Monitor bus locations, speed and journey status.",
    href: "/admin/transport/tracking",
    icon: "📍",
    count: "Live Tracking",
  },
  {
    title: "Student Transport Pass",
    description: "Manage student pass applications, fees and validity.",
    href: "/admin/transport/passes",
    icon: "🎫",
    count: "850 Passes",
  },
];

const activities = [
  {
    title: "New student transport pass application",
    user: "Nusrat Jahan",
    date: "Today, 10:30 AM",
    status: "Pending",
  },
  {
    title: "Bus assigned to a new route",
    user: "Transport Admin",
    date: "Today, 09:45 AM",
    status: "Completed",
  },
  {
    title: "GPS device disconnected",
    user: "BUS-003",
    date: "Today, 09:20 AM",
    status: "Attention",
  },
  {
    title: "Driver information updated",
    user: "Abdul Karim",
    date: "Yesterday, 04:00 PM",
    status: "Updated",
  },
];

const activityStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
  Attention: "bg-red-100 text-red-700",
  Updated: "bg-blue-100 text-blue-700",
};

export default function TransportDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/admin" className="hover:text-blue-600">
            Admin
          </Link>
          <span>/</span>
          <span className="text-slate-700">Transport Management</span>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Transport Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage university buses, routes, drivers, GPS tracking and student
            transport passes.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <p className="text-sm text-slate-500">{item.title}</p>
              <h2 className={`mt-2 text-3xl font-bold ${item.color}`}>
                {item.value}
              </h2>
              <p className="mt-2 text-xs text-slate-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-800">
              Transport Features
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Select a section to manage transport operations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{feature.icon}</span>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                    {feature.count}
                  </span>
                </div>

                <h3 className="mt-4 font-semibold text-slate-800 group-hover:text-blue-600">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600">
                  Manage Section <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-4">
            <h2 className="font-bold text-slate-800">Recent Activities</h2>
            <p className="mt-1 text-sm text-slate-500">
              Latest transport management activities.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {activity.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {activity.user} · {activity.date}
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                    activityStyles[activity.status] ||
                    "bg-slate-100 text-slate-700"
                  }`}
                >
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
