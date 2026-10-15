"use client";
import { useState } from "react";

const mockDocuments = [
  { id: 1, title: "CSE Department Syllabus 2024", type: "PDF", category: "Syllabus", size: "2.5 MB", uploadedBy: "Dr. Ali", uploadedAt: "2024-01-15", downloads: 45, access: "public" },
  { id: 2, title: "Machine Learning Research Papers Collection", type: "ZIP", category: "Research", size: "120 MB", uploadedBy: "Admin", uploadedAt: "2024-01-10", downloads: 89, access: "department" },
  { id: 3, title: "Previous Year Question Papers - BBA", type: "PDF", category: "Question Papers", size: "15 MB", uploadedBy: "Admin", uploadedAt: "2024-01-05", downloads: 234, access: "batch" },
  { id: 4, title: "Library Rules & Regulations", type: "PDF", category: "Policy", size: "1.2 MB", uploadedBy: "Librarian", uploadedAt: "2023-12-20", downloads: 567, access: "public" },
];

const categories = ["All", "Syllabus", "Research", "Question Papers", "Policy", "Thesis", "Journal"];

export default function RepositoryPage() {
  const [documents, setDocuments] = useState(mockDocuments);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDocs = documents.filter(d => {
    const categoryMatch = filterCategory === "All" || d.category === filterCategory;
    const searchMatch = d.title.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case "PDF": return "📕";
      case "ZIP": return "📦";
      case "DOC": return "📄";
      case "PPT": return "📊";
      default: return "📁";
    }
  };

  const getAccessBadge = (access) => {
    switch (access) {
      case "public": return "bg-green-100 text-green-700";
      case "department": return "bg-blue-100 text-blue-700";
      case "batch": return "bg-purple-100 text-purple-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate1`0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Digital Repository</h1>
          <p className="text-sm text-slate-500 mt-1">Store and manage digital documents, research papers, and archives</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm transition-colors">
          + Upload Document
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Documents", value: documents.length, icon: "📁", color: "bg-indigo-50 border-indigo-200 text-indigo-700" },
          { label: "Total Downloads", value: documents.reduce((sum, d) => sum + d.downloads, 0), icon: "📥", color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Categories", value: categories.length - 1, icon: "📂", color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Storage Used", value: "138.7 MB", icon: "💾", color: "bg-orange-50 border-orange-200 text-orange-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-lg border ${stat.color}`}>
            <span className="text-lg">{stat.icon}</span>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className="text-xs opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 min-w-[250px] px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search documents..." />
        <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-1 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilterCategory(cat)} className={`px-3 py-1.5 rounded-md text-xs font-medium ${filterCategory === cat ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map(doc => (
          <div key={doc.id} className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">{getTypeIcon(doc.type)}</div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-slate-800">{doc.title}</h3>
                <p className="text-xs text-slate-500">{doc.type} • {doc.size}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs">{doc.category}</span>
              <span className={`px-2 py-0.5 rounded text-xs ${getAccessBadge(doc.access)}`}>{doc.access}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>📥 {doc.downloads} downloads</span>
              <span>📅 {doc.uploadedAt}</span>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 text-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded text-xs font-medium hover:bg-blue-100">📥 Download</button>
              <button className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded text-xs hover:bg-slate-100">👁️</button>
              <button className="px-3 py-1.5 bg-red-50 text-red-600 rounded text-xs hover:bg-red-100">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}