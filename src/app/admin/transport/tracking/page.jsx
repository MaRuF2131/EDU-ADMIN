
import TransportList from "../_components/TransportList";
import { transportPages } from "../_components/transportData";

export default function TrackingPage() {
  return <TransportList config={transportPages.tracking} />;
}
