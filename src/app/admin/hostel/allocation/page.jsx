
import HostelList from "../_components/HostelList";
import { hostelPages } from "../_components/hostelData";

export default function AllocationPage() {
  return <HostelList config={hostelPages.allocation} />;
}
