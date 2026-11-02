
import SettingsForm from "../_components/SettingsForm";
import { settingsPages } from "../_components/settingsData";

export default function BrandingPage() {
  return <SettingsForm config={settingsPages.branding} />;
}
