
import HRList from "../_components/HRList";
import { hrPages } from "../_components/hrData";

export default function PerformancePage() {
  return <HRList config={{ ...hrPages.performance, type: "performance" }} />;
}
