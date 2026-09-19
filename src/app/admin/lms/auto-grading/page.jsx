"use client";
import { useState } from "react";

const mockGradingJobs = [
  { id: 1, type: "MCQ", title: "Data Structures Quiz 5", totalSubmissions: 45, graded: 45, status: "completed", startTime: "2024-01-20 10:35", endTime: "2024-01-20 10:35" },
  { id: 2, type: "Coding", title: "Binary Search Implementation", totalSubmissions: 42, graded: 38, status: "running", startTime: "2024-01-22 15:00", endTime: null, progress: 90 },
  { id: 3, type: "Plagiarism", title: "Algorithm Assignment 3", totalSubmissions: 45, graded: 0, status: "queued", startTime: null, endTime: null },
  { id: 4, type: "Rubric", title: "Database Design Project", totalSubmissions: 12, graded: 0, status: "failed", startTime: "2024-01-21 09:00", endTime: "2024-01-21 09:01", error: "Rubric not assigned to this assignment" },
];

export default function AutoGradingPage() {
  const [jobs, setJobs] = useState(mockGradingJobs);
  const [showNewJob, setShowNewJob] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState("mcq");
  const [selectedAssignment, setSelectedAssignment] = useState("");

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700";
      case "running": return "bg-blue-100 text-blue-700";
      case "queued": return "bg-yellow-100 text-yellow-700";
      case "failed": return "bg-red-100 text-red-700";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "MCQ": return "📊";
      case "Coding": return "💻";
      case "Plagiarism": return "🔍";
      case "Rubric": return "📏";
      default: return "⚡";
    }
  };

  const startGradingJob = () => {
    if (!selectedAssignment) return;
    const newJob = {
      id: jobs.length + 1,
      type: selectedJobType.toUpperCase(),
      title: selectedAssignment,
      totalSubmissions: 60,
      graded: 0,
      status: "queued",
      startTime: null,
      endTime: null,
      progress: 0
    };
    setJobs([newJob, ...jobs]);
    setShowNewJob(false);
    setSelectedAssignment("");
    
    // Simulate job progress
    setTimeout(() => {
      setJobs(prev => prev.map(j => j.id === newJob.id ? { ...j, status: "running", startTime: new Date().toISOString() } : j));
    }, 2000);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(interval);
        setJobs(prev => prev.map(j => j.id === newJob.id ? { ...j, status: "completed", graded: 60, progress: 100, endTime: new Date().toISOString() } : j));
      } else {
        setJobs(prev => prev.map(j => j.id === newJob.id ? { ...j, progress, graded: Math.round((progress / 100) * 60) } : j));
      }
    }, 500);
  };

  const stats = {
    total: jobs.length,
    completed: jobs.filter(j => j.status === "completed").length,
    running: jobs.filter(j => j.status === "running").length,
    queued: jobs.filter(j => j.status === "queued").length,
    failed: jobs.filter(j => j.status === "failed").length,
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)]  bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Auto Grading</h1>
          <p className="text-sm text-slate-500 mt-1">Automated grading for MCQs, coding tasks, and plagiarism detection</p>
        </div>
        <button
          onClick={() => setShowNewJob(!showNewJob)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors"
        >
          {showNewJob ? "✕ Cancel" : "+ New Grading Job"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { label: "Total Jobs", value: stats.total, icon: "📋", color: "bg-slate-50 border-slate-200 text-slate-700" },
          { label: "Completed", value: stats.completed, icon: "✅", color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Running", value: stats.running, icon: "⚡", color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Queued", value: stats.queued, icon: "⏳", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
          { label: "Failed", value: stats.failed, icon: "❌", color: "bg-red-50 border-red-200 text-red-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-lg border ${stat.color}`}>
            <span className="text-xl">{stat.icon}</span>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className="text-xs opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* New Job Form */}
      {showNewJob && (
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6 shadow-sm">
          <h3 className="font-bold text-slate-700 mb-4">Create New Grading Job</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Grading Type *</label>
              <select
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="mcq">MCQ Auto Grading</option>
                <option value="coding">Coding Task Evaluation</option>
                <option value="plagiarism">Plagiarism Detection</option>
                <option value="rubric">Rubric-Based Grading</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Assignment *</label>
              <select
                value={selectedAssignment}
                onChange={(e) => setSelectedAssignment(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Assignment</option>
                <option value="Data Structures Quiz 5">Data Structures Quiz 5</option>
                <option value="Binary Search Implementation">Binary Search Implementation</option>
                <option value="Algorithm Assignment 3">Algorithm Assignment 3</option>
                <option value="Database Design Project">Database Design Project</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={startGradingJob}
                disabled={!selectedAssignment}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-sm disabled:opacity-50"
              >
                🚀 Start Grading
              </button>
            </div>
          </div>
          
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>💡 Note:</strong> {selectedJobType === "mcq" && "MCQ grading will automatically compare answers and calculate scores based on correct answers and negative marking settings."}
              {selectedJobType === "coding" && "Coding tasks will be evaluated against all test cases. Each passed test case contributes equally to the total score."}
              {selectedJobType === "plagiarism" && "Plagiarism detection uses AI to compare submissions and identify similar code/text patterns."}
              {selectedJobType === "rubric" && "Rubric grading requires a rubric to be assigned to the assignment. AI will pre-fill scores based on rubric criteria."}
            </p>
          </div>
        </div>
      )}

      {/* Jobs Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-700">Grading Jobs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Job</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Progress</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Started</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Completed</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.map(job => (
                <tr key={job.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-800">{job.title}</p>
                    <p className="text-xs text-slate-500">{job.graded}/{job.totalSubmissions} graded</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                      {getTypeIcon(job.type)} {job.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 w-48">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            job.status === "completed" ? "bg-green-500" :
                            job.status === "running" ? "bg-blue-500 animate-pulse" :
                            job.status === "failed" ? "bg-red-500" : "bg-slate-300"
                          }`}
                          style={{ width: `${job.progress || 0}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-500 w-10">{job.progress || 0}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {job.startTime ? new Date(job.startTime).toLocaleTimeString() : "—"}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {job.endTime ? new Date(job.endTime).toLocaleTimeString() : "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {job.status === "running" && (
                      <button className="text-xs text-red-600 hover:text-red-700 font-medium">⏹️ Stop</button>
                    )}
                    {job.status === "failed" && (
                      <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">🔄 Retry</button>
                    )}
                    {job.status === "completed" && (
                      <button className="text-xs text-green-600 hover:text-green-700 font-medium">📊 View Results</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {jobs.some(j => j.error) && (
          <div className="p-4 bg-red-50 border-t border-red-200">
            <p className="text-sm text-red-700">
              <strong>⚠️ Error:</strong> {jobs.find(j => j.error)?.error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}