
import HostelList from "../_components/HostelList";
import { hostelPages } from "../_components/hostelData";

export default function FeesPage() {
  return <HostelList config={hostelPages.fees} />;
}
