"use client";
import { useState } from "react";

const mockDiscussions = [
  {
    id: 1,
    student: "Imran Ahmed",
    studentId: "STU-001",
    course: "CSE-401",
    chapter: "Supervised Learning",
    question: "How do we handle overfitting in neural networks? I tried reducing the learning rate but it didn't help much.",
    timestamp: "2024-01-20 14:30",
    replies: [
      { id: 1, author: "Dr. Ali", role: "teacher", text: "Good question! There are several techniques: 1) Dropout layers, 2) L2 regularization, 3) Data augmentation, 4) Early stopping. Try implementing dropout first.", timestamp: "2024-01-20 15:00", isPinned: true },
      { id: 2, author: "Susmita Das", role: "student", text: "I also found that batch normalization helps a lot with overfitting.", timestamp: "2024-01-20 15:30", isPinned: false },
    ],
    isResolved: false,
    isPinned: true
  },
  {
    id: 2,
    student: "Rahim Uddin",
    studentId: "STU-003",
    course: "CSE-102",
    chapter: "Trees",
    question: "What is the difference between BFS and DFS? When should we use which one?",
    timestamp: "2024-01-19 10:00",
    replies: [
      { id: 3, author: "Dr. Karim", role: "teacher", text: "BFS explores level by level (uses queue), DFS goes deep first (uses stack). Use BFS for shortest path, DFS for finding connected components or checking cycles.", timestamp: "2024-01-19 11:00", isPinned: false },
    ],
    isResolved: true,
    isPinned: false
  },
  {
    id: 3,
    student: "Fatima Begum",
    studentId: "STU-005",
    course: "CSE-301",
    chapter: "SQL Joins",
    question: "Can someone explain the difference between INNER JOIN and LEFT JOIN with an example?",
    timestamp: "2024-01-20 09:00",
    replies: [],
    isResolved: false,
    isPinned: false
  },
];

