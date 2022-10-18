import type { EntryTypeEnum } from '@/models/holdings/EntryTypeEnum'
import type { GroupEntry } from '@/models/GroupEntry'

export interface AssetRenderingEntry {
  uuid: string
  hasGroup: boolean
  groupEntries: GroupEntry[]
  entryType: EntryTypeEnum
}
