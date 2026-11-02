
import WorkflowList from "../_components/WorkflowList";
import { workflowPages } from "../_components/workflowData";

export default function CertificateWorkflowPage() {
  return <WorkflowList config={workflowPages.certificate} />;
}
