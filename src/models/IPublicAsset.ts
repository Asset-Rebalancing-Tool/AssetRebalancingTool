import type { IPriceRecord } from '@/models/nested/IPriceRecord'
import type { IAssetInformation } from '@/models/nested/IAssetInformation'

export interface IPublicAsset {
  uuid: string
  assetInformations: IAssetInformation[]
  assetName: string
  assetType: string
  symbol: string | null
  isin: string | null
  priceRecords: IPriceRecord[]
  icon: string | null
  graph: string | null
}
