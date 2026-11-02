
import HRList from "../_components/HRList";
import { hrPages } from "../_components/hrData";

export default function LeavePage() {
  return <HRList config={{ ...hrPages.leave, type: "leave" }} />;
}
