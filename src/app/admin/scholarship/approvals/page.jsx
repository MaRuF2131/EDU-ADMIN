
"use client";
import { useState } from "react";

const initialApprovals = [
  {
    id: "APR-001",
    student: "Rahim Uddin",
    studentId: "STU-001",
    program: "Merit Excellence Scholarship",
    amount: 25000,
    submitted: "2026-10-25",
    stage: "Department Review",
    status: "Pending",
  },
  {
    id: "APR-002",
    student: "Fatima Begum",
    studentId: "STU-002",
    program: "Need Based Financial Support",
    amount: 15000,
    submitted: "2026-10-24",
    stage: "Final Approval",
    status: "Pending",
  },
  {
    id: "APR-003",
    student: "Imran Ahmed",
    studentId: "STU-003",
    program: "Government Education Grant",
    amount: 20000,
    submitted: "2026-10-23",
    stage: "Financial Review",
    status: "Pending",
  },
  {
    id: "APR-004",
    student: "Susmita Das",
    studentId: "STU-004",
    program: "Merit Excellence Scholarship",
    amount: 25000,
    submitted: "2026-10-22",
    stage: "Completed",
    status: "Approved",
  },
];

const workflowStages = [
  "Application Review",
  "Department Review",
  "Financial Review",
  "Final Approval",
  "Completed",
];

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState(initialApprovals);
  const [selected, setSelected] = useState(null);
  const [remarks, setRemarks] = useState("");

  const advanceApproval = (id) => {
    setApprovals((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const currentIndex = workflowStages.indexOf(item.stage);
        const nextStage = workflowStages[currentIndex + 1];

        return {
          ...item,
          stage: nextStage || "Completed",
          status: nextStage === "Completed" || !nextStage ? "Approved" : "Pending",
          remarks,
        };
      })
    );

    setSelected(null);
    setRemarks("");
  };

  const rejectApproval = (id) => {
    setApprovals((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "Rejected", remarks }
          : item
      )
    );

    setSelected(null);
    setRemarks("");
  };

  return (
    <div className="p-6 min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Approval Workflow
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review and process scholarship approval stages
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          ["Total Requests", approvals.length, "bg-blue-50 border-blue-200 text-blue-700"],
          ["Pending", approvals.filter((a) => a.status === "Pending").length, "bg-orange-50 border-orange-200 text-orange-700"],
          ["Approved", approvals.filter((a) => a.status === "Approved").length, "bg-green-50 border-green-200 text-green-700"],
          ["Rejected", approvals.filter((a) => a.status === "Rejected").length, "bg-red-50 border-red-200 text-red-700"],
        ].map(([label, value, color]) => (
          <div key={label} className={`p-4 rounded-lg border ${color}`}>
            <p className="text-xs font-medium opacity-80">{label}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
        ))}
      </div>

      {/* Workflow Overview */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 mb-6">
        <h2 className="font-bold text-slate-700 mb-5">
          Approval Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {workflowStages.map((stage, i) => (
            <div key={stage} className="relative bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-2 font-bold">
                {i + 1}
              </div>
              <p className="text-xs font-semibold text-slate-700">{stage}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-700">Approval Requests</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  {["Student", "Program", "Amount", "Current Stage", "Status", "Action"].map((heading) => (
                    <th key={heading} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase whitespace-nowrap">{heading}</th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {approvals.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-800">{item.student}</p>
                      <p className="text-xs text-slate-400">{item.studentId}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{item.program}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-700 whitespace-nowrap">৳{item.amount.toLocaleString("en-BD")}</td>
                    <td className="px-4 py-3 text-xs text-slate-600">{item.stage}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${item.status === "Approved" ? "bg-green-100 text-green-700" : item.status === "Rejected" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}`}>{item.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      {item.status === "Pending" ? (
                        <button onClick={() => { setSelected(item); setRemarks(""); }} className="text-xs text-blue-600 font-medium">Review</button>
                      ) : (
                        <span className="text-xs text-slate-400">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full xl:w-80 bg-white rounded-lg border border-slate-200">
          {!selected ? (
            <div className="p-10 text-center text-slate-400">
              <span className="text-4xl block mb-3">📋</span>
              <p className="text-sm">Select a request to review</p>
            </div>
          ) : (
            <div>
              <div className="p-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-700">Review Approval</h3>
                <p className="text-xs text-slate-400 mt-1">{selected.id}</p>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <p className="text-xs text-slate-400">Student</p>
                  <p className="text-sm font-medium text-slate-700">{selected.student}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Scholarship Program</p>
                  <p className="text-sm font-medium text-slate-700">{selected.program}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Amount</p>
                  <p className="text-lg font-bold text-slate-800">৳{selected.amount.toLocaleString("en-BD")}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Current Stage</p>
                  <p className="text-sm font-medium text-blue-700">{selected.stage}</p>
                </div>

                <textarea
                  rows={4}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Approval remarks..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="p-4 border-t border-slate-200 space-y-2">
                <button
                  onClick={() => advanceApproval(selected.id)}
                  className="w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
                >
                  ✓ Approve & Continue
                </button>
                <button
                  onClick={() => rejectApproval(selected.id)}
                  className="w-full px-3 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 text-sm font-medium"
                >
                  Reject Application
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="w-full px-3 py-2 bg-slate-100 text-slate-700 rounded-md text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
