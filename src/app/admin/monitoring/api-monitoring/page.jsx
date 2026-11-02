import MonitoringList from "../_components/MonitoringList";
import { monitoringPages } from "../_components/monitoringData";

export default function ApiMonitoringPage() {
  return <MonitoringList config={monitoringPages.apiMonitoring} />;
}