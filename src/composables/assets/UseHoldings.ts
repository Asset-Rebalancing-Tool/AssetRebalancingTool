import { useAssetStore } from '@/stores/AssetStore'
import PatchAssetService from '@/services/PatchAssetService'
import DeleteAssetService from '@/services/DeleteAssetService'
import { HoldingActionEnum } from '@/models/enums/HoldingActionEnum'
import { EntryTypeEnum } from '@/models/holdings/EntryTypeEnum'
import type { AssetPoolEntry } from '@/models/AssetPoolEntry'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import {
  addHoldingGroup,
  patchHoldingGroupRequest,
  pushHoldingToGroup,
  removeHoldingFromGroup,
} from '@/composables/assets/UseHoldingGroup'

/**-*******************************************************************************-**/
/** ------------------------- Holding Actions Handling ---------------------------- **/
/**-*******************************************************************************-**/

/**
 * Decide what holding action should be fired based on a argument interface
 *
 * @param holdingIsNested boolean
 *
 * @param holdingUuid string
 * @param entryType EntryTypeEnum | null (default = null)
 * @param groupUuid string | null (default = null)
 *
 * @return Promise<void>
 */
export async function executeAction(
  holdingIsNested: boolean,
  holdingUuid: string,
  entryType: EntryTypeEnum | null = null,
  groupUuid: string | null = null
): Promise<void> {
  const assetStore = useAssetStore()

  // Check what action should be fired
  const action: HoldingActionEnum = getActionType(holdingIsNested)

  // Execute the holding action
  switch (action) {
    case HoldingActionEnum.ADD_TO_GROUP:
      if (!assetStore.listActionState.selectedGroup) return
      await addHoldingToGroup(holdingUuid)
      break
    case HoldingActionEnum.REMOVE_FROM_GROUP:
      if (!assetStore.listActionState.selectedGroup) return
      // Only execute the action if the holding belongs to the selected group
      if (
        assetStore.listActionState.selectedGroup.uuid === groupUuid &&
        entryType !== null
      ) {
        await removeHoldingFromGroup(holdingUuid, groupUuid, entryType)
      }
      break
    case HoldingActionEnum.DELETE_HOLDING:
      await deleteHolding(holdingUuid)
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
  if (assetStore.deleteFlag) {
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
  if (!assetStore.listActionState.editFlagUngrouped) return

  // Get the currently edited group and the holding that has been clicked
  const group: HoldingGroup | null = assetStore.selectedGroup
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
 * Fire the delete action, based on the assets type
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
