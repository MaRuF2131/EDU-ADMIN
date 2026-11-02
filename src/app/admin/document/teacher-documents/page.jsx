
import DocumentList from "../_components/DocumentList";
import { documentPages } from "../_components/documentData";

export default function TeacherDocumentsPage() {
  return <DocumentList config={documentPages.teacherDocuments} />;
}
