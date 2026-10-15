"use client";
import { useState } from "react";

const courseAnalytics = [
  { name: "Machine Learning", views: 4560, avgWatchTime: "32:15", completionRate: 78, students: 120, activeThisWeek: 95 },
  { name: "Data Structures", views: 5230, avgWatchTime: "28:45", completionRate: 72, students: 150, activeThisWeek: 110 },
  { name: "Database Systems", views: 3200, avgWatchTime: "25:30", completionRate: 65, students: 95, activeThisWeek: 68 },
  { name: "Web Development", views: 3890, avgWatchTime: "35:00", completionRate: 58, students: 110, activeThisWeek: 82 },
  { name: "Algorithm Design", views: 4100, avgWatchTime: "30:45", completionRate: 52, students: 130, activeThisWeek: 90 },
];

const topStudents = [
  { name: "Karim Hossain", id: "STU-004", totalTime: "45h 20m", courses: 5, completion: 100 },
  { name: "Priya Sharma", id: "STU-007", totalTime: "42h 15m", courses: 4, completion: 98 },
  { name: "Imran Ahmed", id: "STU-001", totalTime: "38h 45m", courses: 4, completion: 92 },
  { name: "Susmita Das", id: "STU-002", totalTime: "35h 30m", courses: 4, completion: 88 },
  { name: "Fatima Begum", id: "STU-005", totalTime: "28h 10m", courses: 3, completion: 75 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("week");

  const overviewStats = {
    totalViews: 20980,
    avgWatchTime: "30:15",
    avgCompletion: 65,
    activeStudents: 445,
    totalLearningHours: "189h 40m",
    aiUsageCount: 1250,
    aiSatisfaction: 94,
  };

  const getCompletionColor = (rate) => {
    if (rate >= 75) return "text-green-600";
    if (rate >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getCompletionBg = (rate) => {
    if (rate >= 75) return "bg-green-500";
    if (rate >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Learning Hub Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Insights into course engagement and student activity</p>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-1">
            {["day", "week", "month", "year"].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  timeRange === range ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors">
            📥 Export Report
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        {[
          { label: "Total Views", value: overviewStats.totalViews.toLocaleString(), icon: "👁️", color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Avg Watch Time", value: overviewStats.avgWatchTime, icon: "⏱️", color: "bg-purple-50 border-purple-200 text-purple-700" },
          { label: "Avg Completion", value: `${overviewStats.avgCompletion}%`, icon: "📊", color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Active Students", value: overviewStats.activeStudents, icon: "👨‍🎓", color: "bg-orange-50 border-orange-200 text-orange-700" },
          { label: "Learning Hours", value: overviewStats.totalLearningHours, icon: "📚", color: "bg-indigo-50 border-indigo-200 text-indigo-700" },
          { label: "AI Queries", value: overviewStats.aiUsageCount.toLocaleString(), icon: "🤖", color: "bg-cyan-50 border-cyan-200 text-cyan-700" },
          { label: "AI Satisfaction", value: `${overviewStats.aiSatisfaction}%`, icon: "😊", color: "bg-pink-50 border-pink-200 text-pink-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-3 rounded-lg border ${stat.color}`}>
            <span className="text-lg">{stat.icon}</span>
            <p className="text-xl font-bold mt-1">{stat.value}</p>
            <p className="text-[10px] opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Most Viewed Courses */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-700">Most Viewed Courses</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Course</th>
                  <th className="text-center px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Views</th>
                  <th className="text-center px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Avg Time</th>
                  <th className="text-center px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Completion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courseAnalytics.map((course, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        <span className="text-sm font-medium text-slate-800">{course.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-slate-600">{course.views.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-center text-slate-600">{course.avgWatchTime}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-16 bg-slate-200 rounded-full h-2">
                          <div className={`h-2 rounded-full ${getCompletionBg(course.completionRate)}`} style={{ width: `${course.completionRate}%` }}></div>
                        </div>
                        <span className={`text-sm font-medium ${getCompletionColor(course.completionRate)}`}>{course.completionRate}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Most Active Students */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-700">Most Active Students</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {topStudents.map((student, i) => (
              <div key={i} className="p-4 flex items-center gap-3 hover:bg-slate-50">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i === 0 ? "bg-yellow-100 text-yellow-700" : i === 1 ? "bg-slate-200 text-slate-600" : i === 2 ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-500"}`}>
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{student.name}</p>
                  <p className="text-xs text-slate-500">{student.id} • {student.courses} courses</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-700">{student.totalTime}</p>
                  <p className="text-xs text-green-600">{student.completion}% complete</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Usage Statistics */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-700">AI Usage Statistics</h2>
        </div>
        <div className="grid grid-cols-5 gap-4 p-4">
          {[
            { feature: "Video Summary", queries: 345, satisfaction: 96, icon: "🎬", color: "bg-purple-50" },
            { feature: "Practice Questions", queries: 423, satisfaction: 92, icon: "📝", color: "bg-blue-50" },
            { feature: "Doubt Solver", queries: 289, satisfaction: 95, icon: "❓", color: "bg-green-50" },
            { feature: "Recommendations", queries: 156, satisfaction: 91, icon: "📚", color: "bg-orange-50" },
            { feature: "Subtitles", queries: 37, satisfaction: 88, icon: "🌐", color: "bg-cyan-50" },
          ].map((item, i) => (
            <div key={i} className={`${item.color} rounded-lg p-4`}>
              <span className="text-2xl">{item.icon}</span>
              <h4 className="font-bold text-slate-800 mt-2 text-sm">{item.feature}</h4>
              <p className="text-2xl font-bold text-slate-700 mt-1">{item.queries}</p>
              <p className="text-xs text-slate-500">queries</p>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-xs text-green-600 font-medium">{item.satisfaction}%</span>
                <span className="text-xs text-slate-400">satisfied</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}