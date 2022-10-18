import type { AssetPoolEntry } from '@/models/AssetPoolEntry'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import type { GroupEntry } from '@/models/GroupEntry'
import { EntryTypeEnum } from '@/models/holdings/EntryTypeEnum'
import { addHoldingToRenderList } from '@/composables/UseAssetRenderList'

/**
 * Add a holding group to the asset pool and set the render list entry
 *
 * @param assetStore any
 * @param holdingGroup HoldingGroup
 *
 * @return void
 */
export function addHoldingGroup(
  assetStore: any,
  holdingGroup: HoldingGroup
): void {
  // Update the whole holding group value of the asset map
  holdingGroup.entryType = EntryTypeEnum.HOLDING_GROUP
  assetStore.assetPool.set(holdingGroup.uuid, holdingGroup)

  addHoldingToRenderList(assetStore, holdingGroup)
}

/**
 * Push the whole holding to the selected group
 *
 * @param clickedEntry
 * @param group
 *
 * @return void
 */
export function pushHoldingToGroup(
  clickedEntry: AssetPoolEntry,
  group: HoldingGroup
): void {
  switch (clickedEntry.entryType) {
    case EntryTypeEnum.PUBLIC_HOLDING:
      const publicHolding = clickedEntry as PublicHolding
      group.publicHoldings.push(publicHolding)
      break
    case EntryTypeEnum.PRIVATE_HOLDING:
      const privateHolding = clickedEntry as PrivateHolding
      group.privateHoldings.push(privateHolding)
      break
  }
}

/**
 * Iterate over the holdings of a group and push all holding uuids from a specified entry type into an array
 *
 * @param holdingGroup HoldingGroup
 * @param entryType EntryTypeEnum
 *
 * @return string[]
 */
export function buildGroupPatchUuidArray(
  holdingGroup: HoldingGroup,
  entryType: EntryTypeEnum
): string[] {
  const tempUuidArray: string[] = []
  switch (entryType) {
    case EntryTypeEnum.PUBLIC_HOLDING:
      holdingGroup.publicHoldings.forEach((groupEntry) => {
        tempUuidArray.push(groupEntry.uuid)
      })
      break
    case EntryTypeEnum.PRIVATE_HOLDING:
      holdingGroup.privateHoldings.forEach((groupEntry) => {
        tempUuidArray.push(groupEntry.uuid)
      })
      break
  }
  return tempUuidArray
}

/**
 * Iterate over the holdings of a group and build the group entry array,
 * needed for asset list entry, which renders the template
 *
 * @param holdingGroup HoldingGroup
 *
 * @return GroupEntry[]
 */
export function buildGroupEntryArray(holdingGroup: HoldingGroup): GroupEntry[] {
  const groupEntryArray: GroupEntry[] = []
  holdingGroup.publicHoldings.forEach((groupEntry) => {
    groupEntryArray.push({
      uuid: groupEntry.uuid,
      entryType: EntryTypeEnum.PUBLIC_HOLDING,
    } as GroupEntry)
  })
  holdingGroup.privateHoldings.forEach((groupEntry) => {
    groupEntryArray.push({
      uuid: groupEntry.uuid,
      entryType: EntryTypeEnum.PRIVATE_HOLDING,
    } as GroupEntry)
  })
  return groupEntryArray
}
