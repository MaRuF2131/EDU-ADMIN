"use client";
import { useState } from "react";

const mockEbooks = [
  { id: 1, title: "Machine Learning A-Z", author: "Andrew Ng", format: "PDF", size: "45 MB", pages: 890, downloads: 234, views: 1250, category: "AI & ML", access: "all", uploadedAt: "2024-01-10", thumbnail: null },
  { id: 2, title: "Python Crash Course", author: "Eric Matthes", format: "EPUB", size: "12 MB", pages: 560, downloads: 189, views: 890, category: "Programming", access: "all", uploadedAt: "2024-01-08", thumbnail: null },
  { id: 3, title: "Deep Learning with Python", author: "François Chollet", format: "PDF", size: "38 MB", pages: 750, downloads: 156, views: 678, category: "AI & ML", access: "department", uploadedAt: "2024-01-05", thumbnail: null },
  { id: 4, title: "JavaScript: The Good Parts", author: "Douglas Crockford", format: "PDF", size: "8 MB", pages: 176, downloads: 312, views: 1560, category: "Web Development", access: "all", uploadedAt: "2023-12-20", thumbnail: null },
];

export default function EbooksPage() {
  const [ebooks, setEbooks] = useState(mockEbooks);
  const [showUpload, setShowUpload] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFormat, setFilterFormat] = useState("all");

  const filteredEbooks = ebooks.filter(e => {
    const formatMatch = filterFormat === "all" || e.format === filterFormat;
    const searchMatch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || e.author.toLowerCase().includes(searchTerm.toLowerCase());
    return formatMatch && searchMatch;
  });

  const getFormatColor = (format) => {
    switch (format) {
      case "PDF": return "bg-red-100 text-red-700";
      case "EPUB": return "bg-green-100 text-green-700";
      case "MOBI": return "bg-purple-100 text-purple-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const getAccessBadge = (access) => {
    switch (access) {
      case "all": return "bg-green-100 text-green-700";
      case "department": return "bg-blue-100 text-blue-700";
      case "individual": return "bg-purple-100 text-purple-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const stats = {
    total: ebooks.length,
    totalDownloads: ebooks.reduce((sum, e) => sum + e.downloads, 0),
    totalViews: ebooks.reduce((sum, e) => sum + e.views, 0),
    totalSize: `${(ebooks.reduce((sum, e) => sum + parseInt(e.size), 0)).toLocaleString()} MB`,
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">E-Book Management</h1>
          <p className="text-sm text-slate-500 mt-1">Upload, manage, and track digital books</p>
        </div>
        <button onClick={() => setShowUpload(!showUpload)} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-sm transition-colors">
          {showUpload ? "✕ Cancel" : "+ Upload E-Book"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total E-Books", value: stats.total, icon: "📱", color: "bg-purple-50 border-purple-200 text-purple-700" },
          { label: "Total Downloads", value: stats.totalDownloads, icon: "📥", color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Total Views", value: stats.totalViews, icon: "👁️", color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Storage Used", value: stats.totalSize, icon: "💾", color: "bg-orange-50 border-orange-200 text-orange-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-lg border ${stat.color}`}>
            <span className="text-lg">{stat.icon}</span>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className="text-xs opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Upload Form */}
      {showUpload && (
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6 shadow-sm">
          <h3 className="font-bold text-slate-700 mb-4">Upload New E-Book</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Title *</label>
              <input type="text" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" placeholder="Book title" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Author *</label>
              <input type="text" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" placeholder="Author name" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Category</label>
              <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500">
                <option>AI & ML</option><option>Programming</option><option>Web Development</option><option>Database</option><option>Mathematics</option>
              </select>
            </div>
          </div>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer mb-4">
            <span className="text-4xl block mb-2">📁</span>
            <p className="text-sm text-slate-600">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-400 mt-1">Supports: PDF, EPUB, MOBI (Max 100MB)</p>
          </div>
          <div className="flex gap-3 justify-end">
            <button onClick={() => setShowUpload(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 text-sm font-medium">Cancel</button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium">📤 Upload E-Book</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 max-w-xs px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search e-books..." />
        <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-1">
          {["all", "PDF", "EPUB", "MOBI"].map(fmt => (
            <button key={fmt} onClick={() => setFilterFormat(fmt)} className={`px-3 py-1.5 rounded-md text-sm font-medium ${filterFormat === fmt ? "bg-purple-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
              {fmt === "all" ? "All" : fmt}
            </button>
          ))}
        </div>
      </div>

      {/* E-Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEbooks.map(ebook => (
          <div key={ebook.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-16 bg-white/20 rounded flex items-center justify-center text-2xl backdrop-blur-sm">📱</div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{ebook.title}</h3>
                  <p className="text-purple-200 text-xs">{ebook.author}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getFormatColor(ebook.format)}`}>{ebook.format}</span>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2 text-center mb-3">
                <div className="bg-slate-50 rounded p-2">
                  <p className="text-sm font-bold text-slate-700">{ebook.pages}</p>
                  <p className="text-[10px] text-slate-500">Pages</p>
                </div>
                <div className="bg-green-50 rounded p-2">
                  <p className="text-sm font-bold text-green-700">{ebook.downloads}</p>
                  <p className="text-[10px] text-green-600">Downloads</p>
                </div>
                <div className="bg-blue-50 rounded p-2">
                  <p className="text-sm font-bold text-blue-700">{ebook.views}</p>
                  <p className="text-[10px] text-blue-600">Views</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>📁 {ebook.size}</span>
                <span>📅 {ebook.uploadedAt}</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getAccessBadge(ebook.access)}`}>
                  {ebook.access === "all" ? "🌐 Everyone" : ebook.access === "department" ? "🏢 Department" : "👤 Individual"}
                </span>
                <div className="flex gap-1">
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 bg-blue-50 rounded">Edit</button>
                  <button className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 bg-red-50 rounded">🗑️</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}