import type { IPriceRecord } from '@/models/nested/IPriceRecord'
import { getFirstCurrencyPriceRecords } from '@/composables/valueArray'

/**
 * Get the data values for displaying a line chart based on the price records
 *
 * @param uuid string
 */
export function getDataValues(uuid: string): number[] {
  const priceRecords: IPriceRecord[] = getFirstCurrencyPriceRecords(uuid).reverse()
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
 * @param uuid string
 */
export function getDataLabels(uuid: string): string[] {
  const priceRecords: IPriceRecord[] = getFirstCurrencyPriceRecords(uuid)
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
 * Determine the chart color based on the price records first and last entry
 *
 * @param uuid
 */
export function getChartColor(uuid: string) {
  const priceRecords: IPriceRecord[] = getFirstCurrencyPriceRecords(uuid)
  const firstRecord = priceRecords[0]
  const lastRecord = priceRecords[priceRecords.length - 1]
  return (firstRecord > lastRecord)
      ? '#19B399'
      : '#C63A3A'
}

/**
 * Get a boolean that indicates, if the price records are empty and therefore the graph should or shouldn't be displayed
 *
 * @param uuid string
 */
export function showGraph(uuid: string): boolean {
  const priceRecords: number[] = getDataValues(uuid);
  return (priceRecords.length > 0)
}

