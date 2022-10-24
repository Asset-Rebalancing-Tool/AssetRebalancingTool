import type { AssetPoolEntry } from "@/models/AssetPoolEntry";
import { EntryTypeEnum } from "@/models/holdings/EntryTypeEnum";
import type { PublicHolding } from "@/models/holdings/PublicHolding";
import type { PrivateHolding } from "@/models/holdings/PrivateHolding";
import { calcCurrentPercentage } from "@/composables/assets/UseCurrentPercentage";
import { formatValueArray } from "@/composables/UsePriceRecords";
import { getTargetPercentage } from "@/composables/assets/UseTargetPercentage";

/**
 * Calculate the deviation of an asset pool entry
 *
 * @param poolEntry AssetPoolEntry
 * @param entryType EntryTypeEnum
 */
export function calcDeviation(
    poolEntry: AssetPoolEntry,
    entryType: EntryTypeEnum
): number {

    let targetPercentage: number = 0
    switch (entryType) {
        default:
        case EntryTypeEnum.HOLDING_GROUP:
            return 0
        case EntryTypeEnum.PUBLIC_HOLDING:
            const publicHolding: PublicHolding = poolEntry as PublicHolding
            if (publicHolding) {
                targetPercentage = publicHolding.targetPercentage
            }
            break;
        case EntryTypeEnum.PRIVATE_HOLDING:
            const privateHolding: PrivateHolding = poolEntry as PrivateHolding
            if (privateHolding) {
                targetPercentage = privateHolding.targetPercentage
            }
            break;
    }

    let currentPercentage: number = calcCurrentPercentage(poolEntry, entryType)
    return Math.abs(currentPercentage - targetPercentage)
}

/**
 * Get the raw and un formatted deviation
 *
 * @param poolEntry AssetPoolEntry
 * @param entryType EntryTypeEnum
 *
 * @return number
 */
export function getRawDeviation(
    poolEntry: AssetPoolEntry,
    entryType: EntryTypeEnum
): number {
    const deviation: number = calcDeviation(poolEntry, entryType)
    return +Number(deviation).toFixed(2)
}

/**
 * Get the deviation value array, that is needed for the ThreeDigitValue component
 *
 * @param poolEntry AssetPoolEntry
 * @param entryType EntryTypeEnum
 *
 * @return string[]
 */
export function getDeviationArray(
    poolEntry: AssetPoolEntry,
    entryType: EntryTypeEnum
): string[] {
    const deviation: number = calcDeviation(poolEntry, entryType)
    return deviation ? formatValueArray(deviation) : ['00', '00', '0']
}

/**
 * Get the direction of the deviation arrow
 *
 * @param poolEntry AssetPoolEntry
 * @param entryType EntryTypeEnum
 *
 * @return boolean
 */
export function getDeviationArrowDirection(
    poolEntry: AssetPoolEntry,
    entryType: EntryTypeEnum
): boolean {
    const currentPercentage: number = calcCurrentPercentage(poolEntry, entryType)
    const targetPercentage: number = getTargetPercentage(poolEntry, entryType)
    return currentPercentage > targetPercentage
}

/**
 * Check if there is a deviation
 *
 * @param poolEntry AssetPoolEntry
 * @param entryType EntryTypeEnum
 *
 * @return boolean
 */
export function checkIfDeviationExists(
    poolEntry: AssetPoolEntry,
    entryType: EntryTypeEnum
): boolean {
    const currentPercentage: number = calcCurrentPercentage(poolEntry, entryType)
    const targetPercentage: number = getTargetPercentage(poolEntry, entryType)
    return currentPercentage !== targetPercentage
}
