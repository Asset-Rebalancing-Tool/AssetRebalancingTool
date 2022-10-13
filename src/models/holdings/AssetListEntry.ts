import type { EntryTypeEnum } from '@/models/enums/EntryTypeEnum'
import type { GroupEntry } from '@/models/GroupEntry'

export interface AssetListEntry {
  uuid: string
  hasGroup: boolean
  groupEntries: GroupEntry[]
  entryType: EntryTypeEnum
}
