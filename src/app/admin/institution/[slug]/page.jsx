"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

// --- METADATA CONFIGURATION ---
// This object defines how the UI should look for each specific module.
// In the future, this data will come from your backend Metadata API.
const moduleConfigs = {
  campus: {
    title: "Campus Management",
    description: "Manage multiple campuses, locations, and admins.",
    fields: [
      { key: "name", label: "Campus Name", type: "text", required: true },
      { key: "code", label: "Campus Code", type: "text", required: true },
      { key: "address", label: "Address", type: "textarea" },
      { key: "lat", label: "Geo Location (Lat)", type: "number" },
      { key: "lng", label: "Geo Location (Lng)", type: "number" },
    ],
    mockData: [
      { id: 1, name: "Main Campus", code: "MC-01", address: "123 Main St", lat: "23.8103", lng: "90.4125" },
      { id: 2, name: "City Campus", code: "CC-02", address: "456 City Ave", lat: "23.7937", lng: "90.4066" },
    ]
  },
  faculty: {
    title: "Faculty Management",
    description: "Manage academic faculties like Science, Arts, etc.",
    fields: [
      { key: "name", label: "Faculty Name", type: "text", required: true },
      { key: "code", label: "Short Code", type: "text", required: true },
    ],
    mockData: [
      { id: 1, name: "Science", code: "SCI" },
      { id: 2, name: "Business", code: "BUS" },
      { id: 3, name: "Arts", code: "ART" },
    ]
  },
  department: {
    title: "Department Management",
    description: "Configure departments, programs, and duration.",
    fields: [
      { key: "name", label: "Department Name", type: "text", required: true },
      { key: "code", label: "Dept Code", type: "text", required: true },
      { key: "program", label: "Program", type: "text" },
      { key: "degree", label: "Degree Offered", type: "select", options: ["BSc", "BA", "BBA", "MSc", "PhD"] },
      { key: "credits", label: "Total Credits", type: "number" },
      { key: "duration", label: "Duration (Years)", type: "number" },
    ],
    mockData: [
      { id: 1, name: "Computer Science", code: "CSE", program: "BS Computer Science", degree: "BSc", credits: 140, duration: 4 },
      { id: 2, name: "English", code: "ENG", program: "BA English", degree: "BA", credits: 120, duration: 3 },
    ]
  },
  batch: {
    title: "Batch Management",
    description: "Manage batch years, semesters, shifts, and sessions.",
    fields: [
      { key: "year", label: "Batch Year", type: "number", required: true },
      { key: "semester", label: "Current Semester", type: "select", options: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"] },
      { key: "shift", label: "Shift", type: "select", options: ["Morning", "Day", "Evening"] },
      { key: "session", label: "Session Name", type: "text" },
    ],
    mockData: [
      { id: 1, year: 2023, semester: "1st", shift: "Morning", session: "2023-2024" },
      { id: 2, year: 2022, semester: "5th", shift: "Day", session: "2022-2023" },
    ]
  },
  section: {
    title: "Section Management",
    description: "Manage sections, assign teachers, and rooms.",
    fields: [
      { key: "name", label: "Section Name (e.g. A, B)", type: "text", required: true },
      { key: "capacity", label: "Student Capacity", type: "number" },
      { key: "teacher", label: "Assigned Teacher", type: "text" },
      { key: "room", label: "Assigned Room No", type: "text" },
    ],
    mockData: [
      { id: 1, name: "Section A", capacity: 40, teacher: "Mr. Karim", room: "Room 101" },
      { id: 2, name: "Section B", capacity: 45, teacher: "Mrs. Jahan", room: "Room 102" },
    ]
  },
  course: {
    title: "Course Management",
    description: "Define courses, assign teachers, and set syllabus.",
    fields: [
      { key: "name", label: "Course Title", type: "text", required: true },
      { key: "code", label: "Course Code", type: "text", required: true },
      { key: "credit", label: "Credits", type: "number" },
      { key: "prerequisite", label: "Prerequisite Course", type: "text" },
      { key: "teacher", label: "Assigned Teacher", type: "text" },
      { key: "outcome", label: "Course Outcome", type: "textarea" },
    ],
    mockData: [
      { id: 1, name: "Data Structures", code: "CSE-201", credit: 3.0, prerequisite: "Introduction to Programming", teacher: "Dr. Ahmed", outcome: "Understand arrays, trees, graphs." },
      { id: 2, name: "Database Management", code: "CSE-301", credit: 3.0, prerequisite: "Data Structures", teacher: "Prof. Islam", outcome: "ERD, SQL, Normalization." },
    ]
  }
};

export default function InstitutionModulePage() {
  // Get the dynamic slug from the URL (e.g., 'campus', 'faculty')
  const params = useParams();
  const slug = params.slug;

  // Fetch the correct configuration for this specific page
  const config = moduleConfigs[slug];

  // State management for data and UI
  const [data, setData] = useState(config?.mockData || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  // If the slug doesn't match any config, show 404
  if (!config) {
    return (
      <div className="p-10 text-center text-slate-500">
        <h1 className="text-2xl font-bold">Module Not Found</h1>
        <p className="mt-2">The configuration for "{slug}" is not defined yet.</p>
      </div>
    );
  }

  // --- HANDLERS ---

  // Initialize form data when opening modal
  const openCreateModal = () => {
    setEditingItem(null);
    // Create empty object with keys from config fields
    const emptyForm = {};
    config.fields.forEach(f => emptyForm[f.key] = f.type === 'number' ? '' : '');
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  // Populate form data when editing
  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  // Handle input changes in the form
  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // Save (Create or Update) logic
  const handleSave = (e) => {
    e.preventDefault();
    if (editingItem) {
      // Update existing item
      setData(prev => prev.map(item => item.id === editingItem.id ? { ...formData, id: item.id } : item));
    } else {
      // Create new item
      const newItem = { ...formData, id: Date.now() };
      setData(prev => [...prev, newItem]);
    }
    setIsModalOpen(false);
  };

  // Delete item logic
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{config.title}</h1>
            <p className="text-sm text-slate-500 mt-1">{config.description}</p>
          </div>
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            Add New
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {config.fields.map(field => (
                    <th key={field.key} className="px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">
                      {field.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 font-semibold text-slate-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={config.fields.length + 1} className="px-4 py-10 text-center text-slate-400">
                      No data found. Click "Add New" to create one.
                    </td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      {config.fields.map(field => (
                        <td key={field.key} className="px-4 py-3 text-slate-700">
                          {item[field.key] || "-"}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-500 hover:text-red-700 font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Overlay & Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h2 className="text-lg font-bold text-slate-800">
                {editingItem ? `Edit ${config.title.slice(0, -1)}` : `Add New ${config.title.slice(0, -1)}`}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Modal Body (Dynamic Form) */}
            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Map over the fields defined in moduleConfigs to generate inputs dynamically */}
              {config.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  
                  {/* Render Text / Number / Email Inputs */}
                  {(field.type === "text" || field.type === "number" || field.type === "email") && (
                    <input
                      type={field.type}
                      value={formData[field.key] || ""}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      required={field.required}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder={`Enter ${field.label}...`}
                    />
                  )}

                  {/* Render Textarea */}
                  {field.type === "textarea" && (
                    <textarea
                      value={formData[field.key] || ""}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder={`Enter ${field.label}...`}
                    />
                  )}

                  {/* Render Select / Dropdown */}
                  {field.type === "select" && (
                    <select
                      value={formData[field.key] || ""}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                    >
                      <option value="">Select {field.label}...</option>
                      {field.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
              
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md text-sm hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 font-medium shadow-sm"
                >
                  {editingItem ? "Update Changes" : "Save Data"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}