"use client";
import { useState } from "react";

const mockSubmissions = [
  { id: 1, studentId: "STU-001", studentName: "Imran Ahmed", assignmentTitle: "Algorithm Design Assignment", course: "CSE-201", submittedAt: "2024-01-18 14:30", status: "submitted", file: "algorithm_assign3.pdf", fileSize: "2.4 MB", grade: null, feedback: null, isLate: false, plagiarismScore: 5 },
  { id: 2, studentId: "STU-002", studentName: "Susmita Das", assignmentTitle: "Algorithm Design Assignment", course: "CSE-201", submittedAt: "2024-01-19 23:45", status: "submitted", file: "susmita_algo3.zip", fileSize: "5.1 MB", grade: null, feedback: null, isLate: false, plagiarismScore: 12 },
  { id: 3, studentId: "STU-003", studentName: "Rahim Uddin", assignmentTitle: "Algorithm Design Assignment", course: "CSE-201", submittedAt: "2024-01-21 02:15", status: "submitted", file: "rahim_assignment3.pdf", fileSize: "1.8 MB", grade: null, feedback: null, isLate: true, plagiarismScore: 45 },
  { id: 4, studentId: "STU-004", studentName: "Karim Hossain", assignmentTitle: "Algorithm Design Assignment", course: "CSE-201", submittedAt: null, status: "not_submitted", file: null, fileSize: null, grade: null, feedback: null, isLate: false, plagiarismScore: null },
  { id: 5, studentId: "STU-005", studentName: "Fatima Begum", assignmentTitle: "Algorithm Design Assignment", course: "CSE-201", submittedAt: "2024-01-17 10:00", status: "graded", file: "fatima_algo3.pdf", fileSize: "3.2 MB", grade: 85, feedback: "Good work! Minor improvements needed in time complexity analysis.", isLate: false, plagiarismScore: 8 },
  { id: 6, studentId: "STU-006", studentName: "Nasir Khan", assignmentTitle: "Algorithm Design Assignment", course: "CSE-201", submittedAt: "2024-01-18 09:30", status: "graded", file: "nasir_final.pdf", fileSize: "2.9 MB", grade: 72, feedback: "Satisfactory. Could improve on edge case handling.", isLate: false, plagiarismScore: 15 },
];

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [gradeInput, setGradeInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");

  const filteredSubmissions = filterStatus === "all" 
    ? submissions 
    : submissions.filter(s => s.status === filterStatus);

  const stats = {
    total: submissions.length,
    submitted: submissions.filter(s => s.status === "submitted").length,
    graded: submissions.filter(s => s.status === "graded").length,
    notSubmitted: submissions.filter(s => s.status === "not_submitted").length,
    late: submissions.filter(s => s.isLate).length,
    plagiarism: submissions.filter(s => s.plagiarismScore > 30).length,
  };

  const handleGrade = (submissionId) => {
    setSubmissions(submissions.map(s => 
      s.id === submissionId 
        ? { ...s, status: "graded", grade: parseInt(gradeInput), feedback: feedbackInput }
        : s
    ));
    setSelectedSubmission(null);
    setGradeInput("");
    setFeedbackInput("");
  };

  const getPlagiarismColor = (score) => {
    if (score === null) return "text-slate-400";
    if (score <= 20) return "text-green-600";
    if (score <= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getPlagiarismBg = (score) => {
    if (score === null) return "bg-slate-100";
    if (score <= 20) return "bg-green-100";
    if (score <= 40) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)]  bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Submissions</h1>
          <p className="text-sm text-slate-500 mt-1">View, grade, and provide feedback on student submissions</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm transition-colors">
            ⚡ Bulk Grade
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors">
            📥 Export Grades
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        {[
          { label: "Total", value: stats.total, color: "bg-slate-50 border-slate-200 text-slate-700" },
          { label: "Submitted", value: stats.submitted, color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Graded", value: stats.graded, color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Not Submitted", value: stats.notSubmitted, color: "bg-red-50 border-red-200 text-red-700" },
          { label: "Late", value: stats.late, color: "bg-orange-50 border-orange-200 text-orange-700" },
          { label: "Plagiarism", value: stats.plagiarism, color: "bg-purple-50 border-purple-200 text-purple-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-3 rounded-lg border ${stat.color}`}>
            <p className="text-xs font-medium opacity-80">{stat.label}</p>
            <p className="text-2xl font-bold mt-0.5">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {["all", "submitted", "graded", "not_submitted"].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filterStatus === status ? "bg-blue-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {status === "all" ? "All" : status === "not_submitted" ? "Not Submitted" : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Submissions List */}
        <div className="flex-1 bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Student</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Submitted</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Plagiarism</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Grade</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSubmissions.map(submission => (
                  <tr 
                    key={submission.id} 
                    className={`hover:bg-slate-50 cursor-pointer ${selectedSubmission?.id === submission.id ? "bg-blue-50" : ""} ${submission.isLate ? "bg-orange-50/50" : ""}`}
                    onClick={() => {
                      setSelectedSubmission(submission);
                      setGradeInput(submission.grade?.toString() || "");
                      setFeedbackInput(submission.feedback || "");
                    }}
                  >
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-800">{submission.studentName}</p>
                      <p className="text-xs text-slate-500">{submission.studentId}</p>
                    </td>
                    <td className="px-4 py-3">
                      {submission.submittedAt ? (
                        <div>
                          <p className="text-sm text-slate-600">{submission.submittedAt.split(' ')[0]}</p>
                          <p className="text-xs text-slate-400">{submission.submittedAt.split(' ')[1]}</p>
                          {submission.isLate && <span className="text-xs text-red-500 font-medium">⚠️ Late</span>}
                        </div>
                      ) : (
                        <span className="text-sm text-red-500">Not submitted</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {submission.plagiarismScore !== null ? (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getPlagiarismBg(submission.plagiarismScore)} ${getPlagiarismColor(submission.plagiarismScore)}`}>
                          {submission.plagiarismScore}%
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {submission.grade !== null ? (
                        <span className="text-sm font-bold text-slate-800">{submission.grade}</span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        submission.status === "graded" ? "bg-green-100 text-green-700" :
                        submission.status === "submitted" ? "bg-blue-100 text-blue-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {submission.status === "not_submitted" ? "Missing" : submission.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {submission.status === "submitted" && (
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Grade</button>
                      )}
                      {submission.status === "graded" && (
                        <button className="text-xs text-slate-500 hover:text-slate-700 font-medium">View</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grading Panel */}
        <div className="w-96 bg-white rounded-lg border border-slate-200 flex-shrink-0">
          {!selectedSubmission ? (
            <div className="p-12 text-center text-slate-400">
              <span className="text-4xl block mb-3">📝</span>
              <p className="text-sm">Select a submission to grade</p>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-700">{selectedSubmission.studentName}</h3>
                <p className="text-xs text-slate-500">{selectedSubmission.studentId}</p>
              </div>
              
              <div className="p-4 flex-1 overflow-y-auto">
                {/* File Info */}
                {selectedSubmission.file && (
                  <div className="bg-slate-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        📄
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700">{selectedSubmission.file}</p>
                        <p className="text-xs text-slate-500">{selectedSubmission.fileSize}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">📥</button>
                    </div>
                  </div>
                )}

                {/* Plagiarism Warning */}
                {selectedSubmission.plagiarismScore > 30 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 text-red-700">
                      <span>⚠️</span>
                      <span className="text-sm font-bold">High Plagiarism: {selectedSubmission.plagiarismScore}%</span>
                    </div>
                    <p className="text-xs text-red-600 mt-1">Review carefully before grading</p>
                  </div>
                )}

                {/* Grade Input */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Grade (out of 100)</label>
                  <input
                    type="number"
                    value={gradeInput}
                    onChange={(e) => setGradeInput(e.target.value)}
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter grade..."
                  />
                </div>

                {/* Feedback */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Feedback</label>
                  <textarea
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Provide feedback to the student..."
                  />
                </div>

                {/* Rubric Quick Access */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                  <p className="text-xs font-medium text-purple-700 mb-2">📏 Quick Rubric</p>
                  <div className="grid grid-cols-2 gap-2">
                    {["Excellent (90-100)", "Good (75-89)", "Average (60-74)", "Poor (0-59)"].map((label, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          const grades = [95, 82, 67, 45];
                          setGradeInput(grades[i].toString());
                        }}
                        className="text-xs px-2 py-1.5 bg-white border border-purple-200 rounded-md hover:bg-purple-100 text-purple-700 transition-colors"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Previous Feedback */}
                {selectedSubmission.feedback && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-xs font-medium text-green-700 mb-1">Previous Feedback</p>
                    <p className="text-sm text-green-800">{selectedSubmission.feedback}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-slate-200 flex gap-2">
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="flex-1 px-3 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 text-sm font-medium"
                >
                  Cancel
                </button>
                {selectedSubmission.status === "submitted" && (
                  <button
                    onClick={() => handleGrade(selectedSubmission.id)}
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
                    disabled={!gradeInput}
                  >
                    ✅ Submit Grade
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}