export default function DiscussionPage() {
  const [discussions, setDiscussions] = useState(mockDiscussions);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [newReply, setNewReply] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredDiscussions = filterStatus === "all"
    ? discussions
    : discussions.filter(d => filterStatus === "resolved" ? d.isResolved : !d.isResolved);

  const stats = {
    total: discussions.length,
    resolved: discussions.filter(d => d.isResolved).length,
    unanswered: discussions.filter(d => d.replies.length === 0).length,
    pinned: discussions.filter(d => d.isPinned).length,
  };

  const addReply = () => {
    if (!newReply || !selectedDiscussion) return;
    const reply = {
      id: Date.now(),
      author: "Dr. Ali",
      role: "teacher",
      text: newReply,
      timestamp: new Date().toLocaleString(),
      isPinned: false
    };
    const updatedDiscussion = {
      ...selectedDiscussion,
      replies: [...selectedDiscussion.replies, reply]
    };
    setSelectedDiscussion(updatedDiscussion);
    setDiscussions(discussions.map(d => d.id === updatedDiscussion.id ? updatedDiscussion : d));
    setNewReply("");
  };

  const togglePin = (discussionId) => {
    setDiscussions(discussions.map(d =>
      d.id === discussionId ? { ...d, isPinned: !d.isPinned } : d
    ));
    if (selectedDiscussion?.id === discussionId) {
      setSelectedDiscussion(prev => ({ ...prev, isPinned: !prev.isPinned }));
    }
  };

  const toggleResolve = (discussionId) => {
    setDiscussions(discussions.map(d =>
      d.id === discussionId ? { ...d, isResolved: !d.isResolved } : d
    ));
    if (selectedDiscussion?.id === discussionId) {
      setSelectedDiscussion(prev => ({ ...prev, isResolved: !prev.isResolved }));
    }
  };

  const togglePinReply = (discussionId, replyId) => {
    setDiscussions(discussions.map(d => {
      if (d.id !== discussionId) return d;
      return {
        ...d,
        replies: d.replies.map(r => r.id === replyId ? { ...r, isPinned: !r.isPinned } : r)
      };
    }));
    if (selectedDiscussion?.id === discussionId) {
      setSelectedDiscussion(prev => ({
        ...prev,
        replies: prev.replies.map(r => r.id === replyId ? { ...r, isPinned: !r.isPinned } : r)
      }));
    }
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Discussion & Q/A</h1>
          <p className="text-sm text-slate-500 mt-1">Student questions, teacher replies, and threaded discussions</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Questions", value: stats.total, color: "bg-slate-50 border-slate-200 text-slate-700" },
          { label: "Resolved", value: stats.resolved, color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Unanswered", value: stats.unanswered, color: "bg-red-50 border-red-200 text-red-700" },
          { label: "Pinned", value: stats.pinned, color: "bg-blue-50 border-blue-200 text-blue-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-lg border ${stat.color}`}>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {["all", "unresolved", "resolved"].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filterStatus === status ? "bg-blue-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Discussion List */}
        <div className="flex-1 space-y-3">
          {/* Pinned First */}
          {filteredDiscussions.filter(d => d.isPinned).map(discussion => (
            <div
              key={discussion.id}
              onClick={() => setSelectedDiscussion(discussion)}
              className={`bg-white rounded-lg border p-4 cursor-pointer hover:shadow-sm transition-shadow ${selectedDiscussion?.id === discussion.id ? "border-blue-500 ring-1 ring-blue-500" : "border-slate-200"}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold flex-shrink-0">
                  {discussion.student.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {discussion.isPinned && <span className="text-xs">📌</span>}
                    {discussion.isResolved && <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-medium">✓ Resolved</span>}
                    {discussion.replies.length === 0 && <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-[10px] font-medium">No Reply</span>}
                  </div>
                  <p className="text-sm font-medium text-slate-800">{discussion.question}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                    <span>{discussion.student}</span>
                    <span>•</span>
                    <span>{discussion.course}</span>
                    <span>•</span>
                    <span>{discussion.timestamp}</span>
                    <span>•</span>
                    <span>💬 {discussion.replies.length} replies</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Unpinned */}
          {filteredDiscussions.filter(d => !d.isPinned).map(discussion => (
            <div
              key={discussion.id}
              onClick={() => setSelectedDiscussion(discussion)}
              className={`bg-white rounded-lg border p-4 cursor-pointer hover:shadow-sm transition-shadow ${selectedDiscussion?.id === discussion.id ? "border-blue-500 ring-1 ring-blue-500" : "border-slate-200"}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold flex-shrink-0">
                  {discussion.student.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {discussion.isResolved && <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-medium">✓ Resolved</span>}
                    {discussion.replies.length === 0 && <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-[10px] font-medium">No Reply</span>}
                  </div>
                  <p className="text-sm font-medium text-slate-800">{discussion.question}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                    <span>{discussion.student}</span>
                    <span>•</span>
                    <span>{discussion.course} - {discussion.chapter}</span>
                    <span>•</span>
                    <span>{discussion.timestamp}</span>
                    <span>•</span>
                    <span>💬 {discussion.replies.length}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reply Panel */}
        <div className="w-96 bg-white rounded-lg border border-slate-200 flex-shrink-0 h-fit">
          {!selectedDiscussion ? (
            <div className="p-12 text-center text-slate-400">
              <span className="text-4xl block mb-3">💬</span>
              <p className="text-sm">Select a question</p>
            </div>
          ) : (
            <div>
              <div className="p-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-700 text-sm">Replies ({selectedDiscussion.replies.length})</h3>
                  <div className="flex gap-1">
                    <button
                      onClick={() => togglePin(selectedDiscussion.id)}
                      className={`text-xs px-2 py-1 rounded ${selectedDiscussion.isPinned ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"}`}
                    >
                      📌 Pin
                    </button>
                    <button
                      onClick={() => toggleResolve(selectedDiscussion.id)}
                      className={`text-xs px-2 py-1 rounded ${selectedDiscussion.isResolved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {selectedDiscussion.isResolved ? "✓ Resolved" : "Mark Resolved"}
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-700 mt-2">{selectedDiscussion.question}</p>
                <p className="text-xs text-slate-500 mt-1">by {selectedDiscussion.student} • {selectedDiscussion.timestamp}</p>
              </div>

              {/* Replies */}
              <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
                {selectedDiscussion.replies.length === 0 ? (
                  <div className="p-6 text-center text-slate-400">
                    <p className="text-sm">No replies yet</p>
                  </div>
                ) : (
                  selectedDiscussion.replies.map(reply => (
                    <div key={reply.id} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${reply.role === "teacher" ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-600"}`}>
                            {reply.author.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-slate-800">{reply.author}</span>
                          {reply.role === "teacher" && <span className="text-[10px] px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded">Teacher</span>}
                        </div>
                        <button
                          onClick={() => togglePinReply(selectedDiscussion.id, reply.id)}
                          className={`text-xs ${reply.isPinned ? "text-blue-600" : "text-slate-300 hover:text-slate-500"}`}
                        >
                          📌
                        </button>
                      </div>
                      <p className="text-sm text-slate-700 pl-8">{reply.text}</p>
                      <p className="text-xs text-slate-400 pl-8 mt-1">{reply.timestamp}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Reply Input */}
              <div className="p-4 border-t border-slate-200">
                <textarea
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Write your reply..."
                />
                <button
                  onClick={addReply}
                  disabled={!newReply}
                  className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium disabled:opacity-50"
                >
                  💬 Send Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}