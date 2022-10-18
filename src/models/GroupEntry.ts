import type { EntryTypeEnum } from '@/models/holdings/EntryTypeEnum'

export interface GroupEntry {
  uuid: string
  entryType: EntryTypeEnum
}
