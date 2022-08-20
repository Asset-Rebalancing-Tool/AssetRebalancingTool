import { useAssetStore } from "@/stores/AssetStore";

export function useCurrency(uuid: string) {
    const assetStore = useAssetStore()
    const asset = assetStore.getSearchbarAsset(uuid)

    const currency = (asset.priceRecords.currency !== null) ? asset.priceRecords.currency : 'EUR'

    const mappedCurrency = (currency !== '')
        ? assetStore.mapCurrency(currency)
        : '€'

    return { mappedCurrency }
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
