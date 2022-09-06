import type { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import type { UnitType } from '@/models/enums/UnitTypeEnum'
import type { IPublicAsset } from '@/models/IPublicAsset'

export enum HoldingOriginEnum {
  MANUAL_ENTRY = 'ManualEntry',
  SCALABLE_CAPITAL = 'ScalableCapital',
}

export interface IPublicAssetHolding {
  customName: string
  displayCustomName: boolean
  holdingOrigin: HoldingOriginEnum
  holdingUuid: string
  ownedQuantity: number
  publicAsset: IPublicAsset
  targetPercentage: number
  currency: CurrencyEnum
  unitType: UnitType
}
