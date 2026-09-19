"use client";
import { useState } from "react";

const mockResults = [
  { id: 1, studentId: "STU-001", studentName: "Imran Ahmed", fileName: "algorithm_assign3.pdf", similarityScore: 5, status: "clean", matchedWith: [], sources: [], submittedAt: "2024-01-18 14:30", wordCount: 2500 },
  { id: 2, studentId: "STU-002", studentName: "Susmita Das", fileName: "susmita_algo3.zip", similarityScore: 12, status: "suspicious", matchedWith: ["STU-007 (Priya Sharma) - 15%"], sources: ["StackOverflow - 8%"], submittedAt: "2024-01-19 23:45", wordCount: 3200 },
  { id: 3, studentId: "STU-003", studentName: "Rahim Uddin", fileName: "rahim_assignment3.pdf", similarityScore: 45, status: "plagiarized", matchedWith: ["STU-008 (Arif Islam) - 42%", "STU-009 (Rina Akter) - 38%"], sources: ["GeeksforGeeks - 25%", "GitHub Gist - 15%"], submittedAt: "2024-01-21 02:15", wordCount: 2800 },
  { id: 4, studentId: "STU-005", studentName: "Fatima Begum", fileName: "fatima_algo3.pdf", similarityScore: 8, status: "clean", matchedWith: [], sources: [], submittedAt: "2024-01-17 10:00", wordCount: 2100 },
  { id: 5, studentId: "STU-006", studentName: "Nasir Khan", fileName: "nasir_final.pdf", similarityScore: 15, status: "suspicious", matchedWith: [], sources: ["Wikipedia - 12%"], submittedAt: "2024-01-18 09:30", wordCount: 1900 },
  { id: 6, studentId: "STU-007", studentName: "Priya Sharma", fileName: "priya_algo.pdf", similarityScore: 38, status: "plagiarized", matchedWith: ["STU-003 (Rahim Uddin) - 42%", "STU-008 (Arif Islam) - 35%"], sources: ["GeeksforGeeks - 22%"], submittedAt: "2024-01-20 16:00", wordCount: 2600 },
  { id: 7, studentId: "STU-008", studentName: "Arif Islam", fileName: "arif_algo3.pdf", similarityScore: 42, status: "plagiarized", matchedWith: ["STU-003 (Rahim Uddin) - 42%", "STU-007 (Priya Sharma) - 35%"], sources: ["GeeksforGeeks - 20%", "Tutorialspoint - 12%"], submittedAt: "2024-01-19 11:30", wordCount: 2750 },
  { id: 8, studentId: "STU-009", studentName: "Rina Akter", fileName: "rina_assign.pdf", similarityScore: 35, status: "plagiarized", matchedWith: ["STU-003 (Rahim Uddin) - 38%"], sources: ["GeeksforGeeks - 18%"], submittedAt: "2024-01-20 20:15", wordCount: 2400 },
];

