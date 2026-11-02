
import SettingsForm from "../_components/SettingsForm";
import { settingsPages } from "../_components/settingsData";

export default function LogoPage() {
  return <SettingsForm config={settingsPages.logo} />;
}
