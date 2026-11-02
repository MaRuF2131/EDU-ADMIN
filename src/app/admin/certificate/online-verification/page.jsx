
import CertificateList from "../_components/CertificateList";
import { certificatePages } from "../_components/certificateData";

export default function OnlineVerificationPage() {
  return (
    <CertificateList config={certificatePages.onlineVerification} />
  );
}
