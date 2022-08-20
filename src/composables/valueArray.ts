import { useAssetStore } from "@/stores/AssetStore";

export function useValueArray(uuid: string) {
    const assetStore = useAssetStore()
    const asset = assetStore.getSearchbarAsset(uuid)

    const newestPrice = (asset.priceRecords.length !== 0)
        ? asset.priceRecords[0].price
        : null

    const valueArray = (newestPrice !== null)
        ? assetStore.getValueArray(newestPrice)
        : ['00', '00', '0']


    return { valueArray }
}
