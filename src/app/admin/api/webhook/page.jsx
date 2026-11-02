import IntegrationList from "../_components/IntegrationList";
import { integrationPages } from "../_components/integrationData";

export default function WebhookPage() {
  return <IntegrationList config={integrationPages.webhook} />;
}