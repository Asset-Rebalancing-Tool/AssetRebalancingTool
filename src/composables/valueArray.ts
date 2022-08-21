import { useAssetStore } from "@/stores/AssetStore";
import { ref } from "vue";
import { CurrencyEnum } from "@/models/nested/CurrencyEnum";
import type { IPublicAsset } from "@/models/IPublicAsset";

/**
 * Get the newest price record of an asset, and format it as array, that can be accessed in single value components
 *
 * @param assetProp IPublicAsset | null
 * @param uuid string
 */
export function getNewestPriceRecordFormatted(assetProp: IPublicAsset, uuid: string): string[] {
    const assetStore = useAssetStore()

    // if there is no asset prop passed as argument, get the asset by its uuid from the asset store
    const asset: IPublicAsset = (assetProp !== null)
        ? assetStore.getSearchbarAsset(uuid)
        : assetProp

    const currencyPriceRecordMap = ref(asset.currencyPriceRecordMap)
    let priceRecords = currencyPriceRecordMap.value[CurrencyEnum.EUR];

    // Check if the price records are undefined and if not get the first price records array by the first key
    if (priceRecords !== undefined) {
        const currencyKeys = Object.keys(currencyPriceRecordMap.value)
        const firstKey = currencyKeys[0] as CurrencyEnum
        priceRecords = currencyPriceRecordMap.value[firstKey]
    }

    // Get the newest price of the price records
    const newestPrice = priceRecords[0].price

    // Ensure, that there are price records
    if (!priceRecords) {
        return ['00', '00', '0']
    }

    // Return a formatted value array
    return formatValueArray(newestPrice, asset)
}

/**
 * Format a float value into an array, so it can be accessed in single value components
 *
 * @param assetValue float
 * @param asset IPublicAsset
 */
export function formatValueArray(assetValue: number, asset: IPublicAsset): string[] {
    // Parse the value of the asset to string
    const valueString: string = assetValue.toString()

    // create the value array by splitting the float
    const valueArray: string[] = valueString.split('.')

    // The single digits
    const firstDigit: string = valueArray[0]
    let firstDecimal: string = valueArray[1]
    let secondDecimal: string = ''

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
