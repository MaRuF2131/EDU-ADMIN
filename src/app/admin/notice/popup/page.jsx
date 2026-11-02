
import NoticeList from "../_components/NoticeList";
import { noticePages } from "../_components/noticeData";

export default function PopupPage() {
  return <NoticeList config={noticePages.popup} />;
}
