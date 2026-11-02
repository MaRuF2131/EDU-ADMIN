
import InventoryList from "../_components/InventoryList";
import { inventoryPages } from "../_components/inventoryData";

export default function AssetTrackingPage() {
  return <InventoryList config={inventoryPages.assetTracking} />;
}
