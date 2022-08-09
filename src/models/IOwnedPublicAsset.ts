import type { IPriceRecords } from '@/models/IPriceRecords'
import type { IAssetInformation } from '@/models/IAssetInformation'
import type { IUiProperties } from '@/models/IUiProperties'

export interface IOwnedPublicAsset{
  uuid: string
  assetInformations?: IAssetInformation | null
  assetName: string
  assetType: string
  isin: string
  priceRecords: IPriceRecords
  symbol: string
  ownedQuantity: string
  //uiProperties?: IUiProperties | null
}
