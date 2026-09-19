"use client";
import { useState } from "react";

const mockAssignments = [
  { id: 1, title: "Algorithm Design Assignment", course: "CSE-201", type: "individual", dueDate: "2024-01-20", totalMarks: 100, submissions: 45, totalStudents: 60, status: "active", lateSubmission: true, rubricId: "RUB-001" },
  { id: 2, title: "Database Design Project", course: "CSE-301", type: "group", dueDate: "2024-01-25", totalMarks: 150, submissions: 12, totalStudents: 45, status: "active", lateSubmission: false, rubricId: "RUB-002" },
  { id: 3, title: "Machine Learning Lab Report", course: "CSE-401", type: "individual", dueDate: "2024-02-01", totalMarks: 50, submissions: 0, totalStudents: 60, status: "draft", lateSubmission: true, rubricId: null },
  { id: 4, title: "Web Development Project", course: "CSE-302", type: "group", dueDate: "2024-01-10", totalMarks: 200, submissions: 38, totalStudents: 40, status: "completed", lateSubmission: false, rubricId: "RUB-003" },
  { id: 5, title: "Data Structures Homework 5", course: "CSE-102", type: "individual", dueDate: "2024-01-05", totalMarks: 30, submissions: 55, totalStudents: 58, status: "completed", lateSubmission: true, rubricId: "RUB-004" },
];

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [formData, setFormData] = useState({
    title: "", course: "", type: "individual", dueDate: "", totalMarks: 100, lateSubmission: true, instructions: "", fileTypes: "pdf,doc,docx,zip"
  });

  const filteredAssignments = assignments.filter(a => {
    const statusMatch = filterStatus === "all" || a.status === filterStatus;
    const typeMatch = filterType === "all" || a.type === filterType;
    return statusMatch && typeMatch;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAssignment = {
      id: assignments.length + 1,
      ...formData,
      submissions: 0,
      totalStudents: 60,
      status: "draft",
      rubricId: null
    };
    setAssignments([newAssignment, ...assignments]);
    setFormData({ title: "", course: "", type: "individual", dueDate: "", totalMarks: 100, lateSubmission: true, instructions: "", fileTypes: "pdf,doc,docx,zip" });
    setShowForm(false);
  };

  const deleteAssignment = (id) => {
    if (confirm("Are you sure you want to delete this assignment?")) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setAssignments(assignments.map(a => {
      if (a.id === id) {
        const newStatus = a.status === "draft" ? "active" : a.status === "active" ? "completed" : "draft";
        return { ...a, status: newStatus };
      }
      return a;
    }));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "draft": return "bg-yellow-100 text-yellow-700";
      case "completed": return "bg-slate-100 text-slate-700";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)]  bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Assignment Management</h1>
          <p className="text-sm text-slate-500 mt-1">Create, manage, and track assignments</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors"
        >
          {showForm ? "✕ Cancel" : "+ New Assignment"}
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6 shadow-sm">
          <h3 className="font-bold text-slate-700 mb-4">Create New Assignment</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-500 mb-1">Assignment Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Algorithm Design Assignment 4"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Course *</label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Course</option>
                  <option value="CSE-101">CSE-101: Introduction to Programming</option>
                  <option value="CSE-102">CSE-102: Data Structures</option>
                  <option value="CSE-201">CSE-201: Algorithm Design</option>
                  <option value="CSE-301">CSE-301: Database Systems</option>
                  <option value="CSE-401">CSE-401: Machine Learning</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="individual">Individual</option>
                  <option value="group">Group</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Due Date *</label>
                <input
                  type="datetime-local"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Total Marks *</label>
                <input
                  type="number"
                  value={formData.totalMarks}
                  onChange={(e) => setFormData({...formData, totalMarks: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Allowed File Types</label>
                <input
                  type="text"
                  value={formData.fileTypes}
                  onChange={(e) => setFormData({...formData, fileTypes: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="pdf,doc,docx,zip"
                />
              </div>
              <div className="flex items-center gap-2 pt-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.lateSubmission}
                    onChange={(e) => setFormData({...formData, lateSubmission: e.target.checked})}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Allow Late Submission</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Instructions</label>
              <textarea
                value={formData.instructions}
                onChange={(e) => setFormData({...formData, instructions: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write detailed instructions for students..."
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium text-sm">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
                💾 Save as Draft
              </button>
              <button type="button" onClick={(e) => { setFormData({...formData, status: "active"}); }} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm">
                🚀 Publish Now
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-1">
          {["all", "active", "draft", "completed"].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filterStatus === status ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-1">
          {["all", "individual", "group"].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filterType === type ? "bg-purple-600 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssignments.map(assignment => {
          const submissionRate = Math.round((assignment.submissions / assignment.totalStudents) * 100);
          const isOverdue = new Date(assignment.dueDate) < new Date() && assignment.status === "active";
          
          return (
            <div key={assignment.id} className={`bg-white rounded-lg border ${isOverdue ? "border-red-200" : "border-slate-200"} overflow-hidden hover:shadow-md transition-shadow`}>
              <div className={`p-4 ${isOverdue ? "bg-red-50" : ""}`}>
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(assignment.status)}`}>
                    {assignment.status}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => toggleStatus(assignment.id)}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 bg-blue-50 rounded"
                    >
                      {assignment.status === "draft" ? "Activate" : assignment.status === "active" ? "Close" : "Reopen"}
                    </button>
                    <button
                      onClick={() => deleteAssignment(assignment.id)}
                      className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 bg-red-50 rounded"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                <h3 className="font-bold text-slate-800 mb-2">{assignment.title}</h3>
                
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">📚</span>
                    <span>{assignment.course}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">📅</span>
                    <span className={isOverdue ? "text-red-600 font-medium" : ""}>
                      {isOverdue && "⚠️ "}{assignment.dueDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">👥</span>
                    <span>{assignment.type === "group" ? "Group" : "Individual"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">💯</span>
                    <span>{assignment.totalMarks} marks</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Submissions: {assignment.submissions}/{assignment.totalStudents}</span>
                    <span>{submissionRate}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        submissionRate === 100 ? "bg-green-500" : 
                        submissionRate > 50 ? "bg-blue-500" : 
                        submissionRate > 0 ? "bg-yellow-500" : "bg-slate-300"
                      }`}
                      style={{ width: `${submissionRate}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <a href="/admin/lms/submissions" className="flex-1 text-center px-3 py-2 bg-blue-50 text-blue-700 rounded-md text-xs font-medium hover:bg-blue-100 transition-colors">
                    📥 View Submissions
                  </a>
                  {assignment.rubricId && (
                    <a href="/admin/lms/rubric" className="px-3 py-2 bg-purple-50 text-purple-700 rounded-md text-xs font-medium hover:bg-purple-100 transition-colors">
                      📏 Rubric
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}