
import InventoryList from "../_components/InventoryList";
import { inventoryPages } from "../_components/inventoryData";

export default function FurniturePage() {
  return <InventoryList config={inventoryPages.furniture} />;
}
