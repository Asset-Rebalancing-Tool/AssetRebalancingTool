import AssetService from '@/services/FetchAssetService'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import { useAssetMapStore } from '@/stores/AssetMapStore'
import { EntryTypeEnum } from '@/models/enums/EntryTypeEnum'
import type { AssetMapEntry } from '@/models/AssetMapEntry'
import { getNewestPriceRecord } from '@/composables/UsePriceRecords'
import type { Operator as OperatorType } from '@/models/enums/Operator'
import { Operator } from '@/models/enums/Operator'
import type { GroupEntry } from '@/models/GroupEntry'
import type {AssetListEntry} from "@/models/holdings/AssetListEntry";
import type {HoldingGroupRequest} from "@/requests/HoldingGroupRequest";

/**
 * Generate the initial asset map that is getting fetched after the asset list has been mounted
 */
export async function generateAssetMap() {
  const store = useAssetMapStore()

  store.listLoadingFlag = true

  // Fetch and set each holding group into the asset map
  const holdingGroups: HoldingGroup[] = await AssetService.fetchHoldingGroups()
  holdingGroups.forEach((holdingGroup) => {
    // Push the holding group to the asset map
    addHoldingGroup(store, holdingGroup)
    // Push each public group entry to the asset map
    holdingGroup.publicHoldings.forEach((publicHolding) => {
      addPublicHolding(store, publicHolding)
    })
    // Push each private group entry to the asset map
    holdingGroup.privateHoldings.forEach((privateHolding) => {
      addPrivateHolding(store, privateHolding)
    })
  })

  // Fetch and set each holding public holding into the asset map
  const publicHoldings: PublicHolding[] =
    await AssetService.fetchPublicHoldings()
  publicHoldings.forEach((publicHolding) => {
    addPublicHolding(store, publicHolding)
  })

  // Fetch and set each private holding into the asset map
  const privateHoldings: PrivateHolding[] =
    await AssetService.fetchPrivateHoldings()
  privateHoldings.forEach((privateHolding) => {
    addPrivateHolding(store, privateHolding)
  })

  store.listLoadingFlag = false

  // Initial set of all total asset list values
  store.setAssetListTotalValue()
  store.setAssetListTotalTargetPercentage()
  store.setAssetListTotalDeviation()
}

/**
 * Add a holding group to the asset map and set the list entry
 *
 * @param store any
 * @param holdingGroup HoldingGroup
 */
export function addHoldingGroup(store: any, holdingGroup: HoldingGroup) {

  const groupEntryArray = buildGroupEntryArray(holdingGroup)

  // Update the whole holding group value of the asset map
  holdingGroup.entryType = EntryTypeEnum.HOLDING_GROUP
  store.assetMap.set(holdingGroup.uuid, holdingGroup)

  // Build the new asset list entry object in order to rerender the template
  store.assetList.set(holdingGroup.uuid, {
    uuid: holdingGroup.uuid,
    hasGroup: false,
    groupEntries: groupEntryArray,
    entryType: EntryTypeEnum.HOLDING_GROUP,
  } as AssetListEntry)
}

/**
 *
 * @param clickedEntry
 * @param group
 */
export function pushHoldingToSelectedGroup(clickedEntry: AssetMapEntry, group: HoldingGroup): void {
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
export function buildGroupPatchUuidArray(holdingGroup: HoldingGroup, entryType: EntryTypeEnum): string[] {
  const tempUuidArray: string[] = []
  switch (entryType) {
    case EntryTypeEnum.PUBLIC_HOLDING:
      holdingGroup.publicHoldings.forEach((groupEntry) => {
        tempUuidArray.push(groupEntry.uuid)
      })
      break;
    case EntryTypeEnum.PRIVATE_HOLDING:
      holdingGroup.privateHoldings.forEach((groupEntry) => {
        tempUuidArray.push(groupEntry.uuid)
      })
      break;
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
function buildGroupEntryArray(holdingGroup: HoldingGroup): GroupEntry[] {
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

/**
 * Add a public holding to the asset map and set the list entry
 *
 * @param store any
 * @param publicHolding PublicHolding
 * @param hasGroup boolean
 */
export function addPublicHolding(
  store: any,
  publicHolding: PublicHolding,
  hasGroup = false
) {
  publicHolding.entryType = EntryTypeEnum.PUBLIC_HOLDING
  store.assetMap.set(publicHolding.uuid, publicHolding)
  store.assetList.set(publicHolding.uuid, {
    uuid: publicHolding.uuid,
    hasGroup: hasGroup,
    entryType: EntryTypeEnum.PUBLIC_HOLDING,
  })
}

/**
 * Add a private holding to the asset map and set the list entry
 *
 * @param store any
 * @param privateHolding PrivateHolding
 */
export function addPrivateHolding(store: any, privateHolding: PrivateHolding) {
  privateHolding.entryType = EntryTypeEnum.PRIVATE_HOLDING
  store.assetMap.set(privateHolding.uuid, privateHolding)
  store.assetList.set(privateHolding.uuid, {
    uuid: privateHolding.uuid,
    hasGroup: false,
    entryType: EntryTypeEnum.PRIVATE_HOLDING,
  })
}

/**
 * Replace an asset map entry only from the asset map
 *
 * @param patchedEntry AssetMapEntry
 */
export function patchAssetMapEntry(patchedEntry: AssetMapEntry) {
  const store = useAssetMapStore()

  // Replace the old map entry with the patched one
  store.assetMap.set(patchedEntry.uuid, patchedEntry)

  store.setAssetListTotalValue()
  store.setAssetListTotalTargetPercentage()
  store.setAssetListTotalDeviation()
}
