import MonitoringList from "../_components/MonitoringList";
import { monitoringPages } from "../_components/monitoringData";

export default function StoragePage() {
  return <MonitoringList config={monitoringPages.storage} />;
}