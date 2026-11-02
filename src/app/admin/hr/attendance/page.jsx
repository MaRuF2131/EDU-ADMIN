
import HRList from "../_components/HRList";
import { hrPages } from "../_components/hrData";

export default function AttendancePage() {
  return <HRList config={{ ...hrPages.attendance, type: "attendance" }} />;
}
