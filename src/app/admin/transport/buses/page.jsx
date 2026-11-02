
import TransportList from "../_components/TransportList";
import { transportPages } from "../_components/transportData";

export default function BusesPage() {
  return <TransportList config={transportPages.buses} />;
}
