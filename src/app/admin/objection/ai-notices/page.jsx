
import ObjectionList from "../_components/ObjectionList";
import { objectionPages } from "../_components/objectionData";

export default function AINoticesPage() {
  return <ObjectionList config={objectionPages["ai-notices"]} />;
}
