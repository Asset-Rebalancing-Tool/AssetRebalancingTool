import type { IPriceRecord } from '@/models/nested/IPriceRecord'
import type { IAssetInformation } from '@/models/nested/IAssetInformation'

type CurrencyPriceRecordMap = {
  [key: string]: IPriceRecord[];
};

export interface IPublicAsset {
  uuid: string
  currencyPriceRecordMap: CurrencyPriceRecordMap
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
