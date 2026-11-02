
import ImportExportList from "../_components/ImportExportList";
import { importExportPages } from "../_components/importExportData";

export default function BulkUpdatePage() {
  return (
    <ImportExportList config={importExportPages.update} mode="bulk" />
  );
}
