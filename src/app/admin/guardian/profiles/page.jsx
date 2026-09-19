"use client";
import { useState } from "react";

const mockGuardians = [
  { id: 1, name: "Abdul Karim", relation: "Father", phone: "01711111111", nid: "1234567890", occupation: "Businessman", income: "High", students: ["Imran Ahmed", "Rahim Ahmed"] },
  { id: 2, name: "Fatema Begum", relation: "Mother", phone: "01822222222", nid: "9876543210", occupation: "Housewife", income: "Medium", students: ["Imran Ahmed", "Rahim Ahmed"] },
  { id: 3, name: "Rahim Uddin", relation: "Guardian", phone: "01933333333", nid: "1122334455", occupation: "Service Holder", income: "Medium", students: ["Susmita Das"] },
];

export default function GuardianProfilesPage() {
  const [guardians] = useState(mockGuardians);
  const [selectedGuardian, setSelectedGuardian] = useState(null);

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-slate-100 overflow-hidden">
      {/* Left Sidebar: Guardian List */}
      <div className="w-96 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h1 className="text-lg font-bold text-slate-800">Guardians</h1>
          <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 font-bold">+ Add Guardian</button>
        </div>
        <div className="p-3">
          <input type="text" placeholder="Search by name, phone or NID..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {guardians.map(g => (
            <button
              key={g.id}
              onClick={() => setSelectedGuardian(g)}
              className={`w-full text-left p-4 hover:bg-slate-50 transition-all border-l-4 ${selectedGuardian?.id === g.id ? "border-blue-600 bg-blue-50" : "border-transparent"}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">{g.name.charAt(0)}</div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{g.name}</p>
                  <p className="text-xs text-slate-500">{g.relation} • {g.phone}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Content: Profile Details */}
      <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
        {!selectedGuardian ? (
          <div className="flex items-center justify-center h-full text-slate-400">Select a guardian to view profile</div>
        ) : (
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Header Section */}
            <div className="bg-slate-800 p-6 flex items-center gap-6">
              <div className="w-20 h-20 bg-slate-300 rounded-full flex items-center justify-center text-3xl text-slate-500">👤</div>
              <div>
                <h2 className="text-xl font-bold text-white">{selectedGuardian.name}</h2>
                <span className="inline-block mt-1 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">{selectedGuardian.relation}</span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-6 grid grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number</p>
                <p className="text-sm text-slate-800 mt-1">{selectedGuardian.phone}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">NID Verification</p>
                <p className="text-sm text-slate-800 mt-1">{selectedGuardian.nid} <span className="ml-2 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full font-bold">Verified</span></p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Occupation</p>
                <p className="text-sm text-slate-800 mt-1">{selectedGuardian.occupation}</p>
              </div>
              <div>
                <p className="text-xs font-semibold textslate-400 uppercase tracking-wider">Income Level</p>
                <p className="text-sm text-slate-800 mt-1">{selectedGuardian.income}</p>
              </div>
            </div>

            {/* Linked Students */}
            <div className="px-6 pb-6 border-t border-slate-200 mt-2">
              <h3 className="text-sm font-bold text-slate-700 mt-4 mb-3">Linked Students</h3>
              <div className="flex flex-wrap gap-2">
                {selectedGuardian.students.map(s => (
                  <span key={s} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-blue-100">{s}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}