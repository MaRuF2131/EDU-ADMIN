
import TransportList from "../_components/TransportList";
import { transportPages } from "../_components/transportData";

export default function GPSPage() {
  return <TransportList config={transportPages.gps} />;
}
