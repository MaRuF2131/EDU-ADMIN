
import HRList from "../_components/HRList";
import { hrPages } from "../_components/hrData";

export default function EmployeesPage() {
  return <HRList config={{ ...hrPages.employees, type: "employees" }} />;
}
