import type { HoldingOriginEnum } from '@/models/enums/HoldingOriginEnum'
import type { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import type { UnitTypeEnum } from '@/models/enums/UnitTypeEnum'
import type { PublicAsset } from '@/models/PublicAsset'
import type { BaseEntity } from '@/models/holdings/BaseEntity'
import type { EntryTypeEnum } from '@/models/holdings/EntryTypeEnum'

export interface PublicHolding extends BaseEntity {
  customName: string
  displayCustomName: boolean
  readonly holdingOrigin: HoldingOriginEnum
  ownedQuantity: number
  publicAsset: PublicAsset
  targetPercentage: number
  readonly currency: CurrencyEnum
  readonly unitType: UnitTypeEnum
  entryType: EntryTypeEnum
}
