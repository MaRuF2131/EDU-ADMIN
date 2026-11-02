import IntegrationList from "../_components/IntegrationList";
import { integrationPages } from "../_components/integrationData";

export default function RestApiPage() {
  return <IntegrationList config={integrationPages.restApi} />;
}