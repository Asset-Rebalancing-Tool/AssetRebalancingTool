import { EntryTypeEnum } from "@/models/holdings/EntryTypeEnum";
import type { AssetPoolEntry } from "@/models/AssetPoolEntry";
import type { PublicHolding } from "@/models/holdings/PublicHolding";
import type { PrivateHolding } from "@/models/holdings/PrivateHolding";

/**
 * Get the target percentage based on the holding type
 *
 * @param poolEntry AssetPoolEntry
 * @param entryType EntryTypeEnum
 *
 * @return boolean
 */
export function getTargetPercentage(
    poolEntry: AssetPoolEntry,
    entryType: EntryTypeEnum
): number {
    let targetPercentage: number = 0
    switch (entryType) {
        case EntryTypeEnum.PUBLIC_HOLDING:
            const publicHolding: PublicHolding = poolEntry as PublicHolding
            if (publicHolding) {
                targetPercentage = publicHolding.targetPercentage
            }
            break
        case EntryTypeEnum.PRIVATE_HOLDING:
            const privateHolding: PrivateHolding = poolEntry as PrivateHolding
            if (privateHolding) {
                targetPercentage = privateHolding.targetPercentage
            }
            break
    }
    return targetPercentage
}
