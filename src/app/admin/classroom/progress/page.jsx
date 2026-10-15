"use client";
import { useState } from "react";

const mockStudents = [
  { id: "STU-001", name: "Imran Ahmed", watchPercent: 85, lastActive: "2024-01-20 14:30", totalTime: "12h 30m", status: "completed", chapters: { completed: 12, total: 15 } },
  { id: "STU-002", name: "Susmita Das", watchPercent: 72, lastActive: "2024-01-20 10:15", totalTime: "10h 45m", status: "in_progress", chapters: { completed: 10, total: 15 } },
  { id: "STU-003", name: "Rahim Uddin", watchPercent: 45, lastActive: "2024-01-19 18:00", totalTime: "6h 45m", status: "in_progress", chapters: { completed: 7, total: 15 } },
  { id: "STU-004", name: "Karim Hossain", watchPercent: 100, lastActive: "2024-01-18 16:00", totalTime: "15h 00m", status: "completed", chapters: { completed: 15, total: 15 } },
  { id: "STU-005", name: "Fatima Begum", watchPercent: 28, lastActive: "2024-01-17 09:30", totalTime: "4h 12m", status: "in_progress", chapters: { completed: 4, total: 15 } },
  { id: "STU-006", name: "Nasir Khan", watchPercent: 15, lastActive: "2024-01-15 11:00", totalTime: "2h 15m", status: "at_risk", chapters: { completed: 2, total: 15 } },
  { id: "STU-007", name: "Priya Sharma", watchPercent: 92, lastActive: "2024-01-20 12:00", totalTime: "13h 48m", status: "completed", chapters: { completed: 14, total: 15 } },
  { id: "STU-008", name: "Arif Islam", watchPercent: 8, lastActive: "2024-01-12 08:00", totalTime: "1h 12m", status: "at_risk", chapters: { completed: 1, total: 15 } },
];

