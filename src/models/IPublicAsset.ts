import type { IPriceRecord } from '@/models/nested/IPriceRecord'
import type { IAssetInformation } from '@/models/nested/IAssetInformation'
import type { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import type { AssetTypeEnum } from '@/models/enums/AssetTypeEnum'

export interface IPublicAsset {
  uuid: string
  currencyPriceRecordMap: Record<CurrencyEnum, IPriceRecord[]>
  assetInformations: IAssetInformation[]
  assetName: string
  assetType: AssetTypeEnum
  symbol: string | null
  isin: string | null
  currency: CurrencyEnum
  priceType: string
  icon: string | null
  graph: string | null
}
