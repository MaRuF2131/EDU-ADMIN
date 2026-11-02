
import NotificationList from "../_components/NotificationList";
import { notificationPages } from "../_components/notificationData";

export default function VoiceCallAlertPage() {
  return <NotificationList config={notificationPages.voiceCall} />;
}
