"use client";
import { useState } from "react";

const mockStudentTranscript = {
  student: {
    id: "STU-001",
    name: "Imran Ahmed",
    program: "B.Sc. in Computer Science",
    department: "CSE",
    session: "2020-2021",
    admissionDate: "2020-09-01",
    currentSemester: 6,
    currentCGPA: 3.75,
    totalCreditsCompleted: 90,
    totalCreditsRequired: 160,
  },
  semesters: [
    {
      name: "1st Semester",
      year: "2020",
      gpa: 3.50,
      courses: [
        { code: "CSE-101", name: "Introduction to Programming", credit: 3, marks: 82, grade: "A-" },
        { code: "ENG-101", name: "English I", credit: 3, marks: 78, grade: "B+" },
        { code: "MATH-101", name: "Calculus I", credit: 3, marks: 75, grade: "A" },
        { code: "PHY-101", name: "Physics I", credit: 3, marks: 70, grade: "A-" },
      ]
    },
    {
      name: "2nd Semester",
      year: "2021",
      gpa: 3.67,
      courses: [
        { code: "CSE-102", name: "Data Structures", credit: 3, marks: 85, grade: "A" },
        { code: "CSE-103", name: "Digital Logic", credit: 3, marks: 80, grade: "A-" },
        { code: "MATH-102", name: "Calculus II", credit: 3, marks: 72, grade: "A-" },
        { code: "ENG-102", name: "English II", credit: 3, marks: 68, grade: "B+" },
        { code: "CSE-104", name: "Programming Lab I", credit: 1.5, marks: 90, grade: "A+" },
      ]
    },
    {
      name: "3rd Semester",
      year: "2021",
      gpa: 3.83,
      courses: [
        { code: "CSE-201", name: "Algorithm Design", credit: 3, marks: 88, grade: "A+" },
        { code: "CSE-202", name: "OOP with Java", credit: 3, marks: 82, grade: "A-" },
        { code: "MATH-201", name: "Linear Algebra", credit: 3, marks: 75, grade: "A" },
        { code: "STA-201", name: "Probability & Statistics", credit: 3, marks: 78, grade: "B+" },
      ]
    },
    {
      name: "4th Semester",
      year: "2022",
      gpa: 3.75,
      courses: [
        { code: "CSE-301", name: "Database Systems", credit: 3, marks: 85, grade: "A" },
        { code: "CSE-302", name: "Computer Networks", credit: 3, marks: 80, grade: "A-" },
        { code: "CSE-303", name: "Operating Systems", credit: 3, marks: 78, grade: "B+" },
        { code: "CSE-304", name: "Software Engineering", credit: 3, marks: 82, grade: "A-" },
      ]
    },
    {
      name: "5th Semester",
      year: "2022",
      gpa: 3.92,
      courses: [
        { code: "CSE-401", name: "Machine Learning", credit: 3, marks: 92, grade: "A+" },
        { code: "CSE-402", name: "Web Technologies", credit: 3, marks: 88, grade: "A+" },
        { code: "CSE-403", name: "Compiler Design", credit: 3, marks: 75, grade: "A" },
        { code: "CSE-404", name: "Project I", credit: 2, marks: 85, grade: "A" },
      ]
    },
    {
      name: "6th Semester (Ongoing)",
      year: "2023",
      gpa: null,
      courses: [
        { code: "CSE-501", name: "AI & Expert Systems", credit: 3, marks: null, grade: "—" },
        { code: "CSE-502", name: "Cloud Computing", credit: 3, marks: null, grade: "—" },
        { code: "CSE-503", name: "Information Security", credit: 3, marks: null, grade: "—" },
      ]
    },
  ]
};

