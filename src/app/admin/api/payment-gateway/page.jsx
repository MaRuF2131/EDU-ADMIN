import IntegrationList from "../_components/IntegrationList";
import { integrationPages } from "../_components/integrationData";

export default function PaymentGatewayPage() {
  return <IntegrationList config={integrationPages.paymentGateway} />;
}