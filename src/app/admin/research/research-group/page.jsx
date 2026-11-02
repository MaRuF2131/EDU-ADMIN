
import ResearchList from "../_components/ResearchList";
import { researchPages } from "../_components/researchData";

export default function ResearchGroupPage() {
  return <ResearchList config={researchPages["research-group"]} />;
}
