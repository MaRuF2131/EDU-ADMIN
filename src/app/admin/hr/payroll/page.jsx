
import HRList from "../_components/HRList";
import { hrPages } from "../_components/hrData";

export default function PayrollPage() {
  return <HRList config={{ ...hrPages.payroll, type: "payroll" }} />;
}