export default function PlagiarismPage() {
  const [results, setResults] = useState(mockResults);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [filterStatus, setFilterStatus] = useState("all");
  const [threshold, setThreshold] = useState(30);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState("Algorithm Assignment 3");
  const [scanHistory, setScanHistory] = useState([
    { id: 1, assignment: "Database Project", date: "2024-01-15 10:30", totalScanned: 45, plagiarized: 3, status: "completed" },
    { id: 2, assignment: "Web Dev Project", date: "2024-01-12 14:00", totalScanned: 38, plagiarized: 1, status: "completed" },
  ]);
  const [markAsReviewed, setMarkAsReviewed] = useState({});

  const filteredResults = filterStatus === "all"
    ? results
    : results.filter(r => r.status === filterStatus);

  const stats = {
    total: results.length,
    clean: results.filter(r => r.status === "clean").length,
    suspicious: results.filter(r => r.status === "suspicious").length,
    plagiarized: results.filter(r => r.status === "plagiarized").length,
    avgScore: (results.reduce((sum, r) => sum + r.similarityScore, 0) / results.length).toFixed(1),
  };

  const startScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setSelectedResult(null);

    const steps = [5, 12, 20, 30, 42, 55, 65, 75, 85, 92, 100];
    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setScanProgress(step);
    }

    // Add to history
    const newHistoryItem = {
      id: scanHistory.length + 1,
      assignment: selectedAssignment,
      date: new Date().toLocaleString(),
      totalScanned: results.length,
      plagiarized: stats.plagiarized,
      status: "completed"
    };
    setScanHistory([newHistoryItem, ...scanHistory]);

    setIsScanning(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "clean": return "bg-green-100 text-green-700";
      case "suspicious": return "bg-yellow-100 text-yellow-700";
      case "plagiarized": return "bg-red-100 text-red-700";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "clean": return "✅";
      case "suspicious": return "⚠️";
      case "plagiarized": return "🚨";
      default: return "📄";
    }
  };

  const getScoreColor = (score) => {
    if (score <= 20) return "text-green-600";
    if (score <= threshold) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score) => {
    if (score <= 20) return "bg-green-500";
    if (score <= threshold) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreRingColor = (score) => {
    if (score <= 20) return "stroke-green-500";
    if (score <= threshold) return "stroke-yellow-500";
    return "stroke-red-500";
  };

  const toggleReviewed = (id) => {
    setMarkAsReviewed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const exportReport = () => {
    alert(`Plagiarism Report Generated!\n\nAssignment: ${selectedAssignment}\nTotal Scanned: ${results.length}\nPlagiarized: ${stats.plagiarized}\nThreshold: ${threshold}%\n\nReport will be downloaded as PDF.`);
    setShowReportModal(false);
  };

  const sendWarning = (studentName) => {
    alert(`Warning email sent to ${studentName} regarding plagiarism detection.`);
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)]  bg-slate-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Plagiarism Detection</h1>
          <p className="text-sm text-slate-500 mt-1">AI-powered plagiarism detection for assignments</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowReportModal(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-sm transition-colors"
          >
            📊 Generate Report
          </button>
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5">
            <label className="text-xs text-slate-500 whitespace-nowrap">Threshold:</label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(parseInt(e.target.value) || 30)}
              className="w-10 text-sm text-center border-none outline-none"
              min="0"
              max="100"
            />
            <span className="text-xs text-slate-400">%</span>
          </div>
          <button
            onClick={startScan}
            disabled={isScanning}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isScanning ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                Scanning...
              </>
            ) : (
              "🔍 Start Scan"
            )}
          </button>
        </div>
      </div>

      {/* Scan Progress */}
      {isScanning && (
        <div className="bg-white rounded-lg border-2 border-red-200 p-5 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="animate-spin w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full"></div>
            <div>
              <span className="text-sm font-semibold text-red-700">Scanning submissions for plagiarism...</span>
              <p className="text-xs text-red-500 mt-0.5">Comparing with online sources and peer submissions</p>
            </div>
          </div>
          <div className="w-full bg-red-100 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-red-400 to-red-600 transition-all duration-500 ease-out"
              style={{ width: `${scanProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-red-600">Processing: {selectedAssignment}</span>
            <span className="text-xs font-medium text-red-700">{scanProgress}% complete</span>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: "Total Scanned", value: stats.total, icon: "📄", color: "bg-white border-slate-200", valueColor: "text-slate-700" },
          { label: "Clean (<20%)", value: stats.clean, icon: "✅", color: "bg-green-50 border-green-200", valueColor: "text-green-700" },
          { label: `Suspicious (20-${threshold}%)`, value: stats.suspicious, icon: "⚠️", color: "bg-yellow-50 border-yellow-200", valueColor: "text-yellow-700" },
          { label: `Plagiarized (>${threshold}%)`, value: stats.plagiarized, icon: "🚨", color: "bg-red-50 border-red-200", valueColor: "text-red-700" },
          { label: "Avg Similarity", value: `${stats.avgScore}%`, icon: "📊", color: "bg-purple-50 border-purple-200", valueColor: "text-purple-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-lg border ${stat.color} shadow-sm`}>
            <div className="flex items-center justify-between">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className={`text-3xl font-bold mt-2 ${stat.valueColor}`}>{stat.value}</p>
            <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Assignment Selection & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-500">Assignment:</label>
          <select
            value={selectedAssignment}
            onChange={(e) => setSelectedAssignment(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="Algorithm Assignment 3">Algorithm Assignment 3</option>
            <option value="Database Project">Database Project</option>
            <option value="Web Dev Project">Web Dev Project</option>
          </select>
        </div>
        
        <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-1">
          {[
            { key: "all", label: "All", count: stats.total },
            { key: "clean", label: "Clean", count: stats.clean },
            { key: "suspicious", label: "Suspicious", count: stats.suspicious },
            { key: "plagiarized", label: "Plagiarized", count: stats.plagiarized },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilterStatus(key)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filterStatus === key 
                  ? "bg-blue-600 text-white shadow" 
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Results Table */}
        <div className="flex-1 bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase w-8"></th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Student</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">File</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Similarity</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredResults.map(result => (
                  <tr
                    key={result.id}
                    className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                      selectedResult?.id === result.id ? "bg-blue-50 border-l-4 border-l-blue-500" : "border-l-4 border-l-transparent"
                    } ${result.status === "plagiarized" && !selectedResult ? "bg-red-50/40" : ""} ${markAsReviewed[result.id] ? "opacity-60" : ""}`}
                    onClick={() => setSelectedResult(result)}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={markAsReviewed[result.id] || false}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleReviewed(result.id);
                        }}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        title="Mark as reviewed"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          result.status === "clean" ? "bg-green-100 text-green-700" :
                          result.status === "suspicious" ? "bg-yellow-100 text-yellow-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {result.studentName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{result.studentName}</p>
                          <p className="text-xs text-slate-500">{result.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-slate-600 truncate max-w-[150px]">{result.fileName}</p>
                      <p className="text-xs text-slate-400">{result.wordCount} words</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 justify-center">
                        <div className="w-20 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                          <div
                            className={`h-2.5 rounded-full transition-all ${getScoreBg(result.similarityScore)}`}
                            style={{ width: `${result.similarityScore}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-bold min-w-[40px] ${getScoreColor(result.similarityScore)}`}>
                          {result.similarityScore}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(result.status)}`}>
                        {getStatusIcon(result.status)} {result.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button 
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                          title="View details"
                        >
                          👁️
                        </button>
                        {result.status === "plagiarized" && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              sendWarning(result.studentName);
                            }}
                            className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 bg-red-50 rounded hover:bg-red-100 transition-colors"
                            title="Send warning"
                          >
                            ⚠️
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer */}
          <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Showing {filteredResults.length} of {results.length} results
            </p>
            <div className="flex gap-2">
              <button className="text-xs text-slate-600 hover:text-slate-700 font-medium px-3 py-1.5 bg-white border border-slate-200 rounded-md hover:bg-slate-50">
                📥 Export CSV
              </button>
              <button className="text-xs text-slate-600 hover:text-slate-700 font-medium px-3 py-1.5 bg-white border border-slate-200 rounded-md hover:bg-slate-50">
                📧 Notify All Plagiarized
              </button>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="w-96 bg-white rounded-lg border border-slate-200 shadow-sm flex-shrink-0 h-fit">
          {!selectedResult ? (
            <div className="p-12 text-center text-slate-400">
              <span className="text-5xl block mb-4">🔍</span>
              <p className="text-sm font-medium">Select a student</p>
              <p className="text-xs mt-1">Click on any row to view detailed plagiarism analysis</p>
            </div>
          ) : (
            <div>
              {/* Panel Header */}
              <div className={`p-4 border-b border-slate-200 ${
                selectedResult.status === "plagiarized" ? "bg-red-50" :
                selectedResult.status === "suspicious" ? "bg-yellow-50" : "bg-green-50"
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                    selectedResult.status === "clean" ? "bg-green-200 text-green-800" :
                    selectedResult.status === "suspicious" ? "bg-yellow-200 text-yellow-800" :
                    "bg-red-200 text-red-800"
                  }`}>
                    {selectedResult.studentName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800">{selectedResult.studentName}</h3>
                    <p className="text-xs text-slate-500">{selectedResult.studentId}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedResult(null)}
                    className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center text-slate-400 shadow-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Score Ring */}
              <div className="p-6 flex flex-col items-center border-b border-slate-200">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="#e2e8f0" strokeWidth="8" fill="none" />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      className={getScoreRingColor(selectedResult.similarityScore)}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(selectedResult.similarityScore / 100) * 351.86} 351.86`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-bold ${getScoreColor(selectedResult.similarityScore)}`}>
                      {selectedResult.similarityScore}%
                    </span>
                    <span className="text-xs text-slate-500">Similarity</span>
                  </div>
                </div>
                <span className={`mt-3 px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(selectedResult.status)}`}>
                  {getStatusIcon(selectedResult.status)} {selectedResult.status.toUpperCase()}
                </span>
              </div>

              {/* File Info */}
              <div className="p-4 border-b border-slate-200">
                <h4 className="text-xs font-semibold text-slate-500 uppercase mb-3">File Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">File:</span>
                    <span className="text-slate-700 font-medium">{selectedResult.fileName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Words:</span>
                    <span className="text-slate-700">{selectedResult.wordCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Submitted:</span>
                    <span className="text-slate-700">{selectedResult.submittedAt}</span>
                  </div>
                </div>
              </div>

              {/* Peer Matches */}
              {selectedResult.matchedWith.length > 0 && (
                <div className="p-4 border-b border-slate-200">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase mb-3 flex items-center gap-1">
                    👥 Peer Matches
                  </h4>
                  <div className="space-y-2">
                    {selectedResult.matchedWith.map((match, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-orange-50 rounded-md border border-orange-200">
                        <span className="text-orange-500">🔗</span>
                        <span className="text-sm text-orange-800 flex-1">{match}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Online Sources */}
              {selectedResult.sources.length > 0 && (
                <div className="p-4 border-b border-slate-200">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase mb-3 flex items-center gap-1">
                    🌐 Online Sources
                  </h4>
                  <div className="space-y-2">
                    {selectedResult.sources.map((source, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-blue-50 rounded-md border border-blue-200">
                        <span className="text-blue-500">🔗</span>
                        <span className="text-sm text-blue-800 flex-1">{source}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="p-4 space-y-2">
                {selectedResult.status === "plagiarized" && (
                  <>
                    <button 
                      onClick={() => sendWarning(selectedResult.studentName)}
                      className="w-full px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <span>📧</span> Send Warning Email
                    </button>
                    <button className="w-full px-4 py-2.5 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 font-medium text-sm transition-colors flex items-center justify-center gap-2">
                      <span>📅</span> Schedule Meeting
                    </button>
                    <button className="w-full px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-medium text-sm transition-colors flex items-center justify-center gap-2">
                      <span>📄</span> Generate Report
                    </button>
                  </>
                )}
                {selectedResult.status === "suspicious" && (
                  <>
                    <button className="w-full px-4 py-2.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-medium text-sm transition-colors flex items-center justify-center gap-2">
                      <span>👤</span> Manual Review
                    </button>
                    <button className="w-full px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-medium text-sm transition-colors flex items-center justify-center gap-2">
                      <span>✅</span> Mark as Clean
                    </button>
                  </>
                )}
                {selectedResult.status === "clean" && (
                  <button className="w-full px-4 py-2.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-medium text-sm transition-colors flex items-center justify-center gap-2">
                    <span>✅</span> Verified - No Action Needed
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scan History */}
      <div className="mt-6 bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-bold text-slate-700">Scan History</h2>
          <button className="text-xs text-slate-500 hover:text-slate-700">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Date</th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Assignment</th>
                <th className="text-center px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Scanned</th>
                <th className="text-center px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Plagiarized</th>
                <th className="text-center px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {scanHistory.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-600">{item.date}</td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">{item.assignment}</td>
                  <td className="px-4 py-3 text-sm text-center text-slate-600">{item.totalScanned}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-sm font-bold text-red-600">{item.plagiarized}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Generate Plagiarism Report</h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Assignment</label>
                <input
                  type="text"
                  value={selectedAssignment}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-slate-50"
                  readOnly
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-slate-700">{results.length}</p>
                  <p className="text-xs text-slate-500">Total Scanned</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-red-700">{stats.plagiarized}</p>
                  <p className="text-xs text-red-600">Plagiarized</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Threshold Used</label>
                <div className="px-3 py-2 text-sm border border-slate-200 rounded-md bg-slate-50">
                  {threshold}%
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-2">Report Type</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="reportType" defaultChecked className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-slate-700">Summary Report (Overview)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="reportType" className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-slate-700">Detailed Report (With evidence)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="reportType" className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-slate-700">Individual Reports (Per student)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-2">Include in Report</label>
                <div className="flex flex-wrap gap-2">
                  {["Student Names", "Matched Sources", "Similarity Scores", "File Details", "Recommendations"].map(option => (
                    <label key={option} className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600" />
                      <span className="text-xs text-slate-600">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={exportReport}
                  className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-sm"
                >
                  📊 Generate & Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}