"use client";
import { useState } from "react";

export default function IdManagementPage() {
  // Card configuration state
  const [config, setConfig] = useState({
    showQR: true,
    showBarcode: false,
    orientation: "landscape", // landscape or portrait
    primaryColor: "#1e3a8a", // Institutional Blue
  });

  const handleToggle = (key) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Student ID Card Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Settings */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg border border-slate-200 h-fit">
          <h3 className="font-bold text-slate-700 mb-4 border-b pb-2">Card Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Include QR Code</span>
              <button onClick={() => handleToggle("showQR")} className={`w-10 h-5 rounded-full transition-colors ${config.showQR ? "bg-blue-600" : "bg-slate-300"}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${config.showQR ? "translate-x-5" : "translate-x-1"}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Include Barcode</span>
              <button onClick={() => handleToggle("showBarcode")} className={`w-10 h-5 rounded-full transition-colors ${config.showBarcode ? "bg-blue-600" : "bg-slate-300"}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${config.showBarcode ? "translate-x-5" : "translate-x-1"}`}></div>
              </button>
            </div>

            <div>
              <span className="text-sm text-slate-600 block mb-2">Orientation</span>
              <div className="flex gap-2">
                <button onClick={() => setConfig(p => ({...p, orientation: "landscape"}))} className={`px-3 py-1.5 text-xs rounded border ${config.orientation === "landscape" ? "bg-blue-50 border-blue-500 text-blue-700" : "border-slate-300"}`}>Landscape</button>
                <button onClick={() => setConfig(p => ({...p, orientation: "portrait"}))} className={`px-3 py-1.5 text-xs rounded border ${config.orientation === "portrait" ? "bg-blue-50 border-blue-500 text-blue-700" : "border-slate-300"}`}>Portrait</button>
              </div>
            </div>

            <div>
              <span className="text-sm text-slate-600 block mb-2">Card Color</span>
              <input type="color" value={config.primaryColor} onChange={(e) => setConfig(p => ({...p, primaryColor: e.target.value}))} className="w-full h-10 rounded cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="lg:col-span-2 bg-slate-100 p-8 flex items-center justify-center rounded-lg border border-dashed border-slate-300">
          
          {/* The ID Card UI */}
          <div className={`bg-white shadow-2xl rounded-xl overflow-hidden flex ${config.orientation === "landscape" ? "w-[500px] h-[280px]" : "w-[320px] h-[450px] flex-col"}`}>
            {/* Header */}
            <div className="h-8 flex items-center px-4 text-white text-xs font-bold" style={{ backgroundColor: config.primaryColor }}>
              <span className="flex-1">PRESTIGE UNIVERSITY</span>
              <span>STUDENT IDENTITY CARD</span>
            </div>
            
            <div className="flex-1 flex p-4 gap-4">
              {/* Left Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">Name</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">IMRAN AHMED</p>
                </div>
                <div className="space-y-2 mt-4">
                  <div>
                    <p className="text-[10px] text-slate-500">Department</p>
                    <p className="text-xs font-semibold text-slate-700">Computer Science</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500">Session</p>
                    <p className="text-xs font-semibold text-slate-700">2021-2025</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500">Blood Group</p>
                    <p className="text-xs font-semibold text-slate-700">B+</p>
                  </div>
                </div>
              </div>
              
              {/* Right Content: Avatar & QR/Barcode */}
              <div className="flex flex-col items-center justify-between w-28">
                {/* Placeholder Avatar */}
                <div className="w-20 h-24 rounded-lg bg-slate-200 border-2 border-slate-300 flex items-center justify-center text-2xl text-slate-400">
                  👤
                </div>
                
                {/* QR Code Box */}
                {config.showQR && (
                  <div className="w-20 h-20 bg-slate-100 border border-slate-200 rounded flex items-center justify-center">
                    <svg className="w-16 h-16 text-slate-800" viewBox="0 0 24 24" fill="currentColor"><path d="M3 11h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2zM3 15h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2z"/></svg>
                  </div>
                )}
                
                {/* Barcode Box */}
                {config.showBarcode && (
                  <div className="w-24 h-10 bg-white border border-slate-200 rounded flex items-center justify-center overflow-hidden">
                    <div className="flex gap-px h-5">
                      {[...Array(30)].map((_, i) => (
                        <div key={i} className={`w-[2px] h-full ${i % 3 === 0 ? "bg-slate-900" : i % 3 === 1 ? "bg-slate-300" : "bg-slate-900"}`}></div>
                      ))}
                    </div>
                    <p className="text-[8px] text-slate-600 tracking-[0.2em] mt-0.5">STU-0001 2025</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}