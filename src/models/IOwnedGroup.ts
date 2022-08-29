import type { IOwnedPrivateAsset } from '@/models/IOwnedPrivateAsset'

export interface IOwnedGroup {
  uuid: string
  name: string
  totalValue: number
  totalPercentage: number
  totalTargetPercentage: number
  totalDeviation: number
  currency: string
  relatedAssetsUuidArray: IOwnedPrivateAsset[] | null
  isSelected: boolean
}
