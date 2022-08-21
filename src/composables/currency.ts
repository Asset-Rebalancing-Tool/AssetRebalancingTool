import { ref } from "vue";
import { useAssetStore } from "@/stores/AssetStore";
import type { CurrencyEnum } from '@/models/nested/CurrencyEnum';
import type { IPublicAsset } from '@/models/IPublicAsset';

/**
 * Get the currency of the passed asset or by the uuid of an asset
 *
 * @param assetProp IPublicAsset
 * @param uuid string
 */
export function getAssetCurrency(assetProp: IPublicAsset, uuid: string) {
    const assetStore = useAssetStore()

    // if there is no asset prop passed as argument, get the asset by its uuid from the asset store
    const asset: IPublicAsset = (assetProp !== null)
        ? assetStore.getSearchbarAsset(uuid)
        : assetProp

    const currencyPriceRecordMap = ref(asset.currencyPriceRecordMap)
    const currencyKeys = Object.keys(currencyPriceRecordMap.value)
    const firstCurrency = currencyKeys[0] as CurrencyEnum

    return mapCurrency(firstCurrency)
}

/**
 * Map the currency of an assets to its symbol
 *
 * @param currency string
 */
function mapCurrency(currency: string): string {
    switch (currency.toUpperCase()) {
        default:
        case 'UNSUPPORTED':
            return '?'
        case 'EUR':
            return '€'
        case 'USD':
            return '$'
    }
}
