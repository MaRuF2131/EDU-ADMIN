
import ResearchList from "../_components/ResearchList";
import { researchPages } from "../_components/researchData";

export default function PatentPage() {
  return <ResearchList config={researchPages.patent} />;
}
