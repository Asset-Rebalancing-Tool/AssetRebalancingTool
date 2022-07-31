export interface OwnedGroup {
    id: number,
    name: string,
    totalValue: number,
    totalPercentage: number,
    totalTargetPercentage: number,
    totalDeviation: number,
    currency: string,
    isSelected: boolean,
    relatedAssetsIdArray: number[]
}
