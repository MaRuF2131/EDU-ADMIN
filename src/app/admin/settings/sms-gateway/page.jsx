
import SettingsForm from "../_components/SettingsForm";
import { settingsPages } from "../_components/settingsData";

export default function SMSGatewayPage() {
  return <SettingsForm config={settingsPages.sms} />;
}
