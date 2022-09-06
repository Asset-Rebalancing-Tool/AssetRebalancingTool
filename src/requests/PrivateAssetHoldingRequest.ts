import type { AssetTypeEnum } from '@/models/enums/AssetTypeEnum'

export interface PrivateAssetHoldingRequest {
  assetType: AssetTypeEnum
  currentPrice: number
  title: string
  targetPercentage: number
}
