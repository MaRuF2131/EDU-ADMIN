import MonitoringList from "../_components/MonitoringList";
import { monitoringPages } from "../_components/monitoringData";

export default function ServerHealthPage() {
  return <MonitoringList config={monitoringPages.serverHealth} />;
}