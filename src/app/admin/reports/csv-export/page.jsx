
import ReportList from "../_components/ReportList";
import { reportPages } from "../_components/reportData";

export default function CSVExportPage() {
  return (
    <ReportList
      config={{
        ...reportPages.csvExport,
        mode: "export",
      }}
    />
  );
}
