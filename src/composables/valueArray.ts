import { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import type { PriceRecord } from '@/models/nested/PriceRecord'

/**
 * Get the first price records array (EUR records)
 *
 * @param priceRecords PriceRecord[]
 */
export function getFirstCurrencyPriceRecords(
  priceRecords: PriceRecord[]
): PriceRecord[] {
  const currencyPriceRecordMap: Record<CurrencyEnum, PriceRecord[]> = groupBy(
    priceRecords,
    (i) => i.currency
  )
  return currencyPriceRecordMap[CurrencyEnum.EUR]
}

/**
 * Group the price records based on their currency
 *
 * @param array PriceRecord[]
 * @param key CurrencyEnum
 */
const groupBy = <T, K extends keyof any>(array: T[], key: (i: T) => K) =>
  array.reduce((groups, item) => {
    ;(groups[key(item)] ||= []).push(item)
    return groups
  }, {} as Record<K, T[]>)

export function getNewestPriceRecord(allPriceRecords: PriceRecord[]): number {
  // Get the currency price records map along with the euro perice records
  const currencyPriceRecordMap = groupBy(allPriceRecords, (i) => i.currency)
  let priceRecords = currencyPriceRecordMap[CurrencyEnum.EUR]

  // Check if the price records are undefined and if not get the first price records array by the first key
  if (priceRecords !== undefined) {
    const currencyKeys = Object.keys(currencyPriceRecordMap)
    const firstKey = currencyKeys[0] as CurrencyEnum
    priceRecords = currencyPriceRecordMap[firstKey]

    return priceRecords[0] !== undefined ? priceRecords[0]['price'] : 0
  }
  return 0
}

/**
 * Get the newest price record of an asset, and format it as array, that can be accessed in single value components
 *
 * @param allPriceRecords string
 */
export function getNewestPriceRecordFormatted(
  allPriceRecords: PriceRecord[]
): string[] {
  // Get the currency price records map along with the euro perice records
  const currencyPriceRecordMap = groupBy(allPriceRecords, (i) => i.currency)
  let priceRecords = currencyPriceRecordMap[CurrencyEnum.EUR]

  // Check if the price records are undefined and if not get the first price records array by the first key
  if (priceRecords !== undefined) {
    const currencyKeys = Object.keys(currencyPriceRecordMap)
    const firstKey = currencyKeys[0] as CurrencyEnum
    priceRecords = currencyPriceRecordMap[firstKey]

    return priceRecords[0] !== undefined
      ? formatValueArray(priceRecords[0].price)
      : ['00', '00', '0']
  }

  return ['00', '00', '0']
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
