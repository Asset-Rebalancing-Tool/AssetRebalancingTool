import type { PublicHolding } from '@/models/holdings/PublicHolding'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'

export interface HoldingGroup {
  groupName: string
  publicHoldings: PublicHolding[]
  privateHoldings: PrivateHolding[]
  targetPercentage: number
  targetPercentagesAddUp: boolean
  uuid: string
}
