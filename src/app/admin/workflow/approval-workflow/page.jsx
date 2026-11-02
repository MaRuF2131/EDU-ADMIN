
import WorkflowList from "../_components/WorkflowList";
import { workflowPages } from "../_components/workflowData";

export default function ApprovalWorkflowPage() {
  return <WorkflowList config={workflowPages.approval} />;
}
