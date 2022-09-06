import type { PublicHolding } from '@/models/PublicHolding'
import type { PrivateHolding } from '@/models/PrivateHolding'

export interface HoldingGroup {
  groupName: string
  publicHoldings: PublicHolding[]
  privateHoldings: PrivateHolding[]
  targetPercentage: number
  targetPercentagesAddUp: boolean
  uuid: string
}
