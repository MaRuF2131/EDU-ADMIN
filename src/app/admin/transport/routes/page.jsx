
import TransportList from "../_components/TransportList";
import { transportPages } from "../_components/transportData";

export default function RoutesPage() {
  return <TransportList config={transportPages.routes} />;
}
