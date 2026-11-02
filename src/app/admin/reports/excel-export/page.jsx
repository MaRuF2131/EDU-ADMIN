
import ReportList from "../_components/ReportList";
import { reportPages } from "../_components/reportData";

export default function ExcelExportPage() {
  return (
    <ReportList
      config={{
        ...reportPages.excelExport,
        mode: "export",
      }}
    />
  );
}
