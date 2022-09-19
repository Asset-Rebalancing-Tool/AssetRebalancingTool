import AssetService from '@/services/FetchAssetService'
import { AssetListEntryTypeEnum } from '@/models/enums/AssetListEntryTypeEnum'
import type { AssetListEntry } from '@/models/holdings/AssetListEntry'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'


export async function mergeListEntries() {
    const genericHoldingRows: AssetListEntry[] = []
    const holdingGroups: HoldingGroup[] = await AssetService.fetchHoldingGroups()
    const publicHoldings: PublicHolding[] = await AssetService.fetchPublicHoldings()
    const privateHoldings: PrivateHolding[] = await AssetService.fetchPrivateHoldings()

    holdingGroups.forEach((group) => {
        genericHoldingRows.push({
            uuid: group.uuid,
            entryType: AssetListEntryTypeEnum.HOLDING_GROUP,
            holdingGroup: group,
        } as AssetListEntry)
    })

    publicHoldings.forEach((holding) => {
        genericHoldingRows.push({
            uuid: holding.uuid,
            entryType: AssetListEntryTypeEnum.PUBLIC_HOLDING,
            publicHolding: holding,
        } as AssetListEntry)
    })

    privateHoldings.forEach((holding) => {
        genericHoldingRows.push({
            uuid: holding.uuid,
            entryType: AssetListEntryTypeEnum.PRIVATE_HOLDING,
            privateHolding: holding,
        } as AssetListEntry)
    })

    return genericHoldingRows
}
