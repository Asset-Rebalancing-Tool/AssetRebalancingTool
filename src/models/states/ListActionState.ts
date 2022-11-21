import type { HoldingGroup } from '@/models/holdings/HoldingGroup'

export interface ListActionState {
  editFlagUngrouped: boolean
  deleteFlag: boolean
  selectedGroup: HoldingGroup | null
}
