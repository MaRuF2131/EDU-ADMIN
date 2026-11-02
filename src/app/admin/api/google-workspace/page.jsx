import IntegrationList from "../_components/IntegrationList";
import { integrationPages } from "../_components/integrationData";

export default function GoogleWorkspacePage() {
  return <IntegrationList config={integrationPages.googleWorkspace} />;
}