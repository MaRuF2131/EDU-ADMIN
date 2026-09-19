"use client";
import { useState } from "react";

const mockTeachers = [
  { id: 1, name: "Dr. Ayesha Siddika", dept: "CSE", designation: "Professor", photo: "👩‍🏫", qualification: "PhD in CS", research: "Machine Learning", officeHour: "Sat, 4:00 PM - 6:00 PM", salaryGrade: "Grade 10", leaves: 12 },
  { id: 2, name: "Md. Rassel Hossain", dept: "BBA", designation: "Lecturer", photo: "👨‍🏫", qualification: "MBA", research: "Marketing", officeHour: "Sun, 10:00 AM - 12:00 PM", salaryGrade: "Grade 7", leaves: 8 },
  { id: 3, name: "Farzana Akter", dept: "English", designation: "Asst. Professor", photo: "👩‍💼", qualification: "M.A. in Literature", research: "Linguistics", officeHour: "Mon, 2:00 PM - 4:00 PM", salaryGrade: "Grade 8", leaves: 10 },
];

export default function TeacherProfilePage() {
  const [teachers] = useState(mockTeachers);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const profileSections = selectedTeacher ? [
    {
      title: "Academic & Research",
      items: [
        { label: "Department", value: selectedTeacher.dept },
        { label: "Designation", value: selectedTeacher.designation },
        { label: "Highest Qualification", value: selectedTeacher.qualification },
        { label: "Research Area", value: selectedTeacher.research },
        { label: "Office Hour", value: selectedTeacher.officeHour },
      ]
    },
    {
      title: "HR & Administration",
      items: [
        { label: "Salary Grade", value: selectedTeacher.salaryGrade },
        { label: "Remaining Leaves", value: selectedTeacher.leaves },
      ]
    }
  ] : [];

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-slate-100 overflow-hidden">
      {/* Left: Teacher List */}
      <div className="w-96 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h1 className="text-lg font-bold text-slate-800">Teachers</h1>
          <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 font-bold">+ Add Teacher</button>
        </div>
        <div className="p-3">
          <input type="text" placeholder="Search by name or dept..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {teachers.map(teacher => (
            <button
              key={teacher.id}
              onClick={() => setSelectedTeacher(teacher)}
              className={`w-full text-left p-4 hover:bg-slate-50 transition-all border-l-4 ${selectedTeacher?.id === teacher.id ? "border-blue-600 bg-blue-50" : "border-transparent"}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xl">{teacher.photo}</div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{teacher.name}</p>
                  <p className="text-xs text-slate-500">{teacher.designation} • {teacher.dept}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Profile Details Drawer */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        {!selectedTeacher ? (
          <div className="flex-1 flex items-center justify-center text-slate-400">Select a teacher to view profile</div>
        ) : (
          <>
            <div className="p-4 border-b border-slate-200 bg-white flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xl">{selectedTeacher.photo}</div>
                <div>
                  <h2 className="font-bold text-slate-800">{selectedTeacher.name}</h2>
                  <p className="text-xs text-slate-500">{selectedTeacher.designation} • {selectedTeacher.dept}</p>
                </div>
              </div>
              <button onClick={() => setSelectedTeacher(null)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-3xl mx-auto space-y-6">
                {profileSections.map((section, sIdx) => (
                  <div key={sIdx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-2 mb-4">{section.title}</h3>
                    <div className="grid grid-cols-2 gap-6">
                      {section.items.map((item, iIdx) => (
                        <div key={iIdx}>
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.label}</p>
                          <p className="text-sm font-medium text-slate-800 mt-1">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-2 mb-4">Publications</h3>
                  <div className="space-y-3">
                    {["Impact Factor of AI in Modern Education (Journal of Tech, 2023)", "Data Structures: A Visual Approach (Book Chapter, 2022)"].map((pub, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <span className="mt-0.5 text-blue-500">📄</span>
                        <div>
                          <p className="text-sm font-medium text-slate-700">{pub}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Published: 2023</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}