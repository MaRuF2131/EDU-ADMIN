
import SettingsForm from "../_components/SettingsForm";
import { settingsPages } from "../_components/settingsData";

export default function ThemePage() {
  return <SettingsForm config={settingsPages.theme} />;
}
