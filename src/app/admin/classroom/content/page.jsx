"use client";
import { useState } from "react";

const mockCourses = [
  {
    id: 1, name: "Machine Learning", code: "CSE-401", teacher: "Dr. Ali", chapters: [
      { id: 1, title: "Introduction to ML", status: "published", contents: [
        { id: 1, type: "video", title: "What is Machine Learning?", duration: "45:30", size: "850 MB", status: "published", views: 234 },
        { id: 2, type: "note", title: "ML Basics - PDF Notes", size: "5.2 MB", status: "published", views: 189 },
        { id: 3, type: "video", title: "Types of Learning", duration: "38:15", size: "720 MB", status: "published", views: 210 },
        { id: 4, type: "external", title: "YouTube: ML Explained", url: "https://youtube.com/watch?v=xxx", status: "published", views: 156 },
      ]},
      { id: 2, title: "Supervised Learning", status: "published", contents: [
        { id: 5, type: "video", title: "Linear Regression", duration: "52:00", size: "980 MB", status: "published", views: 198 },
        { id: 6, type: "note", title: "Regression Analysis - PPT", size: "12.5 MB", status: "draft", views: 0 },
      ]},
      { id: 3, title: "Unsupervised Learning", status: "draft", contents: [] },
    ]
  },
  {
    id: 2, name: "Data Structures", code: "CSE-102", teacher: "Dr. Karim", chapters: [
      { id: 4, title: "Arrays and Lists", status: "published", contents: [
        { id: 7, type: "video", title: "Array Operations", duration: "40:00", size: "750 MB", status: "published", views: 345 },
      ]},
    ]
  },
];

