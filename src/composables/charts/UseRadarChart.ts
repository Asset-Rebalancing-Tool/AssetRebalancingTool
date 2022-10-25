import { useAssetStore } from "@/stores/AssetStore";
import { EntryTypeEnum } from "@/models/holdings/EntryTypeEnum";
import type { AssetPoolEntry } from "@/models/AssetPoolEntry";
import type { PublicHolding } from "@/models/holdings/PublicHolding";
import type { PrivateHolding } from "@/models/holdings/PrivateHolding";
import { calcDeviation } from "@/composables/assets/UseDeviation";

interface RadioChartDataObject {
    labels: string[],
    currentDistribution: number[],
    targetDistribution: number[]
}

/**
 * Build the radio chart data arrays
 *
 * @return RadioChartDataObject
 */
export function buildChartDataArrays(): RadioChartDataObject {
    const assetStore = useAssetStore()

    const labels: string[] = []
    const currentDistribution: number[] = []
    const targetDistribution: number[] = []

    assetStore.assetPool.forEach((poolEntry: AssetPoolEntry) => {
        switch (poolEntry.entryType) {
            case EntryTypeEnum.HOLDING_GROUP:
                // Holding groups are not required for this calculation
                break;
            case EntryTypeEnum.PUBLIC_HOLDING:
                const publicHolding = poolEntry as PublicHolding
                if (publicHolding) {
                    labels.push(publicHolding.publicAsset.assetName)
                    currentDistribution.push(100 - calcDeviation(poolEntry, poolEntry.entryType))
                    targetDistribution.push(100)
                }
                break;
            case EntryTypeEnum.PRIVATE_HOLDING:
                const privateHolding = poolEntry as PrivateHolding
                if (privateHolding) {
                    labels.push(privateHolding.title)
                    currentDistribution.push(100 - calcDeviation(poolEntry, poolEntry.entryType))
                    targetDistribution.push(100)
                }
                break;
        }
    })

    return {
        labels: labels,
        currentDistribution: currentDistribution,
        targetDistribution: targetDistribution
    }
}
