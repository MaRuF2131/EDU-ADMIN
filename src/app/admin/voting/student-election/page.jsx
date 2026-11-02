
import VotingList from "../_components/VotingList";
import { votingPages } from "../_components/votingData";

export default function StudentElectionPage() {
  return <VotingList config={votingPages["student-election"]} />;
}
