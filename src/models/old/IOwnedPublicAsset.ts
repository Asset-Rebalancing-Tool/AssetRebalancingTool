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
  currentValue: number
  currentPercentage: number
  targetPercentage: number
  deviation: number
  isSelected: boolean
  graph: string | null
}
