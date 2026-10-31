
"use client";
import { useState } from "react";

const initialPayments = [
  {
    id: "PAY-001",
    student: "Fatima Begum",
    studentId: "STU-002",
    program: "Need Based Financial Support",
    amount: 15000,
    method: "Bank Transfer",
    date: "2026-10-20",
    status: "Paid",
    transaction: "TRX-88201",
  },
  {
    id: "PAY-002",
    student: "Rahim Uddin",
    studentId: "STU-001",
    program: "Merit Excellence Scholarship",
    amount: 25000,
    method: "Mobile Banking",
    date: "2026-10-22",
    status: "Pending",
    transaction: "—",
  },
  {
    id: "PAY-003",
    student: "Imran Ahmed",
    studentId: "STU-003",
    program: "Government Education Grant",
    amount: 20000,
    method: "Bank Transfer",
    date: "2026-10-24",
    status: "Processing",
    transaction: "TRX-88203",
  },
  {
    id: "PAY-004",
    student: "Karim Hossain",
    studentId: "STU-005",
    program: "NGO Education Support",
    amount: 30000,
    method: "Mobile Banking",
    date: "2026-10-25",
    status: "Paid",
    transaction: "TRX-88204",
  },
];

export default function DisbursementsPage() {
  const [payments, setPayments] = useState(initialPayments);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = payments.filter((payment) => {
    const matchesFilter = filter === "All" || payment.status === filter;

    const matchesSearch =
      payment.student.toLowerCase().includes(search.toLowerCase()) ||
      payment.id.toLowerCase().includes(search.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const updatePayment = (id, status) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === id
          ? {
              ...payment,
              status,
              transaction:
                status === "Paid" && payment.transaction === "—"
                  ? `TRX-${Date.now().toString().slice(-6)}`
                  : payment.transaction,
            }
          : payment
      )
    );
  };

  const totalPaid = payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter((p) => p.status !== "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6 min-h-[calc(100vh-4rem)] bg-slate-50">

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Scholarship Disbursements
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Track and manage scholarship fund payments
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          ["Total Payments", payments.length, "bg-blue-50 border-blue-200 text-blue-700"],
          ["Total Disbursed", `৳${totalPaid.toLocaleString("en-BD")}`, "bg-green-50 border-green-200 text-green-700"],
          ["Pending Amount", `৳${totalPending.toLocaleString("en-BD")}`, "bg-orange-50 border-orange-200 text-orange-700"],
          ["Successful Payments", payments.filter((p) => p.status === "Paid").length, "bg-teal-50 border-teal-200 text-teal-700"],
        ].map(([label, value, color]) => (
          <div key={label} className={`p-4 rounded-lg border ${color}`}>
            <p className="text-xs font-medium opacity-80">{label}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4">
        <div className="flex flex-col md:flex-row gap-3 justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student, ID or payment..."
            className="w-full md:max-w-sm px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-wrap gap-2">
            {["All", "Pending", "Processing", "Paid"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium ${filter === status ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-700">
            Payment Records
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                {["Payment ID", "Student", "Scholarship", "Amount", "Method", "Date", "Transaction", "Status", "Action"].map((heading) => (
                  <th key={heading} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase whitespace-nowrap">{heading}</th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filtered.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-xs font-medium text-slate-700">{payment.id}</td>

                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-800">{payment.student}</p>
                    <p className="text-xs text-slate-400">{payment.studentId}</p>
                  </td>

                  <td className="px-4 py-3 text-sm text-slate-600">{payment.program}</td>

                  <td className="px-4 py-3 text-sm font-bold text-slate-700 whitespace-nowrap">
                    ৳{payment.amount.toLocaleString("en-BD")}
                  </td>

                  <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{payment.method}</td>

                  <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{payment.date}</td>

                  <td className="px-4 py-3 text-xs text-slate-500">{payment.transaction}</td>

                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${payment.status === "Paid" ? "bg-green-100 text-green-700" : payment.status === "Processing" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"}`}>
                      {payment.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {payment.status !== "Paid" && (
                      <button
                        onClick={() => updatePayment(payment.id, "Paid")}
                        className="text-xs text-green-600 hover:text-green-700 font-medium whitespace-nowrap"
                      >
                        Mark as Paid
                      </button>
                    )}

                    {payment.status === "Paid" && (
                      <span className="text-xs text-slate-400">Completed</span>
                    )}
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-10 text-sm text-slate-400">
                    No payment records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
