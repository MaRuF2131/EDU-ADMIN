// src/components/SearchInput.jsx
"use client";

import { useSidebarStore } from "@/store/useSidebarStore";
import { useState, useEffect } from "react";

export default function SearchInput() {
  // Zustand Store থেকে State এবং Actions নিয়ে আসা হচ্ছে
  const { searchQuery, setSearchQuery, clearSearch } = useSidebarStore();
  
  // লোকাল স্টেট (ডিবাউন্সিং বা টাইপিং স্মুথ করার জন্য)
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    // ৩০০ মিলিসেকেন্ড পর যদি টাইপ করা বন্ধ হয়, তখন Global State আপডেট হবে
    const timer = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, setSearchQuery]);

  // সার্চ ক্লিয়ার করার ফাংশন
  const handleClear = () => {
    setLocalQuery("");
    clearSearch(); // Store এর ভেতরের clearSearch ফাংশন কল হচ্ছে
  };

  return (
    <div className="relative px-3 py-2">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            className="w-4 h-4 text-gray-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {/* Input Field */}
        <input
          type="text"
          value={localQuery} // এখন লোকাল স্টেট ব্যবহার করা হচ্ছে
          onChange={(e) => setLocalQuery(e.target.value)} // লোকাল স্টেট আপডেট হচ্ছে
          placeholder="Search 32 Modules..."
          className="w-full pl-9 pr-8 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        
        {/* Clear Button (যদি কিছু টাইপ করা থাকে) */}
        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}