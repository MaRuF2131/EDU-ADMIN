
import NotificationList from "../_components/NotificationList";
import { notificationPages } from "../_components/notificationData";

export default function SMSPage() {
  return <NotificationList config={notificationPages.sms} />;
}
