import type { PriceRecord } from '@/models/nested/PriceRecord'
import type { AssetInformation } from '@/models/nested/AssetInformation'
import type { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import type { AssetTypeEnum } from '@/models/enums/AssetTypeEnum'
import type { UnitTypeEnum } from '@/models/enums/UnitTypeEnum'

export interface PublicAsset {
  readonly uuid: string
  readonly assetPriceRecords: PriceRecord[]
  readonly assetInformations: AssetInformation[]
  readonly assetName: string
  readonly assetType: AssetTypeEnum
  readonly symbol: string | null
  readonly isin: string | null
  readonly availableCurrencies: CurrencyEnum[]
  readonly availableUnitTypes: UnitTypeEnum[]
  readonly iconBase64: string | null
}
