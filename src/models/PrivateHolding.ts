import type { AssetTypeEnum } from '@/models/enums/AssetTypeEnum'

export interface PrivateHolding {
  assetType: AssetTypeEnum
  currentPrice: number
  holdingUuid: string
  title: string
  targetPercentage: number
}
