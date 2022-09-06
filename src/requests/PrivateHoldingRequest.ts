import type { AssetTypeEnum } from '@/models/enums/AssetTypeEnum'

export interface PrivateHoldingRequest {
  assetType: AssetTypeEnum
  currentPrice: number
  title: string
  targetPercentage: number
}
