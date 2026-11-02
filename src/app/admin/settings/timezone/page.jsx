
import SettingsForm from "../_components/SettingsForm";
import { settingsPages } from "../_components/settingsData";

export default function TimezonePage() {
  return <SettingsForm config={settingsPages.timezone} />;
}
