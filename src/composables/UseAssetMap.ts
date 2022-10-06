import AssetService from '@/services/FetchAssetService'
import type {HoldingGroup} from '@/models/holdings/HoldingGroup'
import type {PublicHolding} from '@/models/holdings/PublicHolding'
import type {PrivateHolding} from '@/models/holdings/PrivateHolding'
import {useAssetMapStore} from "@/stores/AssetMapStore"
import {EntryTypeEnum} from "@/models/enums/EntryTypeEnum";
import type {AssetMapEntry} from "@/models/enums/AssetMapEntry";
import {getNewestPriceRecord} from "@/composables/UsePriceRecords";
import type {Operator as OperatorType} from "@/models/enums/Operator";
import {Operator} from "@/models/enums/Operator";

/**
 * Generate the initial asset map that is getting fetched after the asset list has been mounted
 */
export async function generateAssetMap() {

    const store = useAssetMapStore()

    // Fetch and set each holding group into the asset map
    const holdingGroups: HoldingGroup[] = await AssetService.fetchHoldingGroups()
    holdingGroups.forEach((holdingGroup) => {
        addHoldingGroup(store, holdingGroup)
    })

    // Fetch and set each holding public holding into the asset map
    const publicHoldings: PublicHolding[] = await AssetService.fetchPublicHoldings()
    publicHoldings.forEach((publicHolding) => {
        addPublicHolding(store, publicHolding)
    })

    // Fetch and set each private holding into the asset map
    const privateHoldings: PrivateHolding[] = await AssetService.fetchPrivateHoldings()
    privateHoldings.forEach((privateHolding) => {
        addPrivateHolding(store, privateHolding)
    })

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
    holdingGroup.entryType = EntryTypeEnum.HOLDING_GROUP
    store.assetMap.set(holdingGroup.uuid, holdingGroup)
}

/**
 * Add a public holding to the asset map and set the list entry
 *
 * @param store any
 * @param publicHolding PublicHolding
 */
export function addPublicHolding(store: any, publicHolding: PublicHolding) {
    publicHolding.entryType = EntryTypeEnum.PUBLIC_HOLDING
    store.assetMap.set(publicHolding.uuid, publicHolding)
    store.assetList.set(publicHolding.uuid, {
        uuid: publicHolding.uuid,
        hasGroup: false,
        groupUuid: null,
        entryType: EntryTypeEnum.PUBLIC_HOLDING
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
        groupUuid: null,
        entryType: EntryTypeEnum.PRIVATE_HOLDING
    })
}

/**
 * Replace an asset map entry only from the asset map
 *
 * @param patchedEntry AssetMapEntry
 */
export function replaceAssetMapEntry(patchedEntry: AssetMapEntry) {
    const store = useAssetMapStore()

    // Replace the old map entry with the patched one
    store.assetMap.set(patchedEntry.uuid, patchedEntry)

    store.setAssetListTotalValue()
    store.setAssetListTotalTargetPercentage()
    store.setAssetListTotalDeviation()
}