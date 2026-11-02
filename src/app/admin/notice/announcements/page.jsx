
import NoticeList from "../_components/NoticeList";
import { noticePages } from "../_components/noticeData";

export default function AnnouncementsPage() {
  return <NoticeList config={noticePages.announcements} />;
}
