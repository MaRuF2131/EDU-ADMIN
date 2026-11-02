
import AIAnalyticsList from "../_components/AIAnalyticsList";
import { aiAnalyticsPages } from "../_components/aiAnalyticsData";

export default function RiskScorePage() {
  return <AIAnalyticsList config={aiAnalyticsPages.riskScore} />;
}
