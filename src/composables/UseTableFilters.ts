import {useAssetStore} from "@/stores/AssetStore";
import {EntryTypeEnum} from "@/models/holdings/EntryTypeEnum";
import {SortColumn} from "@/models/enums/SortEnum";
import type {AssetRenderingEntry} from "@/models/holdings/AssetRenderingEntry";
import type {PublicHolding} from "@/models/holdings/PublicHolding";
import type {PrivateHolding} from "@/models/holdings/PrivateHolding";
import {getNewestPriceRecord} from "@/composables/UsePriceRecords";
import {calcCurrentValue, getCurrentValue} from "@/composables/assets/UseCurrentValues";
import {getTargetPercentage} from "@/composables/assets/UseTargetPercentage";
import {getRawDeviation} from "@/composables/assets/UseDeviation";
import type {HoldingGroup} from "@/models/holdings/HoldingGroup";

/**
 * Sort the asset list based on the column and isAsc parameters
 *
 * @param column SortColumn
 * @param isAsc boolean
 *
 * @return void
 */
export function sortAssetList(
    column: SortColumn,
    isAsc: boolean
): void {
    const assetStore = useAssetStore()
    assetStore.renderState.assetList = new Map([
            ...assetStore.renderState.assetList
        ].sort((
            assetA: [string, AssetRenderingEntry],
            assetB: [string, AssetRenderingEntry]
        ): number => {
            switch (column) {
                case SortColumn.ASSET_NAME:
                    return _compareName(assetStore, assetA[1], assetB[1], isAsc)
                case SortColumn.PRICE:
                    return _comparePrice(assetStore, assetA[1], assetB[1], isAsc)
                case SortColumn.OWNED_QUANTITY:
                    return _compareQuantity(assetStore, assetA[1], assetB[1], isAsc)
                case SortColumn.CURRENT_VALUE:
                    return _compareCurrentValue(assetStore, assetA[1], assetB[1], isAsc)
                case SortColumn.TARGET_PERCENTAGE:
                    return _compareTargetPercentage(assetStore, assetA[1], assetB[1], isAsc)
                case SortColumn.DEVIATION:
                    return _compareDeviation(assetStore, assetA[1], assetB[1], isAsc)
            }

            return -1
        })
    )
}

/**
 * Compare the name of two assets in order to sort them
 *
 * @param assetStore any
 * @param assetA AssetRenderingEntry
 * @param assetB AssetRenderingEntry
 * @param isAsc boolean
 *
 * @return number
 */
function _compareName(
    assetStore: any,
    assetA: AssetRenderingEntry,
    assetB: AssetRenderingEntry,
    isAsc: boolean
): number {
    const nameA: string = _getName(assetStore, assetA)
    const nameB: string = _getName(assetStore, assetB)
    return (isAsc)
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA)
}

/**
 * Get the name of an asset rendering entry by its uuid and entry type
 *
 * @param assetStore
 * @param asset
 *
 * @return string
 */
function _getName(assetStore: any, asset: AssetRenderingEntry): string {
    switch (asset.entryType) {
        case EntryTypeEnum.HOLDING_GROUP:
            const holdingGroup = assetStore.getAssetPoolEntryByUuid(asset.uuid) as HoldingGroup
            return holdingGroup.groupName
        case EntryTypeEnum.PUBLIC_HOLDING:
            const publicHolding = assetStore.getAssetPoolEntryByUuid(asset.uuid) as PublicHolding
            return publicHolding.publicAsset.assetName
        case EntryTypeEnum.PRIVATE_HOLDING:
            const privateHolding = assetStore.getAssetPoolEntryByUuid(asset.uuid) as PrivateHolding
            return privateHolding.title
    }
}

/**
 * Compare the price of two assets in order to sort them
 *
 * @param assetStore any
 * @param assetA AssetRenderingEntry
 * @param assetB AssetRenderingEntry
 * @param isAsc boolean
 *
 * @return number
 */
function _comparePrice(
    assetStore: any,
    assetA: AssetRenderingEntry,
    assetB: AssetRenderingEntry,
    isAsc: boolean
): number {
    const priceA: number = _getPrice(assetStore, assetA)
    const priceB: number = _getPrice(assetStore, assetB)

    if (priceA < priceB) return (isAsc) ? -1 : 1;
    if (priceA > priceB) return (isAsc) ? 1 : -1;
    return 0;
}

/**
 * Get the price of an asset rendering entry by its uuid and entry type
 *
 * @param assetStore
 * @param asset
 *
 * @return number
 */
function _getPrice(assetStore: any, asset: AssetRenderingEntry): number {
    switch (asset.entryType) {
        case EntryTypeEnum.HOLDING_GROUP:
            return 0
        case EntryTypeEnum.PUBLIC_HOLDING:
            const publicHolding = assetStore.getAssetPoolEntryByUuid(asset.uuid) as PublicHolding
            return getNewestPriceRecord(publicHolding.publicAsset.assetPriceRecords)
        case EntryTypeEnum.PRIVATE_HOLDING:
            const privateHolding = assetStore.getAssetPoolEntryByUuid(asset.uuid) as PrivateHolding
            return privateHolding.pricePerUnit
    }
}

/**
 * Compare the owned quantity of two assets in order to sort them
 *
 * @param assetStore any
 * @param assetA AssetRenderingEntry
 * @param assetB AssetRenderingEntry
 * @param isAsc boolean
 *
 * @return number
 */
function _compareQuantity(
    assetStore: any,
    assetA: AssetRenderingEntry,
    assetB: AssetRenderingEntry,
    isAsc: boolean
): number {
    const quantityA: number = _getQuantity(assetStore, assetA)
    const quantityB: number = _getQuantity(assetStore, assetB)

    if (quantityA < quantityB) return (isAsc) ? -1 : 1;
    if (quantityA > quantityB) return (isAsc) ? 1 : -1;
    return 0;
}

