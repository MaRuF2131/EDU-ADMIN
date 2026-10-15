"use client";
import { useState } from "react";

const mockBooks = [
  { id: 1, title: "Introduction to Algorithms", author: "Thomas H. Cormen", isbn: "978-0262033848", publisher: "MIT Press", edition: "3rd", category: "Computer Science", copies: 12, available: 3, shelf: "A-12", rfid: "RFID-001234", qrCode: true, year: 2009, pages: 1312, condition: "Good" },
  { id: 2, title: "Data Structures and Algorithms", author: "Michael T. Goodrich", isbn: "978-0470383276", publisher: "Wiley", edition: "5th", category: "Computer Science", copies: 8, available: 2, shelf: "A-15", rfid: "RFID-001235", qrCode: true, year: 2014, pages: 736, condition: "Good" },
  { id: 3, title: "Machine Learning", author: "Christopher M. Bishop", isbn: "978-0387310732", publisher: "Springer", edition: "1st", category: "AI & ML", copies: 6, available: 0, shelf: "B-03", rfid: "RFID-001236", qrCode: true, year: 2006, pages: 738, condition: "Excellent" },
  { id: 4, title: "Database System Concepts", author: "Abraham Silberschatz", isbn: "978-0078022159", publisher: "McGraw-Hill", edition: "6th", category: "Database", copies: 10, available: 4, shelf: "A-20", rfid: "RFID-001237", qrCode: false, year: 2010, pages: 1376, condition: "Good" },
  { id: 5, title: "Clean Code", author: "Robert C. Martin", isbn: "978-0132350884", publisher: "Pearson", edition: "1st", category: "Software Engineering", copies: 5, available: 1, shelf: "B-10", rfid: "RFID-001238", qrCode: true, year: 2008, pages: 464, condition: "Fair" },
  { id: 6, title: "Discrete Mathematics", author: "Kenneth H. Rosen", isbn: "978-0073383095", publisher: "McGraw-Hill", edition: "7th", category: "Mathematics", copies: 15, available: 10, shelf: "C-05", rfid: "RFID-001239", qrCode: true, year: 2012, pages: 984, condition: "Good" },
];

const categories = ["All", "Computer Science", "AI & ML", "Database", "Software Engineering", "Mathematics", "Physics", "Business"];

