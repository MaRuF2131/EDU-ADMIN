
import ReportList from "../_components/ReportList";
import { reportPages } from "../_components/reportData";

export default function TeacherReportPage() {
  return <ReportList config={reportPages.teacherReport} />;
}
