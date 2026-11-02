import IntegrationList from "../_components/IntegrationList";
import { integrationPages } from "../_components/integrationData";

export default function SmsGatewayPage() {
  return <IntegrationList config={integrationPages.smsGateway} />;
}