import { ref } from "vue";
import { useAssetStore } from "@/stores/AssetStore";
import type { CurrencyEnum } from '@/models/nested/CurrencyEnum';
import type { IPublicAsset } from '@/models/IPublicAsset';

/**
 * Get the currency by passing the uuid of an asset
 *
 * @param uuid string
 */
export function getAssetCurrency(uuid: string) {
    const assetStore = useAssetStore()
    const asset: IPublicAsset = assetStore.getSearchbarAsset(uuid)
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
