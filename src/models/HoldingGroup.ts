import type { PublicHolding } from '@/models/PublicHolding'
import type { PrivateHolding } from '@/models/PrivateHolding'

export interface HoldingGroup {
  groupName: string
  publicAssetHoldings: PublicHolding[]
  privateAssetHoldings: PrivateHolding[]
  targetPercentage: number
  targetPercentagesAddUp: boolean
  uuid: string
}
