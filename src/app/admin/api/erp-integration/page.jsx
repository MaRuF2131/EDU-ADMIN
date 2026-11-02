import IntegrationList from "../_components/IntegrationList";
import { integrationPages } from "../_components/integrationData";

export default function Page() {
  return <IntegrationList config={integrationPages.erpIntegration} />;
}