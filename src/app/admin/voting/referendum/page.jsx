
import VotingList from "../_components/VotingList";
import { votingPages } from "../_components/votingData";

export default function ReferendumPage() {
  return <VotingList config={votingPages.referendum} />;
}
