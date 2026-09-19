"use client";
import { useState } from "react";

const mockCourses = [
  { id: 1, code: "CSE-101", name: "Introduction to Programming", totalMarks: 100, sections: ["A", "B"] },
  { id: 2, code: "CSE-102", name: "Data Structures", totalMarks: 100, sections: ["A"] },
  { id: 3, code: "BBA-201", name: "Principles of Marketing", totalMarks: 100, sections: ["A", "B", "C"] },
];

const mockStudents = [
  { id: "STU-001", name: "Imran Ahmed", section: "A" },
  { id: "STU-002", name: "Susmita Das", section: "A" },
  { id: "STU-003", name: "Rahim Uddin", section: "A" },
  { id: "STU-004", name: "Karim Hossain", section: "B" },
  { id: "STU-005", name: "Fatima Begum", section: "B" },
  { id: "STU-006", name: "Nasir Khan", section: "A" },
  { id: "STU-007", name: "Priya Sharma", section: "B" },
];

const markComponents = [
  { key: "midterm", label: "Midterm", max: 30 },
  { key: "final", label: "Final", max: 50 },
  { key: "assignment", label: "Assignment", max: 10 },
  { key: "attendance", label: "Attendance", max: 5 },
  { key: "quiz", label: "Quiz", max: 5 },
];

export default function MarksEntryPage() {
  const [selectedCourse, setSelectedCourse] = useState(mockCourses[0]);
  const [selectedSection, setSelectedSection] = useState("A");
  const [marksData, setMarksData] = useState({});
  const [saveStatus, setSaveStatus] = useState(null);

  const filteredStudents = mockStudents.filter(s => s.section === selectedSection);

  const getMarks = (studentId, component) => {
    const key = `${studentId}-${component}`;
    return marksData[key] ?? "";
  };

  const setMarks = (studentId, component, value) => {
    const key = `${studentId}-${component}`;
    const numValue = value === "" ? "" : parseInt(value);
    
    // Validate marks
    if (numValue !== "" && (numValue < 0 || numValue > markComponents.find(c => c.key === component)?.max)) {
      return;
    }
    
    setMarksData(prev => ({ ...prev, [key]: numValue }));
  };

  const getTotal = (studentId) => {
    let total = 0;
    let hasAllMarks = true;
    markComponents.forEach(comp => {
      const marks = getMarks(studentId, comp.key);
      if (marks === "") {
        hasAllMarks = false;
      } else {
        total += marks;
      }
    });
    return hasAllMarks ? total : "-";
  };

  const getGrade = (total) => {
    if (total === "-") return "-";
    if (total >= 80) return "A+";
    if (total >= 75) return "A";
    if (total >= 70) return "A-";
    if (total >= 65) return "B+";
    if (total >= 60) return "B";
    if (total >= 55) return "B-";
    if (total >= 50) return "C+";
    if (total >= 45) return "C";
    if (total >= 40) return "D";
    return "F";
  };

  const handleSave = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1500);
  };

  const handleBulkFill = (component, value) => {
    const newData = { ...marksData };
    filteredStudents.forEach(student => {
      const key = `${student.id}-${component}`;
      newData[key] = value;
    });
    setMarksData(newData);
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)]  bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Marks Entry</h1>
          <p className="text-sm text-slate-500 mt-1">Enter and manage student marks</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium text-sm transition-colors">
            📥 Import Excel
          </button>
          <button 
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              saveStatus === "saved" 
                ? "bg-green-600 text-white" 
                : saveStatus === "saving"
                ? "bg-blue-400 text-white cursor-wait"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {saveStatus === "saving" ? "⏳ Saving..." : saveStatus === "saved" ? "✅ Saved!" : "💾 Save Marks"}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-slate-500 mb-1">Course</label>
            <select
              value={selectedCourse.id}
              onChange={(e) => setSelectedCourse(mockCourses.find(c => c.id === parseInt(e.target.value)))}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none"
            >
              {mockCourses.map(course => (
                <option key={course.id} value={course.id}>{course.code} - {course.name}</option>
              ))}
            </select>
          </div>
          <div className="w-32">
            <label className="block text-xs font-medium text-slate-500 mb-1">Section</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none"
            >
              {selectedCourse.sections.map(sec => (
                <option key={sec} value={sec}>Section {sec}</option>
              ))}
            </select>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-600">Total Students</p>
            <p className="text-lg font-bold text-blue-800">{filteredStudents.length}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-xs text-green-600">Marks Entered</p>
            <p className="text-lg font-bold text-green-800">
              {filteredStudents.filter(s => getTotal(s.id) !== "-").length}
            </p>
          </div>
        </div>
      </div>

      {/* Marks Entry Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase sticky left-0 bg-slate-50 z-10 min-w-[180px]">
                  Student
                </th>
                {markComponents.map(comp => (
                  <th key={comp.key} className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase min-w-[100px]">
                    <div>{comp.label}</div>
                    <div className="text-[10px] text-slate-400 font-normal">(Max: {comp.max})</div>
                  </th>
                ))}
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase min-w-[80px]">
                  Total
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase min-w-[60px]">
                  Grade
                </th>
              </tr>
              {/* Bulk Fill Row */}
              <tr className="bg-blue-50">
                <td className="px-4 py-2 text-xs text-blue-600 font-medium sticky left-0 bg-blue-50 z-10">
                  Bulk Fill
                </td>
                {markComponents.map(comp => (
                  <td key={comp.key} className="px-2 py-2">
                    <input
                      type="number"
                      placeholder="0"
                      onChange={(e) => handleBulkFill(comp.key, e.target.value === "" ? "" : parseInt(e.target.value))}
                      className="w-full px-2 py-1 text-xs text-center border border-blue-200 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                ))}
                <td colSpan="2"></td>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student, index) => {
                const total = getTotal(student.id);
                const grade = getGrade(total);
                return (
                  <tr key={student.id} className={`hover:bg-slate-50 ${total !== "-" ? "bg-green-50/30" : ""}`}>
                    <td className="px-4 py-3 sticky left-0 bg-white z-10">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{student.name}</p>
                          <p className="text-xs text-slate-500">{student.id}</p>
                        </div>
                      </div>
                    </td>
                    {markComponents.map(comp => (
                      <td key={comp.key} className="px-2 py-3">
                        <input
                          type="number"
                          min="0"
                          max={comp.max}
                          value={getMarks(student.id, comp.key)}
                          onChange={(e) => setMarks(student.id, comp.key, e.target.value)}
                          placeholder="—"
                          className="w-full px-2 py-1.5 text-sm text-center border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </td>
                    ))}
                    <td className="px-4 py-3 text-center">
                      <span className={`text-sm font-bold ${total !== "-" ? (total >= 50 ? "text-green-700" : "text-red-700") : "text-slate-400"}`}>
                        {total}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                        grade === "F" ? "bg-red-100 text-red-700" :
                        grade.startsWith("A") ? "bg-green-100 text-green-700" :
                        grade === "-" ? "bg-slate-100 text-slate-400" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {grade}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}