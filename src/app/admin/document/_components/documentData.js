
export const makeDocument = (
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
  ...extra,
});

export const documentPages = {
  studentDocuments: {
    title: "Student Document Management",
    subtitle: "Manage and organize student academic documents",
    type: "studentDocuments",
    records: [
      makeDocument(
        "STD-DOC-001",
        "Academic Transcript",
        "Academic Document",
        "2026-10-20",
        "Approved",
        "Official academic transcript submitted by the student.",
        {
          studentName: "Rahim Ahmed",
          studentId: "STU-1001",
          department: "Computer Science",
          semester: "8th Semester",
          fileName: "rahim-transcript.pdf",
          fileType: "PDF",
          fileSize: "1.5 MB",
          uploadedBy: "Rahim Ahmed",
          uploadedAt: "2026-10-20",
        }
      ),
      makeDocument(
        "STD-DOC-002",
        "National ID Document",
        "Identity Document",
        "2026-10-22",
        "Pending",
        "Student identity document waiting for administrative review.",
        {
          studentName: "Nusrat Jahan",
          studentId: "STU-1002",
          department: "Business Administration",
          semester: "5th Semester",
          fileName: "nusrat-nid.pdf",
          fileType: "PDF",
          fileSize: "850 KB",
          uploadedBy: "Nusrat Jahan",
          uploadedAt: "2026-10-22",
        }
      ),
      makeDocument(
        "STD-DOC-003",
        "Admission Certificate",
        "Admission Document",
        "2026-10-25",
        "Rejected",
        "Uploaded admission document requires correction.",
        {
          studentName: "Sakib Hasan",
          studentId: "STU-1003",
          department: "Electrical Engineering",
          semester: "1st Semester",
          fileName: "sakib-admission.pdf",
          fileType: "PDF",
          fileSize: "1.2 MB",
          uploadedBy: "Sakib Hasan",
          uploadedAt: "2026-10-25",
        }
      ),
    ],
  },

  teacherDocuments: {
    title: "Teacher Document Management",
    subtitle: "Manage teacher profiles and professional documents",
    type: "teacherDocuments",
    records: [
      makeDocument(
        "TCH-DOC-001",
        "Academic Qualification",
        "Qualification",
        "2026-10-18",
        "Approved",
        "Academic qualification certificate submitted by the teacher.",
        {
          teacherName: "Dr. Ahmed Rahman",
          teacherId: "TCH-1001",
          designation: "Associate Professor",
          department: "Computer Science",
          fileName: "ahmed-qualification.pdf",
          fileType: "PDF",
          fileSize: "2.1 MB",
          uploadedBy: "Dr. Ahmed Rahman",
          uploadedAt: "2026-10-18",
        }
      ),
      makeDocument(
        "TCH-DOC-002",
        "Employment Agreement",
        "Employment Document",
        "2026-10-20",
        "Pending",
        "Teacher employment agreement awaiting HR verification.",
        {
          teacherName: "Nusrat Jahan",
          teacherId: "TCH-1002",
          designation: "Lecturer",
          department: "Business Administration",
          fileName: "nusrat-agreement.pdf",
          fileType: "PDF",
          fileSize: "950 KB",
          uploadedBy: "HR Department",
          uploadedAt: "2026-10-20",
        }
      ),
      makeDocument(
        "TCH-DOC-003",
        "Training Certificate",
        "Professional Development",
        "2026-10-25",
        "Approved",
        "Professional training completion certificate.",
        {
          teacherName: "Karim Uddin",
          teacherId: "TCH-1003",
          designation: "Assistant Professor",
          department: "Electrical Engineering",
          fileName: "karim-training.pdf",
          fileType: "PDF",
          fileSize: "1.3 MB",
          uploadedBy: "Karim Uddin",
          uploadedAt: "2026-10-25",
        }
      ),
    ],
  },

  departmentFiles: {
    title: "Department File Management",
    subtitle: "Manage department-wise institutional documents",
    type: "departmentFiles",
    records: [
      makeDocument(
        "DEP-FILE-001",
        "Academic Calendar 2026",
        "Academic File",
        "2026-10-15",
        "Published",
        "Official academic calendar for the 2026 academic year.",
        {
          department: "Academic Affairs",
          fileName: "academic-calendar-2026.pdf",
          fileType: "PDF",
          fileSize: "2.4 MB",
          uploadedBy: "Academic Admin",
          accessLevel: "Department",
          lastModified: "2026-10-20",
        }
      ),
      makeDocument(
        "DEP-FILE-002",
        "Department Meeting Minutes",
        "Meeting Document",
        "2026-10-22",
        "Private",
        "Internal meeting minutes for the CSE department.",
        {
          department: "Computer Science",
          fileName: "cse-meeting-minutes.docx",
          fileType: "DOCX",
          fileSize: "750 KB",
          uploadedBy: "Department Head",
          accessLevel: "Restricted",
          lastModified: "2026-10-23",
        }
      ),
      makeDocument(
        "DEP-FILE-003",
        "Annual Department Report",
        "Annual Report",
        "2026-10-25",
        "Draft",
        "Annual departmental performance and activity report.",
        {
          department: "Business Administration",
          fileName: "annual-report-2026.pdf",
          fileType: "PDF",
          fileSize: "3.2 MB",
          uploadedBy: "Department Admin",
          accessLevel: "Department",
          lastModified: "2026-10-28",
        }
      ),
    ],
  },

  versionControl: {
    title: "Document Version Control",
    subtitle: "Track document revisions and version history",
    type: "versionControl",
    records: [
      makeDocument(
        "VER-DOC-001",
        "Academic Policy Document",
        "Policy",
        "2026-10-20",
        "Latest Version",
        "Updated institutional academic policy document.",
        {
          documentCode: "POL-001",
          currentVersion: "v3.0",
          previousVersion: "v2.0",
          totalVersions: 3,
          modifiedBy: "Academic Admin",
          changeSummary: "Updated examination guidelines.",
          lastModified: "2026-10-20",
        }
      ),
      makeDocument(
        "VER-DOC-002",
        "Employee Handbook",
        "HR Document",
        "2026-10-22",
        "Latest Version",
        "Updated employee handbook with revised HR policies.",
        {
          documentCode: "HR-001",
          currentVersion: "v2.0",
          previousVersion: "v1.0",
          totalVersions: 2,
          modifiedBy: "HR Admin",
          changeSummary: "Updated leave and attendance policies.",
          lastModified: "2026-10-22",
        }
      ),
      makeDocument(
        "VER-DOC-003",
        "Admission Guidelines",
        "Admission Document",
        "2026-10-25",
        "Under Review",
        "Revised admission guideline awaiting approval.",
        {
          documentCode: "ADM-001",
          currentVersion: "v1.2",
          previousVersion: "v1.1",
          totalVersions: 2,
          modifiedBy: "Admission Admin",
          changeSummary: "Updated admission requirements.",
          lastModified: "2026-10-25",
        }
      ),
    ],
  },

  digitalArchive: {
    title: "Digital Archive Management",
    subtitle: "Manage archived and historical institutional documents",
    type: "digitalArchive",
    records: [
      makeDocument(
        "ARC-001",
        "Academic Calendar 2024",
        "Historical Academic Record",
        "2024-01-10",
        "Archived",
        "Historical academic calendar preserved in the digital archive.",
        {
          archiveCode: "ARCH-2024-001",
          originalDepartment: "Academic Affairs",
          archivedBy: "Archive Admin",
          archiveDate: "2025-01-15",
          retentionPeriod: "Permanent",
          fileName: "academic-calendar-2024.pdf",
          fileType: "PDF",
          fileSize: "1.8 MB",
        }
      ),
      makeDocument(
        "ARC-002",
        "Previous Examination Policy",
        "Policy Archive",
        "2023-06-15",
        "Archived",
        "Previous examination policy retained for historical reference.",
        {
          archiveCode: "ARCH-2023-002",
          originalDepartment: "Examination Office",
          archivedBy: "Archive Admin",
          archiveDate: "2025-02-10",
          retentionPeriod: "Permanent",
          fileName: "exam-policy-2023.pdf",
          fileType: "PDF",
          fileSize: "2.2 MB",
        }
      ),
      makeDocument(
        "ARC-003",
        "Old Department Report",
        "Department Archive",
        "2022-12-20",
        "Archived",
        "Historical department report stored for future reference.",
        {
          archiveCode: "ARCH-2022-003",
          originalDepartment: "Computer Science",
          archivedBy: "Department Admin",
          archiveDate: "2025-03-01",
          retentionPeriod: "10 Years",
          fileName: "department-report-2022.pdf",
          fileType: "PDF",
          fileSize: "4.1 MB",
        }
      ),
    ],
  },
};
