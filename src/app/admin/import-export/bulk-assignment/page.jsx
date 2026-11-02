
import ImportExportList from "../_components/ImportExportList";
import { importExportPages } from "../_components/importExportData";

export default function BulkAssignmentPage() {
  return (
    <ImportExportList config={importExportPages.assignment} mode="bulk" />
  );
}
