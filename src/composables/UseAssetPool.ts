import { useAssetStore } from '@/stores/AssetStore'
import { EntryTypeEnum as EntryType } from '@/models/holdings/EntryTypeEnum'
import type { EntryTypeEnum } from '@/models/holdings/EntryTypeEnum'
import type { AssetPoolEntry } from '@/models/AssetPoolEntry'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import type { AssetRenderingEntry } from '@/models/holdings/AssetRenderingEntry'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import {
  addPrivateHoldingToRenderList,
  addPublicHoldingToRenderList,
} from '@/composables/UseAssetRenderList'
import {
  setAssetListTotalDeviation,
  setAssetListTotalTargetPercentage,
  setAssetListTotalValue,
} from '@/composables/UseTotalValues'

/**
 * Remove whole holding entry from group
 *
 * @param assetStore any
 * @param group
 * @param entryUuid string
 * @param entryType EntryTypeEnum
 *
 * @return void
 */
export function removeHoldingFromGroup(
  assetStore: any,
  group: AssetRenderingEntry,
  entryUuid: string,
  entryType: EntryTypeEnum
): void {
  // Remove the clicked holding from the selected group template
  const groupEntries = group.groupEntries
  groupEntries.forEach((value, index) => {
    if (value.uuid == entryUuid) groupEntries.splice(index, 1)
  })

  const selectedGroup: HoldingGroup = assetStore.selectedGroup
  if (selectedGroup) {
    switch (entryType) {
      case EntryType.PUBLIC_HOLDING:
        const publicHoldings = selectedGroup.publicHoldings
        publicHoldings.forEach((value, index) => {
          if (value.uuid == entryUuid) {
            publicHoldings.splice(index, 1)
            addPublicHoldingToRenderList(assetStore, value)
          }
        })
        break
      case EntryType.PRIVATE_HOLDING:
        const privateHoldings = selectedGroup.privateHoldings
        privateHoldings.forEach((value, index) => {
          if (value.uuid == entryUuid) {
            privateHoldings.splice(index, 1)
            addPrivateHoldingToRenderList(assetStore, value)
          }
        })
        break
    }
  }
}

/**
 * Add a public holding to the asset map
 *
 * @param assetStore any
 * @param publicHolding PublicHolding
 *
 * @return void
 */
export function addPublicHoldingToPool(
  assetStore: any,
  publicHolding: PublicHolding
): void {
  publicHolding.entryType = EntryType.PUBLIC_HOLDING
  assetStore.assetPool.set(publicHolding.uuid, publicHolding)
}

/**
 * Add a private holding to the asset map
 *
 * @param assetStore any
 * @param privateHolding PrivateHolding
 *
 * @return void
 */
export function addPrivateHoldingToPool(
  assetStore: any,
  privateHolding: PrivateHolding
): void {
  privateHolding.entryType = EntryType.PRIVATE_HOLDING
  assetStore.assetPool.set(privateHolding.uuid, privateHolding)
}

/**
 * Replace an asset map entry only from the asset map
 *
 * @param patchedEntry AssetMapEntry
 *
 * @return void
 */
export function patchAssetPoolEntry(patchedEntry: AssetPoolEntry): void {
  const assetStore = useAssetStore()

  // Replace the old map entry with the patched one
  assetStore.assetPool.set(patchedEntry.uuid, patchedEntry)

  setAssetListTotalValue()
  setAssetListTotalTargetPercentage()
  setAssetListTotalDeviation()
}

/**
 * Remove an asset from the assetStores asset map and asset list after the delete endpoint has been called
 *
 * @param entryUuid string
 *
 * @return void
 */
export function removeAssetPoolEntry(entryUuid: string) {
  const assetStore = useAssetStore()
  assetStore.renderState.assetList.delete(entryUuid)
}
