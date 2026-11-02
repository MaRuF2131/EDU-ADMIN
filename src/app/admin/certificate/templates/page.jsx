
import CertificateList from "../_components/CertificateList";
import { certificatePages } from "../_components/certificateData";

export default function TemplatesPage() {
  return <CertificateList config={certificatePages.templates} />;
}
