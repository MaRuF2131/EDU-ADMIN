"use client";
import { useState } from "react";

const mockCodingTasks = [
  {
    id: 1,
    title: "Binary Search Implementation",
    course: "CSE-102",
    language: "Python",
    difficulty: "Easy",
    dueDate: "2024-01-22",
    totalMarks: 50,
    submissions: 42,
    totalStudents: 58,
    status: "active",
    testCases: 5,
    timeLimit: "2 seconds",
    memoryLimit: "256 MB",
    starterCode: `def binary_search(arr, target):\n    # Your code here\n    pass`,
    testCasesList: [
      { input: "arr = [1, 3, 5, 7, 9], target = 5", expectedOutput: "2", isHidden: false },
      { input: "arr = [1, 3, 5, 7, 9], target = 10", expectedOutput: "-1", isHidden: false },
      { input: "arr = [], target = 5", expectedOutput: "-1", isHidden: true },
      { input: "arr = [5], target = 5", expectedOutput: "0", isHidden: true },
      { input: "arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target = 7", expectedOutput: "6", isHidden: true },
    ]
  },
  {
    id: 2,
    title: "Linked List Operations",
    course: "CSE-102",
    language: "C++",
    difficulty: "Medium",
    dueDate: "2024-01-28",
    totalMarks: 100,
    submissions: 15,
    totalStudents: 58,
    status: "active",
    testCases: 10,
    timeLimit: "3 seconds",
    memoryLimit: "512 MB",
    starterCode: `#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* next;\n};\n\n// Implement linked list operations here`,
    testCasesList: []
  },
  {
    id: 3,
    title: "Graph BFS/DFS",
    course: "CSE-201",
    language: "Python",
    difficulty: "Hard",
    dueDate: "2024-02-05",
    totalMarks: 150,
    submissions: 0,
    totalStudents: 45,
    status: "scheduled",
    testCases: 15,
    timeLimit: "5 seconds",
    memoryLimit: "1 GB",
    starterCode: `from collections import deque\n\ndef bfs(graph, start):\n    # Your code here\n    pass`,
    testCasesList: []
  },
];

