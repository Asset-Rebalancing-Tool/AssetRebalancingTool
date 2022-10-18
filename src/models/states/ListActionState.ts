import type { HoldingGroup } from '@/models/holdings/HoldingGroup'

export interface ListActionState {
  editFlag: boolean
  deleteFlag: boolean
  selectedGroup: HoldingGroup | null
}
