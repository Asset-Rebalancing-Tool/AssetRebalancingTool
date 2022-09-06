import type { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import type { UnitTypeEnum } from '@/models/enums/UnitTypeEnum'

export interface PublicHoldingRequest {
  currency: CurrencyEnum
  customName: string
  ownedQuantity: number
  publicAssetUuid: string
  selectedUnitType: UnitTypeEnum
  shouldDisplayCustomName: boolean
  targetPercentage: number
}
