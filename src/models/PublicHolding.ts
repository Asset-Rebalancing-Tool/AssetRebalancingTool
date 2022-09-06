import type { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import type { UnitType } from '@/models/enums/UnitTypeEnum'
import type { PublicAsset } from '@/models/PublicAsset'

export enum HoldingOriginEnum {
  MANUAL_ENTRY = 'ManualEntry',
  SCALABLE_CAPITAL = 'ScalableCapital',
}

export interface PublicHolding {
  customName: string
  displayCustomName: boolean
  holdingOrigin: HoldingOriginEnum
  holdingUuid: string
  ownedQuantity: number
  publicAsset: PublicAsset
  targetPercentage: number
  currency: CurrencyEnum
  unitType: UnitType
}
