"use client";
import { useState } from "react";

const mockEvaluations = [
  { id: 1, name: "Dr. Ayesha Siddika", dept: "CSE", overallScore: 92, studentFeedback: 4.8, peerReview: 4.5, aiScore: 95, status: "Excellent", aiSummary: "Consistently high ratings in course delivery and student engagement." },
  { id: 2, name: "Md. Rassel Hossain", dept: "BBA", overallScore: 78, studentFeedback: 4.2, peerReview: 4.0, aiScore: 82, status: "Good", aiSummary: "Good performance but needs improvement in interactive teaching methods." },
  { id: 3, name: "Farzana Akter", dept: "English", overallScore: 88, studentFeedback: 4.6, peerReview: 4.6, aiScore: 90, status: "Excellent", aiSummary: "Excellent peer reviews, AI notes slight variance in assignment grading speed." },
  { id: 4, name: "Kamal Hossain", dept: "Physics", overallScore: 65, studentFeedback: 3.5, peerReview: 4.0, aiScore: 60, status: "Needs Improvement", aiSummary: "Significant dropout rate in Physics 101. Recommend pedagogical training." },
];

function ScoreCircle({ score, size = "w-24 h-24" }) {
  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  
  return (
    <svg className={`${size} transform -rotate-90`} viewBox="0 0 24 24" >
      <circle cx="12" cy="12" r={radius} stroke="#e2e8f0" strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r={radius} stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray={`${circumference}`} strokeDashoffset={offset} strokeLinecap="round" className="text-blue-600" />
      <text x="12" y="15.5" textAnchor="middle" className="fill-current text-[8px] font-bold">{score}%</text>
    </svg>
  );
}

export default function TeacherEvaluationPage() {
  const [evaluations] = useState(mockEvaluations);
  const [selectedEval, setSelectedEval] = useState(mockEvaluations[0]);

  const statusColors = {
    "Excellent": "bg-green-100 text-green-800",
    "Good": "bg-blue-100 text-blue-800",
    "Needs Improvement": "bg-red-100 text-red-800",
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Teacher Evaluation Center</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Left: Teacher List */}
        <div className="lg:col-span-1 bg-white p-4 rounded-lg border border-slate-200 shadow-sm h-fit">
          <h3 className="text-sm font-bold text-slate-700 mb-3 border-b pb-2">Faculty List</h3>
          <div className="space-y-2 max-h-[70vh] overflow-y-auto">
            {evaluations.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedEval(t)}
                className={`w-full text-left px-3 py-3 rounded-md text-sm transition-all border ${selectedEval?.id === t.id ? "border-blue-500 bg-blue-50 font-medium text-blue-800 shadow-sm" : "border-slate-200 hover:bg-slate-50 text-slate-600"}`}
              >
                <p className="font-medium">{t.name}</p>
                <p className="text-xs text-slate-400">{t.dept}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Evaluation Details */}
        {selectedEval && (
          <div className="lg:col-span-3 space-y-6">
            
            {/* Top Metrics Row */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm text-center">
                <ScoreCircle score={selectedEval.overallScore} size="w-20 h-20 mx-auto" />
                <p className="text-xs font-bold text-slate-500 mt-2">Overall</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm text-center">
                <ScoreCircle score={Math.round(selectedEval.studentFeedback * 20)} size="w-20 h-20 mx-auto" />
                <p className="text-xs font-bold text-slate-500 mt-2">Students</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm text-center">
                <ScoreCircle score={Math.round(selectedEval.peerReview * 20)} size="w-20 h-20 mx-auto" />
                <p className="text-xs font-bold text-slate-500 mt-2">Peers</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm text-center border-2 border-blue-200">
                <ScoreCircle score={selectedEval.aiScore} size="w-20 h-20 mx-auto" />
                <p className="text-xs font-bold text-blue-600 mt-2">AI Engine</p>
              </div>
            </div>

            {/* AI Analysis Box */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl shadow-lg text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🤖</span>
                <h3 className="text-base font-bold">AI Evaluation Summary</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-800 p-4 rounded-lg border border-slate-700">
                "{selectedEval.aiSummary}"
              </p>
            </div>

            {/* Detailed Rubric Evaluation */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-700">Detailed Evaluation Breakdown</h3>
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusColors[selectedEval.status]}`}>
                  {selectedEval.status}
                </span>
              </div>
              
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left p-3 font-semibold text-slate-600">Criteria</th>
                    <th className="text-center p-3 font-semibold text-slate-600">Score (/100)</th>
                    <th className="text-center p-3 font-semibold text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { criteria: "Teaching Quality", score: 95, desc: "Clarity, engagement, pacing" },
                    { criteria: "Student Engagement", score: 90, desc: "Response time, interaction" },
                    { criteria: "Resource Utilization", score: 85, desc: "Use of smartboard, labs" },
                    { criteria: "Assessment Methods", score: 98, desc: "Variety, fairness, feedback speed" },
                    { criteria: "Discipline & Punctuality", score: 92, desc: "Class timing, behavior" }
                  ].map((item, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-3 text-slate-700 font-medium">{item.criteria}</td>
                      <td className="p-3 text-center font-bold text-slate-800">{item.score}</td>
                      <td className="p-3 text-center">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${item.score >= 90 ? "bg-green-100 text-green-700" : item.score >= 80 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                          {item.score >= 90 ? "Excellent" : item.score >= 80 ? "Good" : "Low"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}