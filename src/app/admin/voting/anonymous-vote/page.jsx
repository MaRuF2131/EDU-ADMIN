
import VotingList from "../_components/VotingList";
import { votingPages } from "../_components/votingData";

export default function AnonymousVotePage() {
  return <VotingList config={votingPages["anonymous-vote"]} />;
}
