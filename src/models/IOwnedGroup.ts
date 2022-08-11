import type { IOwnedAsset } from '@/models/IOwnedAsset'

export interface IOwnedGroup {
  uuid: string
  name: string
  totalValue: number
  totalPercentage: number
  totalTargetPercentage: number
  totalDeviation: number
  currency: string
  relatedAssetsUuidArray: IOwnedAsset[] | null
  isSelected: boolean
}
