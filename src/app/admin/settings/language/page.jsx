
import SettingsForm from "../_components/SettingsForm";
import { settingsPages } from "../_components/settingsData";

export default function LanguagePage() {
  return <SettingsForm config={settingsPages.language} />;
}
