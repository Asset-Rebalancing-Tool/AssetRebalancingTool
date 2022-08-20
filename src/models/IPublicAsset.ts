import type { IPriceRecord } from '@/models/nested/IPriceRecord'
import type { IAssetInformation } from '@/models/nested/IAssetInformation'

export interface IPublicAsset {
  uuid: string
  currencyPriceRecordMap: object
  assetInformations: IAssetInformation[]
  assetName: string
  assetType: string
  symbol: string | null
  isin: string | null
  currency: string
  priceType: string
  icon: string | null
  graph: string | null
}
