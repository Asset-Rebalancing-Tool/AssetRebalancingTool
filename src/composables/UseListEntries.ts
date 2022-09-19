import AssetService from '@/services/FetchAssetService'
import { AssetListEntryTypeEnum } from '@/models/enums/AssetListEntryTypeEnum'
import type { AssetListEntry } from '@/models/holdings/AssetListEntry'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'

/**
 * Generate list entries
 *
 * This function will fetch groups, public and private holdings and merge them into the asset store's assetListEntries array
 */
export async function generateListEntries() {
    // The List that is getting returned
    const assetListEntries: AssetListEntry[] = []

    // Fetch all groups, public and private holdings
    const holdingGroups: HoldingGroup[] = await AssetService.fetchHoldingGroups()
    const publicHoldings: PublicHolding[] = await AssetService.fetchPublicHoldings()
    const privateHoldings: PrivateHolding[] = await AssetService.fetchPrivateHoldings()

    // Push each holding group
    holdingGroups.forEach((group) => {
        assetListEntries.push({
            uuid: group.uuid,
            entryType: AssetListEntryTypeEnum.HOLDING_GROUP,
            holdingGroup: group,
        } as AssetListEntry)
    })

    // Push each public holding
    publicHoldings.forEach((holding) => {
        assetListEntries.push({
            uuid: holding.uuid,
            entryType: AssetListEntryTypeEnum.PUBLIC_HOLDING,
            publicHolding: holding,
        } as AssetListEntry)
    })

    // Push each private holding
    privateHoldings.forEach((holding) => {
        assetListEntries.push({
            uuid: holding.uuid,
            entryType: AssetListEntryTypeEnum.PRIVATE_HOLDING,
            privateHolding: holding,
        } as AssetListEntry)
    })

    return assetListEntries
}
