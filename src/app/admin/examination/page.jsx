"use client";
import { useState } from "react";
import Link from "next/link";

const examStats = {
  upcomingExams: 8,
  ongoingExams: 2,
  completedExams: 45,
  pendingResults: 12,
  totalStudents: 1250,
  avgPassRate: 87.5
};

const recentExams = [
  { id: 1, name: "Final Exam - CSE 2023", date: "2024-01-15", status: "Ongoing", students: 120, courses: 8 },
  { id: 2, name: "Midterm - BBA Fall 2023", date: "2024-01-10", status: "Completed", students: 95, courses: 6 },
  { id: 3, name: "Lab Final - EE 2023", date: "2024-01-20", status: "Scheduled", students: 60, courses: 4 },
  { id: 4, name: "Makeup Exam - Dec 2023", date: "2024-01-08", status: "Completed", students: 25, courses: 10 },
];

const quickActions = [
  { title: "Create Exam Schedule", icon: "📅", href: "/admin/examination/schedule", color: "from-blue-500 to-blue-600" },
  { title: "Generate Seat Plan", icon: "💺", href: "/admin/examination/seat-plan", color: "from-purple-500 to-purple-600" },
  { title: "Enter Marks", icon: "✍️", href: "/admin/examination/marks-entry", color: "from-green-500 to-green-600" },
  { title: "Publish Results", icon: "📊", href: "/admin/examination/result", color: "from-orange-500 to-orange-600" },
  { title: "View Transcripts", icon: "📜", href: "/admin/examination/transcript", color: "from-teal-500 to-teal-600" },
  { title: "Tabulation Sheet", icon: "📋", href: "/admin/examination/tabulation", color: "from-indigo-500 to-indigo-600" },
  { title: "Improvement Exam", icon: "📈", href: "/admin/examination/improvement", color: "from-pink-500 to-pink-600" },
  { title: "Retake Management", icon: "🔄", href: "/admin/examination/retake", color: "from-red-500 to-red-600" },
  { title: "AI Grade Prediction", icon: "🤖", href: "/admin/examination/ai-prediction", color: "from-cyan-500 to-cyan-600" },
];

export default function ExaminationDashboard() {
  const [selectedExam, setSelectedExam] = useState(null);

  return (
    <div className="p-6 h-[calc(100vh-4rem)]  bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Examination Module</h1>
          <p className="text-sm text-slate-500 mt-1">Manage exams, schedules, marks, and results</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors">
          + New Exam
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Upcoming", value: examStats.upcomingExams, color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Ongoing", value: examStats.ongoingExams, color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Completed", value: examStats.completedExams, color: "bg-slate-50 border-slate-200 text-slate-700" },
          { label: "Pending Results", value: examStats.pendingResults, color: "bg-orange-50 border-orange-200 text-orange-700" },
          { label: "Total Students", value: examStats.totalStudents, color: "bg-purple-50 border-purple-200 text-purple-700" },
          { label: "Avg Pass Rate", value: `${examStats.avgPassRate}%`, color: "bg-teal-50 border-teal-200 text-teal-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-lg border ${stat.color}`}>
            <p className="text-xs font-medium opacity-80">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-slate-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickActions.map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-all group"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <p className="text-sm font-medium text-slate-700">{action.title}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Exams Table */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-bold text-slate-700">Recent Examinations</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Exam Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Students</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Courses</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentExams.map(exam => (
                <tr key={exam.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">{exam.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{exam.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      exam.status === "Ongoing" ? "bg-green-100 text-green-700" :
                      exam.status === "Completed" ? "bg-slate-100 text-slate-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {exam.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{exam.students}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{exam.courses}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">View</button>
                      <button className="text-xs text-slate-500 hover:text-slate-700">Edit</button>
                    </div>
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