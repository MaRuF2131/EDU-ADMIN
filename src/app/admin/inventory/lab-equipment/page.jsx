
import InventoryList from "../_components/InventoryList";
import { inventoryPages } from "../_components/inventoryData";

export default function LabEquipmentPage() {
  return <InventoryList config={inventoryPages.labEquipment} />;
}
