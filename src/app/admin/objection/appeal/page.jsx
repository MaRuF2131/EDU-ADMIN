
import ObjectionList from "../_components/ObjectionList";
import { objectionPages } from "../_components/objectionData";

export default function AppealPage() {
  return <ObjectionList config={objectionPages.appeal} />;
}