export default function TranscriptPage() {
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [searchStudent, setSearchStudent] = useState("STU-001");
  const [showPreview, setShowPreview] = useState(false);

  const student = mockStudentTranscript.student;
  const semesters = mockStudentTranscript.semesters;

  const filteredSemesters = selectedSemester === "all" 
    ? semesters 
    : semesters.filter((_, i) => i === parseInt(selectedSemester));

  const totalCreditsEarned = semesters
    .filter(s => s.gpa !== null)
    .reduce((sum, s) => sum + s.courses.reduce((cSum, c) => cSum + c.credit, 0), 0);

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    const gradePoints = { "A+": 4.0, "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7, "C+": 2.3, "C": 2.0, "D": 1.0, "F": 0 };
    
    semesters.filter(s => s.gpa !== null).forEach(s => {
      s.courses.forEach(c => {
        totalPoints += (gradePoints[c.grade] || 0) * c.credit;
        totalCredits += c.credit;
      });
    });
    
    return (totalPoints / totalCredits).toFixed(2);
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)]  bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Transcript</h1>
          <p className="text-sm text-slate-500 mt-1">View and generate student transcripts</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-sm transition-colors"
          >
            {showPreview ? "✕ Close Preview" : "👁️ Print Preview"}
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors">
            📥 Download PDF
          </button>
        </div>
      </div>

      {/* Student Search */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-500 mb-1">Search Student</label>
            <input
              type="text"
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
              placeholder="Enter Student ID or Name..."
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
            Search
          </button>
        </div>
      </div>

      {/* Student Info Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div>
            <p className="text-blue-200 text-xs">Student ID</p>
            <p className="font-bold">{student.id}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Name</p>
            <p className="font-bold">{student.name}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Program</p>
            <p className="font-bold text-sm">{student.program}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Session</p>
            <p className="font-bold">{student.session}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">CGPA</p>
            <p className="font-bold text-2xl">{calculateCGPA()}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Credits Completed</p>
            <p className="font-bold">{totalCreditsEarned} / {student.totalCreditsRequired}</p>
          </div>
        </div>
      </div>

      {/* Semester Filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setSelectedSemester("all")}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            selectedSemester === "all" ? "bg-blue-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          All Semesters
        </button>
        {semesters.map((sem, i) => (
          <button
            key={i}
            onClick={() => setSelectedSemester(i.toString())}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              selectedSemester === i.toString() ? "bg-blue-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {sem.name} {sem.gpa ? `(GPA: ${sem.gpa})` : "(Ongoing)"}
          </button>
        ))}
      </div>

      {/* Transcript Table */}
      {filteredSemesters.map((semester, sIndex) => (
        <div key={sIndex} className="bg-white rounded-lg border border-slate-200 mb-4 overflow-hidden">
          <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-700">{semester.name}</h3>
              <p className="text-xs text-slate-500">Year: {semester.year}</p>
            </div>
            {semester.gpa && (
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-md">
                <span className="text-xs font-medium">Semester GPA: </span>
                <span className="font-bold">{semester.gpa}</span>
              </div>
            )}
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Code</th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Course Title</th>
                <th className="text-center px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Credit</th>
                <th className="text-center px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Marks</th>
                <th className="text-center px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Grade</th>
                <th className="text-center px-4 py-2 text-xs font-semibold text-slate-500 uppercase">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {semester.courses.map((course, cIndex) => {
                const gradePoints = { "A+": 4.0, "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7, "C+": 2.3, "C": 2.0, "D": 1.0, "F": 0 };
                return (
                  <tr key={cIndex} className={`hover:bg-slate-50 ${!course.marks ? "bg-slate-50 opacity-60" : ""}`}>
                    <td className="px-4 py-2 text-sm font-mono text-slate-600">{course.code}</td>
                    <td className="px-4 py-2 text-sm text-slate-800">{course.name}</td>
                    <td className="px-4 py-2 text-sm text-center text-slate-600">{course.credit}</td>
                    <td className="px-4 py-2 text-sm text-center text-slate-600">{course.marks ?? "—"}</td>
                    <td className="px-4 py-2 text-center">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        course.grade === "F" ? "bg-red-100 text-red-700" :
                        course.grade.startsWith("A") ? "bg-green-100 text-green-700" :
                        course.grade === "—" ? "bg-slate-100 text-slate-400" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {course.grade}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-center text-slate-600">
                      {gradePoints[course.grade] !== undefined ? (gradePoints[course.grade] * course.credit).toFixed(1) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 font-medium">
                <td colSpan="2" className="px-4 py-2 text-sm text-slate-600">Semester Total</td>
                <td className="px-4 py-2 text-sm text-center text-slate-700">{semester.courses.reduce((s, c) => s + c.credit, 0)}</td>
                <td colSpan="3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      ))}

      {/* Summary */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="font-bold text-slate-700 mb-4">Academic Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-blue-700">{calculateCGPA()}</p>
            <p className="text-xs text-blue-600 mt-1">Cumulative GPA</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-green-700">{totalCreditsEarned}</p>
            <p className="text-xs text-green-600 mt-1">Credits Earned</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-purple-700">{semesters.filter(s => s.gpa !== null).length}</p>
            <p className="text-xs text-purple-600 mt-1">Completed Semesters</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-orange-700">{Math.round((totalCreditsEarned / student.totalCreditsRequired) * 100)}%</p>
            <p className="text-xs text-orange-600 mt-1">Program Completion</p>
          </div>
        </div>
      </div>
    </div>
  );
}