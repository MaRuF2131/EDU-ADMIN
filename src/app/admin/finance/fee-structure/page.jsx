"use client";
import { useState } from "react";
import Link from "next/link";

const stats = {
  totalFeeHeads: 24,
  activeClasses: 12,
  transportRoutes: 8,
  hostelSeats: 240,
  monthlyEstimate: 8500000,
  annualEstimate: 102000000
};

const feeCategories = [
  { id: "tuition", name: "Tuition Fee", icon: "🎓", color: "from-green-500 to-emerald-600", desc: "Monthly class fee" },
  { id: "semester", name: "Semester Fee", icon: "📚", color: "from-blue-500 to-indigo-600", desc: "Per semester exam & misc" },
  { id: "transport", name: "Transport Fee", icon: "🚌", color: "from-yellow-500 to-orange-500", desc: "Route wise bus fee" },
  { id: "hostel", name: "Hostel Fee", icon: "🏠", color: "from-purple-500 to-violet-600", desc: "Seat, mess & utility" },
  { id: "fine", name: "Fine & Penalty", icon: "⚠️", color: "from-red-500 to-rose-600", desc: "Late & damage charges" },
];

// Tuition Fee — class wise
const tuitionFees = [
  { id: 1, class: "Play - KG 2", monthly: 1500, admission: 5000, exam: 800, total: 7300, students: 145, active: true },
  { id: 2, class: "Class 1 - 2", monthly: 2000, admission: 6000, exam: 1000, total: 9000, students: 320, active: true },
  { id: 3, class: "Class 3 - 5", monthly: 2500, admission: 8000, exam: 1200, total: 11700, students: 385, active: true },
  { id: 4, class: "Class 6 - 8", monthly: 3000, admission: 10000, exam: 1500, total: 14500, students: 410, active: true },
  { id: 5, class: "Class 9 - 10", monthly: 3500, admission: 12000, exam: 2000, total: 17500, students: 295, active: true },
  { id: 6, class: "Class 11 - 12 (Science)", monthly: 4500, admission: 15000, exam: 2500, total: 22000, students: 180, active: true },
  { id: 7, class: "Class 11 - 12 (Commerce)", monthly: 4000, admission: 14000, exam: 2200, total: 20200, students: 120, active: true },
  { id: 8, class: "Class 11 - 12 (Arts)", monthly: 3500, admission: 12000, exam: 2000, total: 17500, students: 65, active: false },
];

// Semester Fee — semester wise
const semesterFees = [
  { id: 1, semester: "1st Semester", class: "Class 6 - 8", formFillup: 300, examFee: 700, marking: 200, certificate: 100, total: 1300, students: 410 },
  { id: 2, semester: "1st Semester", class: "Class 9 - 10", formFillup: 400, examFee: 900, marking: 300, certificate: 150, total: 1750, students: 295 },
  { id: 3, semester: "1st Semester", class: "Class 11 - 12", formFillup: 500, examFee: 1200, marking: 400, certificate: 200, total: 2300, students: 365 },
  { id: 4, semester: "2nd Semester", class: "Class 6 - 8", formFillup: 300, examFee: 700, marking: 200, certificate: 0, total: 1200, students: 410 },
  { id: 5, semester: "2nd Semester", class: "Class 9 - 10", formFillup: 400, examFee: 900, marking: 300, certificate: 0, total: 1600, students: 295 },
  { id: 6, semester: "2nd Semester", class: "Class 11 - 12", formFillup: 500, examFee: 1200, marking: 400, certificate: 0, total: 2100, students: 365 },
  { id: 7, semester: "Test Exam", class: "Class 10 & 12", formFillup: 300, examFee: 800, marking: 300, certificate: 0, total: 1400, students: 660 },
  { id: 8, semester: "Board Exam (SSC/HSC)", class: "Class 10 & 12", formFillup: 800, examFee: 2500, marking: 0, certificate: 500, total: 3800, students: 660 },
];

