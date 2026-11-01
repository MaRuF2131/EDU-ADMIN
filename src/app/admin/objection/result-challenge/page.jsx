
import ObjectionList from "../_components/ObjectionList";
import { objectionPages } from "../_components/objectionData";

export default function ResultChallengePage() {
  return <ObjectionList config={objectionPages["result-challenge"]} />;
}
