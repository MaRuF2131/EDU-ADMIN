
import ObjectionList from "../_components/ObjectionList";
import { objectionPages } from "../_components/objectionData";

export default function PaymentIssuePage() {
  return <ObjectionList config={objectionPages["payment-issue"]} />;
}
