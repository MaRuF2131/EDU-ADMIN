// src/components/Sidebar.jsx
"use client";

import Link from "next/link";
import { sidebarModules } from "@/lib/moduleData"; // আপনার ডাটা পাথ
import SearchInput from "./ModuleSearch";
import { useSidebarStore } from "@/store/useSidebarStore";

export default function Sidebar({ isOpen, onClose }) {
  const searchQuery = useSidebarStore((state) => state.searchQuery);

  let filteredModules = sidebarModules;
  
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredModules = sidebarModules
      .map((mod) => {
        const titleMatch = mod.title.toLowerCase().includes(q);
        const filteredSubs = mod.subMenus
          ?.map((sub) => {
            const subTitleMatch = sub.title.toLowerCase().includes(q);
            const matchedNotes = sub.notes?.filter((note) => note.toLowerCase().includes(q));
            if (subTitleMatch) return sub; 
            if (matchedNotes && matchedNotes.length > 0) return { ...sub, notes: matchedNotes }; 
            return null;
          })
          .filter(Boolean);
        if (titleMatch) return mod;
        if (filteredSubs && filteredSubs.length > 0) return { ...mod, subMenus: filteredSubs };
        return null;
      })
      .filter(Boolean);
  }

  return (
    <>
      {/* মোবাইল ওভারলে - ডেস্কটপে যেন ব্লক না করে তাই lg:hidden দেওয়া হয়েছে */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* মূল সাইডবার */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full bg-slate-900 text-slate-300 shadow-2xl 
          transition-all duration-300 ease-in-out overflow-hidden
          lg:relative lg:z-auto
          
          ${isOpen 
            ? "w-80 translate-x-0" 
            : "w-0 -translate-x-full"
          }
        `}
      >
        {/* ভেতরের ফিক্সড উইডথের কন্টেইনার (টেক্সট স্কুইজ প্রতিরোধ করে) */}
        <div className="w-80 h-full flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-5 border-b border-slate-800 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">E</div>
              <h1 className="text-lg font-bold text-white tracking-wide">Inst. ERP</h1>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white lg:hidden transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Search */}
          <div className="flex-shrink-0 border-b border-slate-800">
            <SearchInput />
          </div>

          {/* Navigation Tree */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin scrollbar-thumb-slate-700">
            {filteredModules.length === 0 ? (
              <p className="text-sm text-slate-500 text-center mt-10">No modules found.</p>
            ) : (
              <ul className="space-y-1">
                {filteredModules.map((module, index) => (
                  <li key={module.id || index} className="mb-2">
                    <details open={!!searchQuery} className="group">
                      <summary className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer list-none transition-colors duration-200 hover:bg-slate-800 ${module.isMainModule ? "text-blue-500 font-bold" : "text-slate-200 font-medium"}`}>
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{module.icon}</span>
                          <span className="text-sm">{module.title}</span>
                        </div>
                        <svg className="w-4 h-4 text-slate-500 transition-transform duration-200 group-open:rotate-90 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </summary>

                      {module.subMenus && module.subMenus.length > 0 && (
                        <ul className="mt-1 ml-4 pl-4 border-l border-slate-700 space-y-1">
                          {module.subMenus.map((sub, subIndex) => {
                            const hasNotes = sub.notes && sub.notes.length > 0;
                            if (!hasNotes) {
                              return (
                                <li key={subIndex}>
                                  <Link href={sub.href} onClick={onClose} className="block px-3 py-2 text-sm text-slate-300 rounded-md transition-all duration-200 hover:text-white hover:bg-slate-800 hover:pl-4 font-medium">
                                    {sub.title}
                                  </Link>
                                </li>
                              );
                            }
                            return (
                              <li key={subIndex}>
                                <details className="group/sub">
                                  <summary className="list-none flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors hover:bg-slate-800/50">
                                    <span className="text-sm text-slate-300 font-medium">{sub.title}</span>
                                    <svg className="w-3.5 h-3.5 text-slate-500 transition-transform duration-200 group-open/sub:rotate-90 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                  </summary>
                                  <div className="pl-3 mt-1 border-l border-slate-800 space-y-2 pb-2">
                                    <Link href={sub.href} onClick={onClose} className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                      Open Page
                                    </Link>
                                    <ul className="space-y-1">
                                      {sub.notes.map((note, noteIndex) => (
                                        <li key={noteIndex} className="text-xs text-slate-500 flex items-start gap-2">
                                          <span className="mt-1.5 h-1 w-1 bg-slate-600 rounded-full flex-shrink-0"></span>
                                          <span>{note}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </details>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </details>
                  </li>
                ))}
              </ul>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
}