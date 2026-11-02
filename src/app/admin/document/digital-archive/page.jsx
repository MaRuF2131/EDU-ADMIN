
import DocumentList from "../_components/DocumentList";
import { documentPages } from "../_components/documentData";

export default function DigitalArchivePage() {
  return <DocumentList config={documentPages.digitalArchive} />;
}
