"use client";
import { useState } from "react";
import Link from "next/link";

const lmsStats = {
  totalAssignments: 45,
  activeAssignments: 8,
  pendingSubmissions: 234,
  gradedSubmissions: 1250,
  avgScore: 72.5,
  plagiarismCases: 12
};

const recentActivities = [
  { id: 1, type: "submission", message: "Imran Ahmed submitted 'Algorithm Assignment 3'", time: "5 min ago", icon: "📥" },
  { id: 2, type: "grade", message: "Auto-graded 45 MCQ submissions for 'Quiz 5'", time: "15 min ago", icon: "✅" },
  { id: 3, type: "plagiarism", message: "2 cases of plagiarism detected in 'Database Project'", time: "30 min ago", icon: "⚠️" },
  { id: 4, type: "assignment", message: "New assignment 'Machine Learning Lab' created", time: "1 hour ago", icon: "📝" },
  { id: 5, type: "quiz", message: "AI Quiz 'Data Structures' generated successfully", time: "2 hours ago", icon: "🤖" },
];

const quickActions = [
  { title: "Create Assignment", icon: "📝", href: "/admin/lms/assignments", color: "from-blue-500 to-blue-600", desc: "Text, File, Group" },
  { title: "MCQ Quiz", icon: "📊", href: "/admin/lms/mcq", color: "from-purple-500 to-purple-600", desc: "Create & Schedule" },
  { title: "Coding Task", icon: "💻", href: "/admin/lms/coding", color: "from-green-500 to-green-600", desc: "Code Editor" },
  { title: "AI Quiz Generator", icon: "🤖", href: "/admin/lms/ai-quiz", color: "from-cyan-500 to-cyan-600", desc: "Auto Generate" },
  { title: "Submissions", icon: "📥", href: "/admin/lms/submissions", color: "from-orange-500 to-orange-600", desc: "View & Grade" },
  { title: "Rubric Builder", icon: "📏", href: "/admin/lms/rubric", color: "from-pink-500 to-pink-600", desc: "Custom Criteria" },
  { title: "Auto Grading", icon: "⚡", href: "/admin/lms/auto-grading", color: "from-yellow-500 to-yellow-600", desc: "Batch Process" },
  { title: "Plagiarism Check", icon: "🔍", href: "/admin/lms/plagiarism", color: "from-red-500 to-red-600", desc: "AI Detection" },
];

export default function LMSDashboard() {
  const [activities] = useState(recentActivities);

  return (
    <div className="p-6 h-[calc(100vh-4rem)]  bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Assignment & LMS</h1>
          <p className="text-sm text-slate-500 mt-1">Learning Management System for assignments, quizzes, and grading</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors">
          + New Assignment
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Total Assignments", value: lmsStats.totalAssignments, icon: "📝", color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Active", value: lmsStats.activeAssignments, icon: "🟢", color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Pending", value: lmsStats.pendingSubmissions, icon: "⏳", color: "bg-orange-50 border-orange-200 text-orange-700" },
          { label: "Graded", value: lmsStats.gradedSubmissions, icon: "✅", color: "bg-teal-50 border-teal-200 text-teal-700" },
          { label: "Avg Score", value: `${lmsStats.avgScore}%`, icon: "📊", color: "bg-purple-50 border-purple-200 text-purple-700" },
          { label: "Plagiarism", value: lmsStats.plagiarismCases, icon: "⚠️", color: "bg-red-50 border-red-200 text-red-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-lg border ${stat.color}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-lg">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs opacity-80 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-slate-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {quickActions.map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="bg-white rounded-lg border border-slate-200 p-3 hover:shadow-md transition-all group text-center"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-xl mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <p className="text-xs font-medium text-slate-700">{action.title}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{action.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-700">Recent Activities</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {activities.map(activity => (
              <div key={activity.id} className="p-4 flex items-start gap-3 hover:bg-slate-50">
                <span className="text-xl mt-0.5">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-sm text-slate-700">{activity.message}</p>
                  <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-700">Upcoming Deadlines</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { name: "Algorithm Assignment 3", deadline: "2024-01-20", submissions: "45/60", urgent: true },
              { name: "Database Project", deadline: "2024-01-25", submissions: "12/45", urgent: true },
              { name: "ML Lab Report", deadline: "2024-02-01", submissions: "0/60", urgent: false },
              { name: "Quiz 6 - Data Structures", deadline: "2024-02-05", submissions: "0/120", urgent: false },
            ].map((item, i) => (
              <div key={i} className="p-4 hover:bg-slate-50">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{item.name}</p>
                    <p className="text-xs text-slate-500 mt-1">Due: {item.deadline}</p>
                  </div>
                  {item.urgent && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">Urgent</span>
                  )}
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>{item.submissions} submitted</span>
                    <span>{Math.round(parseInt(item.submissions) / 60 * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${parseInt(item.submissions.split('/')[0]) > 0 ? "bg-green-500" : "bg-slate-300"}`}
                      style={{ width: `${Math.min((parseInt(item.submissions.split('/')[0]) / parseInt(item.submissions.split('/')[1])) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}