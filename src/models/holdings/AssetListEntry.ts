import type { EntryTypeEnum } from '@/models/enums/EntryTypeEnum'
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'

export interface AssetListEntry {
  uuid: string
  entryType: EntryTypeEnum
  publicHolding: PublicHolding | null
  privateHolding: PrivateHolding | null
  holdingGroup: HoldingGroup | null
}
