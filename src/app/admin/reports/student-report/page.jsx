
import ReportList from "../_components/ReportList";
import { reportPages } from "../_components/reportData";

export default function StudentReportPage() {
  return <ReportList config={reportPages.studentReport} />;
}
