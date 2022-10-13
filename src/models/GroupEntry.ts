import type { EntryTypeEnum } from '@/models/enums/EntryTypeEnum'

export interface GroupEntry {
  uuid: string
  entryType: EntryTypeEnum
}
