"use client";

export default function StudentAnalyticsPage() {
  // Mock Data for Analytics
  const analyticsData = {
    totalStudents: 1250,
    atRiskStudents: 45,
    avgCGPA: 3.45,
    avgAttendance: 82,
    cgpaDistribution: [
      { range: "3.50-4.00", count: 30, color: "bg-green-500" },
      { range: "3.00-3.49", count: 45, color: "bg-blue-500" },
      { range: "2.50-2.99", count: 15, color: "bg-yellow-500" },
      { range: "< 2.50", count: 10, color: "bg-red-500" },
    ],
    attendanceTrend: [65, 70, 85, 80, 90, 88, 92] // Last 7 days percentage
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Student Analytics Engine</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: "Total Students", value: analyticsData.totalStudents, color: "border-l-blue-500 bg-blue-50", icon: "🎓" },
          { title: "At-Risk Students", value: analyticsData.atRiskStudents, color: "border-l-red-500 bg-red-50", icon: "⚠️" },
          { title: "Average CGPA", value: analyticsData.avgCGPA, color: "border-l-green-500 bg-green-50", icon: "📊" },
          { title: "Avg Attendance", value: `${analyticsData.avgAttendance}%`, color: "border-l-purple-500 bg-purple-50", icon: "📋" },
        ].map((kpi, i) => (
          <div key={i} className={`p-4 rounded-lg border-l-4 ${kpi.color} bg-white shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{kpi.title}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{kpi.value}</p>
              </div>
              <span className="text-3xl opacity-50">{kpi.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: CGPA Distribution (Horizontal Bars) */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-6">CGPA Distribution</h3>
          <div className="space-y-4">
            {analyticsData.cgpaDistribution.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-xs text-slate-600 w-20 text-right">{item.range}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div 
                    className={`${item.color} h-full rounded-full transition-all duration-500`} 
                    style={{ width: `${item.count}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold text-slate-700 w-8">{item.count}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Attendance Trend (Vertical Bars) */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-6">Weekly Attendance Trend (%)</h3>
          <div className="flex items-end justify-between h-40 gap-2 px-2">
            {analyticsData.attendanceTrend.map((val, i) => (
              <div className="flex flex-col items-center flex-1 gap-1">
                <span className="text-[10px] font-bold text-slate-500">{val}%</span>
                <div className="w-full bg-slate-100 rounded-t relative" style={{ height: `${val * 0.4}px` }}>
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t transition-all duration-500"
                    style={{ height: `${val}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-slate-400">D{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prediction & Learning Gap Text/UI Representations */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-4">AI Dropout Prediction</h3>
          <div className="space-y-3">
            {["Low Attendance (<75%)", "Failed 2+ Core Courses", "CGPA Drop > 0.5"].map((risk, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  <span className="text-sm text-red-700 font-medium">{risk}</span>
                </div>
                <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded font-bold">HIGH RISK</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-4">Learning Gap Analysis</h3>
          <div className="space-y-3">
            {["Data Structures (Average Score: 45/100)", "Calculus II (Average Score: 52/100)"].map((gap, i) => (
              <div key={i} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 font-medium">{gap}</p>
                <div className="w-full bg-yellow-200 rounded-full h-1.5 mt-2">
                  <div className="bg-yellow-500 h-full rounded-l" style={{ width: "45%" }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}