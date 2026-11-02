
import HRList from "../_components/HRList";
import { hrPages } from "../_components/hrData";

export default function RecruitmentPage() {
  return <HRList config={{ ...hrPages.recruitment, type: "recruitment" }} />;
}
