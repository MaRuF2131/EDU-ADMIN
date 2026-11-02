
import HostelList from "../_components/HostelList";
import { hostelPages } from "../_components/hostelData";

export default function RoomsPage() {
  return <HostelList config={hostelPages.rooms} />;
}
