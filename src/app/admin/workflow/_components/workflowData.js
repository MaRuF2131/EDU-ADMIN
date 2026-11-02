
export const workflowMenu = [
  {
    title: "Approval Workflow",
    description: "Manage multi-level approval processes",
    href: "/admin/workflow/approval-workflow",
    icon: "✅",
  },
  {
    title: "Admission Workflow",
    description: "Manage student admission stages",
    href: "/admin/workflow/admission-workflow",
    icon: "🎓",
  },
  {
    title: "Leave Workflow",
    description: "Manage employee and student leave approvals",
    href: "/admin/workflow/leave-workflow",
    icon: "📅",
  },
  {
    title: "Payment Workflow",
    description: "Manage payment verification and approvals",
    href: "/admin/workflow/payment-workflow",
    icon: "💳",
  },
  {
    title: "Certificate Workflow",
    description: "Manage certificate processing and approval",
    href: "/admin/workflow/certificate-workflow",
    icon: "📜",
  },
  {
    title: "Automation Rules",
    description: "Configure automatic workflow actions",
    href: "/admin/workflow/automation-rules",
    icon: "⚙️",
  },
];

export const createWorkflowRecord = (
  id,
  name,
  category,
  initiator,
  assignedTo,
  status,
  date,
  description,
  extra = {}
) => ({
  id,
  name,
  category,
  initiator,
  assignedTo,
  status,
  date,
  description,
  ...extra,
});

export const workflowPages = {
  approval: {
    title: "Approval Workflow",
    description: "Manage approval requests and multi-level approval processes.",
    records: [
      createWorkflowRecord(
        1,
        "Student Registration Approval",
        "Registration",
        "Rahim Ahmed",
        "Department Head",
        "Pending",
        "2026-10-28",
        "Student registration requires department approval.",
        { level: "Level 2", priority: "High" }
      ),
      createWorkflowRecord(
        2,
        "Budget Approval",
        "Finance",
        "Finance Officer",
        "Principal",
        "Approved",
        "2026-10-27",
        "Annual department budget approval.",
        { level: "Level 3", priority: "Medium" }
      ),
      createWorkflowRecord(
        3,
        "Exam Schedule Approval",
        "Examination",
        "Exam Controller",
        "Academic Director",
        "In Review",
        "2026-10-26",
        "Final examination schedule approval.",
        { level: "Level 2", priority: "High" }
      ),
    ],
  },

  admission: {
    title: "Admission Workflow",
    description: "Track admission applications through every processing stage.",
    records: [
      createWorkflowRecord(
        1,
        "ADM-2026-001",
        "Undergraduate",
        "Sakib Hasan",
        "Admission Office",
        "Pending",
        "2026-10-28",
        "Application waiting for document verification.",
        { stage: "Document Verification", applicationId: "ADM-2026-001" }
      ),
      createWorkflowRecord(
        2,
        "ADM-2026-002",
        "Diploma",
        "Nusrat Jahan",
        "Admission Committee",
        "In Review",
        "2026-10-27",
        "Application is being reviewed by the committee.",
        { stage: "Committee Review", applicationId: "ADM-2026-002" }
      ),
      createWorkflowRecord(
        3,
        "ADM-2026-003",
        "Undergraduate",
        "Tanvir Islam",
        "Admission Office",
        "Approved",
        "2026-10-25",
        "Admission application successfully approved.",
        { stage: "Final Approval", applicationId: "ADM-2026-003" }
      ),
    ],
  },

  leave: {
    title: "Leave Workflow",
    description: "Manage employee and student leave requests and approvals.",
    records: [
      createWorkflowRecord(
        1,
        "Annual Leave Request",
        "Employee Leave",
        "Abdul Karim",
        "HR Manager",
        "Pending",
        "2026-10-28",
        "Annual leave request for five working days.",
        { leaveDays: 5, leaveType: "Annual Leave" }
      ),
      createWorkflowRecord(
        2,
        "Medical Leave Request",
        "Employee Leave",
        "Fatema Akter",
        "Department Head",
        "Approved",
        "2026-10-26",
        "Medical leave request submitted for review.",
        { leaveDays: 3, leaveType: "Medical Leave" }
      ),
      createWorkflowRecord(
        3,
        "Student Leave Request",
        "Student Leave",
        "Sabbir Hossain",
        "Class Teacher",
        "In Review",
        "2026-10-25",
        "Student leave request for personal reasons.",
        { leaveDays: 2, leaveType: "Student Leave" }
      ),
    ],
  },

  payment: {
    title: "Payment Workflow",
    description: "Manage payment verification, review and approval.",
    records: [
      createWorkflowRecord(
        1,
        "PAY-2026-001",
        "Semester Fee",
        "Sakib Hasan",
        "Finance Officer",
        "Pending",
        "2026-10-28",
        "Semester fee payment waiting for verification.",
        { amount: 15000, currency: "BDT", method: "bKash" }
      ),
      createWorkflowRecord(
        2,
        "PAY-2026-002",
        "Admission Fee",
        "Nusrat Jahan",
        "Accounts Manager",
        "Approved",
        "2026-10-27",
        "Admission fee payment verified.",
        { amount: 10000, currency: "BDT", method: "Bank" }
      ),
      createWorkflowRecord(
        3,
        "PAY-2026-003",
        "Examination Fee",
        "Tanvir Islam",
        "Finance Officer",
        "In Review",
        "2026-10-26",
        "Examination fee transaction under review.",
        { amount: 2500, currency: "BDT", method: "Nagad" }
      ),
    ],
  },

  certificate: {
    title: "Certificate Workflow",
    description: "Manage certificate requests, verification and issuance.",
    records: [
      createWorkflowRecord(
        1,
        "CERT-2026-001",
        "Transcript Certificate",
        "Sakib Hasan",
        "Examination Office",
        "Pending",
        "2026-10-28",
        "Transcript request awaiting academic verification.",
        { certificateType: "Transcript" }
      ),
      createWorkflowRecord(
        2,
        "CERT-2026-002",
        "Character Certificate",
        "Nusrat Jahan",
        "Principal",
        "Approved",
        "2026-10-27",
        "Character certificate approved for issuance.",
        { certificateType: "Character Certificate" }
      ),
      createWorkflowRecord(
        3,
        "CERT-2026-003",
        "Course Completion",
        "Tanvir Islam",
        "Department Head",
        "In Review",
        "2026-10-25",
        "Course completion details are being verified.",
        { certificateType: "Course Completion" }
      ),
    ],
  },

  automation: {
    title: "Automation Rules",
    description: "Manage event-based rules and automated workflow actions.",
    records: [
      createWorkflowRecord(
        1,
        "Auto Admission Notification",
        "Notification Rule",
        "System",
        "Admission Office",
        "Active",
        "2026-10-28",
        "Send notification when a new admission application is submitted.",
        { trigger: "Admission Submitted", action: "Send Email" }
      ),
      createWorkflowRecord(
        2,
        "Payment Reminder",
        "Payment Rule",
        "System",
        "Finance Department",
        "Active",
        "2026-10-27",
        "Send reminders for overdue student payments.",
        { trigger: "Payment Overdue", action: "Send SMS" }
      ),
      createWorkflowRecord(
        3,
        "Certificate Approval Alert",
        "Certificate Rule",
        "System",
        "Examination Office",
        "Disabled",
        "2026-10-25",
        "Notify the certificate office when approval is completed.",
        { trigger: "Certificate Approved", action: "Create Notification" }
      ),
    ],
  },
};
