import type { IPublicAsset } from '@/models/IPublicAsset'

export interface IOwnedAsset extends IPublicAsset {
  relatedGroupUuid?: string | null
  ownedQuantity: string
  actualValue: number
  actualPercentage: number
  targetPercentage: number
  deviation: number
  isSelected: boolean
}
