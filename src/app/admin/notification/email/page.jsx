
import NotificationList from "../_components/NotificationList";
import { notificationPages } from "../_components/notificationData";

export default function EmailPage() {
  return <NotificationList config={notificationPages.email} />;
}
