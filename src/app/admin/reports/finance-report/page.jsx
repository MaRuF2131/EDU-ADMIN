
import ReportList from "../_components/ReportList";
import { reportPages } from "../_components/reportData";

export default function FinanceReportPage() {
  return <ReportList config={reportPages.financeReport} />;
}
