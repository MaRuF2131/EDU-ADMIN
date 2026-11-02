
export const makeCertificate = (
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

export const certificatePages = {
  templates: {
    title: "Certificate Template Management",
    subtitle: "Create and manage reusable certificate designs",
    type: "templates",
    records: [
      makeCertificate(
        "TPL-001",
        "Bachelor Degree Certificate",
        "Academic",
        "2026-10-20",
        "Active",
        "Official bachelor degree certificate template.",
        {
          templateCode: "BSC-2026",
          certificateType: "Degree Certificate",
          department: "All Departments",
          paperSize: "A4 Landscape",
          createdBy: "Admin",
          lastUpdated: "2026-10-25",
        }
      ),
      makeCertificate(
        "TPL-002",
        "Academic Transcript",
        "Academic",
        "2026-10-22",
        "Active",
        "Official academic transcript template.",
        {
          templateCode: "TRN-2026",
          certificateType: "Transcript",
          department: "All Departments",
          paperSize: "A4 Portrait",
          createdBy: "Exam Controller",
          lastUpdated: "2026-10-28",
        }
      ),
      makeCertificate(
        "TPL-003",
        "Course Completion Certificate",
        "Training",
        "2026-10-25",
        "Draft",
        "Certificate for students completing institutional courses.",
        {
          templateCode: "CRS-2026",
          certificateType: "Course Completion",
          department: "Training Department",
          paperSize: "A4 Landscape",
          createdBy: "Training Admin",
          lastUpdated: "2026-10-25",
        }
      ),
    ],
  },

  digitalSignature: {
    title: "Digital Signature Management",
    subtitle: "Manage certificate signing and authorized signatories",
    type: "digitalSignature",
    records: [
      makeCertificate(
        "SIG-001",
        "Registrar Signature",
        "Authorized Signatory",
        "2026-10-20",
        "Active",
        "Digital signature assigned to the university registrar.",
        {
          signerName: "Dr. Ahmed Rahman",
          designation: "Registrar",
          department: "Administration",
          signatureType: "Digital Certificate",
          validFrom: "2026-01-01",
          validUntil: "2027-01-01",
          certificateAuthority: "Institutional CA",
        }
      ),
      makeCertificate(
        "SIG-002",
        "Controller of Examination",
        "Authorized Signatory",
        "2026-10-22",
        "Active",
        "Authorized signature for academic certificates.",
        {
          signerName: "Prof. Karim Uddin",
          designation: "Controller of Examination",
          department: "Examination Office",
          signatureType: "Digital Certificate",
          validFrom: "2026-01-01",
          validUntil: "2027-01-01",
          certificateAuthority: "Institutional CA",
        }
      ),
      makeCertificate(
        "SIG-003",
        "Academic Director Signature",
        "Authorized Signatory",
        "2026-10-25",
        "Pending",
        "Digital signature awaiting administrative approval.",
        {
          signerName: "Dr. Nusrat Jahan",
          designation: "Academic Director",
          department: "Academic Affairs",
          signatureType: "Digital Certificate",
          validFrom: "2026-11-01",
          validUntil: "2027-11-01",
          certificateAuthority: "Institutional CA",
        }
      ),
    ],
  },

  qrVerification: {
    title: "QR Verification Management",
    subtitle: "Manage QR codes attached to issued certificates",
    type: "qrVerification",
    records: [
      makeCertificate(
        "QR-001",
        "Bachelor Degree Certificate",
        "QR Code",
        "2026-10-25",
        "Generated",
        "QR code generated for a bachelor degree certificate.",
        {
          certificateNumber: "CERT-2026-001",
          studentName: "Rahim Ahmed",
          studentId: "STU-1001",
          qrCodeValue: "CERT-2026-001-QR",
          generatedAt: "2026-10-25",
          scanCount: 12,
          verificationUrl: "/verify/CERT-2026-001",
        }
      ),
      makeCertificate(
        "QR-002",
        "Academic Transcript",
        "QR Code",
        "2026-10-26",
        "Generated",
        "QR code generated for an academic transcript.",
        {
          certificateNumber: "CERT-2026-002",
          studentName: "Nusrat Jahan",
          studentId: "STU-1002",
          qrCodeValue: "CERT-2026-002-QR",
          generatedAt: "2026-10-26",
          scanCount: 8,
          verificationUrl: "/verify/CERT-2026-002",
        }
      ),
      makeCertificate(
        "QR-003",
        "Course Completion Certificate",
        "QR Code",
        "2026-10-28",
        "Not Generated",
        "QR code has not yet been generated for this certificate.",
        {
          certificateNumber: "CERT-2026-003",
          studentName: "Sakib Hasan",
          studentId: "STU-1003",
          qrCodeValue: "Not Available",
          generatedAt: "—",
          scanCount: 0,
          verificationUrl: "—",
        }
      ),
    ],
  },

  onlineVerification: {
    title: "Online Certificate Verification",
    subtitle: "Review certificate verification requests and results",
    type: "onlineVerification",
    records: [
      makeCertificate(
        "VER-001",
        "Bachelor Degree Certificate",
        "Verification Request",
        "2026-10-29",
        "Verified",
        "Certificate successfully verified through the online portal.",
        {
          certificateNumber: "CERT-2026-001",
          studentName: "Rahim Ahmed",
          studentId: "STU-1001",
          requestedBy: "ABC Company",
          verificationMethod: "Certificate Number",
          verifiedAt: "2026-10-29",
          verifiedBy: "System",
        }
      ),
      makeCertificate(
        "VER-002",
        "Academic Transcript",
        "Verification Request",
        "2026-10-30",
        "Pending",
        "Certificate verification request is waiting for review.",
        {
          certificateNumber: "CERT-2026-002",
          studentName: "Nusrat Jahan",
          studentId: "STU-1002",
          requestedBy: "XYZ Organization",
          verificationMethod: "QR Code",
          verifiedAt: "—",
          verifiedBy: "Not Assigned",
        }
      ),
      makeCertificate(
        "VER-003",
        "Course Completion Certificate",
        "Verification Request",
        "2026-10-31",
        "Rejected",
        "The submitted certificate information could not be matched.",
        {
          certificateNumber: "CERT-2026-003",
          studentName: "Sakib Hasan",
          studentId: "STU-1003",
          requestedBy: "External Organization",
          verificationMethod: "Certificate Number",
          verifiedAt: "2026-10-31",
          verifiedBy: "Verification Officer",
        }
      ),
    ],
  },
};
