"use client";
import { useState } from "react";

// Mock data representing a weekly grid
const mockWorkload = [
  { id: 1, name: "Dr. Ayesha", totalHours: 18, maxHours: 24, slots: [
    { day: "Sat", time: "10:00 AM", hours: 2, type: "Lecture", course: "CSE-401" },
    { day: "Sat", time: "02:00 PM", hours: 2, type: "Lab", course: "CSE-401" },
    { day: "Sun", time: "10:00 AM", hours: 2, type: "Lecture", course: "CSE-501" },
    { day: "Mon", time: "04:00 PM", hours: 2, type: "Meeting", course: "Dept. Meeting" },
  ]},
  { id: 2, name: "Md. Rassel", totalHours: 14, maxHours: 24, slots: [
    { day: "Sun", time: "10:00 AM", hours: 3, type: "Lecture", course: "MKT-201" },
    { day: "Tue", time: "02:00 PM", hours: 2, type: "Lecture", course: "MKT-201" },
    { day: "Wed", time: "10:00 AM", hours: 3, type: "Lecture", course: "MKT-301" },
    { day: "Thu", time: "02:00 PM", hours: 3, type: "Lab", course: "MKT-201" },
    { day: "Fri", time: "10:00 AM", hours: 3, type: "Exam Duty", course: "Midterm" },
  ]}
];

const daysOrder = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const typeColors = { "Lecture": "bg-blue-500", "Lab": "bg-purple-500", "Meeting": "bg-yellow-500", "Exam Duty": "bg-red-500", "Office Hour": "bg-green-500" };

export default function WorkloadPage() {
  const [data] = useState(mockWorkload);
  const [selectedTeacherId, setSelectedTeacherId] = useState(1);
  const currentTeacher = data.find(t => t.id === selectedTeacherId);
  
  // Calculate load percentage
  const loadPercentage = currentTeacher ? Math.round((currentTeacher.totalHours / currentTeacher.maxHours) * 100) : 0;
  const loadColor = loadPercentage > 85 ? "text-red-600 bg-red-50 border-red-200" : loadPercentage > 60 ? "text-yellow-600 bg-yellow-50 border-yellow-200" : "text-green-600 bg-green-50 border-green-200";

  // Build grid structure for visual representation
  const buildGrid = () => {
    const grid = {};
    daysOrder.forEach(d => grid[d] = []);
    if (currentTeacher) {
      currentTeacher.slots.forEach(slot => {
        if (!grid[slot.day]) grid[slot.day] = [];
        grid[slot.day].push(slot);
      });
    }
    return grid;
  };

  const gridData = buildGrid();

  return (
    <div className="p-6 h-[color:calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Teacher Workload Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Teacher Select */}
        <div className="lg:col-span-1 bg-white p-4 rounded-lg border border-slate-200 shadow-sm h-fit">
          <h3 className="text-sm font-bold text-slate-700 mb-3 border-b pb-2">Select Teacher</h3>
          <div className="space-y-2">
            {data.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTeacherId(t.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm transition-colors border ${selectedTeacherId === t.id ? "border-blue-500 bg-blue-50 text-blue-700 font-medium" : "border-slate-200 hover:bg-slate-50 text-slate-600"}`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="lg:col-span-3 grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Weekly Hours</p>
              <p className="text-2xl font-bold text-slate-800">{currentTeacher?.totalHours || 0}h</p>
            </div>
            <div className="w-12 h-12 relative">
              <svg className="w-12 h-12 -rotate-90">
                <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-200" />
                <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="3" className="text-blue-500" strokeDasharray="31.4" strokeDashoffset={`${31.4 - (loadPercentage / 100) * 31.4}`} transform="rotate(-90 6 6)" />
              </svg>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500">Max Capacity</p>
            <p className="text-2xl font-bold text-slate-800">{currentTeacher?.maxHours || 0}h</p>
          </div>
          <div className={`p-4 rounded-lg border shadow-sm flex flex-col items-center justify-center ${loadColor}`}>
            <p className="text-xs font-bold uppercase tracking-wider opacity-80">Load Status</p>
            <p className="text-2xl font-bold mt-1">{loadPercentage}%</p>
          </div>
        </div>
      </div>

      {/* Weekly Grid Visualization */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="">Weekly Workload Grid - {currentTeacher?.name}</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-2 font-semibold text-slate-600 w-20 border-r border-slate-200">Time / Day</th>
                {daysOrder.map(d => (
                  <th key={d} className="p-2 font-semibold text-slate-600 w-32 border-l border-slate-200">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Generate time slots from 8 AM to 8 PM */}
              {Array.from({ length: 25 }, (_, i) => {
                const hour = 8 + Math.floor(i / 2);
                const min = i % 2 === 0 ? "00" : "30";
                const time = `${hour > 12 ? hour - 12 : hour}:${min} ${hour >= 12 ? "PM" : "AM"}`;
                
                return (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-2 font-medium text-slate-700 border-r border-slate-200">{time}</td>
                    {daysOrder.map(day => {
                      const slot = gridData[day]?.find(s => s.time === time);
                      if (slot) {
                        return (
                          <td key={day} className="p-1 border-l border-slate-100">
                            <div className={`${typeColors[slot.type]} text-white text-[10px] px-2 py-1 rounded-md text-center font-medium truncate`}>
                              {slot.course}
                              <div className="text-[8px] opacity-80 text-center">{slot.type}</div>
                            </div>
                          </td>
                        );
                      }
                      return <td key={day} className="border-l border-slate-100"></td>;
                    })}
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