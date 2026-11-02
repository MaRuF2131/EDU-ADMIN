import MonitoringList from "../_components/MonitoringList";
import { monitoringPages } from "../_components/monitoringData";

export default function CronJobsPage() {
  return <MonitoringList config={monitoringPages.cronJobs} />;
}