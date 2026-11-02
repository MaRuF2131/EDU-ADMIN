
import AIAnalyticsList from "../_components/AIAnalyticsList";
import { aiAnalyticsPages } from "../_components/aiAnalyticsData";

export default function TeacherAnalyticsPage() {
  return <AIAnalyticsList config={aiAnalyticsPages.teacherAnalytics} />;
}
