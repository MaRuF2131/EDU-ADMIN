
import ResearchList from "../_components/ResearchList";
import { researchPages } from "../_components/researchData";

export default function PublicationPage() {
  return <ResearchList config={researchPages.publication} />;
}
