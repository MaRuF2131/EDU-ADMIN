"use client";
import { useState } from "react";

const mockImprovementApps = [
  { id: 1, studentId: "STU-003", studentName: "Rahim Uddin", courseCode: "CSE-101", courseName: "Intro to Programming", previousGrade: "B+", previousMarks: 67, appliedDate: "2024-01-20", status: "Pending", examDate: null },
  { id: 2, studentId: "STU-005", studentName: "Fatima Begum", courseCode: "CSE-101", courseName: "Intro to Programming", previousGrade: "D", previousMarks: 41, appliedDate: "2024-01-18", status: "Approved", examDate: "2024-02-05" },
  { id: 3, studentId: "STU-004", studentName: "Karim Hossain", courseCode: "CSE-102", courseName: "Data Structures", previousGrade: "C+", previousMarks: 53, appliedDate: "2024-01-15", status: "Completed", examDate: "2024-01-25", newMarks: 68, newGrade: "B+", improved: true },
  { id: 4, studentId: "STU-006", studentName: "Nasir Khan", courseCode: "CSE-101", courseName: "Intro to Programming", previousGrade: "F", previousMarks: 35, appliedDate: "2024-01-22", status: "Rejected", rejectReason: "Not eligible - Failed in 3 courses" },
];

export default function ImprovementPage() {
  const [applications, setApplications] = useState(mockImprovementApps);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedApp, setSelectedApp] = useState(null);
  const [formData, setFormData] = useState({ studentId: "", courseCode: "" });

  const filteredApps = filterStatus === "all" 
    ? applications 
    : applications.filter(a => a.status === filterStatus);

  const handleApprove = (id) => {
    setApplications(applications.map(a => 
      a.id === id ? { ...a, status: "Approved", examDate: "2024-02-10" } : a
    ));
  };

  const handleReject = (id) => {
    setApplications(applications.map(a => 
      a.id === id ? { ...a, status: "Rejected", rejectReason: "Does not meet criteria" } : a
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApp = {
      id: applications.length + 1,
      studentId: formData.studentId,
      studentName: "New Student",
      courseCode: formData.courseCode,
      courseName: "Course Name",
      previousGrade: "B",
      previousMarks: 60,
      appliedDate: new Date().toISOString().split('T')[0],
      status: "Pending"
    };
    setApplications([...applications, newApp]);
    setFormData({ studentId: "", courseCode: "" });
    setShowForm(false);
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === "Pending").length,
    approved: applications.filter(a => a.status === "Approved").length,
    completed: applications.filter(a => a.status === "Completed").length,
    rejected: applications.filter(a => a.status === "Rejected").length,
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)]  bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Improvement Exam</h1>
          <p className="text-sm text-slate-500 mt-1">Manage grade improvement applications</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors"
        >
          {showForm ? "✕ Cancel" : "+ New Application"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { label: "Total", value: stats.total, color: "bg-slate-50 border-slate-200 text-slate-700" },
          { label: "Pending", value: stats.pending, color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
          { label: "Approved", value: stats.approved, color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Completed", value: stats.completed, color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Rejected", value: stats.rejected, color: "bg-red-50 border-red-200 text-red-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-3 rounded-lg border ${stat.color}`}>
            <p className="text-xs font-medium opacity-80">{stat.label}</p>
            <p className="text-2xl font-bold mt-0.5">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Application Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
          <h3 className="font-bold text-slate-700 mb-4">New Improvement Application</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Student ID *</label>
              <input type="text" value={formData.studentId} onChange={(e) => setFormData({...formData, studentId: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none" placeholder="STU-XXX" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Course Code *</label>
              <input type="text" value={formData.courseCode} onChange={(e) => setFormData({...formData, courseCode: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none" placeholder="CSE-XXX" required />
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-sm">Submit Application</button>
            </div>
          </form>
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-xs text-yellow-700">⚠️ <strong>Rules:</strong> Student can apply for improvement only if they have passed the course. Maximum 1 improvement attempt per course.</p>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {["all", "Pending", "Approved", "Completed", "Rejected"].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filterStatus === status ? "bg-blue-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {status === "all" ? "All" : status}
          </button>
        ))}
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Student</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Course</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Previous</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Applied</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Exam Date</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.map(app => (
                <tr key={app.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-800">{app.studentName}</p>
                    <p className="text-xs text-slate-500">{app.studentId}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-800">{app.courseCode}</p>
                    <p className="text-xs text-slate-500">{app.courseName}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <p className="text-sm font-bold text-slate-700">{app.previousMarks}</p>
                    <p className="text-xs text-slate-500">{app.previousGrade}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{app.appliedDate}</td>
                  <td className="px-4 py-3 text-sm text-center text-slate-600">{app.examDate || "—"}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      app.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                      app.status === "Approved" ? "bg-blue-100 text-blue-700" :
                      app.status === "Completed" ? "bg-green-100 text-green-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {app.status === "Pending" && (
                      <div className="flex gap-1 justify-center">
                        <button onClick={() => handleApprove(app.id)} className="text-xs text-green-600 hover:text-green-700 font-medium px-2 py-1 bg-green-50 rounded">✓ Approve</button>
                        <button onClick={() => handleReject(app.id)} className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 bg-red-50 rounded">✕ Reject</button>
                      </div>
                    )}
                    {app.status === "Completed" && app.improved && (
                      <div className="text-xs text-green-600 font-medium">↑ Improved</div>
                    )}
                    {app.status === "Rejected" && (
                      <span className="text-xs text-red-500" title={app.rejectReason}>⚠️</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}