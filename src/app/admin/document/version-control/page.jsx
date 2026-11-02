
import DocumentList from "../_components/DocumentList";
import { documentPages } from "../_components/documentData";

export default function VersionControlPage() {
  return <DocumentList config={documentPages.versionControl} />;
}
