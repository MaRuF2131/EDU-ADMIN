import MonitoringList from "../_components/MonitoringList";
import { monitoringPages } from "../_components/monitoringData";

export default function CachePage() {
  return <MonitoringList config={monitoringPages.cache} />;
}