
const makeHR = (
  id,
  title,
  category,
  date,
  status,
  description,
  extra = {}
) => ({
  id,
  title,
  category,
  date,
  status,
  description,
  extra,
});

export const hrPages = {
  employees: {
    title: "Employee Management",
    description: "Manage employee profiles, departments, positions and employment records.",
    listTitle: "Employee Records",
    items: [
      makeHR("EMP-001", "Rahim Ahmed", "Senior Lecturer", "2024-01-15", "Active", "Employee profile and employment information.", {
        employeeId: "DIIT-EMP-001",
        department: "CSE",
        email: "rahim@example.com",
        phone: "01700000001",
        employmentType: "Full Time",
        joiningDate: "2024-01-15",
      }),
      makeHR("EMP-002", "Nusrat Jahan", "Assistant Professor", "2023-06-10", "Active", "Faculty employee profile and records.", {
        employeeId: "DIIT-EMP-002",
        department: "BBA",
        email: "nusrat@example.com",
        phone: "01700000002",
        employmentType: "Full Time",
        joiningDate: "2023-06-10",
      }),
      makeHR("EMP-003", "Sakib Hasan", "IT Officer", "2026-09-01", "On Leave", "IT department employee profile.", {
        employeeId: "DIIT-EMP-003",
        department: "IT",
        email: "sakib@example.com",
        phone: "01700000003",
        employmentType: "Contract",
        joiningDate: "2026-09-01",
      }),
    ],
  },

  payroll: {
    title: "Payroll Management",
    description: "Manage employee salaries, allowances, deductions and payment records.",
    listTitle: "Payroll Records",
    items: [
      makeHR("PAY-001", "Rahim Ahmed", "November Salary", "2026-11-01", "Paid", "Monthly salary payment record.", {
        employeeId: "DIIT-EMP-001",
        basicSalary: "৳ 45,000",
        allowance: "৳ 8,000",
        deduction: "৳ 2,000",
        netSalary: "৳ 51,000",
        paymentMethod: "Bank Transfer",
      }),
      makeHR("PAY-002", "Nusrat Jahan", "November Salary", "2026-11-01", "Pending", "Monthly salary awaiting payment.", {
        employeeId: "DIIT-EMP-002",
        basicSalary: "৳ 55,000",
        allowance: "৳ 10,000",
        deduction: "৳ 3,000",
        netSalary: "৳ 62,000",
        paymentMethod: "Bank Transfer",
      }),
      makeHR("PAY-003", "Sakib Hasan", "October Salary", "2026-10-01", "Processing", "Salary payment is being processed.", {
        employeeId: "DIIT-EMP-003",
        basicSalary: "৳ 30,000",
        allowance: "৳ 5,000",
        deduction: "৳ 1,000",
        netSalary: "৳ 34,000",
        paymentMethod: "Mobile Banking",
      }),
    ],
  },

  leave: {
    title: "Leave Management",
    description: "Review employee leave applications, balances and approvals.",
    listTitle: "Leave Applications",
    items: [
      makeHR("LEV-001", "Rahim Ahmed", "Casual Leave", "2026-11-02", "Pending", "Employee requested casual leave.", {
        employeeId: "DIIT-EMP-001",
        fromDate: "2026-11-05",
        toDate: "2026-11-06",
        totalDays: "2 Days",
        reason: "Personal work",
        leaveBalance: "12 Days",
      }),
      makeHR("LEV-002", "Nusrat Jahan", "Medical Leave", "2026-10-20", "Approved", "Medical leave application has been approved.", {
        employeeId: "DIIT-EMP-002",
        fromDate: "2026-10-22",
        toDate: "2026-10-25",
        totalDays: "4 Days",
        reason: "Medical appointment",
        leaveBalance: "8 Days",
      }),
      makeHR("LEV-003", "Sakib Hasan", "Earned Leave", "2026-10-25", "Rejected", "Leave request was not approved.", {
        employeeId: "DIIT-EMP-003",
        fromDate: "2026-11-10",
        toDate: "2026-11-14",
        totalDays: "5 Days",
        reason: "Family visit",
        leaveBalance: "10 Days",
      }),
    ],
  },

  attendance: {
    title: "Attendance Management",
    description: "Monitor employee attendance, check-in, check-out and working hours.",
    listTitle: "Attendance Records",
    items: [
      makeHR("ATT-001", "Rahim Ahmed", "Present", "2026-11-01", "Present", "Employee attendance record for the day.", {
        employeeId: "DIIT-EMP-001",
        checkIn: "08:55 AM",
        checkOut: "05:10 PM",
        workingHours: "8h 15m",
        department: "CSE",
      }),
      makeHR("ATT-002", "Nusrat Jahan", "Late Arrival", "2026-11-01", "Late", "Employee arrived after scheduled check-in time.", {
        employeeId: "DIIT-EMP-002",
        checkIn: "09:35 AM",
        checkOut: "05:00 PM",
        workingHours: "7h 25m",
        department: "BBA",
      }),
      makeHR("ATT-003", "Sakib Hasan", "Absent", "2026-11-01", "Absent", "No attendance entry was recorded.", {
        employeeId: "DIIT-EMP-003",
        checkIn: "Not Recorded",
        checkOut: "Not Recorded",
        workingHours: "0h",
        department: "IT",
      }),
    ],
  },

  promotion: {
    title: "Promotion Management",
    description: "Manage employee promotion applications, recommendations and decisions.",
    listTitle: "Promotion Records",
    items: [
      makeHR("PRO-001", "Rahim Ahmed", "Lecturer to Senior Lecturer", "2026-10-15", "Under Review", "Promotion recommendation is under HR review.", {
        employeeId: "DIIT-EMP-001",
        department: "CSE",
        currentPosition: "Lecturer",
        proposedPosition: "Senior Lecturer",
        recommendationBy: "Head of Department",
        effectiveDate: "2027-01-01",
      }),
      makeHR("PRO-002", "Nusrat Jahan", "Assistant Professor to Associate Professor", "2026-09-20", "Approved", "Promotion has been approved by the authority.", {
        employeeId: "DIIT-EMP-002",
        department: "BBA",
        currentPosition: "Assistant Professor",
        proposedPosition: "Associate Professor",
        recommendationBy: "Academic Committee",
        effectiveDate: "2027-01-01",
      }),
      makeHR("PRO-003", "Sakib Hasan", "IT Officer to Senior IT Officer", "2026-10-25", "Pending", "Promotion request is awaiting review.", {
        employeeId: "DIIT-EMP-003",
        department: "IT",
        currentPosition: "IT Officer",
        proposedPosition: "Senior IT Officer",
        recommendationBy: "IT Manager",
        effectiveDate: "2027-02-01",
      }),
    ],
  },

  recruitment: {
    title: "Recruitment Management",
    description: "Manage job vacancies, applicants, interviews and hiring decisions.",
    listTitle: "Recruitment Records",
    items: [
      makeHR("REC-001", "Software Engineer", "IT Department", "2026-10-10", "Open", "Recruitment for a software engineering position.", {
        vacancy: "2 Positions",
        applicants: "45",
        employmentType: "Full Time",
        deadline: "2026-11-15",
        hiringManager: "IT Manager",
      }),
      makeHR("REC-002", "Lecturer - CSE", "CSE Department", "2026-09-15", "Interview", "Faculty recruitment and interview process.", {
        vacancy: "3 Positions",
        applicants: "32",
        employmentType: "Full Time",
        deadline: "2026-10-30",
        hiringManager: "Head of CSE",
      }),
      makeHR("REC-003", "Accounts Officer", "Finance Department", "2026-10-25", "Shortlisted", "Applicant screening has been completed.", {
        vacancy: "1 Position",
        applicants: "28",
        employmentType: "Full Time",
        deadline: "2026-11-20",
        hiringManager: "Finance Manager",
      }),
    ],
  },

  performance: {
    title: "Performance Management",
    description: "Track employee performance reviews, goals, feedback and evaluations.",
    listTitle: "Performance Records",
    items: [
      makeHR("PER-001", "Rahim Ahmed", "Annual Performance Review", "2026-10-15", "Completed", "Annual employee performance evaluation.", {
        employeeId: "DIIT-EMP-001",
        reviewPeriod: "2025-2026",
        rating: "Excellent",
        score: "92 / 100",
        reviewer: "Head of CSE",
        goals: "Teaching, Research, Student Support",
      }),
      makeHR("PER-002", "Nusrat Jahan", "Mid-Year Performance Review", "2026-10-20", "In Progress", "Mid-year performance assessment is ongoing.", {
        employeeId: "DIIT-EMP-002",
        reviewPeriod: "July-December 2026",
        rating: "Not Rated",
        score: "Pending",
        reviewer: "Department Head",
        goals: "Teaching, Academic Development",
      }),
      makeHR("PER-003", "Sakib Hasan", "Quarterly Performance Review", "2026-10-25", "Pending", "Quarterly review awaiting supervisor feedback.", {
        employeeId: "DIIT-EMP-003",
        reviewPeriod: "October-December 2026",
        rating: "Not Rated",
        score: "Pending",
        reviewer: "IT Manager",
        goals: "System Support, Network Maintenance",
      }),
    ],
  },
};
