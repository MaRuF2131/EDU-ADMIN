
import NotificationList from "../_components/NotificationList";
import { notificationPages } from "../_components/notificationData";

export default function PushNotificationPage() {
  return <NotificationList config={notificationPages.push} />;
}
