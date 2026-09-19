"use client";
import { useState } from "react";

export default function PortalAccessPage() {
  // State for portal permissions
  const [permissions, setPermissions] = useState({
    viewResults: true,
    payFeesOnline: true,
    communicateTeachers: false,
    downloadDocuments: true,
  });

  // Mock Generated Credentials
  const mockCredentials = [
    { user: "Abdul Karim", username: "guardian.abdul", password: "pass@1234" },
    { user: "Fatema Begum", username: "guardian.fatema", password: "pass@5678" },
  ];

  const handleToggle = (key) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Guardian Portal Access</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Access Control Toggles */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm h-fit">
          <h3 className="text-sm font-bold text-slate-700 mb-2">Portal Features Control</h3>
          <p className="text-xs text-slate-500 mb-6 bg-slate-50 p-3 rounded border border-slate-200">
            Toggle these switches ON/OFF. If disabled, the guardian will not see these modules in their portal.
          </p>
          
          <div className="space-y-4">
            {[
              { key: "viewResults", label: "View Academic Results", icon: "📊", desc: "See exam marks, CGPA, transcripts" },
              { key: "payFeesOnline", label: "Pay Fees Online", icon: "💳", desc: "Via Payment Gateway" },
              { key: "communicateTeachers", label: "Teacher Communication", icon: "💬", desc: "Direct messaging with teachers" },
              { key: "downloadDocuments", label: "Download Documents", icon: "📥", desc: "Admit cards, syllabus, certificates" },
            ].map(item => (
              <div key={item.key} className="flex items-start gap-4 p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
                <button
                  onClick={() => handleToggle(item.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 mt-1 ${permissions[item.key] ? "bg-blue-600" : "bg-slate-300"}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${permissions[item.key] ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Generated Credentials */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-4">Login Credentials (Auto-Generated)</h3>
          <p className="text-xs text-slate-500 mb-4 bg-blue-50 border border-blue-100 p-3 rounded">
            Send these credentials to guardians via SMS/Email so they can log into the Guardian Portal.
          </p>
          
          <div className="space-y-4">
            {mockCredentials.map((cred) => (
              <div key={cred.username} className="p-4 border border-dashed border-slate-300 rounded-lg bg-slate-50">
                <p className="text-xs font-bold text-slate-500 mb-2 uppercase">Guardian: {cred.user}</p>
                <div className="grid grid-cols-2 gap-4 bg-white p-3 rounded border border-slate-200">
                  <div>
                    <p className="text-[10px] text-slate-400">USERNAME</p>
                    <p className="text-sm font-mono font-bold text-slate-800 break-all">{cred.username}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">PASSWORD</p>
                    <p className="text-sm font-mono font-bold text-slate-800">{cred.password}</p>
                  </div>
                </div>
                <button className="mt-2 text-xs text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8l4-4m0 0l-4 4m4-4h8m-4-8v8m-4-8h8m-4-8a2 2 0 00-2-2V6a2 2 0 012-2h8m-4-8h8" /></svg>
                  Send Credentials
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}