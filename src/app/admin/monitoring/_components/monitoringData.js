export const createMonitoringRecord = (
  id,
  name,
  category,
  metric,
  value,
  status,
  lastChecked,
  description,
  extra = {}
) => ({
  id,
  name,
  category,
  metric,
  value,
  status,
  lastChecked,
  description,
  ...extra,
});

export const monitoringPages = {
  serverHealth: {
    title: "Server Health",
    description: "Monitor server uptime, CPU, memory and system performance.",
    records: [
      createMonitoringRecord("SRV-001", "Main Application Server", "Server", "CPU Usage", "42%", "Healthy", "2026-11-02 10:30 AM", "Main application server performance.", { memory: "58%", uptime: "99.98%", disk: "64%", hostname: "app-server-01" }),
      createMonitoringRecord("SRV-002", "Background Worker", "Server", "CPU Usage", "76%", "Warning", "2026-11-02 10:25 AM", "Background processing server.", { memory: "82%", uptime: "99.90%", disk: "70%", hostname: "worker-01" }),
      createMonitoringRecord("SRV-003", "Backup Server", "Server", "CPU Usage", "25%", "Healthy", "2026-11-02 10:20 AM", "Backup and archive server.", { memory: "40%", uptime: "99.95%", disk: "52%", hostname: "backup-01" }),
    ],
  },

  databaseHealth: {
    title: "Database Health",
    description: "Monitor database connectivity, performance and resource usage.",
    records: [
      createMonitoringRecord("DB-001", "Main MongoDB", "Database", "Connections", "45 / 200", "Healthy", "2026-11-02 10:30 AM", "Primary application database.", { engine: "MongoDB", responseTime: "18 ms", storage: "12.5 GB", replication: "Healthy" }),
      createMonitoringRecord("DB-002", "Reporting Database", "Database", "Connections", "150 / 200", "Warning", "2026-11-02 10:25 AM", "Reporting and analytics database.", { engine: "MongoDB", responseTime: "95 ms", storage: "8.2 GB", replication: "Healthy" }),
      createMonitoringRecord("DB-003", "Archive Database", "Database", "Connections", "12 / 100", "Healthy", "2026-11-02 10:15 AM", "Historical records database.", { engine: "MongoDB", responseTime: "24 ms", storage: "25 GB", replication: "Healthy" }),
    ],
  },

  queue: {
    title: "Queue Monitoring",
    description: "Monitor background jobs, pending tasks and worker processing.",
    records: [
      createMonitoringRecord("QUE-001", "Email Queue", "Queue", "Waiting Jobs", "125", "Healthy", "2026-11-02 10:30 AM", "Email delivery background queue.", { completed: 4520, failed: 12, active: 8, worker: "email-worker" }),
      createMonitoringRecord("QUE-002", "Notification Queue", "Queue", "Waiting Jobs", "1850", "Warning", "2026-11-02 10:25 AM", "SMS and push notification processing.", { completed: 8520, failed: 45, active: 20, worker: "notification-worker" }),
      createMonitoringRecord("QUE-003", "Report Generation Queue", "Queue", "Waiting Jobs", "15", "Healthy", "2026-11-02 10:20 AM", "Report generation background tasks.", { completed: 1250, failed: 5, active: 2, worker: "report-worker" }),
    ],
  },

  cronJobs: {
    title: "Cron Job Monitoring",
    description: "Monitor scheduled tasks, execution time and job failures.",
    records: [
      createMonitoringRecord("CRN-001", "Daily Database Backup", "Cron Job", "Execution", "Successful", "Healthy", "2026-11-02 02:00 AM", "Daily database backup schedule.", { schedule: "0 2 * * *", nextRun: "2026-11-03 02:00 AM", duration: "12 min", lastResult: "Completed" }),
      createMonitoringRecord("CRN-002", "Attendance Summary", "Cron Job", "Execution", "Successful", "Healthy", "2026-11-02 01:00 AM", "Daily attendance summary generation.", { schedule: "0 1 * * *", nextRun: "2026-11-03 01:00 AM", duration: "4 min", lastResult: "Completed" }),
      createMonitoringRecord("CRN-003", "Fee Reminder", "Cron Job", "Execution", "Failed", "Critical", "2026-11-02 08:00 AM", "Scheduled fee reminder job.", { schedule: "0 8 * * *", nextRun: "2026-11-03 08:00 AM", duration: "Failed", lastResult: "Connection timeout" }),
    ],
  },

  storage: {
    title: "Storage Monitoring",
    description: "Track disk usage, file storage and available capacity.",
    records: [
      createMonitoringRecord("STO-001", "Application Storage", "Storage", "Used Space", "320 GB / 1 TB", "Healthy", "2026-11-02 10:30 AM", "Main application file storage.", { usage: "32%", freeSpace: "680 GB", provider: "Cloud Storage", fileCount: 125000 }),
      createMonitoringRecord("STO-002", "Document Archive", "Storage", "Used Space", "780 GB / 1 TB", "Warning", "2026-11-02 10:25 AM", "Student and institutional document archive.", { usage: "78%", freeSpace: "220 GB", provider: "Cloud Storage", fileCount: 450000 }),
      createMonitoringRecord("STO-003", "Backup Storage", "Storage", "Used Space", "450 GB / 2 TB", "Healthy", "2026-11-02 10:20 AM", "Encrypted backup storage.", { usage: "22.5%", freeSpace: "1.55 TB", provider: "Object Storage", fileCount: 32000 }),
    ],
  },

  cache: {
    title: "Cache Monitoring",
    description: "Monitor cache availability, hit ratio and memory usage.",
    records: [
      createMonitoringRecord("CAC-001", "Redis Main Cache", "Cache", "Hit Rate", "92%", "Healthy", "2026-11-02 10:30 AM", "Main application Redis cache.", { provider: "Redis", memory: "2.1 GB", connectedClients: 45, evictions: 12 }),
      createMonitoringRecord("CAC-002", "Session Cache", "Cache", "Hit Rate", "68%", "Warning", "2026-11-02 10:25 AM", "User session cache.", { provider: "Redis", memory: "1.4 GB", connectedClients: 120, evictions: 85 }),
      createMonitoringRecord("CAC-003", "API Response Cache", "Cache", "Hit Rate", "96%", "Healthy", "2026-11-02 10:20 AM", "Frequently requested API response cache.", { provider: "Redis", memory: "850 MB", connectedClients: 80, evictions: 5 }),
    ],
  },

  apiMonitoring: {
    title: "API Monitoring",
    description: "Track endpoint response time, request volume and API errors.",
    records: [
      createMonitoringRecord("API-001", "Student API", "API", "Response Time", "120 ms", "Healthy", "2026-11-02 10:30 AM", "Student API endpoint monitoring.", { endpoint: "/api/v1/students", method: "GET", requests: 12500, errorRate: "0.2%" }),
      createMonitoringRecord("API-002", "Payment API", "API", "Response Time", "850 ms", "Warning", "2026-11-02 10:25 AM", "Payment API endpoint monitoring.", { endpoint: "/api/v1/payments", method: "POST", requests: 4200, errorRate: "2.5%" }),
      createMonitoringRecord("API-003", "Authentication API", "API", "Response Time", "75 ms", "Healthy", "2026-11-02 10:20 AM", "Authentication endpoint monitoring.", { endpoint: "/api/v1/auth/login", method: "POST", requests: 8200, errorRate: "0.1%" }),
    ],
  },

  errorLogs: {
    title: "Error Logs",
    description: "Review application exceptions, system errors and severity levels.",
    records: [
      createMonitoringRecord("ERR-001", "Payment Timeout", "Error Log", "Severity", "High", "Critical", "2026-11-02 10:25 AM", "Payment provider request timed out.", { service: "Payment Service", code: "ETIMEDOUT", environment: "Production", occurrences: 12 }),
      createMonitoringRecord("ERR-002", "Database Query Warning", "Error Log", "Severity", "Medium", "Warning", "2026-11-02 09:50 AM", "A database query exceeded its expected execution time.", { service: "Database Service", code: "SLOW_QUERY", environment: "Production", occurrences: 8 }),
      createMonitoringRecord("ERR-003", "Invalid Request", "Error Log", "Severity", "Low", "Resolved", "2026-11-01 04:30 PM", "An invalid request was rejected by validation.", { service: "API Service", code: "VALIDATION_ERROR", environment: "Production", occurrences: 25 }),
    ],
  },
};

export const monitoringMenu = [
  { key: "serverHealth", title: "Server Health", href: "/admin/monitoring/server-health", icon: "🖥️" },
  { key: "databaseHealth", title: "Database Health", href: "/admin/monitoring/database-health", icon: "🗄️" },
  { key: "queue", title: "Queue Monitoring", href: "/admin/monitoring/queue", icon: "📥" },
  { key: "cronJobs", title: "Cron Job Monitoring", href: "/admin/monitoring/cron-jobs", icon: "⏰" },
  { key: "storage", title: "Storage Monitoring", href: "/admin/monitoring/storage", icon: "💾" },
  { key: "cache", title: "Cache Monitoring", href: "/admin/monitoring/cache", icon: "⚡" },
  { key: "apiMonitoring", title: "API Monitoring", href: "/admin/monitoring/api-monitoring", icon: "📡" },
  { key: "errorLogs", title: "Error Logs", href: "/admin/monitoring/error-logs", icon: "📜" },
];