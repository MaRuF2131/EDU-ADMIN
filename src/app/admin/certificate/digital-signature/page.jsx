
import CertificateList from "../_components/CertificateList";
import { certificatePages } from "../_components/certificateData";

export default function DigitalSignaturePage() {
  return (
    <CertificateList config={certificatePages.digitalSignature} />
  );
}
