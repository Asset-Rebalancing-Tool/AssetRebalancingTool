import { EntryTypeEnum } from "@/models/holdings/EntryTypeEnum";
import type { AssetPoolEntry } from "@/models/AssetPoolEntry";
import type { PublicHolding } from "@/models/holdings/PublicHolding";
import type { PrivateHolding } from "@/models/holdings/PrivateHolding";
import { getNewestPriceRecord } from "@/composables/UsePriceRecords";

/**
 * Calculate the current value of an asset pool entry
 *
 * @param poolEntry AssetPoolEntry
 * @param entryType EntryTypeEnum
 *
 * @return number
 */
export function calcCurrentValue(
    poolEntry: AssetPoolEntry,
    entryType: EntryTypeEnum
): number {

    let price: number = 0
    let quantity: number = 0
    switch (entryType) {
        default:
        case EntryTypeEnum.HOLDING_GROUP:
            return 0
        case EntryTypeEnum.PUBLIC_HOLDING:
            const publicHolding: PublicHolding = poolEntry as PublicHolding
            if (publicHolding) {
                const allPriceRecords = publicHolding.publicAsset.assetPriceRecords
                price = getNewestPriceRecord(allPriceRecords)
                quantity = publicHolding.ownedQuantity
            }
            break;
        case EntryTypeEnum.PRIVATE_HOLDING:
            const privateHolding: PrivateHolding = poolEntry as PrivateHolding
            if (privateHolding) {
                price = privateHolding.pricePerUnit
                quantity = privateHolding.ownedQuantity
            }
            break;
    }

    // Format the current value after german pattern
    return quantity * price
}

/**
 * Get the current value formatted as german pattern
 * @param poolEntry
 * @param entryType
 */
export function getCurrentValue(
    poolEntry: AssetPoolEntry,
    entryType: EntryTypeEnum
): string {
    const currentValue: number = calcCurrentValue(poolEntry, entryType)
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
    }).format(currentValue)
}
