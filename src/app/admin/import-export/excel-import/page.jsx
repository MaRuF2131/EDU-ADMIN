
import ImportExportList from "../_components/ImportExportList";
import { importExportPages } from "../_components/importExportData";

export default function ExcelImportPage() {
  return (
    <ImportExportList config={importExportPages.excel} mode="excel" />
  );
}
