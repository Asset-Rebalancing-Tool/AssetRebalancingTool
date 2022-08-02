export interface IOwnedPublicAsset {
  uuid: string
  relatedGroupUuid: string | null
  name: string
  type: string
  isin: string
  tickerSymbol: string
  stockPrice: number
  currency: string
  shares: number
  sharesType: string
  actualValue: number
  actualPercentage: number
  targetPercentage: number
  deviation: number
  isSelected: boolean
}
