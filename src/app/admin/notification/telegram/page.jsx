
import NotificationList from "../_components/NotificationList";
import { notificationPages } from "../_components/notificationData";

export default function TelegramPage() {
  return <NotificationList config={notificationPages.telegram} />;
}
