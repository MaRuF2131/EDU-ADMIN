
import NotificationList from "../_components/NotificationList";
import { notificationPages } from "../_components/notificationData";

export default function AIAlertPage() {
  return <NotificationList config={notificationPages.aiAlert} />;
}
