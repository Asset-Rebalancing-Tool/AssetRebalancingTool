import type { AssetPoolEntry } from '@/models/AssetPoolEntry'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import type { GroupEntry } from '@/models/GroupEntry'
import type { HoldingGroupRequest } from '@/requests/HoldingGroupRequest'
import { EntryTypeEnum } from '@/models/holdings/EntryTypeEnum'
import {
  addHoldingGroupToRenderList,
  addPublicHoldingToRenderList,
  addPrivateHoldingToRenderList,
} from '@/composables/assets/UseAssetRenderList'
import { useAssetStore } from '@/stores/AssetStore'
import PatchAssetService from '@/services/PatchAssetService'

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

  addHoldingGroupToRenderList(assetStore, holdingGroup)
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
 * Remove a public or private holding from the selected holding group
 *
 * @param holdingUuid string
 * @param groupUuid string
 * @param entryType EntryTypeEnum
 *
 * @return Promise<void>
 */
export async function removeHoldingFromGroup(
  holdingUuid: string,
  groupUuid: string,
  entryType: EntryTypeEnum
): Promise<void> {
  const assetStore = useAssetStore()

  // Always return if the user is not in edit mode or no group is selected
  if (!assetStore.editFlag || !assetStore.selectedGroup) return

  const renderGroup = assetStore.renderState.assetList.get(groupUuid)
  if (renderGroup && renderGroup.groupEntries) {
    renderGroup.groupEntries.forEach((holding, index) => {
      if (holding.uuid === holdingUuid) {
        // Remove from group entry from the template
        renderGroup.groupEntries.splice(index, 1)

        const poolEntry = assetStore.assetPool.get(holdingUuid)
        if (poolEntry) {
          _splicePoolGroupEntry(assetStore, groupUuid, poolEntry)
          switch (poolEntry.entryType) {
            case EntryTypeEnum.PUBLIC_HOLDING:
              addPublicHoldingToRenderList(
                assetStore,
                poolEntry as PublicHolding
              )
              break
            case EntryTypeEnum.PRIVATE_HOLDING:
              addPrivateHoldingToRenderList(
                assetStore,
                poolEntry as PrivateHolding
              )
              break
          }
        }
      }
    })

    // Patch the holding group entry
    await PatchAssetService.patchHoldingGroup(
      patchHoldingGroupRequest(assetStore.selectedGroup),
      groupUuid
    )
  }
}

/**
 * Splice a group entry from the selected asset pool group
 *
 * @param assetStore any
 * @param groupUuid string
 * @param poolEntry AssetPoolEntry
 */
function _splicePoolGroupEntry(
  assetStore: any,
  groupUuid: string,
  poolEntry: AssetPoolEntry
) {
  const poolGroup = assetStore.assetPool.get(groupUuid) as HoldingGroup
  poolGroup.publicHoldings.forEach((holding, index) => {
    if (holding.uuid === poolEntry.uuid) {
      poolGroup.publicHoldings.splice(index, 1)
    }
  })
  poolGroup.privateHoldings.forEach((holding, index) => {
    if (holding.uuid === poolEntry.uuid) {
      poolGroup.privateHoldings.splice(index, 1)
    }
  })
}

/**
 * Iterate over the assets of a group and push all holding uuids from a specified entry type into an array
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
 * Iterate over the assets of a group and build the group entry array,
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

/**
 * The patch owned quantity request body
 *
 * @param holdingGroup HoldingGroup
 *
 * @return HoldingGroupRequest
 */
export function patchHoldingGroupRequest(
  holdingGroup: HoldingGroup
): HoldingGroupRequest {
  // All nested public holding uuid's
  const publicUuids: string[] = buildGroupPatchUuidArray(
    holdingGroup,
    EntryTypeEnum.PUBLIC_HOLDING
  )

  // All nested private holding uuid's
  const privateUuids: string[] = buildGroupPatchUuidArray(
    holdingGroup,
    EntryTypeEnum.PRIVATE_HOLDING
  )

  // The patch request object
  return {
    publicHoldingUuids: publicUuids,
    privateHoldingUuids: privateUuids,
    groupName: holdingGroup.groupName,
    targetPercentage: holdingGroup.targetPercentage,
  } as HoldingGroupRequest
}
