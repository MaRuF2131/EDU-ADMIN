"use client";
import { useState } from "react";
import Link from "next/link";

const stats = {
  todayCollection: 185000,
  monthCollection: 10235500,
  cashPayments: 2450000,
  onlinePayments: 7785500,
  totalReceipts: 1240,
  pendingVerifications: 8
};

const paymentMethods = [
  { value: "Cash", label: "💵 Cash", icon: "💵" },
  { value: "bKash", label: "📱 bKash", icon: "📱" },
  { value: "Nagad", label: "📲 Nagad", icon: "📲" },
  { value: "Rocket", label: "🚀 Rocket", icon: "🚀" },
  { value: "SSLCommerz", label: "🏦 SSLCommerz", icon: "🏦" },
  { value: "Card", label: "💳 Debit/Credit Card", icon: "💳" },
  { value: "Bank Transfer", label: "🏛️ Bank Transfer", icon: "🏛️" },
  { value: "Cheque", label: "📝 Cheque", icon: "📝" },
];

const feeTypeOptions = ["Tuition Fee", "Semester Fee", "Transport Fee", "Hostel Fee", "Exam Fee", "Fine", "Library Fine"];

const initialPayments = [
  { id: 1, receiptId: "RCT-2025-0401", student: "Arif Hossain", studentId: "STD-1012", class: "Class 10 - A", feeType: "Tuition Fee", month: "July", amount: 5000, method: "bKash", txnRef: "BKASH-7M8X9K", date: "2025-07-15", time: "10:32 AM", collectedBy: "System (Auto)", status: "Verified", invoiceId: "INV-2025-0001" },
  { id: 2, receiptId: "RCT-2025-0400", student: "Nusrat Jahan", studentId: "STD-1088", class: "Class 9 - B", feeType: "Semester Fee", month: "July", amount: 12000, method: "SSLCommerz", txnRef: "SSL-TXN-45218", date: "2025-07-15", time: "09:48 AM", collectedBy: "System (Auto)", status: "Verified", invoiceId: "INV-2025-0002" },
  { id: 3, receiptId: "RCT-2025-0399", student: "Sadia Akter", studentId: "STD-1150", class: "Class 8 - A", feeType: "Transport Fee", month: "July", amount: 2500, method: "Cash", txnRef: null, date: "2025-07-15", time: "11:15 AM", collectedBy: "Admin User", status: "Verified", invoiceId: "INV-2025-0004" },
  { id: 4, receiptId: "RCT-2025-0398", student: "Mehedi Hasan", studentId: "STD-1201", class: "Class 10 - B", feeType: "Fine", month: "July", amount: 500, method: "Cash", txnRef: null, date: "2025-07-14", time: "02:30 PM", collectedBy: "Admin User", status: "Verified", invoiceId: "INV-2025-0006" },
  { id: 5, receiptId: "RCT-2025-0397", student: "Rafiq Chowdhury", studentId: "STD-1290", class: "Class 8 - C", feeType: "Tuition Fee", month: "July", amount: 3000, method: "Rocket", txnRef: "RCK-98AB12", date: "2025-07-14", time: "04:00 PM", collectedBy: "System (Auto)", status: "Verified", invoiceId: "INV-2025-0012" },
  { id: 6, receiptId: "RCT-2025-0396", student: "Tanvir Ahmed", studentId: "STD-1177", class: "Class 11 - Com", feeType: "Tuition Fee", month: "June", amount: 2000, method: "Card", txnRef: "CARD-8845XY", date: "2025-07-13", time: "01:22 PM", collectedBy: "System (Auto)", status: "Verified", invoiceId: "INV-2025-0005" },
  { id: 7, receiptId: "RCT-2025-0395", student: "Sharmin Sultana", studentId: "STD-1244", class: "Class 6 - B", feeType: "Tuition Fee", month: "July", amount: 1500, method: "Nagad", txnRef: "NGD-77QR45", date: "2025-07-13", time: "11:05 AM", collectedBy: "System (Auto)", status: "Pending", invoiceId: "INV-2025-0009" },
  { id: 8, receiptId: "RCT-2025-0394", student: "Nadia Haque", studentId: "STD-1275", class: "Class 11 - Arts", feeType: "Hostel Fee", month: "July", amount: 5500, method: "bKash", txnRef: "BKASH-3P4Q7R", date: "2025-07-12", time: "03:45 PM", collectedBy: "System (Auto)", status: "Pending", invoiceId: "INV-2025-0011" },
  { id: 9, receiptId: "RCT-2025-0393", student: "Kamal Uddin", studentId: "STD-1260", class: "Class 9 - A", feeType: "Tuition Fee", month: "July", amount: 3500, method: "Bank Transfer", txnRef: "BT-ACCT-22451", date: "2025-07-12", time: "10:00 AM", collectedBy: "System (Auto)", status: "Pending", invoiceId: null },
  { id: 10, receiptId: "RCT-2025-0392", student: "Imran Kabir", studentId: "STD-1230", class: "Class 12 - Sci", feeType: "Tuition Fee", month: "July", amount: 4500, method: "Cheque", txnRef: "CHQ-008452", date: "2025-07-11", time: "09:30 AM", collectedBy: "Admin User", status: "Bounced", invoiceId: null },
];

