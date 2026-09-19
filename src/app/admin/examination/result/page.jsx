"use client";
import { useState } from "react";

const mockResults = [
  { id: "STU-001", name: "Imran Ahmed", course: "CSE-101", midterm: 25, final: 42, assignment: 9, attendance: 5, quiz: 4, total: 85, grade: "A+" },
  { id: "STU-002", name: "Susmita Das", course: "CSE-101", midterm: 22, final: 38, assignment: 8, attendance: 4, quiz: 3, total: 75, grade: "A" },
  { id: "STU-003", name: "Rahim Uddin", course: "CSE-101", midterm: 18, final: 35, assignment: 7, attendance: 3, quiz: 4, total: 67, grade: "B+" },
  { id: "STU-004", name: "Karim Hossain", course: "CSE-101", midterm: 15, final: 28, assignment: 6, attendance: 2, quiz: 2, total: 53, grade: "C+" },
  { id: "STU-005", name: "Fatima Begum", course: "CSE-101", midterm: 12, final: 20, assignment: 5, attendance: 3, quiz: 1, total: 41, grade: "D" },
  { id: "STU-006", name: "Nasir Khan", course: "CSE-101", midterm: 10, final: 18, assignment: 4, attendance: 2, quiz: 1, total: 35, grade: "F" },
];

export default function ResultPage() {
  const [results] = useState(mockResults);
  const [publishStatus, setPublishStatus] = useState("draft"); // draft, published
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [filterGrade, setFilterGrade] = useState("all");

  const gradeDistribution = results.reduce((acc, r) => {
    acc[r.grade] = (acc[r.grade] || 0) + 1;
    return acc;
  }, {});

  const filteredResults = filterGrade === "all" 
    ? results 
    : results.filter(r => r.grade === filterGrade);

  const stats = {
    total: results.length,
    passed: results.filter(r => r.total >= 40).length,
    failed: results.filter(r => r.total < 40).length,
    passRate: ((results.filter(r => r.total >= 40).length / results.length) * 100).toFixed(1),
    avgMarks: (results.reduce((sum, r) => sum + r.total, 0) / results.length).toFixed(1),
    highest: Math.max(...results.map(r => r.total)),
    lowest: Math.min(...results.map(r => r.total)),
  };

  const handlePublish = () => {
    setPublishStatus("published");
    setShowConfirmation(false);
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)]  bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Result Management</h1>
          <p className="text-sm text-slate-500 mt-1">Review and publish examination results</p>
        </div>
        <div className="flex gap-2">
          {publishStatus === "draft" ? (
            <button
              onClick={() => setShowConfirmation(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm transition-colors"
            >
              🚀 Publish Results
            </button>
          ) : (
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium text-sm">
              ✅ Published
            </span>
          )}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors">
            📥 Export
          </button>
        </div>
      </div>

      {/* Publish Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚠️</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Confirm Publication</h3>
              <p className="text-sm text-slate-600 mb-6">
                Once published, results will be visible to students and guardians. This action cannot be easily undone. Are you sure?
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePublish}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm"
                >
                  Yes, Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        {[
          { label: "Total", value: stats.total, color: "bg-slate-50 border-slate-200 text-slate-700" },
          { label: "Passed", value: stats.passed, color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Failed", value: stats.failed, color: "bg-red-50 border-red-200 text-red-700" },
          { label: "Pass Rate", value: `${stats.passRate}%`, color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Average", value: stats.avgMarks, color: "bg-purple-50 border-purple-200 text-purple-700" },
          { label: "Highest", value: stats.highest, color: "bg-teal-50 border-teal-200 text-teal-700" },
          { label: "Lowest", value: stats.lowest, color: "bg-orange-50 border-orange-200 text-orange-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-3 rounded-lg border ${stat.color}`}>
            <p className="text-[10px] font-medium opacity-80">{stat.label}</p>
            <p className="text-xl font-bold mt-0.5">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Grade Distribution */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
        <h3 className="font-bold text-slate-700 mb-3 text-sm">Grade Distribution</h3>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(gradeDistribution).sort((a, b) => b[0].localeCompare(a[0])).map(([grade, count]) => (
            <button
              key={grade}
              onClick={() => setFilterGrade(filterGrade === grade ? "all" : grade)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                filterGrade === grade 
                  ? "ring-2 ring-blue-500 scale-105" 
                  : "hover:scale-105"
              } ${
                grade === "F" ? "bg-red-100 text-red-700" :
                grade.startsWith("A") ? "bg-green-100 text-green-700" :
                "bg-blue-100 text-blue-700"
              }`}
            >
              {grade}: {count}
            </button>
          ))}
          {filterGrade !== "all" && (
            <button
              onClick={() => setFilterGrade("all")}
              className="px-3 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">#</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Student</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Mid</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Final</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Asmt</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Att</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Quiz</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Total</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Grade</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredResults.map((result, index) => (
                <tr key={result.id} className={`hover:bg-slate-50 ${result.grade === "F" ? "bg-red-50/50" : ""}`}>
                  <td className="px-4 py-3 text-sm text-slate-500">{index + 1}</td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-800">{result.name}</p>
                    <p className="text-xs text-slate-500">{result.id}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-slate-600">{result.midterm}</td>
                  <td className="px-4 py-3 text-sm text-center text-slate-600">{result.final}</td>
                  <td className="px-4 py-3 text-sm text-center text-slate-600">{result.assignment}</td>
                  <td className="px-4 py-3 text-sm text-center text-slate-600">{result.attendance}</td>
                  <td className="px-4 py-3 text-sm text-center text-slate-600">{result.quiz}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-sm font-bold text-slate-800">{result.total}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                      result.grade === "F" ? "bg-red-100 text-red-700" :
                      result.grade.startsWith("A") ? "bg-green-100 text-green-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {result.grade}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      result.total >= 40 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {result.total >= 40 ? "Passed" : "Failed"}
                    </span>
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