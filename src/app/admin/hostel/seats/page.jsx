
import HostelList from "../_components/HostelList";
import { hostelPages } from "../_components/hostelData";

export default function SeatsPage() {
  return <HostelList config={hostelPages.seats} />;
}
