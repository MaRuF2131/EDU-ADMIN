
import ObjectionList from "../_components/ObjectionList";
import { objectionPages } from "../_components/objectionData";

export default function ComplaintPage() {
  return <ObjectionList config={objectionPages.complaint} />;
}
