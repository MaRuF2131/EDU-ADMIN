
import InventoryList from "../_components/InventoryList";
import { inventoryPages } from "../_components/inventoryData";

export default function BarcodePage() {
  return <InventoryList config={inventoryPages.barcode} />;
}
