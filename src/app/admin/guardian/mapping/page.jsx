"use client";
import { useState } from "react";

const mockData = [
  { id: 1, guardianName: "Abdul Karim", mappings: [{ studentId: "STU-001", studentName: "Imran Ahmed", isPrimary: true, isEmergency: true, canPickup: true }, { studentId: "STU-002", studentName: "Rahim Ahmed", isPrimary: false, isEmergency: false, canPickup: true }] },
  { id: 2, guardianName: "Fatema Begum", mappings: [{ studentId: "STU-001", studentName: "Imran Ahmed", isPrimary: false, isEmergency: false, canPickup: true }, { studentId: "STU-002", studentName: "Rahim Ahmed", isPrimary: true, isEmergency: true, canPickup: true }] },
];

export default function MappingPage() {
  const [data, setData] = useState(mockData);
  const [selectedGuardianId, setSelectedGuardianId] = useState(1);
  
  const currentGuardian = data.find(g => g.id === selectedGuardianId);

  // Toggle switches logic
  const handleToggle = (studentId, key) => {
    setData(prev => prev.map(g => {
      if (g.id !== selectedGuardianId) return g;
      return {
        ...g,
        mappings: g.mappings.map(m => m.studentId === studentId ? { ...m, [key]: !m[key] } : m)
      };
    }));
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Student-Guardian Mapping</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Guardian List for selection */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 h-fit">
          <h3 className="text-sm font-bold text-slate-700 mb-3 border-b pb-2">Select Guardian</h3>
          <div className="space-y-2">
            {data.map(g => (
              <button
                key={g.id}
                onClick={() => setSelectedGuardianId(g.id)}
                className={`w-full text-left p-3 rounded-md text-sm transition-colors ${selectedGuardianId === g.id ? "bg-blue-50 border border-blue-300 text-blue-700 font-medium" : "hover:bg-slate-50 border border-transparent"}`}
              >
                {g.guardianName}
                <span className="text-xs text-slate-400 block">({g.mappings.length} students)</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Mapping Controls */}
        {currentGuardian && (
          <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-700">Mapping for: <span className="text-blue-600">{currentGuardian.guardianName}</span></h3>
            </div>
            
            <table className="w-full text-sm">
              <thead className="bg-white border-b border-slate-200">
                <tr>
                  <th className="text-left p-3 font-medium text-slate-600">Student</th>
                  <th className="text-center p-3 font-medium text-slate-600">Custody Status</th>
                  <th className="text-center p-3 font-medium text-slate-600">Primary Contact</th>
                  <th className="text-center p-3 font-medium text-slate-600">Emergency Contact</th>
                  <th className="text-center p-3 font-medium text-slate-600">Pickup Permission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentGuardian.mappings.map((map) => (
                  <tr key={map.studentId} className="hover:bg-slate-50">
                    <td className="p-3 font-medium text-slate-700">
                      <div>{map.studentName}</div>
                      <div className="text-xs text-slate-400">{map.studentId}</div>
                    </td>
                    <td className="p-3 text-center text-xs text-slate-600 bg-slate-50 rounded font-mono">Active</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleToggle(map.studentId, "isPrimary")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${map.isPrimary ? "bg-blue-600" : "bg-slate-300"}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${map.isPrimary ? "translate-x-6" : "translate-x-1"}`} />
                      </button>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleToggle(map.studentId, "isEmergency")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${map.isEmergency ? "bg-red-500" : "bg-slate-300"}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${map.isEmergency ? "translate-x-6" : "translate-x-1"}`} />
                      </button>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleToggle(map.studentId, "canPickup")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${map.canPickup ? "bg-green-500" : "bg-slate-300"}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${map.canPickup ? "translate-x-6" : "translate-x-1"}`} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}