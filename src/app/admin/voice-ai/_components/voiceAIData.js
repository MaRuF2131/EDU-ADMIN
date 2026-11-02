
export const voiceAIMenu = [
  {
    title: "Overview",
    href: "/admin/voice-ai",
    icon: "LayoutDashboard",
  },
  {
    title: "Dual-Channel Support",
    href: "/admin/voice-ai/channels",
    icon: "Phone",
    children: [
      { title: "Phone Numbers", href: "/admin/voice-ai/channels/phone-numbers" },
      { title: "Website Voice Widget", href: "/admin/voice-ai/channels/web-widget" },
    ],
  },
  {
    title: "AI Conversational Engine",
    href: "/admin/voice-ai/engine",
    icon: "Bot",
    children: [
      { title: "Knowledge Base", href: "/admin/voice-ai/engine/knowledge-base" },
      { title: "Voice Settings", href: "/admin/voice-ai/engine/voice-settings" },
      { title: "Test Playground", href: "/admin/voice-ai/engine/test-playground" },
    ],
  },
  {
    title: "Complaint Detection",
    href: "/admin/voice-ai/objection-detect",
    icon: "ShieldAlert",
    children: [
      { title: "Detection Rules", href: "/admin/voice-ai/objection-detect/detection-rules" },
      { title: "Complaint Tickets", href: "/admin/voice-ai/objection-detect/complaint-tickets" },
      { title: "Notifications", href: "/admin/voice-ai/objection-detect/notifications" },
    ],
  },
  {
    title: "Staff Routing",
    href: "/admin/voice-ai/routing",
    icon: "Route",
    children: [
      { title: "Staff Directory", href: "/admin/voice-ai/routing/staff-directory" },
      { title: "Transfer Rules", href: "/admin/voice-ai/routing/transfer-rules" },
      { title: "Callbacks", href: "/admin/voice-ai/routing/callbacks" },
    ],
  },
  {
    title: "Call Logs & Analytics",
    href: "/admin/voice-ai/logs",
    icon: "ChartNoAxesCombined",
    children: [
      { title: "Call History", href: "/admin/voice-ai/logs/call-history" },
      { title: "Transcriptions", href: "/admin/voice-ai/logs/transcriptions" },
      { title: "Analytics", href: "/admin/voice-ai/logs/analytics" },
      { title: "Voice Customization", href: "/admin/voice-ai/logs/voice-customization" },
    ],
  },
];

export const voiceAIStats = [
  { label: "Total Calls", value: "12,845", change: "+12.8%", icon: "Phone" },
  { label: "AI Handled Calls", value: "10,284", change: "+18.2%", icon: "Bot" },
  { label: "Complaints Detected", value: "348", change: "+5.4%", icon: "ShieldAlert" },
  { label: "Pending Callbacks", value: "26", change: "-8.2%", icon: "CalendarClock" },
];

export const voiceAIActivity = [
  {
    id: "CALL-1025",
    caller: "Student - 2026001",
    channel: "Phone",
    purpose: "Admission inquiry",
    status: "Completed",
    duration: "04:32",
    time: "10:42 AM",
  },
  {
    id: "CALL-1024",
    caller: "Guardian - 10082",
    channel: "Website",
    purpose: "Fee payment issue",
    status: "Complaint Detected",
    duration: "06:18",
    time: "10:35 AM",
  },
  {
    id: "CALL-1023",
    caller: "Student - 2026045",
    channel: "Phone",
    purpose: "Talk to HOD",
    status: "Transferred",
    duration: "02:45",
    time: "10:20 AM",
  },
  {
    id: "CALL-1022",
    caller: "Unknown Caller",
    channel: "Website",
    purpose: "Course information",
    status: "Completed",
    duration: "03:12",
    time: "10:05 AM",
  },
];

export const voiceAIComplaints = [
  {
    id: "TKT-1001",
    subject: "Exam result correction request",
    category: "Result",
    priority: "High",
    assignedTo: "Exam Controller",
    status: "Pending",
    date: "2026-11-02",
  },
  {
    id: "TKT-1002",
    subject: "Tuition fee payment not updated",
    category: "Finance",
    priority: "Medium",
    assignedTo: "Accounts Officer",
    status: "In Progress",
    date: "2026-11-02",
  },
  {
    id: "TKT-1003",
    subject: "Class attendance discrepancy",
    category: "Attendance",
    priority: "High",
    assignedTo: "Department Admin",
    status: "Pending",
    date: "2026-11-01",
  },
];

export const voiceAIStaff = [
  {
    id: "STF-001",
    name: "Academic Controller",
    department: "Academic",
    role: "Controller",
    availability: "Available",
    channels: "SMS, Email, Panel",
  },
  {
    id: "STF-002",
    name: "Accounts Officer",
    department: "Finance",
    role: "Officer",
    availability: "Busy",
    channels: "SMS, Email",
  },
  {
    id: "STF-003",
    name: "Department Head",
    department: "CSE",
    role: "HOD",
    availability: "Available",
    channels: "SMS, Push, Panel",
  },
];

