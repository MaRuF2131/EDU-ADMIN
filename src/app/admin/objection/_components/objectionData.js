
const makeItem = (id, student, studentId, subject, date, priority, status, description, extra = []) => ({
  id, student, studentId, subject, date, priority, status, description, extra,
});

export const objectionPages = {
  "result-challenge": {
    title: "Result Challenge",
    listTitle: "Result Challenge Applications",
    description: "Review student requests regarding examination results, marks and grades.",
    items: [
      makeItem("RC-1001", "Rahim Ahmed", "ST-1001", "Data Structures - Final", "2026-10-25", "High", "Pending", "Student requests a review of the final examination marks.", [["Course Code", "CSE-301"], ["Obtained Marks", "65"], ["Expected Marks", "75"], ["Exam", "Final Examination"]]),
      makeItem("RC-1002", "Nusrat Jahan", "ST-1002", "Business Mathematics", "2026-10-26", "Medium", "Processing", "Student disputes the evaluation of an examination answer.", [["Course Code", "BBA-202"], ["Obtained Marks", "58"], ["Expected Marks", "68"]]),
      makeItem("RC-1003", "Sakib Hasan", "ST-1003", "Database Systems", "2026-10-27", "Low", "Resolved", "Student requested verification of the published result.", [["Course Code", "CSE-305"], ["Obtained Marks", "72"], ["Expected Marks", "72"]]),
    ],
  },

  "attendance-challenge": {
    title: "Attendance Challenge",
    listTitle: "Attendance Correction Requests",
    description: "Review attendance disputes and student requests for attendance corrections.",
    items: [
      makeItem("AC-2001", "Rahim Ahmed", "ST-1001", "Software Engineering", "2026-10-25", "High", "Pending", "Student claims attendance was incorrectly marked absent.", [["Course Code", "CSE-401"], ["Attendance Recorded", "68%"], ["Attendance Claimed", "82%"], ["Class Date", "2026-10-20"]]),
      makeItem("AC-2002", "Nusrat Jahan", "ST-1002", "Accounting", "2026-10-26", "Medium", "Processing", "Attendance record needs verification against the class register.", [["Course Code", "BBA-301"], ["Attendance Recorded", "72%"], ["Attendance Claimed", "78%"]]),
      makeItem("AC-2003", "Sakib Hasan", "ST-1003", "Computer Networks", "2026-10-27", "Low", "Resolved", "Student requested correction of an attendance entry.", [["Course Code", "CSE-302"], ["Attendance Recorded", "85%"], ["Attendance Claimed", "85%"]]),
    ],
  },

  "payment-issue": {
    title: "Payment Issue",
    listTitle: "Payment Issue Reports",
    description: "Investigate failed transactions, duplicate payments and fee discrepancies.",
    items: [
      makeItem("PI-3001", "Rahim Ahmed", "ST-1001", "Semester Fee", "2026-10-25", "High", "Pending", "Student reports that payment was deducted but the fee remains unpaid.", [["Transaction ID", "TXN-908123"], ["Amount", "৳15,000"], ["Payment Method", "Mobile Banking"], ["Payment Date", "2026-10-24"]]),
      makeItem("PI-3002", "Nusrat Jahan", "ST-1002", "Exam Fee", "2026-10-26", "Medium", "Processing", "Student reports a duplicate transaction.", [["Transaction ID", "TXN-908124"], ["Amount", "৳2,500"], ["Payment Method", "Bank"]]),
      makeItem("PI-3003", "Sakib Hasan", "ST-1003", "Admission Fee", "2026-10-27", "Low", "Resolved", "Payment confirmation was not reflected in the student account.", [["Transaction ID", "TXN-908125"], ["Amount", "৳10,000"], ["Payment Method", "Online"]]),
    ],
  },

  complaint: {
    title: "Complaint Management",
    listTitle: "Student & Guardian Complaints",
    description: "Receive, investigate and manage complaints from students and guardians.",
    items: [
      makeItem("CM-4001", "Rahim Ahmed", "ST-1001", "Classroom Facilities", "2026-10-25", "High", "Pending", "Student reported an issue regarding classroom facilities.", [["Complaint Category", "Facilities"], ["Submitted By", "Student"], ["Department", "CSE"]]),
      makeItem("CM-4002", "Nusrat Jahan", "ST-1002", "Administrative Service", "2026-10-26", "Medium", "Processing", "Complaint regarding delayed administrative support.", [["Complaint Category", "Administration"], ["Submitted By", "Guardian"], ["Department", "Administration"]]),
      makeItem("CM-4003", "Sakib Hasan", "ST-1003", "Library Service", "2026-10-27", "Low", "Resolved", "Student reported a library service issue.", [["Complaint Category", "Library"], ["Submitted By", "Student"], ["Department", "Library"]]),
    ],
  },

  appeal: {
    title: "Appeal Management",
    listTitle: "Appeal Applications",
    description: "Review appeals against rejected applications and previous administrative decisions.",
    items: [
      makeItem("AP-5001", "Rahim Ahmed", "ST-1001", "Result Challenge Appeal", "2026-10-25", "High", "Pending", "Student has appealed the previous result challenge decision.", [["Original Reference", "RC-1001"], ["Previous Decision", "Rejected"], ["Appeal Reason", "Requests a second independent review"]]),
      makeItem("AP-5002", "Nusrat Jahan", "ST-1002", "Attendance Appeal", "2026-10-26", "Medium", "Processing", "Student appeals an attendance correction decision.", [["Original Reference", "AC-2002"], ["Previous Decision", "Rejected"], ["Appeal Reason", "Additional supporting evidence submitted"]]),
      makeItem("AP-5003", "Sakib Hasan", "ST-1003", "Payment Appeal", "2026-10-27", "Low", "Resolved", "Student appealed a payment issue decision.", [["Original Reference", "PI-3003"], ["Previous Decision", "Rejected"], ["Appeal Reason", "New transaction proof provided"]]),
    ],
  },

  resolution: {
    title: "Resolution Center",
    listTitle: "Cases Requiring Resolution",
    description: "Coordinate investigations, assign responsible departments and record final decisions.",
    items: [
      makeItem("RS-6001", "Rahim Ahmed", "ST-1001", "Result Dispute", "2026-10-25", "High", "Processing", "Investigation is ongoing with the examination department.", [["Assigned Department", "Examination Office"], ["Assigned Officer", "Academic Controller"], ["Target Date", "2026-11-05"]]),
      makeItem("RS-6002", "Nusrat Jahan", "ST-1002", "Payment Dispute", "2026-10-26", "Medium", "Pending", "Waiting for transaction verification from the accounts department.", [["Assigned Department", "Accounts"], ["Assigned Officer", "Accounts Officer"], ["Target Date", "2026-11-06"]]),
      makeItem("RS-6003", "Sakib Hasan", "ST-1003", "Attendance Dispute", "2026-10-27", "Low", "Resolved", "Attendance record was reviewed and the correction was completed.", [["Assigned Department", "Academic Office"], ["Assigned Officer", "Department Coordinator"], ["Target Date", "2026-10-30"]]),
    ],
  },

  "ai-notices": {
    title: "AI Voice Notices",
    listTitle: "AI Generated Notices",
    description: "Review notices generated from AI voice-call interactions before administrative action.",
    items: [
      {
        ...makeItem("AI-7001", "Rahim Ahmed", "ST-1001", "Fee Payment Reminder", "2026-10-25", "High", "Generated", "AI identified an unresolved semester fee issue from a voice-call interaction.", [["Call Reference", "CALL-10001"], ["Call Date", "2026-10-25"], ["Language", "Bangla"], ["Notice Type", "Payment Reminder"]]),
        aiSummary: "Student mentioned that the semester fee payment was completed but the portal still shows an unpaid balance.",
      },
      {
        ...makeItem("AI-7002", "Nusrat Jahan", "ST-1002", "Attendance Complaint", "2026-10-26", "Medium", "Pending", "AI detected a possible attendance complaint during a voice call.", [["Call Reference", "CALL-10002"], ["Call Date", "2026-10-26"], ["Language", "Bangla"], ["Notice Type", "Attendance Review"]]),
        aiSummary: "Student requested verification of attendance records for a particular course.",
      },
      {
        ...makeItem("AI-7003", "Sakib Hasan", "ST-1003", "Administrative Complaint", "2026-10-27", "Low", "Processing", "AI generated a notice based on an administrative service complaint.", [["Call Reference", "CALL-10003"], ["Call Date", "2026-10-27"], ["Language", "English"], ["Notice Type", "Complaint Review"]]),
        aiSummary: "Caller requested an update regarding a pending administrative application.",
      },
    ],
  },
};
