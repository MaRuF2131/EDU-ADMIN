
import ResearchList from "../_components/ResearchList";
import { researchPages } from "../_components/researchData";

export default function CitationPage() {
  return <ResearchList config={researchPages.citation} />;
}
