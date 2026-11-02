
import Link from "next/link";

const stats = [
  {
    title: "Total Rooms",
    value: "120",
    description: "Across all hostel buildings",
    color: "text-blue-600",
  },
  {
    title: "Total Seats",
    value: "480",
    description: "Available hostel capacity",
    color: "text-indigo-600",
  },
  {
    title: "Occupied Seats",
    value: "365",
    description: "Currently assigned",
    color: "text-green-600",
  },
  {
    title: "Pending Applications",
    value: "18",
    description: "Waiting for allocation",
    color: "text-orange-600",
  },
];

const features = [
  {
    title: "Room Management",
    description: "Manage hostel buildings, floors, rooms and capacity.",
    href: "/admin/hostel/rooms",
    icon: "🏢",
    count: "120 Rooms",
  },
  {
    title: "Seat Management",
    description: "Monitor available, occupied and reserved seats.",
    href: "/admin/hostel/seats",
    icon: "🛏️",
    count: "480 Seats",
  },
  {
    title: "Student Allocation",
    description: "Review applications and assign hostel seats.",
    href: "/admin/hostel/allocation",
    icon: "🎓",
    count: "18 Pending",
  },
  {
    title: "Meal Management",
    description: "Manage meal schedules, menus and meal costs.",
    href: "/admin/hostel/meals",
    icon: "🍽️",
    count: "3 Meal Types",
  },
  {
    title: "Visitor Management",
    description: "Track visitors, student relations and visit times.",
    href: "/admin/hostel/visitors",
    icon: "👥",
    count: "Visitor Records",
  },
  {
    title: "Hostel Fee Management",
    description: "Manage hostel fees, payments and outstanding dues.",
    href: "/admin/hostel/fees",
    icon: "💳",
    count: "Fee Records",
  },
];

const activities = [
  {
    title: "New hostel allocation application",
    user: "Nusrat Jahan",
    date: "Today, 10:30 AM",
    status: "Pending",
  },
  {
    title: "Monthly hostel fee payment received",
    user: "Rahim Ahmed",
    date: "Today, 09:15 AM",
    status: "Paid",
  },
  {
    title: "Visitor checked in",
    user: "Fatema Begum",
    date: "Yesterday, 02:30 PM",
    status: "Checked In",
  },
  {
    title: "Room maintenance request",
    user: "Hostel Supervisor",
    date: "Yesterday, 11:00 AM",
    status: "Maintenance",
  },
];

const activityStatus = {
  Pending: "bg-yellow-100 text-yellow-700",
  Paid: "bg-green-100 text-green-700",
  "Checked In": "bg-blue-100 text-blue-700",
  Maintenance: "bg-orange-100 text-orange-700",
};

export default function HostelDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/admin" className="hover:text-blue-600">
            Admin
          </Link>
          <span>/</span>
          <span className="text-slate-700">Hostel Management</span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Hostel Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage hostel rooms, seats, student allocation, meals, visitors
            and hostel fees.
          </p>
        </div>

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

        <div>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-800">
              Hostel Features
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Select a section to manage its records.
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

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-4">
            <h2 className="font-bold text-slate-800">Recent Activities</h2>
            <p className="mt-1 text-sm text-slate-500">
              Latest hostel management activities.
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
                    activityStatus[activity.status] ||
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
