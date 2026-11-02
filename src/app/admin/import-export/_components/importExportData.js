
export const importExportMenu = [
  {
    title: "Excel Import",
    description: "Import bulk records using Excel files.",
    href: "/admin/import-export/excel-import",
    icon: "📗",
  },
  {
    title: "CSV Import",
    description: "Upload and process CSV data files.",
    href: "/admin/import-export/csv-import",
    icon: "📄",
  },
  {
    title: "Bulk Update",
    description: "Update multiple records in one operation.",
    href: "/admin/import-export/bulk-update",
    icon: "✏️",
  },
  {
    title: "Bulk Delete",
    description: "Review and remove multiple records.",
    href: "/admin/import-export/bulk-delete",
    icon: "🗑️",
  },
  {
    title: "Bulk Promotion",
    description: "Promote eligible students to the next class.",
    href: "/admin/import-export/bulk-promotion",
    icon: "🎓",
  },
  {
    title: "Bulk Assignment",
    description: "Assign multiple users, courses or records.",
    href: "/admin/import-export/bulk-assignment",
    icon: "👥",
  },
];

export const createImportExportRecord = (
  id,
  name,
  operation,
  entity,
  totalRecords,
  processed,
  failed,
  status,
  date,
  description,
  extra = {}
) => ({
  id,
  name,
  operation,
  entity,
  totalRecords,
  processed,
  failed,
  status,
  date,
  description,
  ...extra,
});

