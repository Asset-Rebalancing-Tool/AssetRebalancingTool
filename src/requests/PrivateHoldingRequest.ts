import type { AssetTypeEnum } from '@/models/enums/AssetTypeEnum'
import type { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import type { UnitTypeEnum } from '@/models/enums/UnitTypeEnum'

export interface PrivateHoldingRequest {
  assetType: AssetTypeEnum
  pricePerUnit: number
  currency: CurrencyEnum
  ownedQuantity: number
  unitType: UnitTypeEnum
  targetPercentage: number
  title: string
}
