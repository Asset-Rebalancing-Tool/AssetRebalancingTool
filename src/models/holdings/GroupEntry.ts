import type { EntryTypeEnum } from '@/models/enums/EntryTypeEnum'
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'

export interface GroupEntry {
  uuid: string
  entryType: EntryTypeEnum
  publicHolding: PublicHolding | null
  privateHolding: PrivateHolding | null
}
