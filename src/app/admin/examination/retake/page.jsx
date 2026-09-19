"use client";
import { useState } from "react";

const mockRetakeData = [
  { id: 1, studentId: "STU-006", studentName: "Nasir Khan", courseCode: "CSE-101", courseName: "Intro to Programming", failGrade: "F", failMarks: 35, retakeAttempt: 1, maxAttempts: 2, status: "Enrolled", section: "A", schedule: "Sun 10AM" },
  { id: 2, studentId: "STU-006", studentName: "Nasir Khan", courseCode: "CSE-102", courseName: "Data Structures", failGrade: "F", failMarks: 28, retakeAttempt: 1, maxAttempts: 2, status: "Enrolled", section: "A", schedule: "Mon 2PM" },
  { id: 3, studentId: "STU-005", studentName: "Fatima Begum", courseCode: "MATH-101", courseName: "Calculus I", failGrade: "F", failMarks: 32, retakeAttempt: 2, maxAttempts: 2, status: "Final Attempt", section: "B", schedule: "Tue 10AM" },
  { id: 4, studentId: "STU-008", studentName: "Arif Islam", courseCode: "PHY-101", courseName: "Physics I", failGrade: "F", failMarks: 25, retakeAttempt: 1, maxAttempts: 2, status: "Completed", section: "A", schedule: null, newGrade: "C+", newMarks: 48 },
  { id: 5, studentId: "STU-009", studentName: "Rina Akter", courseCode: "ENG-101", courseName: "English I", failGrade: "F", failMarks: 30, retakeAttempt: 2, maxAttempts: 2, status: "Dropped Out", section: "B", schedule: null, reason: "Max attempts exceeded" },
];

export default function RetakePage() {
  const [data, setData] = useState(mockRetakeData);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showNewEnrollment, setShowNewEnrollment] = useState(false);

  const filteredData = filterStatus === "all" ? data : data.filter(d => d.status === filterStatus);

  const stats = {
    total: data.length,
    enrolled: data.filter(d => d.status === "Enrolled").length,
    finalAttempt: data.filter(d => d.status === "Final Attempt").length,
    completed: data.filter(d => d.status === "Completed").length,
    droppedOut: data.filter(d => d.status === "Dropped Out").length,
  };

  const handleMarkComplete = (id) => {
    setData(data.map(d => d.id === id ? { ...d, status: "Completed", newGrade: "B", newMarks: 65 } : d));
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)]  bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Retake Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage students retaking failed courses</p>
        </div>
        <button
          onClick={() => setShowNewEnrollment(!showNewEnrollment)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors"
        >
          {showNewEnrollment ? "✕ Cancel" : "+ New Enrollment"}
        </button>
      </div>

      {/* Warning Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <span className="text-2xl">⚠️</span>
        <div>
          <h3 className="font-bold text-red-800">Retake Policy Notice</h3>
          <p className="text-sm text-red-700 mt-1">Students can retake a failed course maximum 2 times. If failed again in the final attempt, the student will be dropped from the program.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { label: "Total Retakes", value: stats.total, color: "bg-slate-50 border-slate-200 text-slate-700" },
          { label: "Currently Enrolled", value: stats.enrolled, color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Final Attempt", value: stats.finalAttempt, color: "bg-orange-50 border-orange-200 text-orange-700" },
          { label: "Completed", value: stats.completed, color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Dropped Out", value: stats.droppedOut, color: "bg-red-50 border-red-200 text-red-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-3 rounded-lg border ${stat.color}`}>
            <p className="text-xs font-medium opacity-80">{stat.label}</p>
            <p className="text-2xl font-bold mt-0.5">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* New Enrollment Form */}
      {showNewEnrollment && (
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
          <h3 className="font-bold text-slate-700 mb-4">Enroll Student for Retake</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Student ID *</label>
              <input type="text" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none" placeholder="STU-XXX" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Failed Course Code *</label>
              <input type="text" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none" placeholder="CSE-XXX" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Section</label>
              <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none">
                <option>Section A</option>
                <option>Section B</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-sm">Enroll</button>
            </div>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {["all", "Enrolled", "Final Attempt", "Completed", "Dropped Out"].map(status => (
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

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Student</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Course</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Failed</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Attempt</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Section</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Schedule</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map(item => (
                <tr key={item.id} className={`hover:bg-slate-50 ${item.status === "Dropped Out" ? "bg-red-50/50" : item.status === "Final Attempt" ? "bg-orange-50/50" : ""}`}>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-800">{item.studentName}</p>
                    <p className="text-xs text-slate-500">{item.studentId}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-800">{item.courseCode}</p>
                    <p className="text-xs text-slate-500">{item.courseName}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <p className="text-sm font-bold text-red-600">{item.failMarks}</p>
                    <p className="text-xs text-red-500">{item.failGrade}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      item.retakeAttempt === item.maxAttempts ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {item.retakeAttempt}/{item.maxAttempts}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-slate-600">{item.section}</td>
                  <td className="px-4 py-3 text-sm text-center text-slate-600">{item.schedule || "—"}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === "Enrolled" ? "bg-blue-100 text-blue-700" :
                      item.status === "Final Attempt" ? "bg-orange-100 text-orange-700" :
                      item.status === "Completed" ? "bg-green-100 text-green-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {(item.status === "Enrolled" || item.status === "Final Attempt") && (
                      <button onClick={() => handleMarkComplete(item.id)} className="text-xs text-green-600 hover:text-green-700 font-medium px-2 py-1 bg-green-50 rounded">✓ Complete</button>
                    )}
                    {item.status === "Dropped Out" && (
                      <span className="text-xs text-red-500" title={item.reason}>⚠️</span>
                    )}
                    {item.status === "Completed" && (
                      <div>
                        <p className="text-xs text-green-600 font-bold">{item.newGrade}</p>
                        <p className="text-[10px] text-slate-500">({item.newMarks})</p>
                      </div>
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