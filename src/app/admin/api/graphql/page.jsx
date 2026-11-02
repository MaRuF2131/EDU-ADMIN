import IntegrationList from "../_components/IntegrationList";
import { integrationPages } from "../_components/integrationData";

export default function GraphqlPage() {
  return <IntegrationList config={integrationPages.graphql} />;
}