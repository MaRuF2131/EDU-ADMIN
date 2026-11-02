
import AIAnalyticsList from "../_components/AIAnalyticsList";
import { aiAnalyticsPages } from "../_components/aiAnalyticsData";

export default function AttendancePredictionPage() {
  return <AIAnalyticsList config={aiAnalyticsPages.attendancePrediction} />;
}
