
import NotificationList from "../_components/NotificationList";
import { notificationPages } from "../_components/notificationData";

export default function ScheduledNotificationPage() {
  return <NotificationList config={notificationPages.scheduled} />;
}