export default function ProgressPage() {
  const [students] = useState(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(s => {
    const statusMatch = filterStatus === "all" || s.status === filterStatus;
    const searchMatch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  const stats = {
    total: students.length,
    completed: students.filter(s => s.status === "completed").length,
    inProgress: students.filter(s => s.status === "in_progress").length,
    atRisk: students.filter(s => s.status === "at_risk").length,
    avgWatch: (students.reduce((sum, s) => sum + s.watchPercent, 0) / students.length).toFixed(1),
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700";
      case "in_progress": return "bg-blue-100 text-blue-700";
      case "at_risk": return "bg-red-100 text-red-700";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  const getWatchColor = (percent) => {
    if (percent >= 80) return "text-green-600";
    if (percent >= 50) return "text-blue-600";
    if (percent >= 25) return "text-yellow-600";
    return "text-red-600";
  };

  const getWatchBg = (percent) => {
    if (percent >= 80) return "bg-green-500";
    if (percent >= 50) return "bg-blue-500";
    if (percent >= 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Student Progress Tracking</h1>
          <p className="text-sm text-slate-500 mt-1">Monitor who watched, completion status, and learning time</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors">
          📥 Export Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { label: "Total Students", value: stats.total, color: "bg-slate-50 border-slate-200 text-slate-700" },
          { label: "Completed", value: stats.completed, color: "bg-green-50 border-green-200 text-green-700" },
          { label: "In Progress", value: stats.inProgress, color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "At Risk", value: stats.atRisk, color: "bg-red-50 border-red-200 text-red-700" },
          { label: "Avg Watch %", value: `${stats.avgWatch}%`, color: "bg-purple-50 border-purple-200 text-purple-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-lg border ${stat.color}`}>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4 items-center">
        <div className="flex-1 max-w-xs">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by name or ID..."
          />
        </div>
        <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-1">
          {["all", "completed", "in_progress", "at_risk"].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filterStatus === status ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {status === "all" ? "All" : status === "in_progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Student List */}
        <div className="flex-1 bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Student</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Watch %</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Chapters</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Total Time</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Last Active</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map(student => (
                  <tr
                    key={student.id}
                    className={`hover:bg-slate-50 cursor-pointer ${selectedStudent?.id === student.id ? "bg-blue-50" : ""}`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-800">{student.name}</p>
                      <p className="text-xs text-slate-500">{student.id}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-20 bg-slate-200 rounded-full h-2">
                          <div className={`h-2 rounded-full ${getWatchBg(student.watchPercent)}`} style={{ width: `${student.watchPercent}%` }}></div>
                        </div>
                        <span className={`text-sm font-bold ${getWatchColor(student.watchPercent)}`}>{student.watchPercent}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-slate-600">{student.chapters.completed}/{student.chapters.total}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{student.totalTime}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{student.lastActive}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(student.status)}`}>
                        {student.status === "in_progress" ? "In Progress" : student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="w-80 bg-white rounded-lg border border-slate-200 flex-shrink-0 h-fit">
          {!selectedStudent ? (
            <div className="p-12 text-center text-slate-400">
              <span className="text-4xl block mb-3">📊</span>
              <p className="text-sm">Select a student</p>
            </div>
          ) : (
            <div>
              <div className="p-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-700">{selectedStudent.name}</h3>
                <p className="text-xs text-slate-500">{selectedStudent.id}</p>
              </div>

              {/* Watch Progress Ring */}
              <div className="p-6 flex flex-col items-center border-b border-slate-200">
                <div className="relative w-28 h-28">
                  <svg className="w-28 h-28 transform -rotate-90">
                    <circle cx="56" cy="56" r="48" stroke="#e2e8f0" strokeWidth="6" fill="none" />
                    <circle cx="56" cy="56" r="48" className={selectedStudent.watchPercent >= 80 ? "stroke-green-500" : selectedStudent.watchPercent >= 50 ? "stroke-blue-500" : "stroke-yellow-500"} strokeWidth="6" fill="none" strokeDasharray={`${(selectedStudent.watchPercent / 100) * 301.59} 301.59`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-2xl font-bold ${getWatchColor(selectedStudent.watchPercent)}`}>{selectedStudent.watchPercent}%</span>
                    <span className="text-[10px] text-slate-500">Watched</span>
                  </div>
                </div>
                <span className={`mt-3 px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(selectedStudent.status)}`}>
                  {selectedStudent.status === "in_progress" ? "In Progress" : selectedStudent.status.charAt(0).toUpperCase() + selectedStudent.status.slice(1)}
                </span>
              </div>

              {/* Stats */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Chapters Completed</span>
                  <span className="font-medium text-slate-700">{selectedStudent.chapters.completed}/{selectedStudent.chapters.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Total Learning Time</span>
                  <span className="font-medium text-slate-700">{selectedStudent.totalTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Last Active</span>
                  <span className="font-medium text-slate-700">{selectedStudent.lastActive}</span>
                </div>
              </div>

              {/* Chapter Progress */}
              <div className="p-4 border-t border-slate-200">
                <h4 className="text-xs font-semibold text-slate-500 uppercase mb-3">Chapter Progress</h4>
                <div className="space-y-2">
                  {Array.from({ length: selectedStudent.chapters.total }, (_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-xs ${i < selectedStudent.chapters.completed ? "bg-green-500 text-white" : "bg-slate-200 text-slate-400"}`}>
                        {i < selectedStudent.chapters.completed ? "✓" : i + 1}
                      </div>
                      <div className="flex-1">
                        <div className={`h-2 rounded-full ${i < selectedStudent.chapters.completed ? "bg-green-500" : "bg-slate-200"}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-slate-200 space-y-2">
                {selectedStudent.status === "at_risk" && (
                  <button className="w-full px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200">
                    📧 Send Reminder
                  </button>
                )}
                <button className="w-full px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200">
                  📊 View Detailed Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}