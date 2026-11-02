
import NoticeList from "../_components/NoticeList";
import { noticePages } from "../_components/noticeData";

export default function NoticesPage() {
  return <NoticeList config={noticePages.notices} />;
}
