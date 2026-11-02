
import VotingList from "../_components/VotingList";
import { votingPages } from "../_components/votingData";

export default function SurveyPage() {
  return <VotingList config={votingPages.survey} />;
}
