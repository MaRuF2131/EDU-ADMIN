
"use client";
import { useState } from "react";

const initialApplications = [
  {
    id: "APP-001",
    student: "Rahim Uddin",
    studentId: "STU-001",
    program: "Merit Excellence Scholarship",
    type: "Merit",
    department: "Computer Science",
    gpa: "4.85",
    amount: 25000,
    date: "2026-10-25",
    status: "Pending",
  },
  {
    id: "APP-002",
    student: "Fatima Begum",
    studentId: "STU-002",
    program: "Need Based Financial Support",
    type: "Need Based",
    department: "Business Administration",
    gpa: "4.20",
    amount: 15000,
    date: "2026-10-24",
    status: "Approved",
  },
  {
    id: "APP-003",
    student: "Imran Ahmed",
    studentId: "STU-003",
    program: "Government Education Grant",
    type: "Government",
    department: "Electrical Engineering",
    gpa: "4.60",
    amount: 20000,
    date: "2026-10-23",
    status: "Under Review",
  },
  {
    id: "APP-004",
    student: "Susmita Das",
    studentId: "STU-004",
    program: "Merit Excellence Scholarship",
    type: "Merit",
    department: "Computer Science",
    gpa: "3.95",
    amount: 25000,
    date: "2026-10-22",
    status: "Rejected",
  },
  {
    id: "APP-005",
    student: "Karim Hossain",
    studentId: "STU-005",
    program: "NGO Education Support",
    type: "NGO",
    department: "Civil Engineering",
    gpa: "4.10",
    amount: 30000,
    date: "2026-10-21",
    status: "Pending",
  },
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState(initialApplications);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [remarks, setRemarks] = useState("");

  const filteredApplications = applications.filter((app) => {
    const matchesFilter = filter === "All" || app.status === filter;

    const matchesSearch =
      app.student.toLowerCase().includes(search.toLowerCase()) ||
      app.studentId.toLowerCase().includes(search.toLowerCase()) ||
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.program.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const updateStatus = (id, status) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status, remarks } : app
      )
    );

    setSelected(null);
    setRemarks("");
  };

  const statusColor = (status) => {
    const colors = {
      Pending: "bg-orange-100 text-orange-700",
      Approved: "bg-green-100 text-green-700",
      Rejected: "bg-red-100 text-red-700",
      "Under Review": "bg-blue-100 text-blue-700",
    };

    return colors[status] || "bg-slate-100 text-slate-600";
  };

  return (
    <div className="p-6 min-h-[calc(100vh-4rem)] bg-slate-50">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Scholarship Applications
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review student applications and manage approval decisions
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          {
            label: "Total Applications",
            value: applications.length,
            color: "bg-slate-50 border-slate-200 text-slate-700",
          },
          {
            label: "Pending",
            value: applications.filter((a) => a.status === "Pending").length,
            color: "bg-orange-50 border-orange-200 text-orange-700",
          },
          {
            label: "Under Review",
            value: applications.filter((a) => a.status === "Under Review").length,
            color: "bg-blue-50 border-blue-200 text-blue-700",
          },
          {
            label: "Approved",
            value: applications.filter((a) => a.status === "Approved").length,
            color: "bg-green-50 border-green-200 text-green-700",
          },
          {
            label: "Rejected",
            value: applications.filter((a) => a.status === "Rejected").length,
            color: "bg-red-50 border-red-200 text-red-700",
          },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-lg border ${stat.color}`}>
            <p className="text-xs font-medium opacity-80">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 mb-4">
        <div className="flex flex-col lg:flex-row gap-3 justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student, application ID or program..."
            className="w-full lg:max-w-sm px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-wrap gap-2">
            {[
              "All",
              "Pending",
              "Under Review",
              "Approved",
              "Rejected",
            ].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="flex flex-col xl:flex-row gap-6">

        <div className="flex-1 bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-700">
              All Applications
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  {[
                    "Student",
                    "Program",
                    "GPA",
                    "Amount",
                    "Applied",
                    "Status",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase whitespace-nowrap"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    className={`hover:bg-slate-50 cursor-pointer ${
                      selected?.id === app.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => {
                      setSelected(app);
                      setRemarks(app.remarks || "");
                    }}
                  >
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-800">
                        {app.student}
                      </p>
                      <p className="text-xs text-slate-500">
                        {app.studentId}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-sm text-slate-700">
                        {app.program}
                      </p>
                      <p className="text-xs text-slate-400">
                        {app.type}
                      </p>
                    </td>

                    <td className="px-4 py-3 text-sm font-semibold text-slate-700">
                      {app.gpa}
                    </td>

                    <td className="px-4 py-3 text-sm font-semibold text-slate-700 whitespace-nowrap">
                      ৳{app.amount.toLocaleString("en-BD")}
                    </td>

                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                      {app.date}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <button className="text-xs font-medium text-blue-600">
                        Review
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredApplications.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-10 text-sm text-slate-400">
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Application Details */}
        <div className="w-full xl:w-96 bg-white rounded-lg border border-slate-200 flex-shrink-0">
          {!selected ? (
            <div className="p-12 text-center text-slate-400">
              <span className="text-4xl block mb-3">📄</span>
              <p className="text-sm">Select an application to review</p>
            </div>
          ) : (
            <div>
              <div className="p-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-700">
                  Application Details
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {selected.id}
                </p>
              </div>

              <div className="p-4 space-y-4">
                {[
                  ["Student Name", selected.student],
                  ["Student ID", selected.studentId],
                  ["Department", selected.department],
                  ["Scholarship", selected.program],
                  ["Scholarship Type", selected.type],
                  ["Current GPA", selected.gpa],
                  ["Requested Amount", `৳${selected.amount.toLocaleString("en-BD")}`],
                  ["Application Date", selected.date],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="text-sm font-medium text-slate-700 mt-0.5">
                      {value}
                    </p>
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    Review Remarks
                  </label>

                  <textarea
                    rows={4}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Write review remarks..."
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="p-4 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <button
                    onClick={() => updateStatus(selected.id, "Under Review")}
                    className="px-3 py-2 bg-blue-50 text-blue-700 rounded-md text-xs font-medium hover:bg-blue-100"
                  >
                    Under Review
                  </button>

                  <button
                    onClick={() => updateStatus(selected.id, "Rejected")}
                    className="px-3 py-2 bg-red-50 text-red-700 rounded-md text-xs font-medium hover:bg-red-100"
                  >
                    Reject
                  </button>
                </div>

                <button
                  onClick={() => updateStatus(selected.id, "Approved")}
                  className="w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
                >
                  ✓ Approve Application
                </button>

                <button
                  onClick={() => setSelected(null)}
                  className="w-full mt-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
