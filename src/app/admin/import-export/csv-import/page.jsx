
import ImportExportList from "../_components/ImportExportList";
import { importExportPages } from "../_components/importExportData";

export default function CSVImportPage() {
  return (
    <ImportExportList config={importExportPages.csv} mode="csv" />
  );
}
