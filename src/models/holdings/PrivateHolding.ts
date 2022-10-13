import type { AssetTypeEnum } from '@/models/enums/AssetTypeEnum'
import type { BaseEntity } from '@/models/holdings/BaseEntity'
import type { UnitTypeEnum } from '@/models/enums/UnitTypeEnum'
import type { EntryTypeEnum } from '@/models/enums/EntryTypeEnum'
import type { CurrencyEnum } from "@/models/enums/CurrencyEnum";

export interface PrivateHolding extends BaseEntity {
  assetType: AssetTypeEnum
  pricePerUnit: number
  ownedQuantity: number
  targetPercentage: number
  title: string
  unitType: UnitTypeEnum
  currency: CurrencyEnum
  entryType: EntryTypeEnum
}
