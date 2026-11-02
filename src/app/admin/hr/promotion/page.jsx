
import HRList from "../_components/HRList";
import { hrPages } from "../_components/hrData";

export default function PromotionPage() {
  return <HRList config={{ ...hrPages.promotion, type: "promotion" }} />;
}
