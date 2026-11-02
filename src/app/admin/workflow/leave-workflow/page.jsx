
import WorkflowList from "../_components/WorkflowList";
import { workflowPages } from "../_components/workflowData";

export default function LeaveWorkflowPage() {
  return <WorkflowList config={workflowPages.leave} />;
}
