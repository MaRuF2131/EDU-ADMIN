"use client";
import { useState } from "react";

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState("compose");
  
  // Compose Message State
  const [messageData, setMessageData] = useState({ to: "all", subject: "", body: "" });
  
  // Complaint Box State
  const [complaints, setComplaints] = useState([
    { id: 1, from: "Abdul Karim", date: "2023-10-25", text: "My son wasn't allowed to enter the campus gate yesterday.", status: "Open" }
  ]);

  // Meeting Schedule State
  const [meetings] = useState([
    { id: 1, title: "Parent-Teacher Meeting (Batch 2023)", date: "2023-11-05", time: "10:00 AM", venue: "Auditorium A" }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    alert(`Message sent to: ${messageData.to}\nSubject: ${messageData.subject}`);
    setMessageData({ to: "all", subject: "", body: "" });
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Guardian Communication</h1>
      
      {/* Tabs */}
      <div className="flex gap-1 bg-white p-1 rounded-lg shadow-sm w-fit mb-6 border border-slate-200">
        {["compose", "meetings", "complaints"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab ? "bg-blue-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Compose Message Tab */}
        {activeTab === "compose" && (
          <form onSubmit={handleSend} className="p-6 space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Send To</label>
                <select value={messageData.to} onChange={e => setMessageData({...messageData, to: e.target.value})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-blue-500">
                  <option value="all">All Guardians</option>
                  <option value="campus-1">Campus 1 Guardians</option>
                  <option value="cse-batch-23">CSE Batch 2023</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Via Channel</label>
                <div className="flex border border-slate-300 rounded-md overflow-hidden">
                  <button type="button" className="flex-1 py-2 text-xs font-medium bg-blue-50 text-blue-700 border-r border-slate-300 hover:bg-blue-100">SMS</button>
                  <button type="button" className="flex-1 py-2 text-xs font-medium bg-green-50 text-green-700 border-r border-slate-300 hover:bg-green-100">Email</button>
                  <button type="button" className="flex-1 py-2 text-xs font-medium bg-purple-50 text-purple-700 hover:bg-purple-100">Push</button>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
              <input type="text" value={messageData.subject} onChange={e => setMessageData({...messageData, subject: e.target.value})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500" placeholder="e.g., Notice for upcoming exam" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message Body</label>
              <textarea rows={6} value={messageData.body} onChange={e => setMessageData({...messageData, body: e.target.value})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500" placeholder="Type your message here..." />
            </div>
            <button type="submit" className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium shadow-sm">
              Send Message
            </button>
          </form>
        )}

        {/* Meetings Tab */}
        {activeTab === "meetings" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-700">Scheduled Meetings</h3>
              <button className="px-3 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-md hover:bg-blue-700">+ Schedule Meeting</button>
            </div>
            <div className="space-y-4">
              {meetings.map(m => (
                <div key={m.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xl">📅</div>
                    <div>
                      <p className="font-semibold text-sm text-slate-800">{m.title}</p>
                      <p className="text-xs text-slate-500">Date: {m.date} • Time: {m.time} • {m.venue}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Upcoming</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Complaints Tab */}
        {activeTab === "complaints" && (
          <div className="p-6">
            <h3 className="font-bold text-slate-700 mb-4">Complaint Box (From Guardians)</h3>
            <div className="space-y-4">
              {complaints.map(c => (
                <div key={c.id} className="p-4 border border-slate-200 rounded-lg bg-white">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-sm text-slate-800">{c.from}</p>
                      <p className="text-[10px] text-slate-400">{c.date}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.status === "Open" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{c.status}</span>
                  </div>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded border border-slate-100">{c.text}</p>
                  <div className="mt-3 flex justify-end gap-2">
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium border border-blue-200 px-3 py-1.5 rounded-md hover:bg-blue-50">Reply</button>
                    <button className="text-xs text-green-600 hover:text-green-800 font-medium border border-green-200 px-3 py-1.5 rounded-md hover:bg-green-50">Mark Resolved</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}