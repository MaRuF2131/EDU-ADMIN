
import ImportExportList from "../_components/ImportExportList";
import { importExportPages } from "../_components/importExportData";

export default function BulkDeletePage() {
  return (
    <ImportExportList config={importExportPages.delete} mode="bulk" />
  );
}
