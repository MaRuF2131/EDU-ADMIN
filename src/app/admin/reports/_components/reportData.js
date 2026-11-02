
const createReport = (
  id,
  title,
  category,
  generatedBy,
  date,
  status,
  description,
  extra = {}
) => ({
  id,
  title,
  category,
  generatedBy,
  date,
  status,
  description,
  ...extra,
});

export const reportPages = {
  studentReport: {
    title: "Student Report",
    description: "View student profiles, academic results and enrollment reports.",
    searchPlaceholder: "Search student, ID or department...",
    records: [
      createReport("STR-001", "Rahim Ahmed - Academic Report", "Academic", "Admin", "2026-11-01", "Generated", "Complete academic performance report.", {
        studentId: "STU-1001",
        studentName: "Rahim Ahmed",
        department: "CSE",
        semester: "6th Semester",
        GPA: "3.75",
        attendance: "92%",
        totalCredits: 120,
        reportPeriod: "2026",
      }),
      createReport("STR-002", "Nusrat Jahan - Student Profile", "Student Profile", "Academic Officer", "2026-10-30", "Generated", "Student profile and academic history.", {
        studentId: "STU-1002",
        studentName: "Nusrat Jahan",
        department: "BBA",
        semester: "4th Semester",
        GPA: "3.55",
        attendance: "88%",
        totalCredits: 90,
        reportPeriod: "2026",
      }),
      createReport("STR-003", "Sakib Hasan - Result Report", "Examination", "Exam Officer", "2026-10-28", "Pending", "Semester result report awaiting approval.", {
        studentId: "STU-1003",
        studentName: "Sakib Hasan",
        department: "EEE",
        semester: "3rd Semester",
        GPA: "2.80",
        attendance: "75%",
        totalCredits: 60,
        reportPeriod: "2026",
      }),
    ],
  },

  teacherReport: {
    title: "Teacher Report",
    description: "View teacher profiles, workloads and performance summaries.",
    searchPlaceholder: "Search teacher, ID or department...",
    records: [
      createReport("THR-001", "Dr. Ahmed Karim - Performance", "Performance", "HR Admin", "2026-11-01", "Generated", "Teacher performance and workload report.", {
        teacherId: "T-1001",
        teacherName: "Dr. Ahmed Karim",
        department: "CSE",
        designation: "Associate Professor",
        courses: 4,
        totalStudents: 180,
        feedback: "4.8/5",
        reportPeriod: "2026",
      }),
      createReport("THR-002", "Nusrat Sultana - Workload", "Workload", "Department Admin", "2026-10-29", "Generated", "Teacher course and workload summary.", {
        teacherId: "T-1002",
        teacherName: "Nusrat Sultana",
        department: "EEE",
        designation: "Assistant Professor",
        courses: 3,
        totalStudents: 120,
        feedback: "4.5/5",
        reportPeriod: "2026",
      }),
    ],
  },

  departmentReport: {
    title: "Department Report",
    description: "Analyze department-level academic and administrative performance.",
    searchPlaceholder: "Search department or report...",
    records: [
      createReport("DPR-001", "CSE Department Annual Report", "Academic Performance", "Department Head", "2026-11-01", "Generated", "Annual academic and operational summary.", {
        department: "Computer Science & Engineering",
        departmentCode: "CSE",
        totalStudents: 1250,
        totalTeachers: 45,
        averageGPA: "3.45",
        passRate: "94%",
        reportPeriod: "2026",
      }),
      createReport("DPR-002", "EEE Department Performance", "Department Statistics", "Department Head", "2026-10-28", "Pending", "Department performance report awaiting review.", {
        department: "Electrical & Electronic Engineering",
        departmentCode: "EEE",
        totalStudents: 950,
        totalTeachers: 38,
        averageGPA: "3.25",
        passRate: "88%",
        reportPeriod: "2026",
      }),
    ],
  },

  financeReport: {
    title: "Finance Report",
    description: "Review tuition fees, payments, expenses and financial summaries.",
    searchPlaceholder: "Search transaction, student or category...",
    records: [
      createReport("FNR-001", "October Tuition Collection", "Income", "Finance Admin", "2026-11-01", "Approved", "Monthly tuition collection summary.", {
        transactionId: "TXN-1001",
        income: "৳ 25,00,000",
        expenses: "৳ 8,00,000",
        balance: "৳ 17,00,000",
        paymentMethod: "Bank Transfer",
        reportPeriod: "October 2026",
      }),
      createReport("FNR-002", "Department Expense Summary", "Expense", "Accounts Officer", "2026-10-29", "Pending", "Department expenditure report awaiting approval.", {
        transactionId: "TXN-1002",
        income: "৳ 0",
        expenses: "৳ 3,50,000",
        balance: "৳ 3,50,000",
        paymentMethod: "Bank Transfer",
        reportPeriod: "October 2026",
      }),
    ],
  },

  attendanceReport: {
    title: "Attendance Report",
    description: "Monitor student and teacher attendance records.",
    searchPlaceholder: "Search student, teacher or course...",
    records: [
      createReport("ATR-001", "CSE Student Attendance", "Student Attendance", "Academic Admin", "2026-11-01", "Generated", "Monthly student attendance summary.", {
        department: "CSE",
        course: "Data Structures",
        totalStudents: 60,
        present: 54,
        absent: 6,
        attendanceRate: "90%",
        reportPeriod: "October 2026",
      }),
      createReport("ATR-002", "EEE Teacher Attendance", "Teacher Attendance", "HR Admin", "2026-10-30", "Generated", "Monthly teacher attendance summary.", {
        department: "EEE",
        totalTeachers: 38,
        present: 35,
        absent: 3,
        attendanceRate: "92%",
        reportPeriod: "October 2026",
      }),
    ],
  },

  admissionReport: {
    title: "Admission Report",
    description: "Analyze admission applications, enrollment and applicant statistics.",
    searchPlaceholder: "Search application, applicant or department...",
    records: [
      createReport("ADR-001", "Fall 2026 Admission Summary", "Admission Statistics", "Admission Admin", "2026-11-01", "Generated", "Admission applications and enrollment summary.", {
        applicationId: "APP-1001",
        totalApplications: 2500,
        approved: 1800,
        rejected: 300,
        pending: 400,
        enrolled: 1600,
        intake: "Fall 2026",
      }),
      createReport("ADR-002", "CSE Admission Report", "Department Admission", "Admission Officer", "2026-10-28", "Pending", "CSE admission statistics awaiting review.", {
        applicationId: "APP-1002",
        department: "CSE",
        totalApplications: 650,
        approved: 450,
        rejected: 80,
        pending: 120,
        enrolled: 400,
        intake: "Fall 2026",
      }),
    ],
  },

  customReportBuilder: {
    title: "Custom Report Builder",
    description: "Manage custom report definitions and generated reports.",
    searchPlaceholder: "Search report name or creator...",
    records: [
      createReport("CRB-001", "Student Performance Overview", "Custom Academic", "Admin", "2026-11-01", "Generated", "Custom report combining results and attendance.", {
        dataSources: ["Students", "Results", "Attendance"],
        columns: ["Student Name", "GPA", "Attendance", "Department"],
        format: "Excel",
        filters: "Academic Year: 2026",
      }),
      createReport("CRB-002", "Monthly Finance Summary", "Custom Finance", "Finance Admin", "2026-10-29", "Draft", "Custom report for monthly financial analysis.", {
        dataSources: ["Payments", "Expenses"],
        columns: ["Income", "Expenses", "Balance"],
        format: "PDF",
        filters: "Month: October 2026",
      }),
    ],
  },

  excelExport: {
    title: "Excel Export",
    description: "Manage Excel spreadsheet export requests.",
    searchPlaceholder: "Search export or report name...",
    records: [
      createReport("XLS-001", "Student Master List.xlsx", "Student Data", "Admin", "2026-11-01", "Completed", "Student records exported to Excel.", {
        fileName: "student-master-list.xlsx",
        rows: 1250,
        fileSize: "2.4 MB",
        sheetCount: 3,
        format: "XLSX",
      }),
      createReport("XLS-002", "Finance Summary.xlsx", "Finance", "Finance Admin", "2026-10-30", "Processing", "Finance data export request.", {
        fileName: "finance-summary.xlsx",
        rows: 850,
        fileSize: "1.2 MB",
        sheetCount: 2,
        format: "XLSX",
      }),
    ],
  },

  pdfExport: {
    title: "PDF Export",
    description: "Manage printable PDF reports and document exports.",
    searchPlaceholder: "Search PDF or report name...",
    records: [
      createReport("PDF-001", "Academic Annual Report.pdf", "Academic", "Admin", "2026-11-01", "Completed", "University annual academic report.", {
        fileName: "academic-annual-report.pdf",
        pages: 45,
        fileSize: "5.8 MB",
        orientation: "Portrait",
        format: "PDF",
      }),
      createReport("PDF-002", "Student Transcript Report.pdf", "Student", "Exam Officer", "2026-10-29", "Pending", "Transcript report awaiting generation.", {
        fileName: "student-transcript-report.pdf",
        pages: 12,
        fileSize: "850 KB",
        orientation: "Portrait",
        format: "PDF",
      }),
    ],
  },

  csvExport: {
    title: "CSV Export",
    description: "Manage CSV data exports for external analysis.",
    searchPlaceholder: "Search CSV or report name...",
    records: [
      createReport("CSV-001", "Attendance Data.csv", "Attendance", "Academic Admin", "2026-11-01", "Completed", "Attendance records exported to CSV.", {
        fileName: "attendance-data.csv",
        rows: 5000,
        fileSize: "750 KB",
        delimiter: "Comma",
        format: "CSV",
      }),
      createReport("CSV-002", "Student Enrollment.csv", "Admission", "Admission Admin", "2026-10-30", "Completed", "Student enrollment dataset exported.", {
        fileName: "student-enrollment.csv",
        rows: 2500,
        fileSize: "430 KB",
        delimiter: "Comma",
        format: "CSV",
      }),
    ],
  },

  powerBi: {
    title: "Power BI Integration",
    description: "Manage BI dashboards, datasets and integration status.",
    searchPlaceholder: "Search dashboard or dataset...",
    records: [
      createReport("PBI-001", "University Performance Dashboard", "Academic BI", "BI Admin", "2026-11-01", "Connected", "University academic dashboard integration.", {
        workspace: "University Analytics",
        dataset: "Academic Performance",
        refreshSchedule: "Daily",
        lastRefresh: "2026-11-01 09:00 AM",
        dashboardUrl: "Not configured",
      }),
      createReport("PBI-002", "Finance BI Dashboard", "Finance BI", "Finance Admin", "2026-10-30", "Disconnected", "Finance dashboard connection requires setup.", {
        workspace: "Finance Analytics",
        dataset: "Finance Transactions",
        refreshSchedule: "Weekly",
        lastRefresh: "Not available",
        dashboardUrl: "Not configured",
      }),
    ],
  },
};
