
import TransportList from "../_components/TransportList";
import { transportPages } from "../_components/transportData";

export default function PassesPage() {
  return <TransportList config={transportPages.passes} />;
}
