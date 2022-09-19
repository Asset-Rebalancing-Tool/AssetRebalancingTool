import type { AssetTypeEnum } from '@/models/enums/AssetTypeEnum'
import type { BaseEntity } from '@/models/holdings/BaseEntity'
import type { UnitTypeEnum } from '@/models/enums/UnitTypeEnum'

export interface PrivateHolding extends BaseEntity {
  assetType: AssetTypeEnum
  pricePerUnit: number
  ownedQuantity: number
  targetPercentage: number
  title: string
  unitType: UnitTypeEnum
}