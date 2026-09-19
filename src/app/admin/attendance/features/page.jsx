"use client";
import { useState } from "react";

// --- MOCK DATA ---

// For Manual Attendance Grid
const mockStudents = Array.from({ length: 48 }, (_, i) => ({
  id: `STU-${String(i + 1).padStart(4, '0')}`,
  name: `Student ${i + 1}`,
  status: "present" // 'present', 'absent', 'late'
}));

// For Digital Method Logs
const digitalLogs = [
  { id: 1, name: "Imran Ahmed", method: "QR Scan", time: "08:15 AM", date: "Today", type: "qr" },
  { id: 2, name: "Susmita Das", method: "Face Rec.", time: "08:30 AM", date: "Today", type: "face" },
  { id: 3, name: "Rahim Uddin", method: "Biometric", time: "08:32 AM", date: "Today", type: "bio" },
  { id: 4, name: "Karim Hossain", method: "GPS", time: "09:05 AM", date: "Today", type: "gps" },
  { id: 5, name: "Mim Akter", method: "QR Scan", time: "09:15 AM", date: "Today", type: "qr" },
];

// For AI Predictions
const riskStudents = [
  { id: "STU-0005", name: "Kamal Hossain", risk: 85, reason: "8 days consecutive absent", type: "Chronic Absenteeism" },
  { id: "STU-0042", name: "Nusrat Jahan", risk: 72, reason: "Failed 2 quizzes consecutively", type: "Academic Risk" },
  { id: "STU-0019", name: "Rafi Islam", risk: 65, reason: "Attendance dropped by 40%", type: "Dropout Risk" },
  // ...more
];

// Weekly Attendance Data for Chart
const weeklyData = [
  { day: "Sat", present: 420, absent: 30, late: 10 },
  { day: "Sun", present: 430, absent: 25, late: 5 },
  { day: "Mon", present: 415, absent: 35, late: 20 },
  { day: "Tue", present: 425, absent: 30, late: 15 },
  { day: "Wed", present: 400, absent: 40, late: 25 },
]

