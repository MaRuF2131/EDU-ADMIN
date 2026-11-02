
export const makeNotice = (
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

export const noticePages = {
  notices: {
    title: "Notice Management",
    subtitle: "Create and manage institutional notices",
    type: "notices",
    records: [
      makeNotice("NOT-001", "Semester Final Exam Routine", "Academic", "2026-11-01", "Published", "Final examination routine for all departments.", {
        audience: "All Students",
        publishDate: "2026-11-01",
        expiryDate: "2026-11-20",
        createdBy: "Admin",
        priority: "High",
      }),
      makeNotice("NOT-002", "Library Book Return Reminder", "Library", "2026-10-30", "Draft", "Students are requested to return borrowed books.", {
        audience: "Library Members",
        publishDate: "2026-11-05",
        expiryDate: "2026-11-15",
        createdBy: "Library Admin",
        priority: "Medium",
      }),
      makeNotice("NOT-003", "Campus Maintenance Notice", "General", "2026-10-28", "Scheduled", "Some campus facilities will remain unavailable during maintenance.", {
        audience: "All Users",
        publishDate: "2026-11-04",
        expiryDate: "2026-11-06",
        createdBy: "System Admin",
        priority: "Low",
      }),
    ],
  },

  announcements: {
    title: "Announcement Management",
    subtitle: "Manage important institutional announcements",
    type: "announcements",
    records: [
      makeNotice("ANN-001", "New Academic Session Registration", "Admission", "2026-11-01", "Published", "Registration for the upcoming academic session is now open.", {
        audience: "Applicants",
        publishDate: "2026-11-01",
        expiryDate: "2026-12-15",
        createdBy: "Admission Office",
        priority: "High",
      }),
      makeNotice("ANN-002", "Annual Sports Week", "Event", "2026-10-29", "Scheduled", "Annual sports week will be arranged on campus.", {
        audience: "Students",
        publishDate: "2026-11-10",
        expiryDate: "2026-11-17",
        createdBy: "Sports Committee",
        priority: "Medium",
      }),
    ],
  },

  popup: {
    title: "Popup Management",
    subtitle: "Manage website and dashboard popup messages",
    type: "popup",
    records: [
      makeNotice("POP-001", "Welcome to Student Portal", "Welcome Popup", "2026-11-01", "Active", "Welcome message displayed to students after login.", {
        audience: "Students",
        position: "Center",
        displayFrequency: "Once per user",
        startDate: "2026-11-01",
        endDate: "2026-12-31",
      }),
      makeNotice("POP-002", "Payment Deadline Reminder", "Reminder Popup", "2026-10-30", "Inactive", "Reminder popup for pending semester payments.", {
        audience: "Students",
        position: "Bottom Right",
        displayFrequency: "Every login",
        startDate: "2026-11-05",
        endDate: "2026-11-15",
      }),
    ],
  },

  sms: {
    title: "SMS Management",
    subtitle: "Manage SMS messages and delivery records",
    type: "sms",
    records: [
      makeNotice("SMS-001", "Exam Schedule SMS", "Academic SMS", "2026-11-01", "Sent", "Exam schedule notification sent to registered students.", {
        recipient: "250 Students",
        phone: "Bulk Recipients",
        provider: "SMS Gateway",
        sentCount: 250,
        failedCount: 3,
      }),
      makeNotice("SMS-002", "Payment Reminder", "Payment SMS", "2026-10-31", "Pending", "Semester payment reminder for students with pending dues.", {
        recipient: "80 Students",
        phone: "Bulk Recipients",
        provider: "SMS Gateway",
        sentCount: 0,
        failedCount: 0,
      }),
    ],
  },

  email: {
    title: "Email Management",
    subtitle: "Manage institutional email campaigns",
    type: "email",
    records: [
      makeNotice("EML-001", "Welcome Email", "Account Email", "2026-11-01", "Sent", "Welcome email sent to newly registered students.", {
        recipient: "120 Users",
        email: "Bulk Recipients",
        template: "Welcome Template",
        sentCount: 120,
        failedCount: 2,
      }),
      makeNotice("EML-002", "Monthly Newsletter", "Newsletter", "2026-10-30", "Scheduled", "Monthly institutional newsletter for students and teachers.", {
        recipient: "500 Users",
        email: "Bulk Recipients",
        template: "Newsletter Template",
        sentCount: 0,
        failedCount: 0,
      }),
    ],
  },

  pushNotification: {
    title: "Push Notification Management",
    subtitle: "Manage browser and mobile push notifications",
    type: "pushNotification",
    records: [
      makeNotice("PUSH-001", "New Result Published", "Academic Alert", "2026-11-01", "Sent", "A new semester result has been published.", {
        audience: "Students",
        platform: "Web and Android",
        sentCount: 850,
        failedCount: 12,
      }),
      makeNotice("PUSH-002", "Class Schedule Update", "Schedule Alert", "2026-10-31", "Scheduled", "Notification about the updated class schedule.", {
        audience: "CSE Department",
        platform: "Web and Mobile",
        sentCount: 0,
        failedCount: 0,
      }),
    ],
  },
};
