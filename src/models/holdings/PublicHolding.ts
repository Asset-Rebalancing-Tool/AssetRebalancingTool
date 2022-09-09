import type { HoldingOriginEnum } from '@/models/enums/HoldingOriginEnum'
import type { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import type { UnitTypeEnum } from '@/models/enums/UnitTypeEnum'
import type { PublicAsset } from '@/models/PublicAsset'

export interface PublicHolding {
  customName: string
  displayCustomName: boolean
  holdingOrigin: HoldingOriginEnum
  holdingUuid: string
  ownedQuantity: number
  publicAsset: PublicAsset
  targetPercentage: number
  currency: CurrencyEnum
  unitType: UnitTypeEnum
}