/**
 * Get the owned quantity of an asset rendering entry by its uuid and entry type
 *
 * @param assetStore
 * @param asset
 *
 * @return number
 */
function _getQuantity(assetStore: any, asset: AssetRenderingEntry): number {
    switch (asset.entryType) {
        case EntryTypeEnum.HOLDING_GROUP:
            return 0
        case EntryTypeEnum.PUBLIC_HOLDING:
            const publicHolding = assetStore.getAssetPoolEntryByUuid(asset.uuid) as PublicHolding
            return publicHolding.ownedQuantity
        case EntryTypeEnum.PRIVATE_HOLDING:
            const privateHolding = assetStore.getAssetPoolEntryByUuid(asset.uuid) as PrivateHolding
            return privateHolding.ownedQuantity
    }
}

/**
 * Compare the current value of two assets in order to sort them
 *
 * @param assetStore any
 * @param assetA AssetRenderingEntry
 * @param assetB AssetRenderingEntry
 * @param isAsc boolean
 *
 * @return number
 */
function _compareCurrentValue(
    assetStore: any,
    assetA: AssetRenderingEntry,
    assetB: AssetRenderingEntry,
    isAsc: boolean
): number {
    const valueA: number = _getCurrentValue(assetStore, assetA)
    const valueB: number = _getCurrentValue(assetStore, assetB)

    if (valueA < valueB) return (isAsc) ? -1 : 1;
    if (valueA > valueB) return (isAsc) ? 1 : -1;
    return 0;
}

/**
 * Get the current value of an asset rendering entry by its uuid and entry type
 *
 * @param assetStore
 * @param asset
 *
 * @return number
 */
function _getCurrentValue(assetStore: any, asset: AssetRenderingEntry): number {
    switch (asset.entryType) {
        case EntryTypeEnum.HOLDING_GROUP:
            return 0
        case EntryTypeEnum.PUBLIC_HOLDING:
            const publicHolding = assetStore.getAssetPoolEntryByUuid(asset.uuid)
            return calcCurrentValue(publicHolding, EntryTypeEnum.PUBLIC_HOLDING)
        case EntryTypeEnum.PRIVATE_HOLDING:
            const privateHolding = assetStore.getAssetPoolEntryByUuid(asset.uuid)
            return calcCurrentValue(privateHolding, EntryTypeEnum.PRIVATE_HOLDING)
    }
}

/**
 * Compare the target percentage of two assets in order to sort them
 *
 * @param assetStore any
 * @param assetA AssetRenderingEntry
 * @param assetB AssetRenderingEntry
 * @param isAsc boolean
 *
 * @return number
 */
function _compareTargetPercentage(
    assetStore: any,
    assetA: AssetRenderingEntry,
    assetB: AssetRenderingEntry,
    isAsc: boolean
): number {
    const targetPercentageA: number = _getTargetPercentage(assetStore, assetA)
    const targetPercentageB: number = _getTargetPercentage(assetStore, assetB)

    if (targetPercentageA < targetPercentageB) return (isAsc) ? -1 : 1;
    if (targetPercentageA > targetPercentageB) return (isAsc) ? 1 : -1;
    return 0;
}

/**
 * Get the target percentage of an asset rendering entry by its uuid and entry type
 *
 * @param assetStore
 * @param asset
 *
 * @return number
 */
function _getTargetPercentage(assetStore: any, asset: AssetRenderingEntry): number {
    switch (asset.entryType) {
        case EntryTypeEnum.HOLDING_GROUP:
            return 0
        case EntryTypeEnum.PUBLIC_HOLDING:
            const publicHolding = assetStore.getAssetPoolEntryByUuid(asset.uuid)
            return getTargetPercentage(publicHolding, EntryTypeEnum.PUBLIC_HOLDING)
        case EntryTypeEnum.PRIVATE_HOLDING:
            const privateHolding = assetStore.getAssetPoolEntryByUuid(asset.uuid)
            return getTargetPercentage(privateHolding, EntryTypeEnum.PRIVATE_HOLDING)
    }
}

/**
 * Compare the deviation of two assets in order to sort them
 *
 * @param assetStore any
 * @param assetA AssetRenderingEntry
 * @param assetB AssetRenderingEntry
 * @param isAsc boolean
 *
 * @return number
 */
function _compareDeviation(
    assetStore: any,
    assetA: AssetRenderingEntry,
    assetB: AssetRenderingEntry,
    isAsc: boolean
): number {
    const deviationA: number = _getDeviation(assetStore, assetA)
    const deviationB: number = _getDeviation(assetStore, assetB)

    if (deviationA < deviationB) return (isAsc) ? -1 : 1;
    if (deviationA > deviationB) return (isAsc) ? 1 : -1;
    return 0;
}

/**
 * Get the deviation of an asset rendering entry by its uuid and entry type
 *
 * @param assetStore
 * @param asset
 *
 * @return number
 */
function _getDeviation(assetStore: any, asset: AssetRenderingEntry): number {
    switch (asset.entryType) {
        case EntryTypeEnum.HOLDING_GROUP:
            return 0
        case EntryTypeEnum.PUBLIC_HOLDING:
            const publicHolding = assetStore.getAssetPoolEntryByUuid(asset.uuid)
            return getRawDeviation(publicHolding, EntryTypeEnum.PUBLIC_HOLDING)
        case EntryTypeEnum.PRIVATE_HOLDING:
            const privateHolding = assetStore.getAssetPoolEntryByUuid(asset.uuid)
            return getRawDeviation(privateHolding, EntryTypeEnum.PRIVATE_HOLDING)
    }
}
