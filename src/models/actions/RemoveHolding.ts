import type { HoldingActionEnum } from '@/models/actions/HoldingActionEnum'
import type { EntryTypeEnum } from '@/models/holdings/EntryTypeEnum'

export interface RemoveHolding {
  actionType: HoldingActionEnum
  holdingUuid: string
  groupUuid: string
  holdingType: EntryTypeEnum
}
