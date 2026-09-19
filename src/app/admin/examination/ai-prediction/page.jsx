"use client";
import { useState } from "react";

const mockPredictions = [
  {
    id: "STU-001", name: "Imran Ahmed", course: "CSE-201",
    currentMarks: { midterm: 25, assignment: 9, attendance: 5, quiz: 4 },
    predictedFinal: 43, confidence: 92, predictedGrade: "A-",
    riskLevel: "low", factors: ["Consistent performance", "High attendance", "Good assignment scores"]
  },
  {
    id: "STU-002", name: "Susmita Das", course: "CSE-201",
    currentMarks: { midterm: 22, assignment: 8, attendance: 4, quiz: 3 },
    predictedFinal: 38, confidence: 88, predictedGrade: "B+",
    riskLevel: "low", factors: ["Stable performance"]
  },
  {
    id: "STU-003", name: "Rahim Uddin", course: "CSE-201",
    currentMarks: { midterm: 18, assignment: 7, attendance: 3, quiz: 4 },
    predictedFinal: 32, confidence: 75, predictedGrade: "B-",
    riskLevel: "medium", factors: ["Drop in midterm", "Low attendance"]
  },
  {
    id: "STU-004", name: "Karim Hossain", course: "CSE-201",
    currentMarks: { midterm: 12, assignment: 5, attendance: 2, quiz: 1 },
    predictedFinal: 22, confidence: 82, predictedGrade: "D",
    riskLevel: "high", factors: ["Very low midterm", "Poor attendance", "Low quiz scores", "At risk of failing"]
  },
  {
    id: "STU-005", name: "Fatima Begum", course: "CSE-201",
    currentMarks: { midterm: 10, assignment: 4, attendance: 3, quiz: 1 },
    predictedFinal: 18, confidence: 78, predictedGrade: "F",
    riskLevel: "critical", factors: ["Critical: Likely to fail", "Very low scores across all", "Needs immediate intervention"]
  },
];

