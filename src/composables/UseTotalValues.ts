import type { AssetPoolEntry } from '@/models/AssetPoolEntry'
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import { EntryTypeEnum } from '@/models/holdings/EntryTypeEnum'
import { getNewestPriceRecord } from '@/composables/UsePriceRecords'
import { useAssetStore } from '@/stores/AssetStore'

/**
 * Calculate a groups total target percentage
 *
 * @param groupUuid string
 *
 * @return number
 */
export function getTotalGroupTargetPercentage(groupUuid: string): number {
  const assetStore = useAssetStore()
  let totalTargetPercentage = 0

  if (assetStore.renderState.assetList.has(groupUuid)) {
    const group = assetStore.renderState.assetList.get(groupUuid)
    if (group && group.groupEntries) {
      group.groupEntries.forEach((groupEntry) => {
        const mapEntry = assetStore.assetPool.get(groupEntry.uuid)
        if (mapEntry) {
          const holding: AssetPoolEntry = mapEntry
          totalTargetPercentage += holding.targetPercentage
        }
      })
    }
  }
  return totalTargetPercentage
}

/**
 * Calculate a groups total value
 *
 * @param groupUuid string
 *
 * @return number
 */
export function getTotalGroupValue(groupUuid: string): number {
  const assetStore = useAssetStore()
  let totalValue = 0

  if (assetStore.renderState.assetList.has(groupUuid)) {
    const group = assetStore.renderState.assetList.get(groupUuid)
    if (group && group.groupEntries) {
      group.groupEntries.forEach((groupEntry) => {
        const mapEntry = assetStore.assetPool.get(groupEntry.uuid)
        if (mapEntry) {
          switch (mapEntry.entryType) {
            case EntryTypeEnum.PUBLIC_HOLDING:
              const publicHolding: PublicHolding = mapEntry as PublicHolding
              const price = getNewestPriceRecord(
                publicHolding.publicAsset.assetPriceRecords
              )
              const quantity = publicHolding.ownedQuantity
              totalValue = totalValue + price * quantity
              break
            case EntryTypeEnum.PRIVATE_HOLDING:
              const privateHolding: PrivateHolding = mapEntry as PrivateHolding
              totalValue =
                totalValue +
                privateHolding.pricePerUnit * privateHolding.ownedQuantity
              break
          }
        }
      })
    }
  }
  return totalValue
}

/**
 * Calculate a groups total percentage
 *
 * @param groupUuid string
 *
 * @return number
 */
export function getTotalGroupPercentage(groupUuid: string): number {
  const assetStore = useAssetStore()
  let totalPercentage = 0

  if (assetStore.renderState.assetList.has(groupUuid)) {
    const group = assetStore.renderState.assetList.get(groupUuid)
    if (group && group.groupEntries) {
      group.groupEntries.forEach((groupEntry) => {
        const mapEntry = assetStore.assetPool.get(groupEntry.uuid)
        if (mapEntry) {
          switch (mapEntry.entryType) {
            case EntryTypeEnum.PUBLIC_HOLDING:
              const publicHolding: PublicHolding = mapEntry as PublicHolding
              const priceRecord: number = getNewestPriceRecord(
                publicHolding.publicAsset.assetPriceRecords
              )
              const publicValue: number =
                publicHolding.ownedQuantity * priceRecord
              totalPercentage =
                totalPercentage +
                (publicValue / assetStore.sumState.totalValue) * 100
              break
            case EntryTypeEnum.PRIVATE_HOLDING:
              const privateHolding: PrivateHolding = mapEntry as PrivateHolding
              const privateValue: number =
                privateHolding.ownedQuantity * privateHolding.pricePerUnit
              totalPercentage =
                totalPercentage +
                (privateValue / assetStore.sumState.totalValue) * 100
              break
          }
        }
      })
    }
  }
  return totalPercentage
}

/**
 * Calculate a groups total deviation
 *
 * @param groupUuid string
 *
 * @return number
 */
export function getTotalGroupDeviation(groupUuid: string): number {
  const assetStore = useAssetStore()

  if (assetStore.assetPool.has(groupUuid)) {
    const group = assetStore.assetPool.get(groupUuid)
    if (group) {
      const holdingGroup: HoldingGroup = group as HoldingGroup
      const totalGroupPercentage: number = getTotalGroupPercentage(groupUuid)
      return Math.abs(totalGroupPercentage - holdingGroup.targetPercentage)
    }
  }
  return 0
}

/**
 * Set the initial total asset list value by iterating over the fetched asset map holdings
 */
export function setAssetListTotalValue(): void {
  const assetStore = useAssetStore()
  let totalValue = 0

  assetStore.assetPool.forEach((mapEntry: AssetPoolEntry) => {
    let ownedQuantity = 0
    let currentPrice = 0
    switch (mapEntry.entryType) {
      case EntryTypeEnum.PUBLIC_HOLDING:
        const publicHolding = mapEntry as PublicHolding
        ownedQuantity = publicHolding.ownedQuantity
        currentPrice = getNewestPriceRecord(
          publicHolding.publicAsset.assetPriceRecords
        )
        break
      case EntryTypeEnum.PRIVATE_HOLDING:
        const privateHolding = mapEntry as PrivateHolding
        ownedQuantity = privateHolding.ownedQuantity
        currentPrice = privateHolding.pricePerUnit
        break
    }
    totalValue += ownedQuantity * currentPrice
  })
  assetStore.sumState.totalValue = totalValue
}

/**
 * Set the initial total asset list target percentage by iterating over the fetched asset map holdings
 * NOTE: Holding groups are not needed in this incrementation, since the asset map contains all assets
 */
export function setAssetListTotalTargetPercentage(): void {
  const assetStore = useAssetStore()
  let totalTargetPercentage = 0

  assetStore.assetPool.forEach((mapEntry: AssetPoolEntry) => {
    switch (mapEntry.entryType) {
      case EntryTypeEnum.HOLDING_GROUP:
        const holdingGroup = mapEntry as HoldingGroup
        totalTargetPercentage += holdingGroup.targetPercentage
        break
      case EntryTypeEnum.PUBLIC_HOLDING:
        const publicHolding = mapEntry as PublicHolding
        const publicListEntry = assetStore.renderState.assetList.get(
          publicHolding.uuid
        )
        if (publicListEntry && !publicListEntry.hasGroup) {
          totalTargetPercentage += publicHolding.targetPercentage
        }
        break
      case EntryTypeEnum.PRIVATE_HOLDING:
        const privateHolding = mapEntry as PrivateHolding
        const privateListEntry = assetStore.renderState.assetList.get(
          privateHolding.uuid
        )
        if (privateListEntry && !privateListEntry.hasGroup) {
          totalTargetPercentage += privateHolding.targetPercentage
        }
        break
    }
  })
  assetStore.sumState.totalTargetPercentage = totalTargetPercentage
}

/**
 * Set the initial total asset list target percentage by iterating over the fetched asset map holdings
 * NOTE: Holding groups are not needed in this incrementation, since the asset map contains all assets
 */
export function setAssetListTotalDeviation(): void {
  const assetStore = useAssetStore()
  assetStore.sumState.totalDeviation = Math.abs(
    100 - assetStore.sumState.totalTargetPercentage
  )
}
