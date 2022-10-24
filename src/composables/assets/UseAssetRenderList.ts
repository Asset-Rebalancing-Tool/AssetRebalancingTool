import AssetService from '@/services/FetchAssetService'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import { useAssetStore } from '@/stores/AssetStore'
import { EntryTypeEnum } from '@/models/holdings/EntryTypeEnum'
import type { AssetRenderingEntry } from '@/models/holdings/AssetRenderingEntry'
import {
  setAssetListTotalValue,
  setAssetListTotalTargetPercentage,
  setAssetListTotalDeviation,
} from '@/composables/UseTotalValues'

import {
  addHoldingGroup,
  buildGroupEntryArray,
} from '@/composables/assets/UseHoldingGroup'

import {
  addPublicHoldingToPool,
  addPrivateHoldingToPool,
} from '@/composables/assets/UseAssetPool'

/**
 * Generate the initial asset map that is getting fetched after the asset list has been mounted
 *
 * @return Promise<void>
 */
export async function generateAssetRenderList(): Promise<void> {
  const assetStore = useAssetStore()

  assetStore.renderState.loadingFlag = true

  // Fetch and set each holding group into the asset map
  const holdingGroups: HoldingGroup[] = await AssetService.fetchHoldingGroups()
  if (holdingGroups) {
    holdingGroups.forEach((holdingGroup) => {
      // Push the holding group to the asset map
      addHoldingGroup(assetStore, holdingGroup)
      // Push each public group entry to the asset map
      holdingGroup.publicHoldings.forEach((publicHolding) => {
        addPublicHoldingToPool(assetStore, publicHolding)
      })
      // Push each private group entry to the asset map
      holdingGroup.privateHoldings.forEach((privateHolding) => {
        addPrivateHoldingToPool(assetStore, privateHolding)
      })
    })
  }

  // Fetch and set each holding public holding into the asset map
  const publicHoldings: PublicHolding[] =
    await AssetService.fetchPublicHoldings()
  if (publicHoldings) {
    publicHoldings.forEach((publicHolding) => {
      addPublicHoldingToPool(assetStore, publicHolding)
      addPublicHoldingToRenderList(assetStore, publicHolding)
    })
  }

  // Fetch and set each private holding into the asset map
  const privateHoldings: PrivateHolding[] =
    await AssetService.fetchPrivateHoldings()
  if (privateHoldings) {
    privateHoldings.forEach((privateHolding) => {
      addPrivateHoldingToPool(assetStore, privateHolding)
      addPrivateHoldingToRenderList(assetStore, privateHolding)
    })
  }

  assetStore.renderState.loadingFlag = false

  // Initial set of all total asset list values
  setAssetListTotalValue()
  setAssetListTotalTargetPercentage()
  setAssetListTotalDeviation()
}

/**
 * Build the new asset render list
 *
 * @param assetStore any
 * @param holdingGroup HoldingGroup
 */
export function addHoldingGroupToRenderList(
  assetStore: any,
  holdingGroup: HoldingGroup
): void {
  const groupEntryArray = buildGroupEntryArray(holdingGroup)

  assetStore.renderState.assetList.set(holdingGroup.uuid, {
    uuid: holdingGroup.uuid,
    hasGroup: false,
    groupEntries: groupEntryArray,
    entryType: EntryTypeEnum.HOLDING_GROUP,
  } as AssetRenderingEntry)
}

/**
 * Add a public holding to the asset render list
 *
 * @param assetStore any
 * @param publicHolding PublicHolding
 * @param hasGroup false
 *
 * @return void
 */
export function addPublicHoldingToRenderList(
  assetStore: any,
  publicHolding: PublicHolding,
  hasGroup = false
): void {
  assetStore.renderState.assetList.set(publicHolding.uuid, {
    uuid: publicHolding.uuid,
    hasGroup: hasGroup,
    entryType: EntryTypeEnum.PUBLIC_HOLDING,
  })
}

/**
 * Add a public holding to the asset render list
 *
 * @param assetStore any
 * @param privateHolding PrivateHolding
 * @param hasGroup false
 *
 * @return void
 */
export function addPrivateHoldingToRenderList(
  assetStore: any,
  privateHolding: PrivateHolding,
  hasGroup = false
): void {
  privateHolding.entryType = EntryTypeEnum.PRIVATE_HOLDING
  assetStore.renderState.assetList.set(privateHolding.uuid, {
    uuid: privateHolding.uuid,
    hasGroup: hasGroup,
    entryType: EntryTypeEnum.PRIVATE_HOLDING,
  })
}

/**
 * Remove an holding rom the asset render list
 *
 * @param holdingUuid string
 *
 * @return void
 */
export function deleteRenderListEntry(holdingUuid: string): void {
  const assetStore = useAssetStore()
  if (assetStore.renderState.assetList.has(holdingUuid)) {
    assetStore.renderState.assetList.delete(holdingUuid)
  }
}
