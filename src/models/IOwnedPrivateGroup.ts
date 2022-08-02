export interface IOwnedPrivateGroup {
  uuid: string
  name: string
  totalValue: number
  totalPercentage: number
  totalTargetPercentage: number
  totalDeviation: number
  currency: string
  isSelected: boolean
  relatedAssetsUuidArray: string[]
}
