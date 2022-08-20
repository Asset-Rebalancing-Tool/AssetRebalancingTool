import type { IPriceRecord } from '@/models/nested/IPriceRecord'
import type { IAssetInformation } from '@/models/nested/IAssetInformation'
import type { CurrencyEnum } from '@/models/nested/CurrencyEnum';

export interface IPublicAsset {
  uuid: string
  currencyPriceRecordMap: Record<CurrencyEnum, IPriceRecord[]>
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
