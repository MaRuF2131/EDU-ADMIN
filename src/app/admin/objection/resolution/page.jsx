
import ObjectionList from "../_components/ObjectionList";
import { objectionPages } from "../_components/objectionData";

export default function ResolutionPage() {
  return <ObjectionList config={objectionPages.resolution} />;
}
