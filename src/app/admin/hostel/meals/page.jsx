
import HostelList from "../_components/HostelList";
import { hostelPages } from "../_components/hostelData";

export default function MealsPage() {
  return <HostelList config={hostelPages.meals} />;
}
