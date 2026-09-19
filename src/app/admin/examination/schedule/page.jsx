"use client";
import { useState } from "react";

const mockSchedules = [
  { id: 1, courseCode: "CSE-101", courseName: "Introduction to Programming", date: "2024-01-15", time: "10:00 AM - 1:00 PM", room: "Hall A", semester: "Fall 2023", examiner: "Dr. Ali" },
  { id: 2, courseCode: "CSE-102", courseName: "Data Structures", date: "2024-01-16", time: "10:00 AM - 1:00 PM", room: "Hall B", semester: "Fall 2023", examiner: "Dr. Karim" },
  { id: 3, courseCode: "BBA-201", courseName: "Principles of Marketing", date: "2024-01-15", time: "2:00 PM - 5:00 PM", room: "Hall C", semester: "Fall 2023", examiner: "Dr. Susmita" },
  { id: 4, courseCode: "EE-301", courseName: "Circuit Theory", date: "2024-01-17", time: "10:00 AM - 1:00 PM", room: "Hall A", semester: "Fall 2023", examiner: "Dr. Rahman" },
];

const rooms = ["Hall A", "Hall B", "Hall C", "Lab 1", "Lab 2", "Room 101", "Room 102"];

export default function ExamSchedulePage() {
  const [schedules, setSchedules] = useState(mockSchedules);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    courseCode: "", courseName: "", date: "", timeStart: "", timeEnd: "", room: "", semester: "Fall 2023", examiner: ""
  });
  const [viewMode, setViewMode] = useState("table"); // table or calendar
  const [selectedDate, setSelectedDate] = useState("2024-01-15");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSchedule = {
      id: schedules.length + 1,
      ...formData,
      time: `${formData.timeStart} - ${formData.timeEnd}`
    };
    setSchedules([...schedules, newSchedule]);
    setFormData({ courseCode: "", courseName: "", date: "", timeStart: "", timeEnd: "", room: "", semester: "Fall 2023", examiner: "" });
    setShowForm(false);
  };

  const deleteSchedule = (id) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  // Group schedules by date for calendar view
  const groupedByDate = schedules.reduce((acc, s) => {
    if (!acc[s.date]) acc[s.date] = [];
    acc[s.date].push(s);
    return acc;
  }, {});

  // Check for conflicts
  const getConflicts = (date, time, room) => {
    return schedules.filter(s => s.date === date && s.room === room && s.time === time);
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)]  bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Exam Schedule</h1>
          <p className="text-sm text-slate-500 mt-1">Create and manage examination timetables</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 rounded-lg p-1 flex">
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === "table" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              📋 Table
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === "calendar" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              📅 Calendar
            </button>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors"
          >
            {showForm ? "✕ Cancel" : "+ Add Schedule"}
          </button>
        </div>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6 shadow-sm">
          <h3 className="font-bold text-slate-700 mb-4">Add New Exam Schedule</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Course Code *</label>
              <input
                type="text"
                value={formData.courseCode}
                onChange={(e) => setFormData({...formData, courseCode: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="CSE-101"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Course Name *</label>
              <input
                type="text"
                value={formData.courseName}
                onChange={(e) => setFormData({...formData, courseName: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Introduction to Programming"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Start Time *</label>
              <input
                type="time"
                value={formData.timeStart}
                onChange={(e) => setFormData({...formData, timeStart: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">End Time *</label>
              <input
                type="time"
                value={formData.timeEnd}
                onChange={(e) => setFormData({...formData, timeEnd: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Room/Hall *</label>
              <select
                value={formData.room}
                onChange={(e) => setFormData({...formData, room: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">Select Room</option>
                {rooms.map(room => <option key={room} value={room}>{room}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Examiner</label>
              <input
                type="text"
                value={formData.examiner}
                onChange={(e) => setFormData({...formData, examiner: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Dr. Name"
              />
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-sm transition-colors">
                ✅ Save Schedule
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" ? (
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Course</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Time</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Room</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Examiner</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {schedules.map(schedule => (
                  <tr key={schedule.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-800">{schedule.courseCode}</p>
                      <p className="text-xs text-slate-500">{schedule.courseName}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{schedule.date}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{schedule.time}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">{schedule.room}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{schedule.examiner}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Edit</button>
                        <button onClick={() => deleteSchedule(schedule.id)} className="text-xs text-red-600 hover:text-red-700 font-medium">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Calendar View */
        <div className="space-y-4">
          {Object.entries(groupedByDate).map(([date, exams]) => (
            <div key={date} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-200">
                <h3 className="font-bold text-slate-700">📅 {date}</h3>
                <p className="text-xs text-slate-500">{exams.length} exam(s) scheduled</p>
              </div>
              <div className="divide-y divide-slate-100">
                {exams.map(exam => (
                  <div key={exam.id} className="p-4 flex items-center gap-4 hover:bg-slate-50">
                    <div className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-center min-w-[100px]">
                      <p className="text-sm font-bold">{exam.time.split(' - ')[0]}</p>
                      <p className="text-xs">to</p>
                      <p className="text-sm font-bold">{exam.time.split(' - ')[1]}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{exam.courseCode}: {exam.courseName}</p>
                      <p className="text-xs text-slate-500">Examiner: {exam.examiner}</p>
                    </div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-sm font-medium">{exam.room}</span>
                    <button className="text-xs text-slate-500 hover:text-slate-700">⋯</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}