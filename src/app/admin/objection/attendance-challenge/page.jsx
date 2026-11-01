
import ObjectionList from "../_components/ObjectionList";
import { objectionPages } from "../_components/objectionData";

export default function AttendanceChallengePage() {
  return <ObjectionList config={objectionPages["attendance-challenge"]} />;
}
