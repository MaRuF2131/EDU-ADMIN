"use client";
import { useState } from "react";

const mockHalls = [
  { id: 1, name: "Hall A", rows: 10, cols: 12, capacity: 120 },
  { id: 2, name: "Hall B", rows: 8, cols: 10, capacity: 80 },
  { id: 3, name: "Hall C", rows: 6, cols: 8, capacity: 48 },
];

const mockStudents = [
  { id: "STU-001", name: "Imran Ahmed", course: "CSE-101" },
  { id: "STU-002", name: "Susmita Das", course: "CSE-101" },
  { id: "STU-003", name: "Rahim Uddin", course: "CSE-101" },
  { id: "STU-004", name: "Karim Hossain", course: "CSE-101" },
  { id: "STU-005", name: "Fatima Begum", course: "CSE-102" },
  { id: "STU-006", name: "Nasir Khan", course: "CSE-102" },
  { id: "STU-007", name: "Priya Sharma", course: "CSE-101" },
  { id: "STU-008", name: "Arif Islam", course: "CSE-102" },
  { id: "STU-009", name: "Rina Akter", course: "CSE-101" },
  { id: "STU-010", name: "Tanvir Hasan", course: "CSE-102" },
];

export default function SeatPlanPage() {
  const [selectedHall, setSelectedHall] = useState(mockHalls[0]);
  const [seatAssignments, setSeatAssignments] = useState({
    "0-0": "STU-001",
    "0-1": "STU-002",
    "0-2": "STU-003",
    "1-0": "STU-004",
    "1-1": "STU-005",
    "2-0": "STU-006",
  });
  const [draggingStudent, setDraggingStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [showExportModal, setShowExportModal] = useState(false);
  const [examInfo, setExamInfo] = useState({
    examName: "Final Exam - Fall 2023",
    date: "2024-01-15",
    time: "10:00 AM - 1:00 PM"
  });

  const courses = ["all", ...new Set(mockStudents.map(s => s.course))];

  const filteredStudents = selectedCourse === "all"
    ? mockStudents
    : mockStudents.filter(s => s.course === selectedCourse);

  const getStudentById = (id) => mockStudents.find(s => s.id === id);

  const handleDragStart = (studentId) => {
    setDraggingStudent(studentId);
  };

  const handleDragEnd = () => {
    setDraggingStudent(null);
  };

  const handleDrop = (row, col) => {
    if (draggingStudent) {
      const key = `${row}-${col}`;
      const newAssignments = { ...seatAssignments };
      Object.keys(newAssignments).forEach(k => {
        if (newAssignments[k] === draggingStudent) delete newAssignments[k];
      });
      newAssignments[key] = draggingStudent;
      setSeatAssignments(newAssignments);
      setDraggingStudent(null);
    }
  };

  const removeSeatAssignment = (key) => {
    const newAssignments = { ...seatAssignments };
    delete newAssignments[key];
    setSeatAssignments(newAssignments);
  };

  const autoAssign = () => {
    const newAssignments = { ...seatAssignments };
    let studentIndex = 0;
    const unassignedStudents = mockStudents.filter(
      s => !Object.values(seatAssignments).includes(s.id)
    );

    for (let row = 0; row < selectedHall.rows && studentIndex < unassignedStudents.length; row++) {
      for (let col = 0; col < selectedHall.cols && studentIndex < unassignedStudents.length; col++) {
        const key = `${row}-${col}`;
        if (!newAssignments[key]) {
          newAssignments[key] = unassignedStudents[studentIndex].id;
          studentIndex++;
        }
      }
    }
    setSeatAssignments(newAssignments);
  };

  const clearAll = () => {
    setSeatAssignments({});
  };

  const shuffleSeats = () => {
    const assignedStudents = Object.values(seatAssignments);
    const shuffled = [...assignedStudents].sort(() => Math.random() - 0.5);
    const keys = Object.keys(seatAssignments);
    const newAssignments = {};
    keys.forEach((key, index) => {
      newAssignments[key] = shuffled[index];
    });
    setSeatAssignments(newAssignments);
  };

  const swapStudents = (key1, key2) => {
    const newAssignments = { ...seatAssignments };
    const temp = newAssignments[key1];
    newAssignments[key1] = newAssignments[key2];
    newAssignments[key2] = temp;
    setSeatAssignments(newAssignments);
  };

  const assignedCount = Object.keys(seatAssignments).length;
  const emptyCount = selectedHall.capacity - assignedCount;
  const unassignedStudents = mockStudents.filter(
    s => !Object.values(seatAssignments).includes(s.id)
  );

  return (
    <div className="p-6 h-[calc(100vh-4rem)]  bg-slate-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Seat Plan Generator</h1>
          <p className="text-sm text-slate-500 mt-1">Drag and drop students to assign seats</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={shuffleSeats}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-sm transition-colors"
            disabled={assignedCount < 2}
          >
            🔀 Shuffle
          </button>
          <button
            onClick={autoAssign}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm transition-colors"
          >
            ⚡ Auto Assign
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm transition-colors"
          >
            🗑️ Clear All
          </button>
          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors"
          >
            📥 Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Student List */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 flex flex-col h-fit">
          <h3 className="font-bold text-slate-700 mb-3">Students</h3>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md mb-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            {courses.map(c => (
              <option key={c} value={c}>{c === "all" ? "All Courses" : c}</option>
            ))}
          </select>
          
          {/* Student Count Info */}
          <div className="flex gap-2 mb-3">
            <div className="flex-1 bg-green-50 border border-green-200 rounded-md p-2 text-center">
              <p className="text-lg font-bold text-green-700">{assignedCount}</p>
              <p className="text-[10px] text-green-600">Assigned</p>
            </div>
            <div className="flex-1 bg-orange-50 border border-orange-200 rounded-md p-2 text-center">
              <p className="text-lg font-bold text-orange-700">{unassignedStudents.length}</p>
              <p className="text-[10px] text-orange-600">Unassigned</p>
            </div>
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredStudents.map(student => {
              const isAssigned = Object.values(seatAssignments).includes(student.id);
              const isDragging = draggingStudent === student.id;
              return (
                <div
                  key={student.id}
                  draggable
                  onDragStart={() => handleDragStart(student.id)}
                  onDragEnd={handleDragEnd}
                  className={`p-2.5 rounded-md border cursor-grab active:cursor-grabbing transition-all ${
                    isDragging
                      ? "border-blue-500 bg-blue-50 opacity-50 scale-95"
                      : isAssigned
                      ? "border-green-300 bg-green-50 hover:border-green-400"
                      : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        isAssigned ? "bg-green-500 text-white" : "bg-slate-200 text-slate-500"
                      }`}>
                        {isAssigned ? "✓" : student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.id} • {student.course}</p>
                      </div>
                    </div>
                    {isAssigned && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const key = Object.keys(seatAssignments).find(k => seatAssignments[k] === student.id);
                          if (key) removeSeatAssignment(key);
                        }}
                        className="text-red-400 hover:text-red-600 text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Seat Layout */}
        <div className="lg:col-span-3 bg-white rounded-lg border border-slate-200 p-6">
          {/* Hall Selection */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-700 text-lg">{selectedHall.name}</h3>
              <p className="text-sm text-slate-500">
                Capacity: {selectedHall.capacity} seats • {selectedHall.rows} rows × {selectedHall.cols} columns
              </p>
            </div>
            <div className="flex gap-2">
              {mockHalls.map(hall => (
                <button
                  key={hall.id}
                  onClick={() => setSelectedHall(hall)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    selectedHall.id === hall.id
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {hall.name}
                </button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-4 mb-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded bg-slate-200 border border-slate-300"></div>
              <span className="text-slate-500">Empty Seat</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded bg-green-500"></div>
              <span className="text-slate-500">Assigned</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded bg-blue-200 border-2 border-dashed border-blue-400"></div>
              <span className="text-slate-500">Drop Zone</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded bg-red-100 border border-red-300"></div>
              <span className="text-slate-500">Click to Remove</span>
            </div>
          </div>

          {/* Exam Hall Layout */}
          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
            {/* Front Desk */}
            <div className="text-center mb-6">
              <div className="bg-slate-700 text-white py-3 px-12 rounded-lg inline-block text-sm font-medium shadow-lg">
                📋 Examiner's Desk / Front
              </div>
            </div>

            {/* Column Numbers */}
            <div className="flex gap-2 mb-2 ml-12">
              {Array.from({ length: selectedHall.cols }).map((_, col) => (
                <div
                  key={col}
                  className="w-14 text-center text-xs font-medium text-slate-400"
                >
                  {col + 1}
                </div>
              ))}
            </div>

            {/* Seats Grid */}
            <div className="flex flex-col items-center gap-2">
              {Array.from({ length: selectedHall.rows }).map((_, row) => (
                <div key={row} className="flex items-center gap-2">
                  {/* Row Number */}
                  <div className="w-8 text-center text-xs font-medium text-slate-400">
                    {String.fromCharCode(65 + row)}
                  </div>
                  
                  {/* Seats in Row */}
                  <div className="flex gap-2">
                    {Array.from({ length: selectedHall.cols }).map((_, col) => {
                      const key = `${row}-${col}`;
                      const assignedStudent = seatAssignments[key];
                      const isDropTarget = draggingStudent && !assignedStudent;
                      const student = assignedStudent ? getStudentById(assignedStudent) : null;
                      
                      return (
                        <div
                          key={col}
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = "move";
                          }}
                          onDrop={() => handleDrop(row, col)}
                          onClick={() => assignedStudent && removeSeatAssignment(key)}
                          className={`w-14 h-14 rounded-md flex flex-col items-center justify-center cursor-pointer transition-all border-2 ${
                            assignedStudent
                              ? "bg-green-500 border-green-600 text-white hover:bg-green-600 hover:border-green-700 shadow-sm"
                              : isDropTarget
                              ? "bg-blue-100 border-blue-400 border-dashed scale-105 shadow-md"
                              : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-100"
                          }`}
                          title={
                            assignedStudent
                              ? `${student?.name} (${student?.id}) - Click to remove`
                              : `Seat ${String.fromCharCode(65 + row)}${col + 1} - Drop student here`
                          }
                        >
                          {assignedStudent ? (
                            <>
                              <span className="font-bold text-[9px] leading-tight">{student?.id}</span>
                              <span className="text-[8px] leading-tight truncate w-full text-center px-0.5">
                                {student?.name.split(' ')[0]}
                              </span>
                            </>
                          ) : (
                            <span className="text-slate-300 text-[10px] font-mono">
                              {String.fromCharCode(65 + row)}{col + 1}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Row Number (Right) */}
                  <div className="w-8 text-center text-xs font-medium text-slate-400">
                    {String.fromCharCode(65 + row)}
                  </div>
                </div>
              ))}
            </div>

            {/* Back Door */}
            <div className="text-center mt-6">
              <div className="bg-slate-600 text-white py-3 px-12 rounded-lg inline-block text-sm font-medium shadow-lg">
                🚪 Exit / Back Door
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-200">
              <p className="text-2xl font-bold text-slate-700">{selectedHall.capacity}</p>
              <p className="text-xs text-slate-500 mt-1">Total Seats</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
              <p className="text-2xl font-bold text-green-700">{assignedCount}</p>
              <p className="text-xs text-green-600 mt-1">Assigned</p>
              <div className="mt-1.5 bg-green-200 rounded-full h-1.5">
                <div
                  className="bg-green-500 h-1.5 rounded-full transition-all"
                  style={{ width: `${(assignedCount / selectedHall.capacity) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 text-center border border-orange-200">
              <p className="text-2xl font-bold text-orange-700">{emptyCount}</p>
              <p className="text-xs text-orange-600 mt-1">Empty</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-200">
              <p className="text-2xl font-bold text-blue-700">{unassignedStudents.length}</p>
              <p className="text-xs text-blue-600 mt-1">Unassigned Students</p>
            </div>
          </div>

          {/* Assigned Students Table */}
          {assignedCount > 0 && (
            <div className="mt-6">
              <h4 className="font-bold text-slate-700 mb-3 text-sm">Assigned Students List</h4>
              <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="text-left px-3 py-2 text-xs font-semibold text-slate-500 uppercase">Seat</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-slate-500 uppercase">Student ID</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-slate-500 uppercase">Name</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-slate-500 uppercase">Course</th>
                      <th className="text-center px-3 py-2 text-xs font-semibold text-slate-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {Object.entries(seatAssignments).map(([key, studentId]) => {
                      const student = getStudentById(studentId);
                      const [row, col] = key.split('-').map(Number);
                      const seatLabel = `${String.fromCharCode(65 + row)}${col + 1}`;
                      return (
                        <tr key={key} className="hover:bg-white">
                          <td className="px-3 py-2">
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-mono font-bold">
                              {seatLabel}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-xs font-mono text-slate-600">{student?.id}</td>
                          <td className="px-3 py-2 text-sm text-slate-800 font-medium">{student?.name}</td>
                          <td className="px-3 py-2 text-xs text-slate-500">{student?.course}</td>
                          <td className="px-3 py-2 text-center">
                            <button
                              onClick={() => removeSeatAssignment(key)}
                              className="text-red-500 hover:text-red-700 text-xs font-medium"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Export Seat Plan</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Exam Name</label>
                <input
                  type="text"
                  value={examInfo.examName}
                  onChange={(e) => setExamInfo({...examInfo, examName: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Date</label>
                  <input
                    type="date"
                    value={examInfo.date}
                    onChange={(e) => setExamInfo({...examInfo, date: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Time</label>
                  <input
                    type="text"
                    value={examInfo.time}
                    onChange={(e) => setExamInfo({...examInfo, time: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Hall</label>
                <input
                  type="text"
                  value={selectedHall.name}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none bg-slate-50"
                  readOnly
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <span className="text-lg">📊</span>
                  <div>
                    <p className="font-medium">Summary</p>
                    <p className="text-xs text-blue-600">
                      {assignedCount} students assigned out of {selectedHall.capacity} seats
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-medium text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert(`Seat plan exported!\n\n${examInfo.examName}\n${examInfo.date} • ${examInfo.time}\n${selectedHall.name}\n${assignedCount} students`);
                    setShowExportModal(false);
                  }}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors"
                >
                  📥 Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}