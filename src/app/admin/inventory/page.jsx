
import Link from "next/link";

const stats = [
  {
    title: "Total Assets",
    value: "2,450",
    description: "All registered inventory items",
    color: "text-blue-600",
  },
  {
    title: "Available Assets",
    value: "1,820",
    description: "Ready for assignment or use",
    color: "text-green-600",
  },
  {
    title: "Assigned Assets",
    value: "520",
    description: "Currently assigned to departments",
    color: "text-indigo-600",
  },
  {
    title: "Low Stock / Attention",
    value: "110",
    description: "Items requiring attention",
    color: "text-orange-600",
  },
];

const features = [
  {
    title: "Computer Management",
    description: "Manage desktop computers, laptops and IT devices.",
    href: "/admin/inventory/computers",
    icon: "💻",
    count: "Computer Assets",
  },
  {
    title: "Lab Equipment",
    description: "Manage scientific, engineering and laboratory equipment.",
    href: "/admin/inventory/lab-equipment",
    icon: "🔬",
    count: "Lab Assets",
  },
  {
    title: "Furniture Management",
    description: "Manage classroom, office and laboratory furniture.",
    href: "/admin/inventory/furniture",
    icon: "🪑",
    count: "Furniture Items",
  },
  {
    title: "Stationery Management",
    description: "Track stationery stock, distribution and reorder levels.",
    href: "/admin/inventory/stationery",
    icon: "📚",
    count: "Stock Items",
  },
  {
    title: "Asset Tracking",
    description: "Track asset location, department and assignment history.",
    href: "/admin/inventory/asset-tracking",
    icon: "📍",
    count: "Tracked Assets",
  },
  {
    title: "Barcode Management",
    description: "Generate and manage asset barcode identification records.",
    href: "/admin/inventory/barcode",
    icon: "🏷️",
    count: "Barcode Records",
  },
];

const activities = [
  {
    title: "New computer added to inventory",
    user: "IT Department",
    date: "Today, 10:30 AM",
    status: "Added",
  },
  {
    title: "Stationery stock is below minimum level",
    user: "Central Store",
    date: "Today, 09:45 AM",
    status: "Low Stock",
  },
  {
    title: "Projector assigned to CSE Department",
    user: "Inventory Admin",
    date: "Yesterday, 03:15 PM",
    status: "Assigned",
  },
  {
    title: "New asset barcode generated",
    user: "Store Officer",
    date: "Yesterday, 11:00 AM",
    status: "Generated",
  },
];

const activityStyles = {
  Added: "bg-green-100 text-green-700",
  "Low Stock": "bg-orange-100 text-orange-700",
  Assigned: "bg-blue-100 text-blue-700",
  Generated: "bg-purple-100 text-purple-700",
};

export default function InventoryDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/admin" className="hover:text-blue-600">
            Admin
          </Link>
          <span>/</span>
          <span className="text-slate-700">Inventory Management</span>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Inventory Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage institutional computers, lab equipment, furniture,
            stationery, asset tracking and barcodes.
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
              Inventory Features
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Select a section to manage institutional inventory.
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
              Latest inventory management activities.
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
