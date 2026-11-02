
import ReportList from "../_components/ReportList";
import { reportPages } from "../_components/reportData";

export default function PowerBIPage() {
  return <ReportList config={reportPages.powerBi} />;
}
