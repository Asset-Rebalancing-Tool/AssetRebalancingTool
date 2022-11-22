import { EntryTypeEnum } from '@/models/holdings/EntryTypeEnum'
import type { AssetPoolEntry } from '@/models/AssetPoolEntry'
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import { getNewestPriceRecord } from '@/composables/UsePriceRecords'
import { useAssetStore } from '@/stores/AssetStore'

/**************************************************************************************************************/
/*---------------------------------------- Current Value Methods ---------------------------------------------*/
/**************************************************************************************************************/

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
  let price = 0
  let quantity = 0
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
      break
    case EntryTypeEnum.PRIVATE_HOLDING:
      const privateHolding: PrivateHolding = poolEntry as PrivateHolding
      if (privateHolding) {
        price = privateHolding.pricePerUnit
        quantity = privateHolding.ownedQuantity
      }
      break
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

/**************************************************************************************************************/
/*-------------------------------------- Current Percentage Methods ------------------------------------------*/
/**************************************************************************************************************/

/**
 * Calculate the current percentage of an asset pool entry
 *
 * @param poolEntry AssetPoolEntry
 * @param entryType EntryTypeEnum
 *
 * @return number
 */
export function calcCurrentPercentage(
  poolEntry: AssetPoolEntry,
  entryType: EntryTypeEnum
): number {
  const assetStore = useAssetStore()

  let price = 0
  let currentValue = 0
  switch (entryType) {
    default:
    case EntryTypeEnum.HOLDING_GROUP:
      return 0
    case EntryTypeEnum.PUBLIC_HOLDING:
      const publicHolding: PublicHolding = poolEntry as PublicHolding
      if (publicHolding) {
        const allPriceRecords = publicHolding.publicAsset.assetPriceRecords
        price = getNewestPriceRecord(allPriceRecords)
        currentValue = publicHolding.ownedQuantity * price
      }
      break
    case EntryTypeEnum.PRIVATE_HOLDING:
      const privateHolding: PrivateHolding = poolEntry as PrivateHolding
      if (privateHolding) {
        price = privateHolding.pricePerUnit
        currentValue = privateHolding.ownedQuantity * price
      }
      break
  }

  // Calculate the current percentage
  return (currentValue / assetStore.sumState.totalValue) * 100
}

/**
 * Get the formatted current percentage
 *
 * @param poolEntry AssetPoolEntry
 * @param entryType EntryTypeEnum
 *
 * @return number
 */
export function getCurrentPercentage(
  poolEntry: AssetPoolEntry,
  entryType: EntryTypeEnum
): string {
  const currentPercentage: number = calcCurrentPercentage(poolEntry, entryType)
  // Format the current percentage value after german pattern
  return currentPercentage
    ? new Intl.NumberFormat('de-DE').format(currentPercentage) + ' %'
    : '0,00 %'
}