export default function CodingPage() {
  const [tasks, setTasks] = useState(mockCodingTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTestCase, setNewTestCase] = useState({ input: "", expectedOutput: "", isHidden: true });
  const [newTask, setNewTask] = useState({
    title: "",
    course: "",
    language: "Python",
    difficulty: "Easy",
    dueDate: "",
    totalMarks: 50,
    timeLimit: "2 seconds",
    memoryLimit: "256 MB",
    starterCode: "",
    testCasesList: []
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Hard": return "bg-red-100 text-red-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const getLanguageIcon = (language) => {
    switch (language) {
      case "Python": return "🐍";
      case "C++": return "⚡";
      case "Java": return "☕";
      case "JavaScript": return "🟨";
      default: return "💻";
    }
  };

  const addTestCase = () => {
    if (!newTestCase.input || !newTestCase.expectedOutput) return;
    setNewTask({
      ...newTask,
      testCasesList: [...newTask.testCasesList, { ...newTestCase, id: newTask.testCasesList.length + 1 }],
      testCases: newTask.testCasesList.length + 1
    });
    setNewTestCase({ input: "", expectedOutput: "", isHidden: true });
  };

  const removeTestCase = (index) => {
    setNewTask({
      ...newTask,
      testCasesList: newTask.testCasesList.filter((_, i) => i !== index),
      testCases: newTask.testCasesList.length - 1
    });
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)]  bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Coding Assignments</h1>
          <p className="text-sm text-slate-500 mt-1">Create coding tasks with auto-test cases</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors"
        >
          {showCreateForm ? "✕ Cancel" : "+ New Coding Task"}
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6 shadow-sm">
          <h3 className="font-bold text-slate-700 mb-4">Create New Coding Task</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-500 mb-1">Task Title *</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Implement Binary Search"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Course *</label>
              <select
                value={newTask.course}
                onChange={(e) => setNewTask({...newTask, course: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="CSE-101">CSE-101</option>
                <option value="CSE-102">CSE-102</option>
                <option value="CSE-201">CSE-201</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Language *</label>
              <select
                value={newTask.language}
                onChange={(e) => setNewTask({...newTask, language: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Python">Python</option>
                <option value="C++">C++</option>
                <option value="Java">Java</option>
                <option value="JavaScript">JavaScript</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Difficulty *</label>
              <select
                value={newTask.difficulty}
                onChange={(e) => setNewTask({...newTask, difficulty: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Due Date *</label>
              <input
                type="datetime-local"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Total Marks *</label>
              <input
                type="number"
                value={newTask.totalMarks}
                onChange={(e) => setNewTask({...newTask, totalMarks: parseInt(e.target.value)})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Time Limit</label>
              <input
                type="text"
                value={newTask.timeLimit}
                onChange={(e) => setNewTask({...newTask, timeLimit: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2 seconds"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Memory Limit</label>
              <input
                type="text"
                value={newTask.memoryLimit}
                onChange={(e) => setNewTask({...newTask, memoryLimit: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="256 MB"
              />
            </div>
          </div>

          {/* Starter Code */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-slate-500 mb-1">Starter Code</label>
            <textarea
              value={newTask.starterCode}
              onChange={(e) => setNewTask({...newTask, starterCode: e.target.value})}
              rows={6}
              className="w-full px-3 py-2 text-sm font-mono border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-slate-900 text-green-400"
              placeholder="Provide starter code template..."
            />
          </div>

          {/* Test Cases */}
          <div className="border border-slate-200 rounded-lg p-4 mb-4">
            <h4 className="font-bold text-slate-700 text-sm mb-3">
              Test Cases ({newTask.testCasesList.length})
            </h4>
            
            {/* Add Test Case */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Input</label>
                <textarea
                  value={newTestCase.input}
                  onChange={(e) => setNewTestCase({...newTestCase, input: e.target.value})}
                  rows={2}
                  className="w-full px-3 py-2 text-sm font-mono border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="arr = [1, 2, 3], target = 2"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Expected Output</label>
                <textarea
                  value={newTestCase.expectedOutput}
                  onChange={(e) => setNewTestCase({...newTestCase, expectedOutput: e.target.value})}
                  rows={2}
                  className="w-full px-3 py-2 text-sm font-mono border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1"
                />
              </div>
              <div className="flex items-end gap-2">
                <label className="flex items-center gap-2 cursor-pointer mb-2">
                  <input
                    type="checkbox"
                    checked={newTestCase.isHidden}
                    onChange={(e) => setNewTestCase({...newTestCase, isHidden: e.target.checked})}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600"
                  />
                  <span className="text-xs text-slate-600">Hidden</span>
                </label>
                <button
                  onClick={addTestCase}
                  disabled={!newTestCase.input || !newTestCase.expectedOutput}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium disabled:opacity-50 mb-2"
                >
                  + Add
                </button>
              </div>
            </div>

            {/* Test Cases List */}
            {newTask.testCasesList.length > 0 && (
              <div className="space-y-2">
                {newTask.testCasesList.map((tc, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-md p-2 text-sm">
                    <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <div className="flex-1 font-mono text-xs">
                      <span className="text-slate-600">Input: {tc.input}</span>
                      <span className="mx-2 text-slate-400">→</span>
                      <span className="text-green-600">Output: {tc.expectedOutput}</span>
                    </div>
                    {tc.isHidden && <span className="text-xs text-slate-400">🔒 Hidden</span>}
                    <button onClick={() => removeTestCase(i)} className="text-red-500 hover:text-red-700">✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-end">
            <button onClick={() => setShowCreateForm(false)} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium text-sm">
              Cancel
            </button>
            <button
              onClick={() => {
                if (!newTask.title || newTask.testCasesList.length === 0) return;
                const task = {
                  id: tasks.length + 1,
                  ...newTask,
                  submissions: 0,
                  totalStudents: 60,
                  status: "draft",
                  testCasesList: newTask.testCasesList
                };
                setTasks([task, ...tasks]);
                setShowCreateForm(false);
              }}
              disabled={!newTask.title || newTask.testCasesList.length === 0}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm disabled:opacity-50"
            >
              🚀 Create Task
            </button>
          </div>
        </div>
      )}

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map(task => (
          <div key={task.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className={`px-4 py-2 flex items-center justify-between ${task.difficulty === "Easy" ? "bg-green-50" : task.difficulty === "Medium" ? "bg-yellow-50" : "bg-red-50"}`}>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(task.difficulty)}`}>
                {task.difficulty}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                {getLanguageIcon(task.language)} {task.language}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-800 mb-2">{task.title}</h3>
              <div className="space-y-1.5 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>📚 Course</span>
                  <span className="font-medium">{task.course}</span>
                </div>
                <div className="flex justify-between">
                  <span>📅 Due</span>
                  <span className="font-medium">{task.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>💯 Marks</span>
                  <span className="font-medium">{task.totalMarks}</span>
                </div>
                <div className="flex justify-between">
                  <span>🧪 Test Cases</span>
                  <span className="font-medium">{task.testCases}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>⏱️ {task.timeLimit}</span>
                  <span>💾 {task.memoryLimit}</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Submissions: {task.submissions}/{task.totalStudents}</span>
                  <span>{Math.round((task.submissions / task.totalStudents) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-blue-500"
                    style={{ width: `${(task.submissions / task.totalStudents) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setSelectedTask(task)}
                  className="flex-1 text-center px-3 py-2 bg-purple-50 text-purple-700 rounded-md text-xs font-medium hover:bg-purple-100"
                >
                  🧪 Test Cases
                </button>
                <button className="flex-1 text-center px-3 py-2 bg-green-50 text-green-700 rounded-md text-xs font-medium hover:bg-green-100">
                  📊 Results
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Test Cases Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="font-bold text-slate-800">{selectedTask.title} - Test Cases</h3>
              <button onClick={() => setSelectedTask(null)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
                ✕
              </button>
            </div>
            <div className="p-4">
              {selectedTask.testCasesList && selectedTask.testCasesList.length > 0 ? (
                <div className="space-y-3">
                  {selectedTask.testCasesList.map((tc, i) => (
                    <div key={i} className={`rounded-lg p-4 border ${tc.isHidden ? "border-slate-200 bg-slate-50" : "border-green-200 bg-green-50"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-slate-700">Test Case {i + 1}</span>
                        {tc.isHidden ? (
                          <span className="text-xs text-slate-500 bg-slate-200 px-2 py-0.5 rounded">🔒 Hidden from students</span>
                        ) : (
                          <span className="text-xs text-green-700 bg-green-200 px-2 py-0.5 rounded">👁️ Visible to students</span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Input:</p>
                          <pre className="text-sm font-mono bg-white p-2 rounded border border-slate-200 text-slate-700 overflow-x-auto">{tc.input}</pre>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Expected Output:</p>
                          <pre className="text-sm font-mono bg-white p-2 rounded border border-green-200 text-green-700 overflow-x-auto">{tc.expectedOutput}</pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <span className="text-4xl block mb-3">🧪</span>
                  <p>No test cases added yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}