"use client";
import { useState } from "react";

// Mock Data
const mockStudents = [
  { id: 1, name: "Imran Ahmed", email: "imran@uni.edu", dept: "CSE", session: "2021-22", status: "Active" },
  { id: 2, name: "Susmita Das", email: "susmita@uni.edu", dept: "BBA", session: "2022-23", status: "Active" },
  { id: 3, name: "Rahim Uddin", email: "rahim@uni.edu", dept: "CSE", session: "2020-21", status: "Inactive" },
];

export default function StudentInformationPage() {
  const [students] = useState(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("profile"); // profile, guardian, medical, academic

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-slate-100 overflow-hidden">
      
      {/* Left: Student List */}
      <div className="w-96 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h1 className="text-lg font-bold text-slate-800">Students</h1>
          <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700">+ Add Student</button>
        </div>
        <div className="p-3">
          <input type="text" placeholder="Search by name or ID..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {students.map(student => (
            <button
              key={student.id}
              onClick={() => { setSelectedStudent(student); setActiveTab("profile"); }}
              className={`w-full text-left p-4 hover:bg-slate-50 transition-colors ${selectedStudent?.id === student.id ? "bg-blue-50 border-l-4 border-blue-600" : "border-l-4 border-transparent"}`}
            >
              <p className="font-semibold text-slate-800 text-sm">{student.name}</p>
              <p className="text-xs text-slate-500">ID: STU-{String(student.id).padStart(4, '0')} • {student.dept}</p>
              <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${student.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {student.status}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Details Drawer */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {!selectedStudent ? (
          <div className="flex-1 flex items-center justify-center text-slate-400">Select a student to view details</div>
        ) : (
          <>
            <div className="p-4 border-b border-slate-200 bg-white flex justify-between items-center flex-shrink-0">
              <h2 className="font-bold text-slate-800">{selectedStudent.name} <span className="text-slate-400 font-normal text-sm ml-2">STU-{String(selectedStudent.id).padStart(4, '0')}</span></h2>
              <button onClick={() => setSelectedStudent(null)} className="text-slate-400 hover:text-slate-600">✕ Close</button>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-slate-200 px-6 flex gap-4 flex-shrink-0">
              {["profile", "guardian", "medical", "academic", "documents"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
              {activeTab === "profile" && (
                <div className="bg-white p-6 rounded-lg border border-slate-200 grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Full Name</label>
                    <p className="text-sm text-slate-800 font-medium">{selectedStudent.name}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                    <p className="text-sm text-slate-800">{selectedStudent.email}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Department</label>
                    <p className="text-sm text-slate-800">{selectedStudent.dept}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Session</label>
                    <p className="text-sm text-slate-800">{selectedStudent.session}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-slate-500 mb-1">Present Address</label>
                    <p className="text-sm text-slate-800">House 12, Road 5, Dhanmondi, Dhaka</p>
                  </div>
                </div>
              )}
              {activeTab === "guardian" && (
                <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-xs font-medium text-slate-500 mb-1">Father's Name</label><p className="text-sm font-medium text-slate-800">Abdul Ahmed</p></div>
                    <div><label className="block text-xs font-medium text-slate-500 mb-1">Mother's Name</label><p className="text-sm font-medium text-slate-800">Begum Ahmed</p></div>
                    <div><label className="block text-xs font-medium text-slate-500 mb-1">Contact Number</label><p className="text-sm text-slate-800">+880 1711-XXXXXX</p></div>
                    <div><label className="block text-xs font-medium text-slate-500 mb-1">Occupation</label><p className="text-sm text-slate-800">Businessman</p></div>
                  </div>
                </div>
              )}
              {activeTab === "medical" && <div className="bg-white p-6 rounded-lg border border-slate-200 text-sm text-slate-500 text-center py-10">No medical records found.</div> }
              {activeTab === "academic" && <div className="bg-white p-6 rounded-lg border border-slate-200 text-sm text-slate-500 text-center py-10">Academic history will appear here.</div> }
              {activeTab === "documents" && <div className="bg-white p-6 rounded-lg border border-slate-200 text-sm text-slate-500 text-center py-10">Upload certificates & documents here.</div> }
            </div>
          </>
        )}
      </div>
    </div>
  );
}