export default function AIPredictionPage() {
  const [predictions] = useState(mockPredictions);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showIntervention, setShowIntervention] = useState(false);

  const riskCounts = {
    low: predictions.filter(p => p.riskLevel === "low").length,
    medium: predictions.filter(p => p.riskLevel === "medium").length,
    high: predictions.filter(p => p.riskLevel === "high").length,
    critical: predictions.filter(p => p.riskLevel === "critical").length,
  };

  const getRiskColor = (level) => {
    switch (level) {
      case "low": return { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", badge: "bg-green-100 text-green-700" };
      case "medium": return { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", badge: "bg-yellow-100 text-yellow-700" };
      case "high": return { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", badge: "bg-orange-100 text-orange-700" };
      case "critical": return { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", badge: "bg-red-100 text-red-700" };
      default: return { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-700", badge: "bg-slate-100 text-slate-700" };
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return "text-green-600";
    if (confidence >= 80) return "text-blue-600";
    if (confidence >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)]  bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">AI Grade Prediction</h1>
          <p className="text-sm text-slate-500 mt-1">Machine learning-powered final exam score prediction</p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-sm transition-colors">
          🔄 Retrain Model
        </button>
      </div>

      {/* AI Info Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-3xl">🤖</span>
          <div>
            <h3 className="font-bold text-purple-800">How AI Prediction Works</h3>
            <p className="text-sm text-purple-700 mt-1">Our ML model analyzes midterm scores, assignment performance, attendance patterns, and quiz results to predict final exam outcomes. Predictions become more accurate as more data points are available.</p>
          </div>
        </div>
      </div>

      {/* Risk Distribution */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { level: "low", label: "Low Risk", icon: "✅", color: "bg-green-50 border-green-200" },
          { level: "medium", label: "Medium Risk", icon: "⚠️", color: "bg-yellow-50 border-yellow-200" },
          { level: "high", label: "High Risk", icon: "🔴", color: "bg-orange-50 border-orange-200" },
          { level: "critical", label: "Critical", icon: "🚨", color: "bg-red-50 border-red-200" },
        ].map((risk, i) => (
          <div key={i} className={`p-4 rounded-lg border ${risk.color}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{risk.icon}</span>
              <span className="text-sm font-medium text-slate-700">{risk.label}</span>
            </div>
            <p className="text-3xl font-bold text-slate-800">{riskCounts[risk.level]}</p>
            <p className="text-xs text-slate-500 mt-1">{((riskCounts[risk.level] / predictions.length) * 100).toFixed(0)}% of students</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student List */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-700">Students</h3>
            <p className="text-xs text-slate-500">Click to view detailed prediction</p>
          </div>
          <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
            {predictions.map(student => {
              const colors = getRiskColor(student.riskLevel);
              return (
                <button
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`w-full text-left p-4 hover:bg-slate-50 transition-all border-l-4 ${
                    selectedStudent?.id === student.id ? "border-blue-600 bg-blue-50" : `border-transparent ${colors.bg}`
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{student.name}</p>
                      <p className="text-xs text-slate-500">{student.id}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}>
                      {student.riskLevel}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-slate-500">Predicted: <strong>{student.predictedGrade}</strong></span>
                    <span className="text-xs text-slate-400">|</span>
                    <span className={`text-xs font-medium ${getConfidenceColor(student.confidence)}`}>
                      {student.confidence}% confidence
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-2">
          {!selectedStudent ? (
            <div className="bg-white rounded-lg border border-slate-200 h-full flex items-center justify-center p-12">
              <div className="text-center text-slate-400">
                <span className="text-6xl block mb-4">🤖</span>
                <p className="text-lg font-medium">Select a student</p>
                <p className="text-sm mt-1">Click on any student to view AI prediction details</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Student Header */}
              <div className={`rounded-lg border p-4 ${getRiskColor(selectedStudent.riskLevel).bg} ${getRiskColor(selectedStudent.riskLevel).border}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{selectedStudent.name}</h3>
                    <p className="text-sm text-slate-600">{selectedStudent.id} • {selectedStudent.course}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-slate-800">{selectedStudent.predictedGrade}</div>
                    <p className="text-sm text-slate-500">Predicted Grade</p>
                  </div>
                </div>
              </div>

              {/* Current Performance */}
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <h4 className="font-bold text-slate-700 mb-3">Current Performance</h4>
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(selectedStudent.currentMarks).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="relative w-16 h-16 mx-auto">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle cx="32" cy="32" r="28" stroke="#e2e8f0" strokeWidth="4" fill="none" />
                          <circle cx="32" cy="32" r="28" stroke={
                            key === "midterm" ? "#3b82f6" :
                            key === "assignment" ? "#10b981" :
                            key === "attendance" ? "#8b5cf6" : "#f59e0b"
                          } strokeWidth="4" fill="none"
                            strokeDasharray={`${(value / 30) * 175.93} 175.93`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-bold text-slate-800">{value}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-2 capitalize">{key}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prediction Details */}
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <h4 className="font-bold text-slate-700 mb-3">Prediction Analysis</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-blue-700">{selectedStudent.predictedFinal}</p>
                    <p className="text-xs text-blue-600 mt-1">Predicted Final Marks (out of 50)</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <p className={`text-3xl font-bold ${getConfidenceColor(selectedStudent.confidence)}`}>{selectedStudent.confidence}%</p>
                    <p className="text-xs text-purple-600 mt-1">Confidence Level</p>
                  </div>
                </div>
              </div>

              {/* Risk Factors */}
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <h4 className="font-bold text-slate-700 mb-3">Risk Factors & Observations</h4>
                <div className="space-y-2">
                  {selectedStudent.factors.map((factor, i) => (
                    <div key={i} className={`flex items-center gap-2 p-2 rounded-md ${
                      factor.includes("Critical") || factor.includes("fail") ? "bg-red-50 text-red-700" :
                      factor.includes("Low") || factor.includes("Poor") || factor.includes("Drop") ? "bg-orange-50 text-orange-700" :
                      "bg-green-50 text-green-700"
                    }`}>
                      <span>{factor.includes("Critical") || factor.includes("fail") ? "🚨" : factor.includes("Low") || factor.includes("Poor") || factor.includes("Drop") ? "⚠️" : "✅"}</span>
                      <span className="text-sm font-medium">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              {(selectedStudent.riskLevel === "high" || selectedStudent.riskLevel === "critical") && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-bold text-red-800 mb-2">🚨 AI Recommendations</h4>
                  <ul className="space-y-1 text-sm text-red-700">
                    <li>• Schedule immediate one-on-one meeting with student</li>
                    <li>• Assign a peer tutor for additional support</li>
                    <li>• Provide extra practice materials</li>
                    <li>• Consider allowing makeup quiz opportunity</li>
                    <li>• Notify academic advisor for monitoring</li>
                  </ul>
                  <button
                    onClick={() => setShowIntervention(true)}
                    className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm"
                  >
                    📧 Send Intervention Notice
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Intervention Modal */}
      {showIntervention && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Send Intervention Notice</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">To</label>
                <input type="text" value={`${selectedStudent?.name} (${selectedStudent?.id})`} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-slate-50" readOnly />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Send Via</label>
                <div className="flex gap-2">
                  <label className="flex items-center gap-1 text-sm">
                    <input type="checkbox" defaultChecked /> Email
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input type="checkbox" /> SMS
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input type="checkbox" /> Notification
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Message</label>
                <textarea rows={4} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none" defaultValue={`Dear ${selectedStudent?.name},\n\nBased on your current performance analysis, we recommend scheduling a meeting with your course instructor to discuss strategies for improving your final exam preparation.\n\nPlease contact the department office at your earliest convenience.`} />
              </div>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowIntervention(false)} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 text-sm font-medium">Cancel</button>
                <button onClick={() => setShowIntervention(false)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium">Send Notice</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}