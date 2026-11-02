
import NotificationList from "../_components/NotificationList";
import { notificationPages } from "../_components/notificationData";

export default function WhatsAppPage() {
  return <NotificationList config={notificationPages.whatsapp} />;
}
