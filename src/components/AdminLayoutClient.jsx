// src/components/AdminLayoutClient.jsx
"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AdminLayoutClient({ children, searchQuery }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        searchQuery={searchQuery} // এই লাইনটি যুক্ত করা হলো
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen((pre)=>!pre)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}

