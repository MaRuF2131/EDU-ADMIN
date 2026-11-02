
import ReportList from "../_components/ReportList";
import { reportPages } from "../_components/reportData";

export default function AdmissionReportPage() {
  return <ReportList config={reportPages.admissionReport} />;
}
