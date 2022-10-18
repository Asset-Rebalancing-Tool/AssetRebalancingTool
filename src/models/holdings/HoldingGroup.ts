import type { PublicHolding } from '@/models/holdings/PublicHolding'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import type { BaseEntity } from '@/models/holdings/BaseEntity'
import type { EntryTypeEnum } from '@/models/holdings/EntryTypeEnum'

export interface HoldingGroup extends BaseEntity {
  groupName: string
  publicHoldings: PublicHolding[]
  privateHoldings: PrivateHolding[]
  targetPercentage: number
  targetPercentagesAddUp: boolean
  entryType: EntryTypeEnum
}
