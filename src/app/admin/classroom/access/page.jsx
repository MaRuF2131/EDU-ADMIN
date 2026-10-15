"use client";
import { useState } from "react";

const mockCourses = [
  { id: 1, name: "Machine Learning", code: "CSE-401" },
  { id: 2, name: "Data Structures", code: "CSE-102" },
  { id: 3, name: "Database Systems", code: "CSE-301" },
];

const accessLevels = [
  { id: "university", label: "Entire University", icon: "🏛️" },
  { id: "department", label: "Department", icon: "🏢" },
  { id: "batch", label: "Batch", icon: "📅" },
  { id: "section", label: "Section", icon: "👥" },
  { id: "individual", label: "Individual Student", icon: "👤" },
];

export default function AccessControlPage() {
  const [selectedCourse, setSelectedCourse] = useState(mockCourses[0]);
  const [accessSettings, setAccessSettings] = useState({
    accessLevel: "department",
    departments: ["CSE"],
    batches: ["2020-2021", "2021-2022"],
    sections: ["A", "B"],
    individuals: [],
    visibility: "published",
    allowDownload: true,
    allowShare: false,
    watermark: true,
    expiryDate: "2024-06-30",
    viewOnly: false,
    resumePosition: true,
    playbackSpeed: true,
    subtitles: true,
    bookmark: true,
  });

  const updateSetting = (key, value) => {
    setAccessSettings(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (key, item) => {
    const arr = accessSettings[key];
    if (arr.includes(item)) {
      updateSetting(key, arr.filter(i => i !== item));
    } else {
      updateSetting(key, [...arr, item]);
    }
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Access & Visibility Control</h1>
          <p className="text-sm text-slate-500 mt-1">Control who can see and interact with content</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm transition-colors">
          💾 Save Settings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Course Selection */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 h-fit">
          <h3 className="font-bold text-slate-700 mb-3 text-sm">Select Course</h3>
          <div className="space-y-2">
            {mockCourses.map(course => (
              <button
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedCourse?.id === course.id ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <p className="text-sm font-medium text-slate-800">{course.name}</p>
                <p className="text-xs text-slate-500">{course.code}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Access Level Selection */}
        <div className="lg:col-span-3 space-y-6">
          {/* Access Level */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="font-bold text-slate-700 mb-4">🎯 Who Can Access This Course?</h3>
            <div className="grid grid-cols-5 gap-3 mb-6">
              {accessLevels.map(level => (
                <button
                  key={level.id}
                  onClick={() => updateSetting("accessLevel", level.id)}
                  className={`p-4 rounded-lg border text-center transition-all ${
                    accessSettings.accessLevel === level.id
                      ? "border-blue-500 bg-blue-50 shadow-md scale-105"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-2xl block mb-2">{level.icon}</span>
                  <span className="text-xs font-medium text-slate-700">{level.label}</span>
                </button>
              ))}
            </div>

            {/* Dynamic Selection Based on Level */}
            {accessSettings.accessLevel === "department" && (
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-2">Select Departments</label>
                <div className="flex flex-wrap gap-2">
                  {["CSE", "BBA", "EEE", "Civil", "Mechanical", "Architecture"].map(dept => (
                    <button
                      key={dept}
                      onClick={() => toggleArrayItem("departments", dept)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        accessSettings.departments.includes(dept)
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {accessSettings.accessLevel === "batch" && (
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-2">Select Batches</label>
                <div className="flex flex-wrap gap-2">
                  {["2019-2020", "2020-2021", "2021-2022", "2022-2023", "2023-2024"].map(batch => (
                    <button
                      key={batch}
                      onClick={() => toggleArrayItem("batches", batch)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        accessSettings.batches.includes(batch)
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {batch}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {accessSettings.accessLevel === "section" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2">Select Batches</label>
                  <div className="flex flex-wrap gap-2">
                    {["2020-2021", "2021-2022", "2022-2023"].map(batch => (
                      <button
                        key={batch}
                        onClick={() => toggleArrayItem("batches", batch)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          accessSettings.batches.includes(batch) ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {batch}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2">Select Sections</label>
                  <div className="flex flex-wrap gap-2">
                    {["A", "B", "C", "D"].map(section => (
                      <button
                        key={section}
                        onClick={() => toggleArrayItem("sections", section)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          accessSettings.sections.includes(section) ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        Section {section}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {accessSettings.accessLevel === "individual" && (
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-2">Select Students</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                  placeholder="Search by name or ID..."
                />
                <div className="flex flex-wrap gap-2">
                  {accessSettings.individuals.length > 0 ? (
                    accessSettings.individuals.map((student, i) => (
                      <span key={i} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1">
                        {student}
                        <button onClick={() => toggleArrayItem("individuals", student)} className="hover:text-red-600">✕</button>
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">No students selected</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Content Visibility */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="font-bold text-slate-700 mb-4">👁️ Content Visibility</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { id: "published", label: "Published", icon: "🟢", desc: "Visible to students" },
                { id: "draft", label: "Draft", icon: "🟡", desc: "Hidden from students" },
                { id: "scheduled", label: "Scheduled", icon: "📅", desc: "Publish on date" },
              ].map(status => (
                <button
                  key={status.id}
                  onClick={() => updateSetting("visibility", status.id)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    accessSettings.visibility === status.id ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xl block">{status.icon}</span>
                  <p className="text-sm font-medium text-slate-800 mt-1">{status.label}</p>
                  <p className="text-xs text-slate-500">{status.desc}</p>
                </button>
              ))}
            </div>

            {accessSettings.visibility === "scheduled" && (
              <div className="max-w-xs">
                <label className="block text-xs font-medium text-slate-500 mb-1">Schedule Publish Date</label>
                <input
                  type="datetime-local"
                  value={accessSettings.expiryDate}
                  onChange={(e) => updateSetting("expiryDate", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Permissions */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="font-bold text-slate-700 mb-4">🔒 Content Permissions</h3>
              <div className="space-y-4">
                {[
                  { key: "viewOnly", label: "View Only (No Download)", icon: "👁️" },
                  { key: "allowDownload", label: "Allow Download", icon: "📥" },
                  { key: "allowShare", label: "Allow Sharing", icon: "🔗" },
                  { key: "watermark", label: "Add Watermark", icon: "💧" },
                ].map(item => (
                  <label key={item.key} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span className="text-sm text-slate-700">{item.label}</span>
                    </div>
                    <button
                      onClick={() => updateSetting(item.key, !accessSettings[item.key])}
                      className={`w-10 h-5 rounded-full transition-colors ${accessSettings[item.key] ? "bg-blue-600" : "bg-slate-300"}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${accessSettings[item.key] ? "translate-x-5" : "translate-x-1"}`}></div>
                    </button>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="font-bold text-slate-700 mb-4">🎥 Video Features</h3>
              <div className="space-y-4">
                {[
                  { key: "resumePosition", label: "Resume from Last Position", icon: "⏯️" },
                  { key: "playbackSpeed", label: "Change Playback Speed", icon: "⚡" },
                  { key: "subtitles", label: "View Subtitles", icon: "💬" },
                  { key: "bookmark", label: "Bookmark Important Parts", icon: "🔖" },
                ].map(item => (
                  <label key={item.key} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span className="text-sm text-slate-700">{item.label}</span>
                    </div>
                    <button
                      onClick={() => updateSetting(item.key, !accessSettings[item.key])}
                      className={`w-10 h-5 rounded-full transition-colors ${accessSettings[item.key] ? "bg-blue-600" : "bg-slate-300"}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${accessSettings[item.key] ? "translate-x-5" : "translate-x-1"}`}></div>
                    </button>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Expiry */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="font-bold text-slate-700 mb-4">⏰ Access Expiry</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 max-w-xs">
                <label className="block text-xs font-medium text-slate-500 mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={accessSettings.expiryDate}
                  onChange={(e) => updateSetting("expiryDate", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1 max-w-xs">
                <label className="block text-xs font-medium text-slate-500 mb-1">Action After Expiry</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Hide content completely</option>
                  <option>View only, no download</option>
                  <option>Show expiry notice</option>
                </select>
              </div>
            </div>
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-700">⚠️ Content will be automatically hidden from students after the expiry date.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}