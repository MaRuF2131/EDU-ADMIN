
import NoticeList from "../_components/NoticeList";
import { noticePages } from "../_components/noticeData";

export default function EmailPage() {
  return <NoticeList config={noticePages.email} />;
}
