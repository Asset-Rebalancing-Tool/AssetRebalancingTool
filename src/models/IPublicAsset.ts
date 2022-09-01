import type { IPriceRecord } from '@/models/nested/IPriceRecord'
import type { IAssetInformation } from '@/models/nested/IAssetInformation'
import type { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import type { AssetTypeEnum } from '@/models/enums/AssetTypeEnum'
import type { UnitType } from '@/models/enums/UnitTypeEnum'

export interface IPublicAsset {
  uuid: string
  assetPriceRecords: IPriceRecord[]
  assetInformations: IAssetInformation[]
  assetName: string
  assetType: AssetTypeEnum
  symbol: string | null
  isin: string | null
  availableCurrencies: CurrencyEnum[]
  availableUnitTypes: UnitType[]
  icon: string | null
}
