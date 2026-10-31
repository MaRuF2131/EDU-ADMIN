
"use client";

import { useState } from "react";

const applicationStats = {
  totalApplications: 1248,
  pendingApplications: 186,
  approvedApplications: 876,
  rejectedApplications: 124,
  processingApplications: 62,
  todayApplications: 34,
};

const applicationTypes = [
  {
    id: 1,
    title: "Leave Application",
    description: "Student and staff leave requests",
    icon: "📅",
    href: "/admin/application/features/leave",
    total: 245,
    pending: 32,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "Transcript Request",
    description: "Academic transcript requests",
    icon: "📑",
    href: "/admin/application/features/transcript",
    total: 186,
    pending: 24,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 3,
    title: "Certificate Request",
    description: "Academic and completion certificates",
    icon: "🎓",
    href: "/admin/application/features/certificate",
    total: 215,
    pending: 28,
    color: "from-green-500 to-green-600",
  },
  {
    id: 4,
    title: "ID Card Request",
    description: "New, replacement and correction requests",
    icon: "🪪",
    href: "/admin/application/features/id-card",
    total: 198,
    pending: 35,
    color: "from-cyan-500 to-cyan-600",
  },
  {
    id: 5,
    title: "Hostel Application",
    description: "Hostel admission and room allocation",
    icon: "🏠",
    href: "/admin/application/features/hostel",
    total: 142,
    pending: 21,
    color: "from-orange-500 to-orange-600",
  },
  {
    id: 6,
    title: "Scholarship Application",
    description: "Merit and need-based scholarship requests",
    icon: "🏅",
    href: "/admin/application/features/scholarship",
    total: 124,
    pending: 18,
    color: "from-pink-500 to-pink-600",
  },
  {
    id: 7,
    title: "Objection Application",
    description: "Result review and academic objections",
    icon: "⚖️",
    href: "/admin/application/features/objection",
    total: 86,
    pending: 16,
    color: "from-red-500 to-red-600",
  },
];

const mockApplications = [
  {
    id: "APP-1001",
    student: "Imran Ahmed",
    studentId: "STU-001",
    type: "Transcript Request",
    submittedAt: "2026-10-28",
    status: "pending",
    priority: "normal",
  },
  {
    id: "APP-1002",
    student: "Susmita Das",
    studentId: "STU-002",
    type: "Leave Application",
    submittedAt: "2026-10-28",
    status: "approved",
    priority: "normal",
  },
  {
    id: "APP-1003",
    student: "Rahim Uddin",
    studentId: "STU-003",
    type: "Certificate Request",
    submittedAt: "2026-10-27",
    status: "processing",
    priority: "high",
  },
  {
    id: "APP-1004",
    student: "Karim Hossain",
    studentId: "STU-004",
    type: "Hostel Application",
    submittedAt: "2026-10-27",
    status: "pending",
    priority: "high",
  },
  {
    id: "APP-1005",
    student: "Fatima Begum",
    studentId: "STU-005",
    type: "Scholarship Application",
    submittedAt: "2026-10-26",
    status: "approved",
    priority: "normal",
  },
  {
    id: "APP-1006",
    student: "Nasir Khan",
    studentId: "STU-006",
    type: "Objection Application",
    submittedAt: "2026-10-25",
    status: "rejected",
    priority: "normal",
  },
];

const recentActivities = [
  {
    id: 1,
    message: "Imran Ahmed submitted a Transcript Request",
    time: "5 min ago",
    icon: "📑",
  },
  {
    id: 2,
    message: "Susmita Das's Leave Application was approved",
    time: "20 min ago",
    icon: "✅",
  },
  {
    id: 3,
    message: "Rahim Uddin's Certificate Request is processing",
    time: "45 min ago",
    icon: "⏳",
  },
  {
    id: 4,
    message: "New Hostel Application received",
    time: "1 hour ago",
    icon: "🏠",
  },
  {
    id: 5,
    message: "Scholarship Application approved",
    time: "2 hours ago",
    icon: "🏅",
  },
];