// Transport Fee — route wise
const transportRoutes = [
  { id: 1, route: "Route A - Uttara Sector 7", stops: 6, vehicle: "Bus (40 seat)", monthly: 2500, occupied: 38, capacity: 40, driver: "Karim Mia", active: true },
  { id: 2, route: "Route B - Mirpur 10", stops: 8, vehicle: "Bus (40 seat)", monthly: 2500, occupied: 35, capacity: 40, driver: "Jashim Uddin", active: true },
  { id: 3, route: "Route C - Banani", stops: 5, vehicle: "Microbus (18 seat)", monthly: 3000, occupied: 16, capacity: 18, driver: "Sohel Rana", active: true },
  { id: 4, route: "Route D - Gulshan 2", stops: 4, vehicle: "Microbus (18 seat)", monthly: 3000, occupied: 18, capacity: 18, driver: "Alam Sheikh", active: true },
  { id: 5, route: "Route E - Dhanmondi", stops: 7, vehicle: "Bus (40 seat)", monthly: 2200, occupied: 28, capacity: 40, driver: "Rafiq Islam", active: true },
  { id: 6, route: "Route F - Mohammadpur", stops: 6, vehicle: "Bus (40 seat)", monthly: 2200, occupied: 22, capacity: 40, driver: "Nasir Khan", active: true },
  { id: 7, route: "Route G - Badda", stops: 5, vehicle: "Microbus (18 seat)", monthly: 2800, occupied: 12, capacity: 18, driver: "Habib Mian", active: false },
  { id: 8, route: "Route H - Khilkhet", stops: 4, vehicle: "Microbus (18 seat)", monthly: 2800, occupied: 9, capacity: 18, driver: "Jahangir Alam", active: true },
];

// Hostel Fee — package wise
const hostelPackages = [
  { id: 1, package: "Single AC Room", type: "AC", seats: 20, occupied: 18, monthly: 12000, admission: 15000, mess: 4500, utility: 1500 },
  { id: 2, package: "Double AC Room", type: "AC", seats: 60, occupied: 54, monthly: 8000, admission: 10000, mess: 4500, utility: 1200 },
  { id: 3, package: "Triple Non-AC Room", type: "Non-AC", seats: 120, occupied: 102, monthly: 5500, admission: 8000, mess: 4500, utility: 800 },
  { id: 4, package: "Four Seat Non-AC", type: "Non-AC", seats: 40, occupied: 36, monthly: 4500, admission: 6000, mess: 4500, utility: 600 },
];

// Fine types
const fineTypes = [
  { id: 1, name: "Late Payment Fine", icon: "⏰", rate: "৳50/day", maxFine: 2000, applies: "Tuition, Transport, Hostel", gracePeriod: "10 days", active: true },
  { id: 2, name: "Library Late Fine", icon: "📕", rate: "৳10/day", maxFine: 500, applies: "Book return overdue", gracePeriod: "0 days", active: true },
  { id: 3, name: "Book Damage/Loss", icon: "💧", rate: "100% of book price", maxFine: 0, applies: "Library books", gracePeriod: "-", active: true },
  { id: 4, name: "Exam Form Late Fine", icon: "📝", rate: "৳500 flat", maxFine: 500, applies: "Semester/Board exam", gracePeriod: "7 days", active: true },
  { id: 5, name: "Hostel Late Return", icon: "🌙", rate: "৳200/night", maxFine: 2000, applies: "Hostel students", gracePeriod: "0 days", active: true },
  { id: 6, name: "ID Card Replacement", icon: "🪪", rate: "৳200 flat", maxFine: 200, applies: "All students", gracePeriod: "-", active: true },
];

const classOptions = ["Play - KG 2", "Class 1 - 2", "Class 3 - 5", "Class 6 - 8", "Class 9 - 10", "Class 11 - 12 (Science)", "Class 11 - 12 (Commerce)", "Class 11 - 12 (Arts)"];

