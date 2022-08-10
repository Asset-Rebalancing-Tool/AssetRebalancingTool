import type { IPriceRecord } from '@/models/nested/IPriceRecord'
import type { IAssetInformation } from '@/models/nested/IAssetInformation'

export interface IPublicAsset {
  uuid: string,
  assetInformations: IAssetInformation[] | null,
  assetName: string,
  assetType: string,
  symbol: string | null,
  isin: string | null,
  priceRecords: IPriceRecord[] | null,
  icon: string | null,
  graph: string | null
}
