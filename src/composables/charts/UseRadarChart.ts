import { useAssetStore } from "@/stores/AssetStore";
import { EntryTypeEnum } from "@/models/holdings/EntryTypeEnum";
import type { AssetPoolEntry } from "@/models/AssetPoolEntry";
import type { PublicHolding } from "@/models/holdings/PublicHolding";
import type { PrivateHolding } from "@/models/holdings/PrivateHolding";
import { calcCurrentPercentage } from "@/composables/assets/UseCurrentValues";

interface RadioChartDataObject {
    labels: string[],
    currentPercentages: number[],
    targetPercentages: number[]
}

interface RadioChartDataSet {
    label: string,
    currentPercentage: number,
    targetPercentage: number
}

/**
 * Build the radio chart data arrays
 *
 * @return RadioChartDataObject
 */
export function buildChartDataArrays(): RadioChartDataObject {
    const assetStore = useAssetStore()

    const labels: string[] = []
    const currentPercentages: number[] = []
    const targetPercentages: number[] = []

    assetStore.assetPool.forEach((poolEntry: AssetPoolEntry) => {
        switch (poolEntry.entryType) {
            case EntryTypeEnum.HOLDING_GROUP:
                // Holding groups are not required for this calculation
                break;
            case EntryTypeEnum.PUBLIC_HOLDING:
                const publicHolding = poolEntry as PublicHolding
                if (publicHolding) {
                    labels.push(publicHolding.publicAsset.assetName,)
                    currentPercentages.push(calcCurrentPercentage(poolEntry, poolEntry.entryType))
                    targetPercentages.push(publicHolding.targetPercentage)
                }
                break;
            case EntryTypeEnum.PRIVATE_HOLDING:
                const privateHolding = poolEntry as PrivateHolding
                if (privateHolding) {
                    labels.push(privateHolding.title)
                    currentPercentages.push(calcCurrentPercentage(poolEntry, poolEntry.entryType))
                    targetPercentages.push(privateHolding.targetPercentage)
                }
                break;
        }
    })

    return {
        labels: labels,
        currentPercentages: currentPercentages,
        targetPercentages: targetPercentages
    }
}
