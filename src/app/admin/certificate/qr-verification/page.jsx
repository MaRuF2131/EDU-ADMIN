
import CertificateList from "../_components/CertificateList";
import { certificatePages } from "../_components/certificateData";

export default function QRVerificationPage() {
  return (
    <CertificateList config={certificatePages.qrVerification} />
  );
}
