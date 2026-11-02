
const createNotification = (
  id,
  title,
  recipient,
  type,
  date,
  status,
  description,
  extra = {}
) => ({
  id,
  title,
  recipient,
  type,
  date,
  status,
  description,
  ...extra,
});

export const notificationPages = {
  sms: {
    title: "SMS Notification",
    description: "Manage student, teacher and administrative SMS notifications.",
    searchPlaceholder: "Search SMS, recipient or phone...",
    records: [
      createNotification(
        "SMS-001",
        "Exam Routine Published",
        "Rahim Ahmed",
        "Academic SMS",
        "2026-11-01",
        "Delivered",
        "Exam routine announcement sent to student.",
        {
          phone: "+8801712345001",
          message: "Your semester examination routine has been published.",
          provider: "SMS Gateway",
          segments: 1,
          cost: "৳ 0.50",
        }
      ),
      createNotification(
        "SMS-002",
        "Tuition Fee Reminder",
        "Nusrat Jahan",
        "Finance SMS",
        "2026-11-01",
        "Pending",
        "Tuition payment reminder.",
        {
          phone: "+8801812345002",
          message: "Please complete your semester tuition payment.",
          provider: "SMS Gateway",
          segments: 1,
          cost: "৳ 0.50",
        }
      ),
      createNotification(
        "SMS-003",
        "Admission Confirmation",
        "Sakib Hasan",
        "Admission SMS",
        "2026-10-30",
        "Failed",
        "Admission confirmation message failed.",
        {
          phone: "+8801912345003",
          message: "Your admission application has been approved.",
          provider: "SMS Gateway",
          segments: 1,
          cost: "৳ 0.50",
        }
      ),
    ],
  },

  email: {
    title: "Email Notification",
    description: "Manage institutional emails and automated email communication.",
    searchPlaceholder: "Search email, recipient or subject...",
    records: [
      createNotification(
        "EML-001",
        "Welcome to University",
        "Rahim Ahmed",
        "Welcome Email",
        "2026-11-01",
        "Delivered",
        "Student onboarding email successfully sent.",
        {
          email: "rahim@example.com",
          subject: "Welcome to Our University",
          template: "Student Welcome Template",
          provider: "SMTP Mail Server",
          attachments: 1,
        }
      ),
      createNotification(
        "EML-002",
        "Monthly Fee Statement",
        "Nusrat Jahan",
        "Finance Email",
        "2026-10-30",
        "Pending",
        "Monthly fee statement email.",
        {
          email: "nusrat@example.com",
          subject: "Your Monthly Fee Statement",
          template: "Finance Statement Template",
          provider: "SMTP Mail Server",
          attachments: 1,
        }
      ),
    ],
  },

  whatsapp: {
    title: "WhatsApp Notification",
    description: "Manage WhatsApp messages and approved notification templates.",
    searchPlaceholder: "Search WhatsApp message or recipient...",
    records: [
      createNotification(
        "WAP-001",
        "Admission Update",
        "Rahim Ahmed",
        "Admission",
        "2026-11-01",
        "Delivered",
        "Admission status notification delivered.",
        {
          phone: "+8801712345001",
          template: "admission_status_update",
          provider: "WhatsApp Business API",
          message: "Your admission application status has been updated.",
          messageId: "wamid.sample001",
        }
      ),
      createNotification(
        "WAP-002",
        "Class Reminder",
        "Nusrat Jahan",
        "Academic",
        "2026-10-31",
        "Pending",
        "Class reminder waiting for delivery.",
        {
          phone: "+8801812345002",
          template: "class_reminder",
          provider: "WhatsApp Business API",
          message: "Your class starts tomorrow at 9:00 AM.",
          messageId: "Not assigned",
        }
      ),
    ],
  },

  push: {
    title: "Push Notification",
    description: "Manage browser and mobile application push notifications.",
    searchPlaceholder: "Search notification or device...",
    records: [
      createNotification(
        "PSH-001",
        "New Assignment",
        "All CSE Students",
        "Academic Alert",
        "2026-11-01",
        "Delivered",
        "New assignment notification sent.",
        {
          platform: "Web + Android",
          topic: "cse_students",
          devices: 850,
          title: "New Assignment Available",
          provider: "Firebase Cloud Messaging",
        }
      ),
      createNotification(
        "PSH-002",
        "University Notice",
        "All Students",
        "General Notice",
        "2026-10-30",
        "Pending",
        "University announcement push notification.",
        {
          platform: "Web + Android + iOS",
          topic: "all_students",
          devices: 5200,
          title: "New University Notice",
          provider: "Firebase Cloud Messaging",
        }
      ),
    ],
  },

  telegram: {
    title: "Telegram Notification",
    description: "Manage Telegram bot messages and channel notifications.",
    searchPlaceholder: "Search Telegram message or channel...",
    records: [
      createNotification(
        "TGM-001",
        "Examination Notice",
        "University Notice Channel",
        "Academic",
        "2026-11-01",
        "Delivered",
        "Examination notice published to Telegram.",
        {
          chatId: "@university_notice",
          botName: "University Notification Bot",
          message: "Semester examination notice has been published.",
          provider: "Telegram Bot API",
        }
      ),
      createNotification(
        "TGM-002",
        "Admission Announcement",
        "Admission Channel",
        "Admission",
        "2026-10-30",
        "Pending",
        "Admission announcement awaiting delivery.",
        {
          chatId: "@university_admission",
          botName: "University Notification Bot",
          message: "New admission applications are now open.",
          provider: "Telegram Bot API",
        }
      ),
    ],
  },

  scheduled: {
    title: "Scheduled Notification",
    description: "Create and manage notifications scheduled for future delivery.",
    searchPlaceholder: "Search schedule, recipient or channel...",
    mode: "scheduled",
    records: [
      createNotification(
        "SCH-001",
        "Semester Exam Reminder",
        "All Students",
        "SMS + Email",
        "2026-11-05",
        "Scheduled",
        "Reminder before semester examinations.",
        {
          scheduledTime: "09:00 AM",
          timezone: "Asia/Dhaka",
          repeat: "Once",
          createdBy: "Admin",
        }
      ),
      createNotification(
        "SCH-002",
        "Monthly Fee Reminder",
        "All Students",
        "Email",
        "2026-11-10",
        "Scheduled",
        "Monthly tuition fee reminder.",
        {
          scheduledTime: "10:00 AM",
          timezone: "Asia/Dhaka",
          repeat: "Monthly",
          createdBy: "Finance Admin",
        }
      ),
    ],
  },

  aiAlert: {
    title: "AI Alert",
    description: "Monitor automated alerts generated from analytics and system events.",
    searchPlaceholder: "Search AI alert, student or category...",
    records: [
      createNotification(
        "AIA-001",
        "Low Attendance Warning",
        "Student STU-1001",
        "Attendance Alert",
        "2026-11-01",
        "Active",
        "Attendance level is below the configured threshold.",
        {
          studentId: "STU-1001",
          department: "CSE",
          detectedValue: "48%",
          threshold: "60%",
          severity: "High",
          model: "Attendance Monitoring Model",
          recommendedAction: "Review attendance records and contact the student.",
        }
      ),
      createNotification(
        "AIA-002",
        "Academic Performance Alert",
        "Student STU-1002",
        "Academic Alert",
        "2026-10-30",
        "Under Review",
        "Academic performance requires human review.",
        {
          studentId: "STU-1002",
          department: "BBA",
          detectedValue: "2.10 GPA",
          threshold: "2.50 GPA",
          severity: "Medium",
          model: "Academic Monitoring Model",
          recommendedAction: "Arrange academic advising.",
        }
      ),
    ],
  },

  voiceCall: {
    title: "Voice Call Routing Alert",
    description: "Manage automated voice call alerts and routing events.",
    searchPlaceholder: "Search call, recipient or routing status...",
    records: [
      createNotification(
        "VOC-001",
        "Emergency Campus Alert",
        "Campus Security Team",
        "Emergency Alert",
        "2026-11-01",
        "Completed",
        "Voice alert routing event completed.",
        {
          phone: "+8801712345001",
          callProvider: "Voice Gateway",
          routingGroup: "Campus Security",
          callDuration: "00:45",
          attempts: 1,
          priority: "Critical",
          response: "Acknowledged",
        }
      ),
      createNotification(
        "VOC-002",
        "Admission Deadline Reminder",
        "Admission Office",
        "Administrative Alert",
        "2026-10-30",
        "Pending",
        "Voice call alert waiting for routing.",
        {
          phone: "+8801812345002",
          callProvider: "Voice Gateway",
          routingGroup: "Admission Support",
          callDuration: "Not started",
          attempts: 0,
          priority: "Normal",
          response: "Waiting",
        }
      ),
    ],
  },
};