export default function ApplicationManagementPage() {
  const [applications, setApplications] = useState(mockApplications);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [remarks, setRemarks] = useState("");

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
    processing: applications.filter((a) => a.status === "processing").length,
  };

  const filteredApplications =
    filterStatus === "all"
      ? applications
      : applications.filter((a) => a.status === filterStatus);

  const updateApplicationStatus = (id, status) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status } : app
      )
    );

    setSelectedApplication(null);
    setRemarks("");
  };

  const getStatusStyle = (status) => {
    const styles = {
      pending: "bg-orange-100 text-orange-700",
      approved: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
      processing: "bg-blue-100 text-blue-700",
    };

    return styles[status] || "bg-slate-100 text-slate-600";
  };

  return (
    <div className="p-6 min-h-[calc(100vh-4rem)] bg-slate-50">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Application Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage student applications, requests and approval workflows
          </p>
        </div>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors">
          + New Application
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          {
            label: "Total Applications",
            value: applicationStats.totalApplications,
            icon: "📄",
            color: "bg-blue-50 border-blue-200 text-blue-700",
          },
          {
            label: "Pending",
            value: applicationStats.pendingApplications,
            icon: "⏳",
            color: "bg-orange-50 border-orange-200 text-orange-700",
          },
          {
            label: "Approved",
            value: applicationStats.approvedApplications,
            icon: "✅",
            color: "bg-green-50 border-green-200 text-green-700",
          },
          {
            label: "Rejected",
            value: applicationStats.rejectedApplications,
            icon: "❌",
            color: "bg-red-50 border-red-200 text-red-700",
          },
          {
            label: "Processing",
            value: applicationStats.processingApplications,
            icon: "🔄",
            color: "bg-purple-50 border-purple-200 text-purple-700",
          },
          {
            label: "Today",
            value: applicationStats.todayApplications,
            icon: "📅",
            color: "bg-teal-50 border-teal-200 text-teal-700",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`p-4 rounded-lg border ${stat.color}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-lg">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs opacity-80 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Application Types */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-slate-700 mb-4">
          Application Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {applicationTypes.map((type) => (
            <a
              key={type.id}
              href={type.href}
              className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-11 h-11 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}
                >
                  {type.icon}
                </div>

                <span className="text-xs font-medium px-2 py-1 rounded-full bg-orange-50 text-orange-600">
                  {type.pending} Pending
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-800">
                {type.title}
              </h3>

              <p className="text-xs text-slate-400 mt-1 min-h-8">
                {type.description}
              </p>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  Total Requests
                </span>
                <span className="text-sm font-bold text-blue-600">
                  {type.total}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Applications Table */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 overflow-hidden">

          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-700">
                Recent Applications
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Review and manage submitted applications
              </p>
            </div>

            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md">
              {filteredApplications.length} Records
            </span>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 p-4 border-b border-slate-100">
            {["all", "pending", "processing", "approved", "rejected"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    filterStatus === status
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {status === "all"
                    ? "All"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              )
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">
                    Application
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">
                    Student
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">
                    Date
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">
                    Status
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    className={`hover:bg-slate-50 cursor-pointer ${
                      selectedApplication?.id === app.id
                        ? "bg-blue-50"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedApplication(app);
                      setRemarks("");
                    }}
                  >
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-800">
                        {app.type}
                      </p>
                      <p className="text-xs text-slate-400">{app.id}</p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-700">
                        {app.student}
                      </p>
                      <p className="text-xs text-slate-400">
                        {app.studentId}
                      </p>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span className="text-xs text-slate-500">
                        {app.submittedAt}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApplication(app);
                          setRemarks("");
                        }}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredApplications.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-sm text-slate-400">
                      No applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Approval Workflow Panel */}
        <div className="bg-white rounded-lg border border-slate-200">

          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-700">
              Approval Workflow
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Review selected application
            </p>
          </div>

          {!selectedApplication ? (
            <div className="p-10 text-center text-slate-400">
              <span className="text-4xl block mb-3">📄</span>
              <p className="text-sm">
                Select an application to review
              </p>
            </div>
          ) : (
            <div className="p-4">

              <div className="mb-4">
                <span className="text-xs text-slate-400">
                  Application ID
                </span>
                <p className="text-sm font-bold text-slate-800">
                  {selectedApplication.id}
                </p>
              </div>

              <div className="space-y-3 mb-5">
                <div>
                  <p className="text-xs text-slate-400">Student Name</p>
                  <p className="text-sm font-medium text-slate-700">
                    {selectedApplication.student}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Student ID</p>
                  <p className="text-sm font-medium text-slate-700">
                    {selectedApplication.studentId}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Application Type</p>
                  <p className="text-sm font-medium text-slate-700">
                    {selectedApplication.type}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Submission Date</p>
                  <p className="text-sm font-medium text-slate-700">
                    {selectedApplication.submittedAt}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Current Status</p>
                  <span
                    className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      selectedApplication.status
                    )}`}
                  >
                    {selectedApplication.status}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Review Remarks
                </label>

                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={4}
                  placeholder="Enter review remarks..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {selectedApplication.status !== "approved" &&
                selectedApplication.status !== "rejected" && (
                  <div className="space-y-2">
                    <button
                      onClick={() =>
                        updateApplicationStatus(
                          selectedApplication.id,
                          "approved"
                        )
                      }
                      className="w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium transition-colors"
                    >
                      ✅ Approve Application
                    </button>

                    <button
                      onClick={() =>
                        updateApplicationStatus(
                          selectedApplication.id,
                          "processing"
                        )
                      }
                      className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors"
                    >
                      🔄 Move to Processing
                    </button>

                    <button
                      onClick={() =>
                        updateApplicationStatus(
                          selectedApplication.id,
                          "rejected"
                        )
                      }
                      className="w-full px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium transition-colors"
                    >
                      ❌ Reject Application
                    </button>
                  </div>
                )}

              <button
                onClick={() => setSelectedApplication(null)}
                className="w-full mt-3 px-3 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 text-sm font-medium"
              >
                Close Review
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mt-6 bg-white rounded-lg border border-slate-200">

        <div className="p-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-700">
            Recent Activities
          </h2>
        </div>

        <div className="divide-y divide-slate-100">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 flex items-start gap-3 hover:bg-slate-50"
            >
              <span className="text-xl mt-0.5">{activity.icon}</span>

              <div className="flex-1">
                <p className="text-sm text-slate-700">
                  {activity.message}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