const methodBadge = (m) => {
  const map = { "Cash": "bg-green-100 text-green-700", "bKash": "bg-pink-100 text-pink-700", "Nagad": "bg-orange-100 text-orange-700", "Rocket": "bg-purple-100 text-purple-700", "SSLCommerz": "bg-blue-100 text-blue-700", "Card": "bg-sky-100 text-sky-700", "Bank Transfer": "bg-teal-100 text-teal-700", "Cheque": "bg-yellow-100 text-yellow-700" };
  return map[m] || "bg-slate-100 text-slate-600";
};

const statusBadge = (s) => {
  switch (s) {
    case "Verified": return "bg-green-100 text-green-700";
    case "Pending": return "bg-yellow-100 text-yellow-700";
    case "Bounced": return "bg-red-100 text-red-700";
    case "Failed": return "bg-red-100 text-red-700";
    default: return "bg-slate-100 text-slate-600";
  }
};

export default function Payments() {
  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showCollect, setShowCollect] = useState(false);
  const [showReceipt, setShowReceipt] = useState(null);
  const [collectForm, setCollectForm] = useState({ student: "", studentId: "", class: "", feeType: "Tuition Fee", month: "July", amount: "", method: "Cash", txnRef: "", invoiceId: "" });
  const [toast, setToast] = useState("");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const filtered = payments.filter((p) => {
    if (methodFilter && p.method !== methodFilter) return false;
    if (statusFilter && p.status !== statusFilter) return false;
    if (search && !(p.student.toLowerCase().includes(search.toLowerCase()) || p.receiptId.toLowerCase().includes(search.toLowerCase()) || p.studentId.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  const toggleSelect = () => {};

  const handleCollect = () => {
    if (!collectForm.student || !collectForm.amount) {
      showToast("⚠️ Student name & amount required!");
      return;
    }
    const newPayment = {
      id: Date.now(),
      receiptId: `RCT-2025-${String(401 + payments.length).padStart(4, "0")}`,
      student: collectForm.student,
      studentId: collectForm.studentId || "STD-" + Math.floor(Math.random() * 9000 + 1000),
      class: collectForm.class || "N/A",
      feeType: collectForm.feeType,
      month: collectForm.month,
      amount: Number(collectForm.amount),
      method: collectForm.method,
      txnRef: collectForm.txnRef || null,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
      collectedBy: collectForm.method === "Cash" || collectForm.method === "Cheque" ? "Admin User" : "System (Auto)",
      status: collectForm.method === "Cheque" ? "Pending" : "Verified",
      invoiceId: collectForm.invoiceId || null,
    };
    setPayments([newPayment, ...payments]);
    setShowCollect(false);
    setCollectForm({ student: "", studentId: "", class: "", feeType: "Tuition Fee", month: "July", amount: "", method: "Cash", txnRef: "", invoiceId: "" });
    showToast(`✅ Payment ৳${Number(collectForm.amount).toLocaleString()} collected! Receipt: ${newPayment.receiptId}`);
  };

  const verifyPayment = (id) => {
    setPayments(payments.map(p => p.id === id ? { ...p, status: "Verified" } : p));
    showToast("✅ Payment verified!");
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
      {/* ... full code same as saved file — check src/app/admin/finance/payments/page.jsx ... */}
    </div>
  );
}