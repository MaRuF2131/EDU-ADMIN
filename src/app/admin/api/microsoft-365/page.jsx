import IntegrationList from "../_components/IntegrationList";
import { integrationPages } from "../_components/integrationData";

export default function Microsoft365Page() {
  return <IntegrationList config={integrationPages.microsoft365} />;
}