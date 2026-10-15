"use client";
import { useState } from "react";
import Link from "next/link";

const stats = {
  totalCourses: 24,
  totalChapters: 156,
  totalVideos: 892,
  totalStudents: 1250,
  activeToday: 456,
  avgCompletion: 67.5,
  totalDiscussions: 234,
  aiQueriesToday: 89
};

const recentActivities = [
  { id: 1, type: "upload", message: "Dr. Ali uploaded 'Lecture 15 - Machine Learning' to CSE-401", time: "5 min ago", icon: "🎥" },
  { id: 2, type: "view", message: "45 students watched 'Data Structures Video 8' in last hour", time: "30 min ago", icon: "👁️" },
  { id: 3, type: "discussion", message: "New question in CSE-201: 'How to implement AVL tree?'", time: "1 hour ago", icon: "💬" },
  { id: 4, type: "ai", message: "AI Assistant answered 23 queries today", time: "2 hours ago", icon: "🤖" },
  { id: 5, type: "completion", message: "Susmita Das completed 'Database Systems' course", time: "3 hours ago", icon: "🎉" },
];

const topCourses = [
  { name: "Machine Learning", code: "CSE-401", students: 120, completion: 78, views: 4560 },
  { name: "Data Structures", code: "CSE-102", students: 150, completion: 72, views: 5230 },
  { name: "Database Systems", code: "CSE-301", students: 95, completion: 65, views: 3200 },
  { name: "Web Development", code: "CSE-302", students: 110, completion: 58, views: 3890 },
  { name: "Algorithm Design", code: "CSE-201", students: 130, completion: 52, views: 4100 },
];

const quickActions = [
  { title: "Create Course", icon: "📚", href: "/admin/classroom/content", color: "from-blue-500 to-blue-600", desc: "New course" },
  { title: "Upload Video", icon: "🎥", href: "/admin/classroom/content", color: "from-purple-500 to-purple-600", desc: "Recorded/Live" },
  { title: "Access Control", icon: "🔐", href: "/admin/classroom/access", color: "from-green-500 to-green-600", desc: "Permissions" },
  { title: "Student Progress", icon: "📊", href: "/admin/classroom/progress", color: "from-orange-500 to-orange-600", desc: "Tracking" },
  { title: "Discussions", icon: "💬", href: "/admin/classroom/discussion", color: "from-pink-500 to-pink-600", desc: "Q/A Forum" },
  { title: "AI Assistant", icon: "🤖", href: "/admin/classroom/ai-assistant", color: "from-cyan-500 to-cyan-600", desc: "AI Features" },
  { title: "Analytics", icon: "📈", href: "/admin/classroom/analytics", color: "from-indigo-500 to-indigo-600", desc: "Insights" },
  { title: "Assignments", icon: "📝", href: "/admin/lms/assignments", color: "from-red-500 to-red-600", desc: "LMS" },
];

export default function ClassroomDashboard() {
  const [activities] = useState(recentActivities);

  return (
    <div className=" bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Digital Classroom & Learning Hub</h1>
          <p className="text-sm text-slate-500 mt-1">Manage courses, content, and track student learning</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors">
          + New Course
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
        {[
          { label: "Courses", value: stats.totalCourses, icon: "📚", color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Chapters", value: stats.totalChapters, icon: "📖", color: "bg-indigo-50 border-indigo-200 text-indigo-700" },
          { label: "Videos", value: stats.totalVideos, icon: "🎥", color: "bg-purple-50 border-purple-200 text-purple-700" },
          { label: "Students", value: stats.totalStudents, icon: "👨‍🎓", color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Active Today", value: stats.activeToday, icon: "🟢", color: "bg-teal-50 border-teal-200 text-teal-700" },
          { label: "Avg Completion", value: `${stats.avgCompletion}%`, icon: "📊", color: "bg-orange-50 border-orange-200 text-orange-700" },
          { label: "Discussions", value: stats.totalDiscussions, icon: "💬", color: "bg-pink-50 border-pink-200 text-pink-700" },
          { label: "AI Queries", value: stats.aiQueriesToday, icon: "🤖", color: "bg-cyan-50 border-cyan-200 text-cyan-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-3 rounded-lg border ${stat.color}`}>
            <span className="text-lg">{stat.icon}</span>
            <p className="text-xl font-bold mt-1">{stat.value}</p>
            <p className="text-[10px] opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-slate-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {quickActions.map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="bg-white rounded-lg border border-slate-200 p-3 hover:shadow-md transition-all group text-center"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-lg mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <p className="text-[10px] font-medium text-slate-700 leading-tight">{action.title}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Courses */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-700">Top Courses by Engagement</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Course</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Students</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Completion</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Views</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topCourses.map((course, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-800">{course.name}</p>
                      <p className="text-xs text-slate-500">{course.code}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-slate-600">{course.students}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div className="h-2 rounded-full bg-green-500" style={{ width: `${course.completion}%` }}></div>
                        </div>
                        <span className="text-xs font-medium text-slate-600 w-10">{course.completion}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-slate-600">{course.views.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-700">Recent Activities</h2>
          </div>
          <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
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
      </div>
    </div>
  );
}