
import VotingList from "../_components/VotingList";
import { votingPages } from "../_components/votingData";

export default function TeacherElectionPage() {
  return <VotingList config={votingPages["teacher-election"]} />;
}
