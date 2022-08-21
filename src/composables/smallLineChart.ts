import type { IPriceRecord } from '@/models/nested/IPriceRecord';
import { getFirstCurrencyPriceRecords } from "@/composables/valueArray";

/**
 * Get the data values for displaying a line chart based on the price records
 *
 * @param uuid string
 */
export function getDataValues(uuid: string): number[] {
    const priceRecords = getFirstCurrencyPriceRecords(uuid)
    let dataValues: number[] = [];
    if (priceRecords) {
        for (let item of priceRecords) {
            let record = item as IPriceRecord
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
    const priceRecords = getFirstCurrencyPriceRecords(uuid)
    let dataLabels: string[] = [];
    if (priceRecords) {
        for (let item of priceRecords) {
            let record = item as IPriceRecord
            dataLabels.push(record.tsPrice)
        }
    }
    return dataLabels
}

/**
 * Get a boolean that indicates, if the price records are empty and therefore the graph should or shouldn't be displayed
 *
 * @param uuid string
 */
export function showGraph(uuid: string): boolean {
    return getFirstCurrencyPriceRecords(uuid).length > 0
}
