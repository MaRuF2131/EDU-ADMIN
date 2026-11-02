
import ResearchList from "../_components/ResearchList";
import { researchPages } from "../_components/researchData";

export default function ConferencePage() {
  return <ResearchList config={researchPages.conference} />;
}