export default function AttendanceFeaturesPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Manual Attendance State
  const [students, setStudents] = useState(mockStudents);
  
  // Handle clicking on student grid to cycle status: present -> absent -> late -> present
  const handleMarkAttendance = (index) => {
    const newStudents = [...students];
    const currentStatus = newStudents[index].status;
    if (currentStatus === "present") newStudents[index].status = "absent";
    else if (currentStatus === "absent") newStudents[index].status = "late";
    else newStudents[index].status = "present";
    setStudents(newStudents);
  };

  // Counters
  const totalStudents = students.length;
  const presentCount = students.filter(s => s.status === "present").length;
  const absentCount = students.filter(s => s.status === "absent").length;
  const lateCount = students.filter(s => 
    s.status === "late"
  ).length;

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Attendance Module</h1>
      
      {/* Tabs */}
      <div className="flex gap-1 bg-white p-1 rounded-lg shadow-sm w-fit mb-6 border border-slate-200">
        {[
          { id: "dashboard", title: "Dashboard" },
          { id: "manual", title: "Manual Attendance" },
          { id: "digital", title: "Digital Logs (QR/Bio/Face/GPS)" },
          { id: "reports", title: "Reports & AI Prediction" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* ===================== TAB 1: DASHBOARD ===================== */}
      {activeTab === "dashboard" && (
        <div>
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl">👥</div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{totalStudents}</p>
                <p className="text-xs text-slate-500">Total Students</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-green-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl">✅</div>
              <div>
                <p className="text-2xl font-bold text-green-600">{presentCount}</p>
                <p className="text-xs text-slate-500">Present Today</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border-red-200 border shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center text-xl">✕</div>
              <div>
                <p className="text-2xl font-bold text-red-600">{absentCount}</p>
                <p className="text-xs text-slate-500">Absent Today</p>
              </div>
            </div>
                
                        <div className="bg-white p-5 rounded-xl border-yellow-200 border shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center text-xl">
                            ⏱️
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-yellow-600">{lateCount}</p>
                            <span className="text-xs text-slate-500">Late Today</span>
                        </div>
                        </div>

           </div>
        </div>

          {/* AI Risk Prediction Box */}
          <div className="bg-gradient-to-r from-red-50 to-red-100 p-5 rounded-xl border border-red-200 shadow-sm">
            <h3 >🤖 AI Dropout & Absenteeism Prediction</h3>
            <p className="text-xs text-red-800 mt-2 bg-white p-2 rounded border border-red-200">
              AI has detected 5 students at risk of dropping out based on attendance trends and academic performance.
            </p>
            <div className="mt-4 space-y-2">
              {riskStudents.map(r => (
                <div key={r.id} className="flex items-center justify-between bg-white p-2 rounded-md border border-red-100">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 text-sm">⚠️</span>
                    <span className="text-sm font-medium text-slate-700">{r.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-red-500 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-red-600" style={{ width: `${r.risk}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-red-600">{r.risk}% Risk</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Attendance Chart (CSS Only) */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 >Weekly Attendance Trend (This Week)</h3>
            <div className="flex items-end justify-between h-48 mt-4 gap-2 px-2">
              {weeklyData.map((item, i) => {
                const total = item.present + item.absent + item.late;
                const presentHeight = (item.present / total) * 100;
                const absentHeight = (item.absent / total) * 100;
                const lateHeight = (item.late / total) * 100;
                return (
                  <div key={i} className="flex flex-col items-center flex-1 h-full gap-1">
                    <div className="w-full flex flex-col justify-end h-full gap-[2px]">
                      {/* Absent Layer */}
                      <div className="bg-red-400 rounded-t" style={{ height: `${absentHeight}%` }}></div>
                      {/* Present Layer */}
                      <div className="bg-green-500 rounded-t flex-1" style={{ height: `${presentHeight}%` }}></div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 mt-1">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 2: MANUAL ATTENDANCE ===================== */}
      {activeTab === "manual" && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-[calc(100vh-15rem)] overflow-y-auto">
          <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
            <div>
              <h3>Manual Attendance - Batch 2023 (Section A)</h3>
              <p >Date: <span className="font-semibold text-slate-800">Today, Oct 25, 2023</span> • Subject: CSE-401</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-green-600 font-bold bg-green-100 px-2.5 py-1 rounded-md border border-green-300">✓ Present</span>
              <span className="text-sm text-red-600 font-bold bg-red-100 px-2.5 py-1 rounded-md border border-red-300">✕ Absent</span>
              <span className="text-sm text-yellow-600 font-bold bg-yellow-100 px-2.5 py-1 rounded-md border border-yellow-300">⏱️ Late</span>
            </div>
          </div>

          {/* 48 Student Grid */}
          <div className="grid grid-cols-6 md:grid-cols-8 gap-2">
            {students.map((student, index) => (
              <button
                key={student.id}
                onClick={() => handleMarkAttendance(index)}
                className={`p-2 rounded-lg border-2 text-xs font-medium transition-all hover:scale-105 active:scale-100 ${
                  student.status === "present" ? "bg-green-50 border-green-500 text-green-700 shadow-sm border-solid" :
                  student.status === "absent" ? "bg-red-50 border-red-500 text-red-700 border-solid" :
                  "bg-slate-50 border-slate-300 text-slate-600 border-dashed hover:bg-slate-100"
                }`}
              >
                <p className="text-[10px] text-slate-500 leading-none mb-1">ID: {student.id}</p>
                <p className="truncate leading-tight text-center font-medium">{student.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ===================== TAB 3: DIGITAL LOGS ===================== */}
      {activeTab === "digital" && (
        <div className="bg-white p-6 rounded-xl border border-sash-200 shadow-sm h-fit">
          <h3 className="modern-title text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3">Real-Time Digital Attendance Logs</h3>
          <p >Students checking in via various automated digital methods.</p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-3 font-semibold text-slate-600">Student</th>
                  <th className="text-left p-3 font-semibold text-slate-600">Method</th>
                  <th className="text-left p-3 font-semibold text-slate-600">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {digitalLogs.map(log => {
                  const colors = {
                    qr: "bg-blue-100 text-blue-700 border-blue-300 border-l-4",
                    face: "bg-purple-100 text-purple-700 border-purple-300 border-l-4",
                    bio: "bg-green-100 text-green-700 border-green-300 border-l-4",
                    gps: "bg-orange-100 text-orange-700 border-orange-300 border-l-4",
                  };
                  const icons = { qr: "📱", face: "🧑‍💻", bio: "🧬", gps: "📍" };
                  return (
                    <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-medium text-slate-700">{log.name}</td>
                      <td className="p-3">
                        <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${colors[log.type]}`}>
                          <span className="text-base">{icons[log.type]}</span>
                          <span className="text-xs font-medium">{log.method}</span>
                        </div>
                      </td>
                      <td className="p-3 text-slate-600">{log.time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================== TAB 4: REPORTS & PREDICTION ===================== */}
      {activeTab === "reports" && (
        <div className="space-y-6">
          {/* AI Prediction Box */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🧠 AI Analytics Engine</span>
              <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold">LIVE</span>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-slate-200">"Based on current data, the system predicts a 12% risk of total absenteeism for Batch 2023 next week."</p>
              <p className="text-sm text-blue-300 italic">Primary contributors: Face Recognition failure (4%), High GPS distance (5%), Manual Entry Delay (3%).</p>
            </div>
          </div>

          {/* Actual vs Predicted Chart */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 >Actual vs Predicted Absenteeism (Next Week)</h3>
            <div className="mt-6 space-y-3">
              {[
                { day: "Sat", actual: 12, predicted: 14 },
                { day: "Sun", actual: 10, predicted: 11 },
                { day: "Mon", actual: 15, predicted: 16 },
                { day: "Tue", actual: 9, predicted: 8 },
                { day: "Wed", actual: 11, predicted: 15 },
                { day: "Thu", actual: 14, predicted: 12 },
              ].map((item, i) => {
                const maxVal = 20;
                const actualHeight = (item.actual / maxVal) * 100;
                const predictedHeight = (item.predicted / maxVal) * 100;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-8 text-xs font-medium text-slate-500">{item.day}</span>
                    <div className="flex-1 flex flex-col gap-0.5 h-6">
                      {/* Predicted Bar (Light Gray - shown behind) */}
                      <div className="bg-slate-200 rounded-full h-full" style={{ height: "100%" }}></div>
                      {/* Actual Bar (Solid Blue - shown in front) */}
                      <div className="absolute inset-y-0 left-0 bg-blue-600 rounded-full" style={{ width: `${actualHeight}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-slate-600 w-6 text-right">{item.actual}</span>
                    <span className="text-xs text-slate-400 w-6 text-right">{item.predicted}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}