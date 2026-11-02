
import InventoryList from "../_components/InventoryList";
import { inventoryPages } from "../_components/inventoryData";

export default function ComputersPage() {
  return <InventoryList config={inventoryPages.computers} />;
}
