
import SettingsForm from "../_components/SettingsForm";
import { settingsPages } from "../_components/settingsData";

export default function AcademicCalendarPage() {
  return <SettingsForm config={settingsPages.calendar} />;
}
