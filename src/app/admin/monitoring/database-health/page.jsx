import MonitoringList from "../_components/MonitoringList";
import { monitoringPages } from "../_components/monitoringData";

export default function DatabaseHealthPage() {
  return <MonitoringList config={monitoringPages.databaseHealth} />;
}