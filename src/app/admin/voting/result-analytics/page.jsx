
import VotingList from "../_components/VotingList";
import { votingPages } from "../_components/votingData";

export default function ResultAnalyticsPage() {
  return <VotingList config={votingPages["result-analytics"]} />;
}
