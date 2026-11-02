
import ReportList from "../_components/ReportList";
import { reportPages } from "../_components/reportData";

export default function DepartmentReportPage() {
  return <ReportList config={reportPages.departmentReport} />;
}
