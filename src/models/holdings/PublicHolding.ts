import type { HoldingOriginEnum } from '@/models/enums/HoldingOriginEnum'
import type { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import type { UnitTypeEnum } from '@/models/enums/UnitTypeEnum'
import type { PublicAsset } from '@/models/PublicAsset'
import type { BaseEntity } from '@/models/holdings/BaseEntity'
import type { EntryTypeEnum } from '@/models/enums/EntryTypeEnum'

export interface PublicHolding extends BaseEntity {
  customName: string
  displayCustomName: boolean
  holdingOrigin: HoldingOriginEnum
  ownedQuantity: number
  publicAsset: PublicAsset
  targetPercentage: number
  currency: CurrencyEnum
  unitType: UnitTypeEnum
  entryType: EntryTypeEnum
}
