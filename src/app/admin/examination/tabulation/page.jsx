"use client";
import { useState } from "react";

const mockTabulationData = {
  course: { code: "CSE-101", name: "Introduction to Programming", credit: 3, semester: "1st" },
  sections: ["A", "B"],
  students: [
    { id: "STU-001", name: "Imran Ahmed", section: "A", midterm: 25, final: 42, assignment: 9, attendance: 5, quiz: 4 },
    { id: "STU-002", name: "Susmita Das", section: "A", midterm: 22, final: 38, assignment: 8, attendance: 4, quiz: 3 },
    { id: "STU-003", name: "Rahim Uddin", section: "A", midterm: 18, final: 35, assignment: 7, attendance: 3, quiz: 4 },
    { id: "STU-004", name: "Karim Hossain", section: "B", midterm: 15, final: 28, assignment: 6, attendance: 2, quiz: 2 },
    { id: "STU-005", name: "Fatima Begum", section: "B", midterm: 12, final: 20, assignment: 5, attendance: 3, quiz: 1 },
    { id: "STU-006", name: "Nasir Khan", section: "A", midterm: 10, final: 18, assignment: 4, attendance: 2, quiz: 1 },
    { id: "STU-007", name: "Priya Sharma", section: "B", midterm: 28, final: 45, assignment: 10, attendance: 5, quiz: 5 },
    { id: "STU-008", name: "Arif Islam", section: "A", midterm: 20, final: 40, assignment: 8, attendance: 4, quiz: 4 },
  ]
};

