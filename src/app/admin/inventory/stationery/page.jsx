
import InventoryList from "../_components/InventoryList";
import { inventoryPages } from "../_components/inventoryData";

export default function StationeryPage() {
  return <InventoryList config={inventoryPages.stationery} />;
}
