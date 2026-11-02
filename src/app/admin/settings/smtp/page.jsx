
import SettingsForm from "../_components/SettingsForm";
import { settingsPages } from "../_components/settingsData";

export default function SMTPPage() {
  return <SettingsForm config={settingsPages.smtp} />;
}
