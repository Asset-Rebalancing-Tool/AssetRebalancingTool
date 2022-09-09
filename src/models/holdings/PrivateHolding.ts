import type { AssetTypeEnum } from '@/models/enums/AssetTypeEnum'
import type { BaseEntity } from '@/models/holdings/BaseEntity'

export interface PrivateHolding extends BaseEntity {
  assetType: AssetTypeEnum
  currentPrice: number
  title: string
  targetPercentage: number
}
