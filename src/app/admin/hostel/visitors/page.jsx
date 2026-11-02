
import HostelList from "../_components/HostelList";
import { hostelPages } from "../_components/hostelData";

export default function VisitorsPage() {
  return <HostelList config={hostelPages.visitors} />;
}
