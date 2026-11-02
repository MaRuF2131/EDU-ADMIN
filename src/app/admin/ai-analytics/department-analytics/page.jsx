
import AIAnalyticsList from "../_components/AIAnalyticsList";
import { aiAnalyticsPages } from "../_components/aiAnalyticsData";

export default function DepartmentAnalyticsPage() {
  return <AIAnalyticsList config={aiAnalyticsPages.departmentAnalytics} />;
}
