
import SettingsForm from "../_components/SettingsForm";
import { settingsPages } from "../_components/settingsData";

export default function PaymentGatewayPage() {
  return <SettingsForm config={settingsPages.payment} />;
}
