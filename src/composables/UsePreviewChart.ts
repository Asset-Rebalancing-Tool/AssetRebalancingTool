import type { PriceRecord } from '@/models/nested/PriceRecord'
import { getFirstCurrencyPriceRecords } from '@/composables/UsePriceRecords'

/**
 * Get the data values for displaying a line chart based on the price records
 *
 * @param allPriceRecords string
 */
export function getDataValues(allPriceRecords: PriceRecord[]): number[] {
  let priceRecords: PriceRecord[] =
    getFirstCurrencyPriceRecords(allPriceRecords)
  if (priceRecords) {
    priceRecords = priceRecords.reverse()
  }
  const dataValues: number[] = []
  if (priceRecords) {
    for (const item of priceRecords) {
      const record = item as PriceRecord
      dataValues.push(record.price)
    }
  }
  return dataValues
}

/**
 * Get the data labels for displaying a line chart based on the price records
 *
 * @param allPriceRecords string
 */
export function getDataLabels(allPriceRecords: PriceRecord[]): string[] {
  const priceRecords: PriceRecord[] =
    getFirstCurrencyPriceRecords(allPriceRecords)
  const dataLabels: string[] = []
  if (priceRecords) {
    for (const item of priceRecords) {
      const record = item as PriceRecord
      dataLabels.push(record.tsPrice)
    }
  }
  return dataLabels
}

/**
 * Determine if the first price record is greater than the last and therefore the chart is positive
 *
 * @param allPriceRecords PriceRecord[]
 */
export function isPositiveChart(allPriceRecords: PriceRecord[]) {
  const priceRecords: PriceRecord[] =
    getFirstCurrencyPriceRecords(allPriceRecords)
  const firstRecord = priceRecords[0].price
  const lastRecord = priceRecords[priceRecords.length - 1].price
  return firstRecord > lastRecord
}

/**
 * Get a boolean that indicates, if the price records are empty and therefore the graph should or shouldn't be displayed
 *
 * @param allPriceRecords string
 */
export function showGraph(allPriceRecords: PriceRecord[]): boolean {
  const priceRecords: number[] = getDataValues(allPriceRecords)
  return priceRecords.length > 0
}