export default function FeeStructure() {
  const [category, setCategory] = useState("tuition");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [tuition, setTuition] = useState(tuitionFees);
  const [semester, setSemester] = useState(semesterFees);
  const [routes, setRoutes] = useState(transportRoutes);
  const [hostel, setHostel] = useState(hostelPackages);
  const [fines, setFines] = useState(fineTypes);
  const [form, setForm] = useState({});
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const openAdd = () => {
    setEditItem(null);
    setForm(category === "tuition" ? { class: "", monthly: "", admission: "", exam: "" }
      : category === "semester" ? { semester: "", class: "", formFillup: "", examFee: "", marking: "", certificate: "" }
      : category === "transport" ? { route: "", stops: "", vehicle: "", monthly: "", driver: "" }
      : category === "hostel" ? { package: "", type: "Non-AC", seats: "", monthly: "", admission: "", mess: "", utility: "" }
      : { name: "", rate: "", maxFine: "", applies: "", gracePeriod: "" });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({ ...item });
    setShowModal(true);
  };

  const handleSave = () => {
    if (category === "tuition") {
      if (editItem) {
        setTuition(tuition.map(t => t.id === editItem.id ? { ...t, ...form, total: (Number(form.monthly) || 0) + (Number(form.admission) || 0) + (Number(form.exam) || 0) } : t));
        showToast("✅ Tuition fee updated!");
      } else {
        const total = (Number(form.monthly) || 0) + (Number(form.admission) || 0) + (Number(form.exam) || 0);
        setTuition([...tuition, { id: Date.now(), ...form, total, students: 0, active: true }]);
        showToast("✅ Tuition fee added!");
      }
    } else if (category === "semester") {
      const total = (Number(form.formFillup) || 0) + (Number(form.examFee) || 0) + (Number(form.marking) || 0) + (Number(form.certificate) || 0);
      if (editItem) {
        setSemester(semester.map(s => s.id === editItem.id ? { ...s, ...form, total } : s));
        showToast("✅ Semester fee updated!");
      } else {
        setSemester([...semester, { id: Date.now(), ...form, total, students: 0 }]);
        showToast("✅ Semester fee added!");
      }
    } else if (category === "transport") {
      if (editItem) {
        setRoutes(routes.map(r => r.id === editItem.id ? { ...r, ...form, occupied: Number(form.occupied) || r.occupied } : r));
        showToast("✅ Route updated!");
      } else {
        setRoutes([...routes, { id: Date.now(), ...form, occupied: 0, capacity: Number(form.capacity) || 40, active: true }]);
        showToast("✅ Route added!");
      }
    } else if (category === "hostel") {
      if (editItem) {
        setHostel(hostel.map(h => h.id === editItem.id ? { ...h, ...form } : h));
        showToast("✅ Package updated!");
      } else {
        setHostel([...hostel, { id: Date.now(), ...form, occupied: 0 }]);
        showToast("✅ Package added!");
      }
    } else {
      if (editItem) {
        setFines(fines.map(f => f.id === editItem.id ? { ...f, ...form } : f));
        showToast("✅ Fine type updated!");
      } else {
        setFines([...fines, { id: Date.now(), ...form, icon: "⚠️", active: true }]);
        showToast("✅ Fine type added!");
      }
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (category === "tuition") setTuition(tuition.filter(t => t.id !== id));
    else if (category === "semester") setSemester(semester.filter(s => s.id !== id));
    else if (category === "transport") setRoutes(routes.filter(r => r.id !== id));
    else if (category === "hostel") setHostel(hostel.filter(h => h.id !== id));
    else setFines(fines.filter(f => f.id !== id));
    showToast("🗑️ Deleted successfully!");
  };

  const toggleActive = (id) => {
    if (category === "tuition") setTuition(tuition.map(t => t.id === id ? { ...t, active: !t.active } : t));
    else if (category === "transport") setRoutes(routes.map(r => r.id === id ? { ...r, active: !r.active } : r));
    else setFines(fines.map(f => f.id === id ? { ...f, active: !f.active } : f));
    showToast("Status changed!");
  };

  const activeCat = feeCategories.find(c => c.id === category);
  const inputCls = "w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";
  const labelCls = "block text-xs font-semibold text-slate-600 mb-1";

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">🏗️ Fee Structure</h1>
          <p className="text-sm text-slate-500 mt-1">Manage tuition, semester, transport, hostel fees &amp; fine policies</p>
        </div>
        <button onClick={openAdd} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm transition-colors">
          + Add {activeCat.name}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {[
          { label: "Total Fee Heads", value: stats.totalFeeHeads, icon: "🏗️", color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Active Classes", value: stats.activeClasses, icon: "🏫", color: "bg-purple-50 border-purple-200 text-purple-700" },
          { label: "Transport Routes", value: stats.transportRoutes, icon: "🚌", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
          { label: "Hostel Seats", value: stats.hostelSeats, icon: "🛏️", color: "bg-pink-50 border-pink-200 text-pink-700" },
          { label: "Monthly Estimate", value: `৳${(stats.monthlyEstimate / 100000).toFixed(1)}L`, icon: "📅", color: "bg-teal-50 border-teal-200 text-teal-700" },
          { label: "Annual Estimate", value: `৳${(stats.annualEstimate / 10000000).toFixed(1)}Cr`, icon: "📈", color: "bg-green-50 border-green-200 text-green-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-3 rounded-lg border ${stat.color}`}>
            <span className="text-lg">{stat.icon}</span>
            <p className="text-xl font-bold mt-1">{stat.value}</p>
            <p className="text-[10px] opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {feeCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`bg-white rounded-lg border-2 p-4 text-left transition-all ${category === cat.id ? "border-emerald-500 shadow-md" : "border-slate-200 hover:border-slate-300 hover:shadow"}`}
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-lg mb-2`}>
              {cat.icon}
            </div>
            <p className="text-sm font-bold text-slate-800">{cat.name}</p>
            <p className="text-[10px] text-slate-500">{cat.desc}</p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4 flex items-center gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search..."
          className="px-4 py-2 border border-slate-300 rounded-lg text-sm w-64 focus:outline-none focus:border-emerald-500"
        />
        <span className="text-xs text-slate-500">Showing <b>{category === "tuition" ? tuition.filter(t => t.class.toLowerCase().includes(search.toLowerCase())).length : category === "semester" ? semester.filter(s => (s.class + s.semester).toLowerCase().includes(search.toLowerCase())).length : category === "transport" ? routes.filter(r => r.route.toLowerCase().includes(search.toLowerCase())).length : category === "hostel" ? hostel.filter(h => h.package.toLowerCase().includes(search.toLowerCase())).length : fines.filter(f => f.name.toLowerCase().includes(search.toLowerCase())).length}</b> records</span>
      </div>

      {/* TUITION TABLE */}
      {category === "tuition" && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-700">🎓 Class-wise Tuition Fee Structure</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Class Group</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Monthly</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Admission</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Exam</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">One-time Total</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Students</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tuition.filter(t => t.class.toLowerCase().includes(search.toLowerCase())).map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm font-medium text-slate-800">{t.class}</td>
                    <td className="px-4 py-3 text-sm text-center text-slate-600">৳{Number(t.monthly).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-center text-slate-600">৳{Number(t.admission).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-center text-slate-600">৳{Number(t.exam).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-center font-bold text-slate-800">৳{Number(t.total).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-center text-slate-600">{t.students}</td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => toggleActive(t.id)} className={`px-2 py-0.5 rounded-full text-xs font-medium ${t.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                        {t.active ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => openEdit(t)} className="text-blue-600 hover:text-blue-800 text-sm mr-2">✏️</button>
                      <button onClick={() => handleDelete(t.id)} className="text-red-500 hover:text-red-700 text-sm">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SEMESTER TABLE */}
      {category === "semester" && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-700">📚 Semester Fee Structure</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Semester</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Class</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Form Fill-up</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Exam Fee</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Marking</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Certificate</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Total</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Students</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {semester.filter(s => (s.class + s.semester).toLowerCase().includes(search.toLowerCase())).map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-slate-800">{s.semester}</span>
                      {(s.semester === "Board Exam (SSC/HSC)" || s.semester === "Test Exam") && <span className="ml-1 text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">Important</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{s.class}</td>
                    <td className="px-4 py-3 text-sm text-center text-slate-600">৳{Number(s.formFillup).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-center text-slate-600">৳{Number(s.examFee).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-center text-slate-600">৳{Number(s.marking).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-center text-slate-600">৳{Number(s.certificate).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-center font-bold text-slate-800">৳{Number(s.total).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-center text-slate-600">{s.students}</td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => openEdit(s)} className="text-blue-600 hover:text-blue-800 text-sm mr-2">✏️</button>
                      <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-700 text-sm">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TRANSPORT TABLE */}
      {category === "transport" && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-700">🚌 Transport Route &amp; Fee Management</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Route</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Stops</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Vehicle</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Driver</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Monthly Fee</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Occupancy</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {routes.filter(r => r.route.toLowerCase().includes(search.toLowerCase())).map((r) => {
                  const occ = Math.round((r.occupied / r.capacity) * 100);
                  return (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-800">{r.route}</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-600">{r.stops}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{r.vehicle}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{r.driver}</td>
                      <td className="px-4 py-3 text-sm text-center font-bold text-slate-800">৳{Number(r.monthly).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-200 rounded-full h-2 max-w-[100px]">
                            <div className={`h-2 rounded-full ${occ >= 90 ? "bg-red-500" : occ >= 60 ? "bg-yellow-500" : "bg-green-500"}`} style={{ width: `${occ}%` }}></div>
                          </div>
                          <span className="text-xs text-slate-600 w-16">{r.occupied}/{r.capacity}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => toggleActive(r.id)} className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                          {r.active ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => openEdit(r)} className="text-blue-600 hover:text-blue-800 text-sm mr-2">✏️</button>
                        <button onClick={() => handleDelete(r.id)} className="text-red-500 hover:text-red-700 text-sm">🗑️</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* HOSTEL TABLE */}
      {category === "hostel" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200">
              <h2 className="font-bold text-slate-700">🏠 Hostel Package &amp; Fee Management</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Package</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Monthly</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Admission</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Mess</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Utility</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Seats</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {hostel.filter(h => h.package.toLowerCase().includes(search.toLowerCase())).map((h) => (
                    <tr key={h.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-slate-800">{h.package}</p>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${h.type === "AC" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>{h.type}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-center font-bold text-slate-800">৳{Number(h.monthly).toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-600">৳{Number(h.admission).toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-600">৳{Number(h.mess).toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-600">৳{Number(h.utility).toLocaleString()}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs font-medium ${h.occupied >= h.seats ? "text-red-600" : "text-slate-600"}`}>{h.occupied}/{h.seats}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => openEdit(h)} className="text-blue-600 hover:text-blue-800 text-sm mr-2">✏️</button>
                        <button onClick={() => handleDelete(h.id)} className="text-red-500 hover:text-red-700 text-sm">🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="p-4 border-b border-slate-200">
              <h2 className="font-bold text-slate-700">🛏️ Seat Occupancy</h2>
            </div>
            <div className="p-4 space-y-4">
              {hostel.map((h) => {
                const pct = Math.round((h.occupied / h.seats) * 100);
                return (
                  <div key={h.id}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-slate-700">{h.package}</span>
                      <span className="text-slate-500">{pct}%</span>
                    </div>
                    <div className="bg-slate-200 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full ${pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-yellow-500" : "bg-green-500"}`} style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                );
              })}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mt-4">
                <p className="text-xs font-semibold text-emerald-800">Total Hostel Revenue (Monthly)</p>
                <p className="text-xl font-bold text-emerald-700 mt-1">৳{hostel.reduce((sum, h) => sum + h.occupied * (Number(h.monthly) + Number(h.mess) + Number(h.utility)), 0).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FINE TABLE */}
      {category === "fine" && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-700">⚠️ Fine &amp; Penalty Policy</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Fine Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Rate</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Max Limit</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Applies To</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Grace Period</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {fines.filter(f => f.name.toLowerCase().includes(search.toLowerCase())).map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{f.icon}</span>
                        <span className="text-sm font-medium text-slate-800">{f.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{f.rate}</td>
                    <td className="px-4 py-3 text-sm text-center text-slate-600">{Number(f.maxFine) > 0 ? `৳${Number(f.maxFine).toLocaleString()}` : "—"}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{f.applies}</td>
                    <td className="px-4 py-3 text-sm text-center text-slate-600">{f.gracePeriod}</td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => toggleActive(f.id)} className={`px-2 py-0.5 rounded-full text-xs font-medium ${f.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                        {f.active ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => openEdit(f)} className="text-blue-600 hover:text-blue-800 text-sm mr-2">✏️</button>
                      <button onClick={() => handleDelete(f.id)} className="text-red-500 hover:text-red-700 text-sm">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-slate-200 sticky top-0 bg-white">
              <h3 className="font-bold text-slate-800">{editItem ? `✏️ Edit ${activeCat.name}` : `➕ Add ${activeCat.name}`}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
            </div>
            <div className="p-4 space-y-3">
              {category === "tuition" && (
                <>
                  <div>
                    <label className={labelCls}>Class Group *</label>
                    {editItem ? <input className={inputCls} value={form.class || ""} onChange={(e) => setForm({ ...form, class: e.target.value })} /> : (
                      <select className={inputCls} value={form.class || ""} onChange={(e) => setForm({ ...form, class: e.target.value })}>
                        <option value="">Select class group</option>
                        {classOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div><label className={labelCls}>Monthly Fee *</label><input type="number" className={inputCls} value={form.monthly || ""} onChange={(e) => setForm({ ...form, monthly: e.target.value })} placeholder="3000" /></div>
                    <div><label className={labelCls}>Admission Fee</label><input type="number" className={inputCls} value={form.admission || ""} onChange={(e) => setForm({ ...form, admission: e.target.value })} placeholder="10000" /></div>
                    <div><label className={labelCls}>Exam Fee</label><input type="number" className={inputCls} value={form.exam || ""} onChange={(e) => setForm({ ...form, exam: e.target.value })} placeholder="1500" /></div>
                  </div>
                </>
              )}
              {category === "semester" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Semester *</label>
                      <select className={inputCls} value={form.semester || ""} onChange={(e) => setForm({ ...form, semester: e.target.value })}>
                        <option value="">Select semester</option>
                        {["1st Semester", "2nd Semester", "Test Exam", "Board Exam (SSC/HSC)", "Model Test"].map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Class *</label>
                      <select className={inputCls} value={form.class || ""} onChange={(e) => setForm({ ...form, class: e.target.value })}>
                        <option value="">Select class</option>
                        {classOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div><label className={labelCls}>Form Fill-up</label><input type="number" className={inputCls} value={form.formFillup || ""} onChange={(e) => setForm({ ...form, formFillup: e.target.value })} placeholder="300" /></div>
                    <div><label className={labelCls}>Exam Fee</label><input type="number" className={inputCls} value={form.examFee || ""} onChange={(e) => setForm({ ...form, examFee: e.target.value })} placeholder="700" /></div>
                    <div><label className={labelCls}>Marking</label><input type="number" className={inputCls} value={form.marking || ""} onChange={(e) => setForm({ ...form, marking: e.target.value })} placeholder="200" /></div>
                    <div><label className={labelCls}>Certificate</label><input type="number" className={inputCls} value={form.certificate || ""} onChange={(e) => setForm({ ...form, certificate: e.target.value })} placeholder="100" /></div>
                  </div>
                </>
              )}
              {category === "transport" && (
                <>
                  <div><label className={labelCls}>Route Name *</label><input className={inputCls} value={form.route || ""} onChange={(e) => setForm({ ...form, route: e.target.value })} placeholder="Route I - Uttara Sector 13" /></div>
                  <div className="grid grid-cols-3 gap-3">
                    <div><label className={labelCls}>Stops</label><input type="number" className={inputCls} value={form.stops || ""} onChange={(e) => setForm({ ...form, stops: e.target.value })} placeholder="5" /></div>
                    <div>
                      <label className={labelCls}>Vehicle</label>
                      <select className={inputCls} value={form.vehicle || ""} onChange={(e) => setForm({ ...form, vehicle: e.target.value })}>
                        <option value="">Select</option>
                        {["Bus (40 seat)", "Microbus (18 seat)", "Mini Bus (26 seat)"].map((v) => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                    <div><label className={labelCls}>Monthly Fee *</label><input type="number" className={inputCls} value={form.monthly || ""} onChange={(e) => setForm({ ...form, monthly: e.target.value })} placeholder="2500" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className={labelCls}>Driver Name</label><input className={inputCls} value={form.driver || ""} onChange={(e) => setForm({ ...form, driver: e.target.value })} placeholder="Karim Mia" /></div>
                    <div><label className={labelCls}>Capacity</label><input type="number" className={inputCls} value={form.capacity || ""} onChange={(e) => setForm({ ...form, capacity: e.target.value })} placeholder="40" /></div>
                  </div>
                </>
              )}
              {category === "hostel" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className={labelCls}>Package Name *</label><input className={inputCls} value={form.package || ""} onChange={(e) => setForm({ ...form, package: e.target.value })} placeholder="Double AC Room" /></div>
                    <div>
                      <label className={labelCls}>Type</label>
                      <select className={inputCls} value={form.type || "Non-AC"} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                        <option value="AC">AC</option>
                        <option value="Non-AC">Non-AC</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div><label className={labelCls}>Seats</label><input type="number" className={inputCls} value={form.seats || ""} onChange={(e) => setForm({ ...form, seats: e.target.value })} placeholder="60" /></div>
                    <div><label className={labelCls}>Monthly *</label><input type="number" className={inputCls} value={form.monthly || ""} onChange={(e) => setForm({ ...form, monthly: e.target.value })} placeholder="8000" /></div>
                    <div><label className={labelCls}>Mess</label><input type="number" className={inputCls} value={form.mess || ""} onChange={(e) => setForm({ ...form, mess: e.target.value })} placeholder="4500" /></div>
                    <div><label className={labelCls}>Utility</label><input type="number" className={inputCls} value={form.utility || ""} onChange={(e) => setForm({ ...form, utility: e.target.value })} placeholder="1200" /></div>
                  </div>
                  <div><label className={labelCls}>Admission Fee</label><input type="number" className={inputCls} value={form.admission || ""} onChange={(e) => setForm({ ...form, admission: e.target.value })} placeholder="10000" /></div>
                </>
              )}
              {category === "fine" && (
                <>
                  <div><label className={labelCls}>Fine Name *</label><input className={inputCls} value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Late Payment Fine" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className={labelCls}>Rate *</label><input className={inputCls} value={form.rate || ""} onChange={(e) => setForm({ ...form, rate: e.target.value })} placeholder="৳50/day or ৳500 flat" /></div>
                    <div><label className={labelCls}>Max Limit</label><input type="number" className={inputCls} value={form.maxFine || ""} onChange={(e) => setForm({ ...form, maxFine: e.target.value })} placeholder="2000" /></div>
                  </div>
                  <div><label className={labelCls}>Applies To</label><input className={inputCls} value={form.applies || ""} onChange={(e) => setForm({ ...form, applies: e.target.value })} placeholder="Tuition, Transport, Hostel" /></div>
                  <div><label className={labelCls}>Grace Period</label><input className={inputCls} value={form.gracePeriod || ""} onChange={(e) => setForm({ ...form, gracePeriod: e.target.value })} placeholder="10 days" /></div>
                </>
              )}
            </div>
            <div className="flex gap-3 p-4 border-t border-slate-200 sticky bottom-0 bg-white">
              <button onClick={handleSave} className="flex-1 bg-emerald-600 text-white py-2.5 rounded-lg hover:bg-emerald-700 font-medium text-sm transition-colors">
                {editItem ? "Update" : "Save"} {activeCat.name}
              </button>
              <button onClick={() => setShowModal(false)} className="px-6 border border-slate-300 text-slate-600 py-2.5 rounded-lg hover:bg-slate-50 font-medium text-sm transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-slate-800 text-white px-4 py-3 rounded-lg shadow-lg text-sm font-medium z-50 animate-bounce">
          {toast}
        </div>
      )}
    </div>
  );
}