export default function TabulationPage() {
  const [data] = useState(mockTabulationData);
  const [groupBy, setGroupBy] = useState("none"); // none, section
  const [sortBy, setSortBy] = useState("id"); // id, total, grade

  const getGrade = (total) => {
    if (total >= 80) return "A+";
    if (total >= 75) return "A";
    if (total >= 70) return "A-";
    if (total >= 65) return "B+";
    if (total >= 60) return "B";
    if (total >= 55) return "B-";
    if (total >= 50) return "C+";
    if (total >= 45) return "C";
    if (total >= 40) return "D";
    return "F";
  };

  const processedStudents = data.students.map(s => ({
    ...s,
    total: s.midterm + s.final + s.assignment + s.attendance + s.quiz,
    grade: getGrade(s.midterm + s.final + s.assignment + s.attendance + s.quiz)
  }));

  const sortedStudents = [...processedStudents].sort((a, b) => {
    if (sortBy === "total") return b.total - a.total;
    if (sortBy === "grade") return a.grade.localeCompare(b.grade);
    return a.id.localeCompare(b.id);
  });

  const sectionStats = data.sections.map(sec => {
    const secStudents = processedStudents.filter(s => s.section === sec);
    const passed = secStudents.filter(s => s.total >= 40).length;
    const avg = (secStudents.reduce((sum, s) => sum + s.total, 0) / secStudents.length).toFixed(1);
    const highest = Math.max(...secStudents.map(s => s.total));
    const lowest = Math.min(...secStudents.map(s => s.total));
    return { section: sec, total: secStudents.length, passed, failed: secStudents.length - passed, avg, highest, lowest, passRate: ((passed / secStudents.length) * 100).toFixed(1) };
  });

  const overallStats = {
    total: processedStudents.length,
    passed: processedStudents.filter(s => s.total >= 40).length,
    failed: processedStudents.filter(s => s.total < 40).length,
    avg: (processedStudents.reduce((sum, s) => sum + s.total, 0) / processedStudents.length).toFixed(1),
    highest: Math.max(...processedStudents.map(s => s.total)),
    lowest: Math.min(...processedStudents.map(s => s.total)),
  };

  const gradeDistribution = processedStudents.reduce((acc, s) => {
    acc[s.grade] = (acc[s.grade] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-6 h-[calc(100vh-4rem)]  bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Tabulation Sheet</h1>
          <p className="text-sm text-slate-500 mt-1">Course-wise result summary and analysis</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm transition-colors">
            📥 Export Excel
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm transition-colors">
            📄 Export PDF
          </button>
        </div>
      </div>

      {/* Course Info */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <p className="text-xs text-slate-500">Course Code</p>
            <p className="font-bold text-slate-800">{data.course.code}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs text-slate-500">Course Title</p>
            <p className="font-bold text-slate-800">{data.course.name}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Credit</p>
            <p className="font-bold text-slate-800">{data.course.credit}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Semester</p>
            <p className="font-bold text-slate-800">{data.course.semester}</p>
          </div>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
        {[
          { label: "Total Students", value: overallStats.total, color: "bg-slate-50 border-slate-200 text-slate-700" },
          { label: "Passed", value: overallStats.passed, color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Failed", value: overallStats.failed, color: "bg-red-50 border-red-200 text-red-700" },
          { label: "Pass Rate", value: `${((overallStats.passed / overallStats.total) * 100).toFixed(1)}%`, color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Highest", value: overallStats.highest, color: "bg-teal-50 border-teal-200 text-teal-700" },
          { label: "Average", value: overallStats.avg, color: "bg-purple-50 border-purple-200 text-purple-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-3 rounded-lg border ${stat.color}`}>
            <p className="text-[10px] font-medium opacity-80">{stat.label}</p>
            <p className="text-xl font-bold mt-0.5">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Section-wise Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {sectionStats.map((sec, i) => (
          <div key={i} className="bg-white rounded-lg border border-slate-200 p-4">
            <h3 className="font-bold text-slate-700 mb-3">Section {sec.section}</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center bg-slate-50 rounded-lg p-2">
                <p className="text-lg font-bold text-slate-700">{sec.total}</p>
                <p className="text-[10px] text-slate-500">Total</p>
              </div>
              <div className="text-center bg-green-50 rounded-lg p-2">
                <p className="text-lg font-bold text-green-700">{sec.passed}</p>
                <p className="text-[10px] text-green-600">Passed</p>
              </div>
              <div className="text-center bg-red-50 rounded-lg p-2">
                <p className="text-lg font-bold text-red-700">{sec.failed}</p>
                <p className="text-[10px] text-red-600">Failed</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div><span className="text-slate-500">Pass Rate:</span> <span className="font-bold text-blue-700">{sec.passRate}%</span></div>
              <div><span className="text-slate-500">Highest:</span> <span className="font-bold text-teal-700">{sec.highest}</span></div>
              <div><span className="text-slate-500">Average:</span> <span className="font-bold text-purple-700">{sec.avg}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Grade Distribution Bar */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
        <h3 className="font-bold text-slate-700 mb-3 text-sm">Grade Distribution</h3>
        <div className="flex gap-1 h-8 rounded-lg overflow-hidden">
          {Object.entries(gradeDistribution).sort((a, b) => b[0].localeCompare(a[0])).map(([grade, count]) => {
            const percentage = (count / processedStudents.length) * 100;
            const colors = { "A+": "bg-green-500", "A": "bg-green-400", "A-": "bg-green-300", "B+": "bg-blue-400", "B": "bg-blue-300", "B-": "bg-blue-200", "C+": "bg-yellow-400", "C": "bg-yellow-300", "D": "bg-orange-400", "F": "bg-red-500" };
            return (
              <div
                key={grade}
                className={`${colors[grade] || "bg-slate-300"} flex items-center justify-center text-white text-xs font-bold min-w-[30px]`}
                style={{ width: `${percentage}%` }}
                title={`${grade}: ${count} students (${percentage.toFixed(1)}%)`}
              >
                {percentage > 10 && `${grade}`}
              </div>
            );
          })}
        </div>
        <div className="flex gap-3 mt-2 flex-wrap">
          {Object.entries(gradeDistribution).sort((a, b) => b[0].localeCompare(a[0])).map(([grade, count]) => (
            <span key={grade} className="text-xs text-slate-600">{grade}: {count}</span>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4">
        <div className="flex gap-4 items-center">
          <div>
            <label className="text-xs font-medium text-slate-500">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="ml-2 px-2 py-1 text-sm border border-slate-200 rounded-md outline-none"
            >
              <option value="id">Student ID</option>
              <option value="total">Total Marks (High to Low)</option>
              <option value="grade">Grade</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Group By</label>
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              className="ml-2 px-2 py-1 text-sm border border-slate-200 rounded-md outline-none"
            >
              <option value="none">No Grouping</option>
              <option value="section">Section</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabulation Table */}
      {groupBy === "none" ? (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">SL</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Student ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Name</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Sec</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Mid (30)</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Final (50)</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Asmt (10)</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Att (5)</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Quiz (5)</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Total</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Grade</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedStudents.map((student, index) => (
                  <tr key={student.id} className={`hover:bg-slate-50 ${student.grade === "F" ? "bg-red-50/50" : ""}`}>
                    <td className="px-4 py-2 text-sm text-slate-500">{index + 1}</td>
                    <td className="px-4 py-2 text-sm font-mono text-slate-600">{student.id}</td>
                    <td className="px-4 py-2 text-sm text-slate-800 font-medium">{student.name}</td>
                    <td className="px-4 py-2 text-sm text-center text-slate-600">{student.section}</td>
                    <td className="px-4 py-2 text-sm text-center text-slate-600">{student.midterm}</td>
                    <td className="px-4 py-2 text-sm text-center text-slate-600">{student.final}</td>
                    <td className="px-4 py-2 text-sm text-center text-slate-600">{student.assignment}</td>
                    <td className="px-4 py-2 text-sm text-center text-slate-600">{student.attendance}</td>
                    <td className="px-4 py-2 text-sm text-center text-slate-600">{student.quiz}</td>
                    <td className="px-4 py-2 text-center">
                      <span className="text-sm font-bold text-slate-800">{student.total}</span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        student.grade === "F" ? "bg-red-100 text-red-700" :
                        student.grade.startsWith("A") ? "bg-green-100 text-green-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {student.grade}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        student.total >= 40 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {student.total >= 40 ? "P" : "F"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        data.sections.map(sec => (
          <div key={sec} className="mb-6">
            <div className="bg-blue-100 px-4 py-2 rounded-t-lg border border-blue-200">
              <h3 className="font-bold text-blue-800">Section {sec}</h3>
            </div>
            <div className="bg-white rounded-b-lg border border-t-0 border-slate-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase">SL</th>
                    <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Student ID</th>
                    <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Name</th>
                    <th className="text-center px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Total</th>
                    <th className="text-center px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Grade</th>
                    <th className="text-center px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sortedStudents.filter(s => s.section === sec).map((student, index) => (
                    <tr key={student.id} className={`hover:bg-slate-50 ${student.grade === "F" ? "bg-red-50/50" : ""}`}>
                      <td className="px-4 py-2 text-sm text-slate-500">{index + 1}</td>
                      <td className="px-4 py-2 text-sm font-mono text-slate-600">{student.id}</td>
                      <td className="px-4 py-2 text-sm text-slate-800 font-medium">{student.name}</td>
                      <td className="px-4 py-2 text-center font-bold text-slate-800">{student.total}</td>
                      <td className="px-4 py-2 text-center">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          student.grade === "F" ? "bg-red-100 text-red-700" : student.grade.startsWith("A") ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                        }`}>{student.grade}</span>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${student.total >= 40 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {student.total >= 40 ? "P" : "F"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}