import { useAssetStore } from '@/stores/AssetStore'
import PatchAssetService from '@/services/PatchAssetService'
import DeleteAssetService from '@/services/DeleteAssetService'
import { HoldingActionEnum } from '@/models/actions/HoldingActionEnum'
import { EntryTypeEnum } from '@/models/holdings/EntryTypeEnum'
import type { AssetPoolEntry } from '@/models/AssetPoolEntry'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import type { HoldingGroupRequest } from '@/requests/HoldingGroupRequest'
import {
  pushHoldingToGroup,
  addHoldingGroup,
  buildGroupPatchUuidArray,
} from '@/composables/UseHoldingGroup'

/**-*******************************************************************************-**/
/** ------------------------- Holding Actions Handling ---------------------------- **/
/**-*******************************************************************************-**/

/**
 * Decide what holding action should be fired based on a argument interface
 *
 * @param holdingIsNested boolean
 *
 * @param entryUuid string
 * @param entryType EntryTypeEnum | null (default = null)
 * @param groupUuid string | null (default = null)
 *
 * @return Promise<void>
 */
export async function executeAction(
  holdingIsNested: boolean,
  entryUuid: string,
  entryType: EntryTypeEnum | null = null,
  groupUuid: string | null = null
): Promise<void> {
  // Check what action should be fired
  const action: HoldingActionEnum = getActionType(holdingIsNested)

  // Execute the holding action
  switch (action) {
    case HoldingActionEnum.ADD_TO_GROUP:
      await addHoldingToGroup(entryUuid)
      break
    case HoldingActionEnum.REMOVE_FROM_GROUP:
      if (!groupUuid || !entryType) return
      await removeHoldingFromGroup(entryUuid, groupUuid, entryType)
      break
    case HoldingActionEnum.DELETE_HOLDING:
      await deleteHolding(entryUuid)
      break
  }
}

/**
 * Check which holding action should be fired
 *
 * @param holdingIsNested boolean (default = false)
 *
 * @return HoldingActionEnum
 */
export function getActionType(holdingIsNested = false): HoldingActionEnum {
  const assetStore = useAssetStore()

  // Check if the user is in delete mode
  if (assetStore.listActionState.deleteFlag) {
    return HoldingActionEnum.DELETE_HOLDING
  }

  // Check whether the holding is nested in a group or not
  return holdingIsNested
    ? HoldingActionEnum.REMOVE_FROM_GROUP
    : HoldingActionEnum.ADD_TO_GROUP
}

/**-*******************************************************************************-**/
/** ---------------------------- All Holding Actions ------------------------------ **/
/**-*******************************************************************************-**/

/**
 * Add a public or private list entry to the selected holding group
 *
 * @param holdingUuid string
 *
 * @return Promise<void>
 */
async function addHoldingToGroup(holdingUuid: string): Promise<void> {
  const assetStore = useAssetStore()

  // Always return if no group is selected
  if (!assetStore.listActionState.editFlag) return

  // Get the currently edited group and the holding that has been clicked
  const group: HoldingGroup | null = assetStore.listActionState.selectedGroup
  const clickedHolding: AssetPoolEntry | null =
    assetStore.getAssetPoolEntryByUuid(holdingUuid)

  if (clickedHolding && group) {
    // Push the clicked holding to the selected group
    pushHoldingToGroup(clickedHolding, group)
    // Remove the holding group from the asset render list
    assetStore.renderState.assetList.delete(clickedHolding.uuid)
    // Add the modified holding group to the asset pool and the asset render list
    addHoldingGroup(assetStore, group)
    // Patch the holding group entry
    await PatchAssetService.patchHoldingGroup(
      patchHoldingGroupRequest(group),
      group.uuid
    )
  }
}

/**
 * Remove a public or private list entry from the selected holding group
 *
 * @param groupUuid string
 * @param holdingUuid string
 * @param entryType EntryTypeEnum
 *
 * @return Promise<void>
 */
async function removeHoldingFromGroup(
  groupUuid: string,
  holdingUuid: string,
  entryType: EntryTypeEnum
): Promise<void> {
  const assetStore = useAssetStore()

  // Always return if the user is not in edit mode or no group is selected
  if (
    !assetStore.listActionState.editFlag ||
    !assetStore.listActionState.selectedGroup
  )
    return

  if (assetStore.renderState.assetList.has(groupUuid)) {
    const group = assetStore.renderState.assetList.get(groupUuid)
    if (group && group.groupEntries) {
      // Remove the whole holding entry from the selected group
      await removeHoldingFromGroup(group.uuid, holdingUuid, entryType)
      // Patch the holding group entry
      await PatchAssetService.patchHoldingGroup(
        patchHoldingGroupRequest(assetStore.listActionState.selectedGroup),
        group.uuid
      )
    }
  }
}

/**
 * Fire the delete action, based on the holdings type
 *
 * @param holdingUuid string
 *
 * @return Promise<void>
 */
async function deleteHolding(holdingUuid: string): Promise<void> {
  const assetStore = useAssetStore()
  const holding = assetStore.getAssetPoolEntryByUuid(holdingUuid)

  if (holding) {
    switch (holding.entryType) {
      case EntryTypeEnum.PUBLIC_HOLDING:
        await DeleteAssetService.deletePublicHolding(holdingUuid)
        break
      case EntryTypeEnum.PRIVATE_HOLDING:
        await DeleteAssetService.deletePrivateHolding(holdingUuid)
        break
    }
  }
}

/**
 * The patch owned quantity request body
 *
 * @param holdingGroup HoldingGroup
 *
 * @return HoldingGroupRequest
 */
function patchHoldingGroupRequest(
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