export default function ContentManagementPage() {
  const [courses, setCourses] = useState(mockCourses);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [selectedChapter, setSelectedChapter] = useState(courses[0].chapters[0]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [uploadType, setUploadType] = useState("video");
  const [newContent, setNewContent] = useState({ title: "", type: "video", file: null, url: "", notes: "" });
  const [newCourse, setNewCourse] = useState({ name: "", code: "", teacher: "" });
  const [newChapter, setNewChapter] = useState({ title: "" });

  const getTypeIcon = (type) => {
    switch (type) {
      case "video": return "🎥";
      case "note": return "📄";
      case "external": return "🔗";
      case "pdf": return "📕";
      case "ppt": return "📊";
      case "image": return "🖼️";
      case "zip": return "📦";
      default: return "📁";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "video": return "bg-purple-50 text-purple-700 border-purple-200";
      case "note": return "bg-blue-50 text-blue-700 border-blue-200";
      case "external": return "bg-green-50 text-green-700 border-green-200";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusBadge = (status) => {
    return status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700";
  };

  const addCourse = () => {
    const course = {
      id: courses.length + 1,
      ...newCourse,
      chapters: []
    };
    setCourses([...courses, course]);
    setSelectedCourse(course);
    setNewCourse({ name: "", code: "", teacher: "" });
    setShowCourseModal(false);
  };

  const addChapter = () => {
    if (!newChapter.title) return;
    const chapter = {
      id: selectedCourse.chapters.length + 1,
      title: newChapter.title,
      status: "draft",
      contents: []
    };
    const updatedCourse = {
      ...selectedCourse,
      chapters: [...selectedCourse.chapters, chapter]
    };
    setSelectedCourse(updatedCourse);
    setCourses(courses.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    setNewChapter({ title: "" });
  };

  const addContent = () => {
    if (!newContent.title) return;
    const content = {
      id: Date.now(),
      type: uploadType,
      title: newContent.title,
      duration: uploadType === "video" ? "00:00" : undefined,
      size: "0 MB",
      status: "draft",
      views: 0,
      url: newContent.url
    };
    const updatedChapter = {
      ...selectedChapter,
      contents: [...selectedChapter.contents, content]
    };
    const updatedCourse = {
      ...selectedCourse,
      chapters: selectedCourse.chapters.map(c => c.id === updatedChapter.id ? updatedChapter : c)
    };
    setSelectedCourse(updatedCourse);
    setSelectedChapter(updatedChapter);
    setCourses(courses.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    setNewContent({ title: "", type: "video", file: null, url: "", notes: "" });
    setShowUploadModal(false);
  };

  const togglePublish = (type, id) => {
    if (type === "chapter") {
      const updatedChapters = selectedCourse.chapters.map(c =>
        c.id === id ? { ...c, status: c.status === "published" ? "draft" : "published" } : c
      );
      const updatedCourse = { ...selectedCourse, chapters: updatedChapters };
      setSelectedCourse(updatedCourse);
      setCourses(courses.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    } else {
      const updatedContents = selectedChapter.contents.map(c =>
        c.id === id ? { ...c, status: c.status === "published" ? "draft" : "published" } : c
      );
      const updatedChapter = { ...selectedChapter, contents: updatedContents };
      const updatedCourse = {
        ...selectedCourse,
        chapters: selectedCourse.chapters.map(c => c.id === updatedChapter.id ? updatedChapter : c)
      };
      setSelectedCourse(updatedCourse);
      setSelectedChapter(updatedChapter);
      setCourses(courses.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    }
  };

  const deleteContent = (contentId) => {
    const updatedContents = selectedChapter.contents.filter(c => c.id !== contentId);
    const updatedChapter = { ...selectedChapter, contents: updatedContents };
    const updatedCourse = {
      ...selectedCourse,
      chapters: selectedCourse.chapters.map(c => c.id === updatedChapter.id ? updatedChapter : c)
    };
    setSelectedCourse(updatedCourse);
    setSelectedChapter(updatedChapter);
    setCourses(courses.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Content Management</h1>
          <p className="text-sm text-slate-500 mt-1">Create courses, chapters, and upload content</p>
        </div>
        <button onClick={() => setShowCourseModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors">
          + New Course
        </button>
      </div>

      <div className="flex gap-6">
        {/* Course List */}
        <div className="w-64 bg-white rounded-lg border border-slate-200 p-4 flex-shrink-0 h-fit">
          <h3 className="font-bold text-slate-700 mb-3 text-sm">Courses</h3>
          <div className="space-y-2">
            {courses.map(course => (
              <button
                key={course.id}
                onClick={() => { setSelectedCourse(course); setSelectedChapter(course.chapters[0]); }}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedCourse?.id === course.id ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <p className="text-sm font-medium text-slate-800">{course.name}</p>
                <p className="text-xs text-slate-500">{course.code} • {course.teacher}</p>
                <p className="text-xs text-slate-400 mt-1">{course.chapters.length} chapters</p>
              </button>
            ))}
          </div>
        </div>

        {/* Chapter List */}
        <div className="w-64 bg-white rounded-lg border border-slate-200 p-4 flex-shrink-0 h-fit">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-700 text-sm">Chapters</h3>
            <button onClick={addChapter} className="text-blue-600 hover:text-blue-700 text-lg" title="Add Chapter">+</button>
          </div>
          
          {selectedCourse.chapters.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-4">No chapters yet</p>
          ) : (
            <div className="space-y-2">
              {selectedCourse.chapters.map(chapter => (
                <button
                  key={chapter.id}
                  onClick={() => setSelectedChapter(chapter)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedChapter?.id === chapter.id ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-800">{chapter.title}</p>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${getStatusBadge(chapter.status)}`}>
                      {chapter.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{chapter.contents.length} contents</p>
                </button>
              ))}
            </div>
          )}

          {/* Add Chapter Input */}
          <div className="mt-3 pt-3 border-t border-slate-200">
            <input
              type="text"
              value={newChapter.title}
              onChange={(e) => setNewChapter({ title: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && addChapter()}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="New chapter name..."
            />
            <button onClick={addChapter} className="w-full mt-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md text-xs font-medium hover:bg-blue-100">
              + Add Chapter
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {/* Chapter Header */}
          <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800">{selectedChapter?.title || "Select a chapter"}</h2>
                <p className="text-sm text-slate-500">{selectedCourse.name} • {selectedChapter?.contents.length || 0} contents</p>
              </div>
              <div className="flex gap-2">
                {selectedChapter && (
                  <button
                    onClick={() => togglePublish("chapter", selectedChapter.id)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                      selectedChapter.status === "published" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {selectedChapter.status === "published" ? "Unpublish" : "Publish"}
                  </button>
                )}
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  + Add Content
                </button>
              </div>
            </div>
          </div>

          {/* Content List */}
          {!selectedChapter ? (
            <div className="bg-white rounded-lg border border-slate-200 p-12 text-center text-slate-400">
              <span className="text-5xl block mb-4">📂</span>
              <p className="text-sm">Select a chapter to view contents</p>
            </div>
          ) : selectedChapter.contents.length === 0 ? (
            <div className="bg-white rounded-lg border border-slate-200 p-12 text-center text-slate-400">
              <span className="text-5xl block mb-4">📭</span>
              <p className="text-sm">No content added yet</p>
              <button onClick={() => setShowUploadModal(true)} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                + Add First Content
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedChapter.contents.map((content, index) => (
                <div key={content.id} className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl flex-shrink-0">
                      {getTypeIcon(content.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">#{index + 1}</span>
                        <h3 className="text-sm font-medium text-slate-800">{content.title}</h3>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${getTypeColor(content.type)}`}>
                          {content.type}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusBadge(content.status)}`}>
                          {content.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                        {content.duration && <span>⏱️ {content.duration}</span>}
                        {content.size && <span>📁 {content.size}</span>}
                        <span>👁️ {content.views} views</span>
                      </div>
                      {content.url && (
                        <p className="text-xs text-blue-600 mt-1 truncate max-w-md">{content.url}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePublish("content", content.id)}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 bg-blue-50 rounded"
                      >
                        {content.status === "published" ? "Unpublish" : "Publish"}
                      </button>
                      <button className="text-xs text-slate-500 hover:text-slate-700 font-medium px-2 py-1 bg-slate-50 rounded">
                        Edit
                      </button>
                      <button
                        onClick={() => deleteContent(content.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 bg-red-50 rounded"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Add Content</h3>
              <button onClick={() => setShowUploadModal(false)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center">✕</button>
            </div>

            {/* Content Type Selection */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { type: "video", icon: "🎥", label: "Video" },
                { type: "note", icon: "📄", label: "Notes" },
                { type: "pdf", icon: "📕", label: "PDF" },
                { type: "ppt", icon: "📊", label: "PPT" },
                { type: "image", icon: "🖼️", label: "Image" },
                { type: "zip", icon: "📦", label: "ZIP" },
                { type: "external", icon: "🔗", label: "External" },
              ].map(item => (
                <button
                  key={item.type}
                  onClick={() => setUploadType(item.type)}
                  className={`p-3 rounded-lg border text-center transition-colors ${
                    uploadType === item.type ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xl block">{item.icon}</span>
                  <span className="text-[10px] text-slate-600">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Title *</label>
                <input
                  type="text"
                  value={newContent.title}
                  onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Content title..."
                />
              </div>

              {uploadType === "external" ? (
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">External URL *</label>
                  <input
                    type="url"
                    value={newContent.url}
                    onChange={(e) => setNewContent({...newContent, url: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                  <p className="text-xs text-slate-400 mt-1">Supports: YouTube, Vimeo, or any direct URL</p>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Upload File</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <span className="text-4xl block mb-2">📁</span>
                    <p className="text-sm text-slate-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {uploadType === "video" ? "MP4, MOV, AVI (Max 2GB)" : 
                       uploadType === "note" ? "PDF, DOCX, TXT (Max 50MB)" :
                       uploadType === "pdf" ? "PDF (Max 100MB)" :
                       uploadType === "ppt" ? "PPT, PPTX (Max 100MB)" :
                       uploadType === "image" ? "JPG, PNG, GIF (Max 10MB)" :
                       "ZIP, RAR (Max 500MB)"}
                    </p>
                  </div>
                </div>
              )}

              {uploadType === "note" && (
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Rich Text Notes</label>
                  <textarea
                    value={newContent.notes}
                    onChange={(e) => setNewContent({...newContent, notes: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write notes here or upload a file..."
                  />
                </div>
              )}

              <div className="flex gap-3 justify-end pt-2">
                <button onClick={() => setShowUploadModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 text-sm font-medium">
                  Cancel
                </button>
                <button onClick={addContent} disabled={!newContent.title} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50">
                  Add Content
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Create New Course</h3>
              <button onClick={() => setShowCourseModal(false)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Course Name *</label>
                <input type="text" value={newCourse.name} onChange={(e) => setNewCourse({...newCourse, name: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Machine Learning" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Course Code *</label>
                <input type="text" value={newCourse.code} onChange={(e) => setNewCourse({...newCourse, code: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., CSE-401" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Teacher *</label>
                <input type="text" value={newCourse.teacher} onChange={(e) => setNewCourse({...newCourse, teacher: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Dr. Ali" />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button onClick={() => setShowCourseModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 text-sm font-medium">Cancel</button>
                <button onClick={addCourse} disabled={!newCourse.name || !newCourse.code} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50">Create Course</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}