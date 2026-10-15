"use client";
import { useState } from "react";
import Link from "next/link";

const stats = {
  totalBooks: 15420,
  totalEbooks: 3250,
  borrowed: 486,
  overdue: 23,
  totalFines: 12500,
  available: 14911,
  totalMembers: 1250,
  newToday: 12
};

const recentActivities = [
  { id: 1, message: "Imran Ahmed borrowed 'Introduction to Algorithms'", time: "5 min ago", icon: "📕" },
  { id: 2, message: "Susmita Das returned 'Database System Concepts' (overdue)", time: "30 min ago", icon: "📥" },
  { id: 3, message: "New e-book added: 'Machine Learning A-Z'", time: "1 hour ago", icon: "📱" },
  { id: 4, message: "RFID scan: 15 books checked at Gate A", time: "2 hours ago", icon: "📡" },
  { id: 5, message: "Fine collected: ৳450 from 3 students", time: "3 hours ago", icon: "💰" },
  { id: 6, message: "QR code generated for 50 new books", time: "4 hours ago", icon: "🔍" },
];

const popularBooks = [
  { name: "Introduction to Algorithms", author: "Cormen", isbn: "978-0262033848", copies: 12, available: 3, borrowed: 9 },
  { name: "Data Structures & Algorithms", author: "Goodrich", isbn: "978-0470383276", copies: 8, available: 2, borrowed: 6 },
  { name: "Machine Learning", author: "Bishop", isbn: "978-0387310732", copies: 6, available: 0, borrowed: 6 },
  { name: "Database Systems", author: "Silberschatz", isbn: "978-0078022159", copies: 10, available: 4, borrowed: 6 },
  { name: "Clean Code", author: "Robert C. Martin", isbn: "978-0132350884", copies: 5, available: 1, borrowed: 4 },
];

const quickActions = [
  { title: "Add Book", icon: "📕", href: "/admin/library/books", color: "from-blue-500 to-blue-600", desc: "Physical book" },
  { title: "Add E-Book", icon: "📱", href: "/admin/library/ebooks", color: "from-purple-500 to-purple-600", desc: "Digital book" },
  { title: "Borrow Book", icon: "📤", href: "/admin/library/transactions", color: "from-green-500 to-green-600", desc: "Issue book" },
  { title: "Return Book", icon: "📥", href: "/admin/library/transactions", color: "from-teal-500 to-teal-600", desc: "Collect book" },
  { title: "Manage Fines", icon: "💰", href: "/admin/library/fines", color: "from-orange-500 to-orange-600", desc: "Fine tracking" },
  { title: "QR / RFID", icon: "📡", href: "/admin/library/qr-rfid", color: "from-cyan-500 to-cyan-600", desc: "Scan & Track" },
  { title: "Repository", icon: "📁", href: "/admin/library/repository", color: "from-indigo-500 to-indigo-600", desc: "Digital archive" },
  { title: "Analytics", icon: "📈", href: "/admin/library/analytics", color: "from-red-500 to-red-600", desc: "Reports" },
];

export default function LibraryDashboard() {
  const [activities] = useState(recentActivities);

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Library Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage books, e-books, borrowing, fines, and digital repository</p>
        </div>
        <Link href="/admin/library/books" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors">
          + Add New Book
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
        {[
          { label: "Total Books", value: stats.totalBooks.toLocaleString(), icon: "📕", color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "E-Books", value: stats.totalEbooks.toLocaleString(), icon: "📱", color: "bg-purple-50 border-purple-200 text-purple-700" },
          { label: "Borrowed", value: stats.borrowed, icon: "📤", color: "bg-orange-50 border-orange-200 text-orange-700" },
          { label: "Overdue", value: stats.overdue, icon: "⚠️", color: "bg-red-50 border-red-200 text-red-700" },
          { label: "Available", value: stats.available.toLocaleString(), icon: "✅", color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Members", value: stats.totalMembers, icon: "👥", color: "bg-teal-50 border-teal-200 text-teal-700" },
          { label: "Total Fines", value: `৳${stats.totalFines.toLocaleString()}`, icon: "💰", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
          { label: "New Today", value: stats.newToday, icon: "🆕", color: "bg-cyan-50 border-cyan-200 text-cyan-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-3 rounded-lg border ${stat.color}`}>
            <span className="text-lg">{stat.icon}</span>
            <p className="text-xl font-bold mt-1">{stat.value}</p>
            <p className="text-[10px] opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-slate-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {quickActions.map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="bg-white rounded-lg border border-slate-200 p-3 hover:shadow-md transition-all group text-center"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-lg mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <p className="text-[10px] font-medium text-slate-700 leading-tight">{action.title}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Popular Books */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-700">Most Borrowed Books</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Book</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Copies</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Available</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {popularBooks.map((book, i) => {
                  const usagePercent = Math.round((book.borrowed / book.copies) * 100);
                  return (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-slate-800">{book.name}</p>
                        <p className="text-xs text-slate-500">{book.author} • {book.isbn.slice(-4)}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-center text-slate-600">{book.copies}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${book.available === 0 ? "bg-red-100 text-red-700" : book.available <= 2 ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                          {book.available}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div className={`h-2 rounded-full ${usagePercent >= 80 ? "bg-red-500" : usagePercent >= 50 ? "bg-yellow-500" : "bg-green-500"}`} style={{ width: `${usagePercent}%` }}></div>
                          </div>
                          <span className="text-xs font-medium text-slate-600 w-8">{usagePercent}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-700">Recent Activities</h2>
          </div>
          <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
            {activities.map(activity => (
              <div key={activity.id} className="p-4 flex items-start gap-3 hover:bg-slate-50">
                <span className="text-xl mt-0.5">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-sm text-slate-700">{activity.message}</p>
                  <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}