export const importExportPages = {
  excel: {
    title: "Excel Import",
    description: "Manage Excel file imports and data validation.",
    records: [
      createImportExportRecord(
        1,
        "Student Data October.xlsx",
        "Excel Import",
        "Students",
        500,
        480,
        20,
        "Completed",
        "2026-10-28",
        "October student records imported.",
        { fileType: ".xlsx", uploadedBy: "Admin", fileSize: "2.4 MB" }
      ),
      createImportExportRecord(
        2,
        "Teacher Records.xlsx",
        "Excel Import",
        "Teachers",
        120,
        100,
        20,
        "Processing",
        "2026-10-27",
        "Teacher records are being processed.",
        { fileType: ".xlsx", uploadedBy: "HR Admin", fileSize: "1.2 MB" }
      ),
      createImportExportRecord(
        3,
        "Department Data.xlsx",
        "Excel Import",
        "Departments",
        30,
        30,
        0,
        "Completed",
        "2026-10-25",
        "Department information imported successfully.",
        { fileType: ".xlsx", uploadedBy: "Super Admin", fileSize: "850 KB" }
      ),
    ],
  },

  csv: {
    title: "CSV Import",
    description: "Manage CSV uploads, field mapping and validation.",
    records: [
      createImportExportRecord(
        1,
        "Student Attendance.csv",
        "CSV Import",
        "Attendance",
        1000,
        980,
        20,
        "Completed",
        "2026-10-28",
        "Attendance data imported from CSV.",
        { fileType: ".csv", uploadedBy: "Attendance Admin", fileSize: "1.1 MB" }
      ),
      createImportExportRecord(
        2,
        "Course List.csv",
        "CSV Import",
        "Courses",
        250,
        200,
        50,
        "Failed",
        "2026-10-27",
        "Some course records failed validation.",
        { fileType: ".csv", uploadedBy: "Academic Admin", fileSize: "420 KB" }
      ),
      createImportExportRecord(
        3,
        "Payment Records.csv",
        "CSV Import",
        "Payments",
        300,
        300,
        0,
        "Completed",
        "2026-10-25",
        "Payment records imported successfully.",
        { fileType: ".csv", uploadedBy: "Finance Admin", fileSize: "700 KB" }
      ),
    ],
  },

  update: {
    title: "Bulk Update",
    description: "Review and manage bulk record update operations.",
    records: [
      createImportExportRecord(
        1,
        "Update Student Contact",
        "Bulk Update",
        "Students",
        250,
        240,
        10,
        "Completed",
        "2026-10-28",
        "Student contact information updated.",
        { field: "Phone Number", updatedBy: "Admin" }
      ),
      createImportExportRecord(
        2,
        "Update Teacher Department",
        "Bulk Update",
        "Teachers",
        80,
        65,
        15,
        "Processing",
        "2026-10-27",
        "Teacher department assignments are being updated.",
        { field: "Department", updatedBy: "HR Admin" }
      ),
      createImportExportRecord(
        3,
        "Update Course Status",
        "Bulk Update",
        "Courses",
        50,
        50,
        0,
        "Completed",
        "2026-10-25",
        "Course statuses updated successfully.",
        { field: "Status", updatedBy: "Academic Admin" }
      ),
    ],
  },

  delete: {
    title: "Bulk Delete",
    description: "Review bulk deletion requests and operation history.",
    records: [
      createImportExportRecord(
        1,
        "Remove Duplicate Students",
        "Bulk Delete",
        "Students",
        25,
        20,
        5,
        "Completed",
        "2026-10-28",
        "Duplicate student records reviewed for removal.",
        { requestedBy: "Admin", approval: "Approved" }
      ),
      createImportExportRecord(
        2,
        "Remove Old Notices",
        "Bulk Delete",
        "Notices",
        40,
        40,
        0,
        "Completed",
        "2026-10-26",
        "Expired notices removed.",
        { requestedBy: "Notice Admin", approval: "Approved" }
      ),
      createImportExportRecord(
        3,
        "Remove Archived Courses",
        "Bulk Delete",
        "Courses",
        15,
        0,
        15,
        "Pending",
        "2026-10-25",
        "Deletion request awaiting approval.",
        { requestedBy: "Academic Admin", approval: "Pending" }
      ),
    ],
  },

  promotion: {
    title: "Bulk Promotion",
    description: "Manage student promotion and academic progression.",
    records: [
      createImportExportRecord(
        1,
        "Class 9 to Class 10",
        "Bulk Promotion",
        "Students",
        200,
        190,
        10,
        "Completed",
        "2026-10-28",
        "Eligible students promoted to the next class.",
        { fromClass: "Class 9", toClass: "Class 10", academicYear: "2027" }
      ),
      createImportExportRecord(
        2,
        "Semester 3 to Semester 4",
        "Bulk Promotion",
        "Students",
        150,
        120,
        30,
        "Processing",
        "2026-10-27",
        "Semester promotion is in progress.",
        { fromClass: "Semester 3", toClass: "Semester 4", academicYear: "2027" }
      ),
      createImportExportRecord(
        3,
        "Class 5 to Class 6",
        "Bulk Promotion",
        "Students",
        100,
        100,
        0,
        "Completed",
        "2026-10-25",
        "Student promotion completed.",
        { fromClass: "Class 5", toClass: "Class 6", academicYear: "2027" }
      ),
    ],
  },

  assignment: {
    title: "Bulk Assignment",
    description: "Manage bulk assignments for users and academic records.",
    records: [
      createImportExportRecord(
        1,
        "Assign Class Teachers",
        "Bulk Assignment",
        "Teachers",
        30,
        28,
        2,
        "Completed",
        "2026-10-28",
        "Class teachers assigned to different sections.",
        { assignmentType: "Class Teacher", assignedBy: "Admin" }
      ),
      createImportExportRecord(
        2,
        "Assign Students to Courses",
        "Bulk Assignment",
        "Students",
        500,
        450,
        50,
        "Processing",
        "2026-10-27",
        "Students are being assigned to selected courses.",
        { assignmentType: "Course", assignedBy: "Academic Admin" }
      ),
      createImportExportRecord(
        3,
        "Assign Department Coordinators",
        "Bulk Assignment",
        "Departments",
        15,
        15,
        0,
        "Completed",
        "2026-10-25",
        "Department coordinators assigned successfully.",
        { assignmentType: "Coordinator", assignedBy: "Super Admin" }
      ),
    ],
  },
};
