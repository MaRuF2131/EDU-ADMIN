
import WorkflowList from "../_components/WorkflowList";
import { workflowPages } from "../_components/workflowData";

export default function AdmissionWorkflowPage() {
  return <WorkflowList config={workflowPages.admission} />;
}
