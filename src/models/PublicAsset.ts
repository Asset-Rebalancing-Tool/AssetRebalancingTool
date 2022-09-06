import type { PriceRecord } from '@/models/nested/PriceRecord'
import type { AssetInformation } from '@/models/nested/AssetInformation'
import type { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import type { AssetTypeEnum } from '@/models/enums/AssetTypeEnum'
import type { UnitType } from '@/models/enums/UnitTypeEnum'

export interface PublicAsset {
  uuid: string
  assetPriceRecords: PriceRecord[]
  assetInformations: AssetInformation[]
  assetName: string
  assetType: AssetTypeEnum
  symbol: string | null
  isin: string | null
  availableCurrencies: CurrencyEnum[]
  availableUnitTypes: UnitType[]
  iconBase64: string | null
}
