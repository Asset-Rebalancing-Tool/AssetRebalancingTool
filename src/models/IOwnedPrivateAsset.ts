import type { IPublicAsset } from '@/models/IPublicAsset'

export interface IOwnedPrivateAsset {
  publicAsset: IPublicAsset
  relatedGroupUuid?: string | null
  ownedQuantity: string
  currentValue: number
  currentPercentage: number
  targetPercentage: number
  deviation: number
}
