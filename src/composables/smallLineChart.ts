import type { IPriceRecord } from '@/models/nested/IPriceRecord'
import { getFirstCurrencyPriceRecords } from '@/composables/valueArray'

/**
 * Get the data values for displaying a line chart based on the price records
 *
 * @param allPriceRecords string
 */
export function getDataValues(allPriceRecords: IPriceRecord[]): number[] {
  const priceRecords: IPriceRecord[] = getFirstCurrencyPriceRecords(allPriceRecords).reverse()
  const dataValues: number[] = []
  if (priceRecords) {
    for (const item of priceRecords) {
      const record = item as IPriceRecord
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
export function getDataLabels(allPriceRecords: IPriceRecord[]): string[] {
  const priceRecords: IPriceRecord[] = getFirstCurrencyPriceRecords(allPriceRecords)
  const dataLabels: string[] = []
  if (priceRecords) {
    for (const item of priceRecords) {
      const record = item as IPriceRecord
      dataLabels.push(record.tsPrice)
    }
  }
  return dataLabels
}

/**
 * Determine if the first price record is greater than the last and therefore the chart is positive
 *
 * @param allPriceRecords IPriceRecord[]
 */
export function isPositiveChart(allPriceRecords: IPriceRecord[]) {
  const priceRecords: IPriceRecord[] = getFirstCurrencyPriceRecords(allPriceRecords)
  const firstRecord = priceRecords[0]
  const lastRecord = priceRecords[priceRecords.length - 1]
  return firstRecord > lastRecord
}

/**
 * Get a boolean that indicates, if the price records are empty and therefore the graph should or shouldn't be displayed
 *
 * @param allPriceRecords string
 */
export function showGraph(allPriceRecords: IPriceRecord[]): boolean {
  const priceRecords: number[] = getDataValues(allPriceRecords);
  return (priceRecords.length > 0)
}

