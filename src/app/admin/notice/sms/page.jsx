
import NoticeList from "../_components/NoticeList";
import { noticePages } from "../_components/noticeData";

export default function SMSPage() {
  return <NoticeList config={noticePages.sms} />;
}
