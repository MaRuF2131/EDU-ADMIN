
import AIAnalyticsList from "../_components/AIAnalyticsList";
import { aiAnalyticsPages } from "../_components/aiAnalyticsData";

export default function RecommendationPage() {
  return <AIAnalyticsList config={aiAnalyticsPages.recommendation} />;
}