export const voiceAIPageConfig = {
  channels: {
    title: "Dual-Channel Call Support",
    description: "Manage phone calls and website-based voice conversations.",
    icon: "Phone",
    stats: ["2 Channels", "1 Connected Provider", "1 Widget", "0 Critical Issues"],
    columns: ["name", "type", "provider", "status"],
    rows: [
      { id: "CH-01", name: "Institution Phone", type: "Phone", provider: "Twilio / SIP", status: "Connected" },
      { id: "CH-02", name: "Website Voice Widget", type: "WebRTC", provider: "Web Voice", status: "Active" },
    ],
    actions: ["Configure", "View Details"],
  },
  phoneNumbers: {
    title: "Phone Number Management",
    description: "Configure institutional numbers and telephony providers.",
    icon: "PhoneCall",
    columns: ["number", "provider", "region", "status"],
    rows: [
      { id: "PN-001", number: "+8801XXXXXXXXX", provider: "Twilio", region: "Bangladesh", status: "Connected" },
      { id: "PN-002", number: "SIP Extension 100", provider: "SIP", region: "Institution", status: "Pending" },
    ],
  },
  webWidget: {
    title: "Website Voice Widget",
    description: "Manage the website voice assistant and click-to-call settings.",
    icon: "Globe",
    columns: ["name", "placement", "language", "status"],
    rows: [
      { id: "WG-001", name: "Student Help Widget", placement: "Bottom Right", language: "Bangla, English", status: "Active" },
    ],
  },
  engine: {
    title: "AI Conversational Engine",
    description: "Configure how the AI understands questions and responds to callers.",
    icon: "Bot",
    stats: ["AI Model: Connected", "Speech-to-Text: Ready", "Text-to-Speech: Ready", "Knowledge Base: Demo"],
    columns: ["service", "provider", "purpose", "status"],
    rows: [
      { id: "AI-01", service: "Speech-to-Text", provider: "STT Provider", purpose: "Caller voice recognition", status: "Connected" },
      { id: "AI-02", service: "Text-to-Speech", provider: "TTS Provider", purpose: "AI voice response", status: "Connected" },
      { id: "AI-03", service: "Conversation Model", provider: "LLM Provider", purpose: "Natural conversation", status: "Active" },
    ],
  },
  knowledgeBase: {
    title: "Institution Knowledge Base",
    description: "Manage verified institutional FAQs, rules, policies and answers.",
    icon: "BookOpen",
    columns: ["title", "category", "language", "status"],
    rows: [
      { id: "KB-001", title: "Admission Guidelines 2026", category: "Admission", language: "Bangla, English", status: "Published" },
      { id: "KB-002", title: "Tuition Fee Policy", category: "Finance", language: "English", status: "Published" },
      { id: "KB-003", title: "Examination Rules", category: "Academic", language: "Bangla", status: "Draft" },
    ],
  },
  voiceSettings: {
    title: "AI Voice Settings",
    description: "Configure the assistant's voice, speaking speed and languages.",
    icon: "AudioLines",
    columns: ["setting", "value", "description", "status"],
    rows: [
      { id: "VS-01", setting: "Default Language", value: "Bangla", description: "Primary response language", status: "Active" },
      { id: "VS-02", setting: "Speaking Speed", value: "Normal", description: "Speech rate", status: "Active" },
      { id: "VS-03", setting: "Voice Profile", value: "Institution Voice 01", description: "Selected voice", status: "Active" },
    ],
  },
  playground: {
    title: "AI Voice Test Playground",
    description: "Test sample questions and inspect AI responses before publishing.",
    icon: "Mic",
    columns: ["test", "language", "expected intent", "status"],
    rows: [
      { id: "TEST-01", test: "Admission information", language: "Bangla", "expected intent": "Admission", status: "Passed" },
      { id: "TEST-02", test: "Fee payment issue", language: "English", "expected intent": "Finance Complaint", status: "Passed" },
    ],
  },
  objections: {
    title: "Auto Objection & Complaint Detection",
    description: "Monitor detected objections and route complaints to responsible teams.",
    icon: "ShieldAlert",
    columns: ["id", "subject", "category", "priority", "assignedTo", "status"],
    rows: voiceAIComplaints,
  },
  detectionRules: {
    title: "Complaint Detection Rules",
    description: "Configure categories, detection thresholds and escalation policies.",
    icon: "ListChecks",
    columns: ["rule", "category", "sensitivity", "auto ticket", "status"],
    rows: [
      { id: "DR-01", rule: "Result dispute", category: "Academic", sensitivity: "High", "auto ticket": "Yes", status: "Active" },
      { id: "DR-02", rule: "Fee payment complaint", category: "Finance", sensitivity: "Medium", "auto ticket": "Yes", status: "Active" },
      { id: "DR-03", rule: "Staff behavior complaint", category: "Conduct", sensitivity: "High", "auto ticket": "Review required", status: "Active" },
    ],
  },
  tickets: {
    title: "Complaint & Objection Tickets",
    description: "Review AI-generated complaint tickets and manage their resolution.",
    icon: "Ticket",
    columns: ["id", "subject", "category", "priority", "assignedTo", "status"],
    rows: voiceAIComplaints,
  },
  complaintNotifications: {
    title: "Complaint Notifications",
    description: "Set up responsible-person alerts and escalation channels.",
    icon: "Bell",
    columns: ["event", "recipient", "channel", "trigger", "status"],
    rows: [
      { id: "NT-01", event: "High priority complaint", recipient: "HOD", channel: "SMS + Panel", trigger: "Immediately", status: "Active" },
      { id: "NT-02", event: "Finance complaint", recipient: "Accounts Officer", channel: "Email", trigger: "Immediately", status: "Active" },
    ],
  },
  routing: {
    title: "Specific Person Routing",
    description: "Route callers to the correct staff member or schedule a callback.",
    icon: "Route",
    columns: ["name", "department", "role", "availability", "channels"],
    rows: voiceAIStaff,
  },
  staffDirectory: {
    title: "Staff Directory",
    description: "Manage staff members available for AI call routing.",
    icon: "Users",
    columns: ["name", "department", "role", "availability", "channels"],
    rows: voiceAIStaff,
  },
  transferRules: {
    title: "Call Transfer Rules",
    description: "Configure availability checks, transfer permissions and fallback routes.",
    icon: "PhoneForwarded",
    columns: ["rule", "department", "availability check", "fallback", "status"],
    rows: [
      { id: "TR-01", rule: "Academic inquiry", department: "Academic", "availability check": "Required", fallback: "Schedule callback", status: "Active" },
      { id: "TR-02", rule: "Finance inquiry", department: "Finance", "availability check": "Required", fallback: "Create ticket", status: "Active" },
    ],
  },
  callbacks: {
    title: "Callback Scheduling",
    description: "Manage callers waiting for a staff callback.",
    icon: "CalendarClock",
    columns: ["id", "caller", "requested person", "scheduled time", "status"],
    rows: [
      { id: "CB-001", caller: "Student - 2026001", "requested person": "Academic Controller", "scheduled time": "Today, 3:00 PM", status: "Pending" },
      { id: "CB-002", caller: "Guardian - 10082", "requested person": "Accounts Officer", "scheduled time": "Tomorrow, 11:00 AM", status: "Confirmed" },
    ],
  },
  logs: {
    title: "Call Logs & Admin Control",
    description: "Monitor calls, AI outcomes and operational performance.",
    icon: "ChartNoAxesCombined",
    columns: ["id", "caller", "channel", "purpose", "duration", "status"],
    rows: voiceAIActivity,
  },
  callHistory: {
    title: "Call History",
    description: "Search and review institutional inbound and outbound call records.",
    icon: "Phone",
    columns: ["id", "caller", "channel", "purpose", "duration", "status"],
    rows: voiceAIActivity,
  },
  transcriptions: {
    title: "Call Transcriptions",
    description: "Review speech-to-text output and AI conversation summaries.",
    icon: "FileText",
    columns: ["id", "caller", "language", "summary", "status"],
    rows: [
      { id: "TX-001", caller: "Student - 2026001", language: "Bangla", summary: "Admission eligibility inquiry", status: "Reviewed" },
      { id: "TX-002", caller: "Guardian - 10082", language: "English", summary: "Fee payment discrepancy", status: "Pending Review" },
    ],
  },
  analytics: {
    title: "Voice AI Analytics",
    description: "Analyze call volume, complaint trends, response time and resolution.",
    icon: "ChartNoAxesCombined",
    columns: ["metric", "current period", "previous period", "trend"],
    rows: [
      { id: "AN-01", metric: "Total Calls", "current period": "12,845", "previous period": "11,390", trend: "+12.8%" },
      { id: "AN-02", metric: "AI Resolution Rate", "current period": "80%", "previous period": "74%", trend: "+6%" },
      { id: "AN-03", metric: "Complaint Ratio", "current period": "2.7%", "previous period": "2.4%", trend: "+0.3%" },
    ],
  },
  customization: {
    title: "Voice Customization",
    description: "Manage voice profiles, speaking style and supported languages.",
    icon: "SlidersHorizontal",
    columns: ["profile", "language", "tone", "status"],
    rows: [
      { id: "VP-01", profile: "Institution Voice 01", language: "Bangla", tone: "Professional", status: "Active" },
      { id: "VP-02", profile: "Institution Voice 02", language: "English", tone: "Friendly", status: "Draft" },
    ],
  },
};
