
import ReportList from "../_components/ReportList";
import { reportPages } from "../_components/reportData";

export default function PDFExportPage() {
  return (
    <ReportList
      config={{
        ...reportPages.pdfExport,
        mode: "export",
      }}
    />
  );
}
