
import NoticeList from "../_components/NoticeList";
import { noticePages } from "../_components/noticeData";

export default function PushNotificationPage() {
  return <NoticeList config={noticePages.pushNotification} />;
}
