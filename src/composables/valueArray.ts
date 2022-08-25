import { useAssetStore } from '@/stores/AssetStore'
import { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import type { IPublicAsset } from '@/models/IPublicAsset'
import type { IPriceRecord } from '@/models/nested/IPriceRecord'

/**
 * Get the currency price record map, from the asset itself
 *
 * @param uuid string
 */
export function getCurrencyPriceRecordMap(
  uuid: string
): Record<CurrencyEnum, IPriceRecord[]> {
  const assetStore = useAssetStore()
  const asset: IPublicAsset = assetStore.getSearchbarAsset(uuid)
  return asset.currencyPriceRecordMap
}

/**
 * Get the first price records array (EUR records)
 *
 * @param uuid string
 */
export function getFirstCurrencyPriceRecords(uuid: string): IPriceRecord[] {
  const currencyPriceRecordMap = getCurrencyPriceRecordMap(uuid)
  return currencyPriceRecordMap[CurrencyEnum.EUR]
}

/**
 * Get the newest price record of an asset, and format it as array, that can be accessed in single value components
 *
 * @param uuid string
 */
export function getNewestPriceRecordFormatted(uuid: string): string[] {
  // Get the currency price records map along with the euro perice records
  const currencyPriceRecordMap = getCurrencyPriceRecordMap(uuid)
  let priceRecords = currencyPriceRecordMap[CurrencyEnum.EUR]

  // Check if the price records are undefined and if not get the first price records array by the first key
  if (priceRecords !== undefined) {
    const currencyKeys = Object.keys(currencyPriceRecordMap)
    const firstKey = currencyKeys[0] as CurrencyEnum
    priceRecords = currencyPriceRecordMap[firstKey]
  }

  // Get the newest price of the price records
  const newestPrice = priceRecords[0].price

  // Ensure, that there are price records
  if (!priceRecords) {
    return ['00', '00', '0']
  }

  // Return a formatted value array
  return formatValueArray(newestPrice)
}

/**
 * Format a float value into an array, so it can be accessed in single value components
 *
 * @param assetValue float
 */
export function formatValueArray(assetValue: number): string[] {
  // Parse the value of the asset to string
  const valueString: string = assetValue.toString()

  // create the value array by splitting the float
  const valueArray: string[] = valueString.split('.')

  // The single digits
  const firstDigit: string = valueArray[0]
  let firstDecimal: string = valueArray[1]
  let secondDecimal = ''

  // If the first decimal is only one character long, add a zero to its end
  if (firstDecimal.length === 1) {
    firstDecimal = firstDecimal + '0'
  }

  // If the first decimal is greater than two characters, split it
  if (firstDecimal.length > 2) {
    secondDecimal = firstDecimal.slice(2, 3)
    firstDecimal = firstDecimal.slice(0, 2)
  }

  return [firstDigit, firstDecimal, secondDecimal]
}
