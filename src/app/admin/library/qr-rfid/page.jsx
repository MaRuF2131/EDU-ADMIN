"use client";
import { useState } from "react";

const mockScans = [
  { id: 1, type: "RFID", code: "RFID-001234", item: "Introduction to Algorithms", action: "Borrow", user: "Imran Ahmed", time: "2024-01-20 14:30", status: "success" },
  { id: 2, type: "QR", code: "QR-BOOK-0056", item: "Database Systems", action: "Return", user: "Susmita Das", time: "2024-01-20 14:15", status: "success" },
  { id: 3, type: "RFID", code: "RFID-001236", item: "Machine Learning", action: "Gate Check", user: "Unknown", time: "2024-01-20 13:00", status: "alert" },
];

export default function QrRfidPage() {
  const [activeTab, setActiveTab] = useState("scan");
  const [scanInput, setScanInput] = useState("");
  const [scans, setScans] = useState(mockScans);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    if (!scanInput) return;
    setIsScanning(true);
    setTimeout(() => {
      const newScan = {
        id: Date.now(),
        type: scanInput.startsWith("RFID") ? "RFID" : "QR",
        code: scanInput,
        item: "Scanned Book",
        action: "Borrow",
        user: "Current User",
        time: new Date().toLocaleString(),
        status: "success"
      };
      setScans([newScan, ...scans]);
      setScanInput("");
      setIsScanning(false);
    }, 1000);
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">QR Code & RFID</h1>
        <p className="text-sm text-slate-500 mt-1">Scan, generate, and manage QR codes and RFID tags</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-1 mb-6 w-fit">
        {["scan", "generate", "history"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === tab ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
            {tab === "scan" ? "📡 Scan" : tab === "generate" ? "🔍 Generate" : "📋 History"}
          </button>
        ))}
      </div>

      {activeTab === "scan" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="font-bold text-slate-700 mb-4">Scan QR / RFID</h3>
            <div className="mb-4">
              <input
                type="text"
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
                className="w-full px-4 py-3 text-sm border-2 border-blue-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                placeholder="Scan or6 place cursor here and scan..."
                autoFocus
              />
            </div>
            <button onClick={handleScan} disabled={!scanInput || isScanning} className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm disabled:opacity-50">
              {isScanning ? "⏳ Processing..." : "📡 Process Scan"}
            </button>
            <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-5`">💡 Supported formats: QR Code, Barcode, RFID Tag</p>
              <p className="text-xs text-slate-500 mt-1">Auto-detect: The system will recognize the format automatically</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="font-bold text-slate-700 mb-4">Recent Scans9</h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {scans.map(scan => (
                <div key={scan.id} className={`p-3 rounded-lg border ${scan.status === "alert" ? "bg-red-50 border-red-200" : "bg-slate-50 border-slate-200"}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${scan.type === "RFID" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>{scan.type}</span>
                    <span className="text-xs text-slate-400">{scan.time}</span>
                  </div>
                  <p className="text-sm font-mono text-slate-700">{scan.code}</p>
                  <p className="text-xs text-slate-500">{scan.item} • {scan.action} • {scan.user}</p>
                  {scan.status === "alert" && <p className="text-xs text-red-600 font-medium mt-1">⚠️ Alert: Unauthorized removal attempt</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "generate" && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="font-bold text-slate-700 mb-4">Generate QR Codes / RFID Tags</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-700 mb-3">📚 Book QR Codes</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Select Books</label>
                  <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All books without QR</option>
                    <option>Specific book...</option>
                  </select>
                </div>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">🔍 Generate QR Codes</button>
                <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm font-medium">📡 Generate RFID Tags</button>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-slate-700 mb-3">👤 Student Library Cards</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Select Students</label>
                  <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All students</option>
                    <option>Students without card</option>
                  </select>
                </div>
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium">🪪 Generate Library Cards</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Time</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Code</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Item</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">User</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {scans.map(scan => (
                  <tr key={scan.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-600">{scan.time}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs font-medium ${scan.type === "RFID" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>{scan.type}</span></td>
                    <td className="px-4 py-3 text-sm font-mono text-slate-700">{scan.code}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{scan.item}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{scan.user}</td>
                    <td className="px-4 py-3 text-center"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${scan.status === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{scan.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}