import IntegrationList from "../_components/IntegrationList";
import { integrationPages } from "../_components/integrationData";

export default function VoiceGatewayPage() {
  return <IntegrationList config={integrationPages.voiceGateway} />;
}