
import ImportExportList from "../_components/ImportExportList";
import { importExportPages } from "../_components/importExportData";

export default function BulkPromotionPage() {
  return (
    <ImportExportList config={importExportPages.promotion} mode="bulk" />
  );
}
