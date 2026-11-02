
import ResearchList from "../_components/ResearchList";
import { researchPages } from "../_components/researchData";

export default function ResearchGrantPage() {
  return <ResearchList config={researchPages["research-grant"]} />;
}
