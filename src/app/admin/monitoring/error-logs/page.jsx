import MonitoringList from "../_components/MonitoringList";
import { monitoringPages } from "../_components/monitoringData";

export default function ErrorLogsPage() {
  return <MonitoringList config={monitoringPages.errorLogs} />;
}