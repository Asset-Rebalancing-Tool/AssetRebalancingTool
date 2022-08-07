import type { IPriceRecords } from "@/models/IPriceRecords";
import type { IAssetInformation } from "@/models/IAssetInformation";
import type { IUiProperties } from "@/models/IUiProperties";

export interface IOwnedPublicAsset {
  uuid: String,
  assetInformation?: IAssetInformation | null,
  assetName: String,
  assetType: String,
  isin: String,
  priceRecords: IPriceRecords,
  symbol: String,
  ownedQuantity: String,
  uiProperties?: IUiProperties | null
}
