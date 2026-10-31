"use client";
import { useState } from "react";

const feeStructures = [
  {
    id: 1, name: "Tuition Fee", amount: 25000, frequency: "Per Semester", applicableTo: "All Students", departments: ["All"],
    optional: false, description: "Main academic tuition fee", status: "active",
    collected: 29500000, pending: 1750000, total: 31250000, students: 1250, paidStudents: 1180
  },
  {
    id: 2, name: "Semester Fee", amount: 15000, frequency: "Per Semester", applicableTo: "All Students", departments: ["All"],
    optional: false, description: "Semester registration and exam fee", status: "active",
    collected: 16500000, pending: 2250000, total: 18750000, students: 1250, paidStudents: 1100
  },
  {
    id: 3, name: "Hostel Fee", amount: 8000, frequency: "Per Month", applicableTo: "Hostel Residents", departments: ["All"],
    optional: true, description: "Hostel accommodation fee", status: "active",
    collected: 2320000, pending: 240000, total: 2560000, students: 320, paidStudents: 290
  },
  {
    id: 4, name: "Transport Fee", amount: 5000, frequency: "Per Month", applicableTo: "Transport Users", departments: ["All"],
    optional: true, description: "Bus transport service fee", status: "active",
    collected: 2100000, pending: 150000, total: 2250000, students: 450, paidStudents: 420
  },
  {
    id: 5, name: "Lab Fee", amount: 3000, frequency: "Per Semester", applicableTo: "Science & Engineering", departments: ["CSE", "EEE", "Civil", "Mechanical"],
    optional: false, description: "Laboratory usage and equipment fee", status: "active",
    collected: 3500000, pending: 250000, total: 3750000, students: 800, paidStudents: 750
  },
  {
    id: 6, name: "Library Fee", amount: 1000, frequency: "Per Year", applicableTo: "All Students", departments: ["All"],
    optional: false, description: "Library access and digital repository fee", status: "active",
    collected: 1100000, pending: 150000, total: 1250000, students: 1250, paidStudents: 1100
  },
  {
    id: 7, name: "Development Fee", amount: 5000, frequency: "One Time", applicableTo: "New Students", departments: ["All"],
    optional: false, description: "Campus development contribution (admission only)", status: "active",
    collected: 5000000, pending: 500000, total: 5500000, students: 350, paidStudents: 320
  },
];

const departments = ["All", "CSE", "EEE", "BBA", "Civil", "Mechanical", "Architecture"];

export default function FeesPage() {
  const [fees, setFees] = useState(feeStructures);
  const [showForm, setShowForm] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [filterDept, setFilterDept] = useState("All");
  const [formData, setFormData] = useState({ name: "", amount: 0, frequency: "Per Semester", applicableTo: "All Students", departments: ["All"], optional: false, description: "" });

  const filteredFees = filterDept === "All" ? fees : fees.filter(f => f.departments.includes(filterDept) || f.departments.includes("All"));

  const formatTaka = (amount) => {
    if (amount >= 10000000) return `৳${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `৳${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `৳${(amount / 1000).toFixed(0)}K`;
    return `৳${amount}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFee = {
      id: fees.length + 1,
      ...formData,
      amount: parseInt(formData.amount) || 0,
      status: "active",
      collected: 0, pending: 0, total: 0, students: 0, paidStudents: 0
    };
    setFees([...fees, newFee]);
    setFormData({ name: "", amount: 0, frequency: "Per Semester", applicableTo: "All Students", departments: ["All"], optional: false, description: "" });
    setShowForm(false);
  };

  const toggleFeeStatus = (id) => {
    setFees(fees.map(f => f.id === id ? { ...f, status: f.status === "active" ? "inactive" : "active" } : f));
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Fee Structure</h1>
          <p className="text-sm text-slate-500 mt-1">Define and manage all fee types, amounts, and collection status</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors">
          {showForm ? "✕ Cancel" : "+ Add Fee Type"}
        </button>
      </div>

      {/* Add Fee Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6 shadow-sm">
          <h3 className="font-bold text-slate-700 mb-4">Add New Fee Type</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-500 mb-1">Fee Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Sports Fee" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Amount (৳) *</label>
              <input type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" min="0" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Frequency</label>
              <select value={formData.frequency} onChange={(e) => setFormData({...formData, frequency: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500">
                <option>Per Semester</option><option>Per Month</option><option>Per Year</option><option>One Time</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Applicable To</label>
              <input type="text" value={formData.applicableTo} onChange={(e) => setFormData({...formData, applicableTo: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., All Students" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Department</label>
              <select value={formData.departments[0]} onChange={(e) => setFormData({...formData, departments: [e.target.value]})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500">
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.optional} onChange={(e) => setFormData({...formData, optional: e.target.checked})} className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                <span className="text-sm text-slate-700">Optional Fee</span>
              </label>
              <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-sm">✅ Add Fee</button>
            </div>
          </form>
        </div>
      )}

      {/* Department Filter */}
      <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-1 mb-4 flex-wrap">
        {departments.map(d => (
          <button key={d} onClick={() => setFilterDept(d)} className={`px-3 py-1.5 rounded-md text-xs font-medium ${filterDept === d ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>{d}</button>
        ))}
      </div>

      {/* Fee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFees.map(fee => {
          const collectedPercent = fee.total > 0 ? Math.round((fee.collected / fee.total) * 100) : 0;
          return (
            <div key={fee.id} className={`bg-whiteFrounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow ${fee.status === "inactive" ? "opacity-60" : ""}`}>
              <div className={`px-4 py-3 border-b border-slate-200 ${fee.optional ? "bg-yellow-50" : "bg-blue-50"}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${fee.optional ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>
                      {fee.optional ? "Optional" : "Mandatory"}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${fee.status === "active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>{fee.status}</span>
                  </div>
                  <button onClick={() => toggleFeeStatus(fee.id)} className="text-xs text-slate-500 hover:text-slate-700 font-medium px-2 py-1 bg-slate-100 rounded">
                    {fee.status === "active" ? "Disable" : "Enable"}
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-800 mb-1">{fee.name}</h3>
                <p className="text-xs text-slate-500 mb-3">{fee.description}</p>
                
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-green-700">৳{fee.amount.toLocaleString()}</span>
                  <span className="text-xs text-slate-500">{fee.frequency}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center mb-4">
                  <div className="bg-slate-50 rounded p-2">
                    <p className="text-sm font-bold text-slate-700">{fee.students}</p>
                    <p className="text-[10px] text-slate-500">Students</p>
                  </div>
                  <div className="bg-green-50 rounded p-2">
                    <p className="text-sm font-bold text-green-700">{fee.paidStudents}</p>
                    <p className="text-[10px] text-green-600">Paid</p>
                  </div>
                  <div className="bg-red-50 rounded p-2">
                    <p className="text-sm font-bold text-red-700">{fee.students - fee.paidStudents}</p>
                    <p className="text-[10px] text-red-600">Unpaid</p>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Collected: {formatTaka(fee.collected)}</span>
                    <span>Pending: {formatTaka(fee.pending)}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: `${collectedPercent}%` }}></div>
                  </div>
                  <p className="text-right text-xs text-slate-400 mt-1">{collectedPercent}% collected</p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3 mt-3">
                  <span>📌 {fee.applicableTo}</span>
                  <span>🏢 {fee.departments.join(", ")}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}