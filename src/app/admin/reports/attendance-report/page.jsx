
import ReportList from "../_components/ReportList";
import { reportPages } from "../_components/reportData";

export default function AttendanceReportPage() {
  return <ReportList config={reportPages.attendanceReport} />;
}
