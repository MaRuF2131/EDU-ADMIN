
import TransportList from "../_components/TransportList";
import { transportPages } from "../_components/transportData";

export default function DriversPage() {
  return <TransportList config={transportPages.drivers} />;
}
