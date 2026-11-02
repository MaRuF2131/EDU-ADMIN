
import SettingsForm from "../_components/SettingsForm";
import { settingsPages } from "../_components/settingsData";

export default function InstitutionProfilePage() {
  return <SettingsForm config={settingsPages.institution} />;
}