export default function BooksPage() {
  const [books, setBooks] = useState(mockBooks);
  const [showForm, setShowForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [viewMode, setViewMode] = useState("table");
  const [formData, setFormData] = useState({ title: "", author: "", isbn: "", publisher: "", edition: "1st", category: "Computer Science", copies: 1, shelf: "", year: 2024, pages: 0 });

  const filteredBooks = books.filter(b => {
    const categoryMatch = filterCategory === "All" || b.category === filterCategory;
    const searchMatch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || b.author.toLowerCase().includes(searchTerm.toLowerCase()) || b.isbn.includes(searchTerm);
    return categoryMatch && searchMatch;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      id: books.length + 1,
      ...formData,
      available: formData.copies,
      rfid: `RFID-${String(Date.now()).slice(-6)}`,
      qrCode: false,
      condition: "New",
    };
    setBooks([newBook, ...books]);
    setFormData({ title: "", author: "", isbn: "", publisher: "", edition: "1st", category: "Computer Science", copies: 1, shelf: "", year: 2024, pages: 0 });
    setShowForm(false);
  };

  const deleteBook = (id) => {
    if (confirm("Delete this book?")) setBooks(books.filter(b => b.id !== id));
  };

  const getAvailabilityColor = (available, copies) => {
    if (available === 0) return "bg-red-100 text-red-700";
    if (available <= copies * 0.3) return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  const getConditionBadge = (condition) => {
    switch (condition) {
      case "Excellent": return "bg-green-100 text-green-700";
      case "Good": return "bg-blue-100 text-blue-700";
      case "Fair": return "bg-yellow-100 text-yellow-700";
      case "Poor": return "bg-red-100 text-red-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Book Management</h1>
          <p className="text-sm text-slate-500 mt-1">Add, edit, and manage physical books with QR/RFID</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors">
          {showForm ? "✕ Cancel" : "+ Add Book"}
        </button>
      </div>

      {/* Add Book Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6 shadow-sm">
          <h3 className="font-bold text-slate-700 mb-4">Add New Book</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-500 mb-1">Title *</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Author *</label>
              <input type="text" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">ISBN *</label>
              <input type="text" value={formData.isbn} onChange={(e) => setFormData({...formData, isbn: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Publisher</label>
              <input type="text" value={formData.publisher} onChange={(e) => setFormData({...formData, publisher: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Edition</label>
              <input type="text" value={formData.edition} onChange={(e) => setFormData({...formData, edition: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Category</label>
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500">
                {categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Copies *</label>
              <input type="number" value={formData.copies} onChange={(e) => setFormData({...formData, copies: parseInt(e.target.value) || 1})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" min="1" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Shelf Location</label>
              <input type="text" value={formData.shelf} onChange={(e) => setFormData({...formData, shelf: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., A-12" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Year</label>
              <input type="number" value={formData.year} onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Pages</label>
              <input type="number" value={formData.pages} onChange={(e) => setFormData({...formData, pages: parseInt(e.target.value)})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex items-end">
              <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-sm">✅ Add Book</button>
            </div>
          </form>
        </div>
      )}

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <div className="flex-1 min-w-[250px]">
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search by title, author, ISBN..." />
        </div>
        <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-1 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilterCategory(cat)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${filterCategory === cat ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-1">
          <button onClick={() => setViewMode("table")} className={`px-3 py-1.5 rounded-md text-sm font-medium ${viewMode === "table" ? "bg-slate-200" : ""}`}>📋</button>
          <button onClick={() => setViewMode("grid")} className={`px-3 py-1.5 rounded-md text-sm font-medium ${viewMode === "grid" ? "bg-slate-200" : ""}`}>🔲</button>
        </div>
      </div>

      {/* Books Display */}
      {viewMode === "table" ? (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Book</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Category</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Copies</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Available</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Shelf</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">RFID</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Condition</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBooks.map(book => (
                  <tr key={book.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-800">{book.title}</p>
                      <p className="text-xs text-slate-500">{book.author} • {book.isbn}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-medium">{book.category}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-slate-600">{book.copies}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getAvailabilityColor(book.available, book.copies)}`}>
                        {book.available}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{book.shelf}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs font-mono text-slate-500">{book.rfid}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getConditionBadge(book.condition)}`}>{book.condition}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex gap-1 justify-center">
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 bg-blue-50 rounded">Edit</button>
                        <button onClick={() => deleteBook(book.id)} className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 bg-red-50 rounded">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map(book => (
            <div key={book.id} className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded flex items-center justify-center text-2xl flex-shrink-0">📕</div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-800">{book.title}</h3>
                  <p className="text-xs text-slate-500">{book.author}</p>
                  <p className="text-xs text-slate-400">ISBN: {book.isbn}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center mb-3">
                <div className="bg-slate-50 rounded p-2">
                  <p className="text-sm font-bold text-slate-700">{book.copies}</p>
                  <p className="text-[10px] text-slate-500">Copies</p>
                </div>
                <div className={`${book.available === 0 ? "bg-red-50" : "bg-green-50"} rounded p-2`}>
                  <p className={`text-sm font-bold ${book.available === 0 ? "text-red-700" : "text-green-700"}`}>{book.available}</p>
                  <p className="text-[10px] text-slate-500">Available</p>
                </div>
                <div className="bg-blue-50 rounded p-2">
                  <p className="text-sm font-bold text-blue-700">{book.shelf}</p>
                  <p className="text-[10px] text-slate-500">Shelf</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getConditionBadge(book.condition)}`}>{book.condition}</span>
                <div className="flex gap-2">
                  {book.qrCode && <span className="text-xs text-blue-500" title="QR Code available">🔍</span>}
                  <span className="text-xs text-slate-400" title="RFID">📡</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}