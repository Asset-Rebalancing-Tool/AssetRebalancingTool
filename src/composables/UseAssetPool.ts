import { useAssetStore } from '@/stores/AssetStore'
import { EntryTypeEnum as EntryType } from '@/models/holdings/EntryTypeEnum'
import type { AssetPoolEntry } from '@/models/AssetPoolEntry'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import {
  setAssetListTotalDeviation,
  setAssetListTotalTargetPercentage,
  setAssetListTotalValue,
} from '@/composables/UseTotalValues'

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
 * Remove an asset from the asset pool and asset list after the delete endpoint has been called
 *
 * @param entryUuid string
 *
 * @return void
 */
export function deleteAssetPoolEntry(entryUuid: string) {
  const assetStore = useAssetStore()
  if (assetStore.assetPool.has(entryUuid)) {
    assetStore.assetPool.delete(entryUuid)
  }
}
