
import ReportList from "../_components/ReportList";
import { reportPages } from "../_components/reportData";

export default function CustomReportBuilderPage() {
  return (
    <ReportList
      config={{
        ...reportPages.customReportBuilder,
        mode: "builder",
      }}
    />
  );
}
