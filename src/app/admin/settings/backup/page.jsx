
import SettingsForm from "../_components/SettingsForm";
import { settingsPages } from "../_components/settingsData";

export default function BackupPage() {
  return <SettingsForm config={settingsPages.backup} />;
}
