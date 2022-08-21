import { useAssetStore } from '@/stores/AssetStore'

/**
 * Show the modal underlay by setting the active modal underlay wrapper flag to true
 */
export function showModalUnderlay(): void {
    const assetStore = useAssetStore()
    assetStore.activeModalUnderlay = true
}

/**
 * Show the modal underlay by setting the active modal underlay wrapper flag to false
 */
export function hideModalUnderlay(): void {
    const assetStore = useAssetStore()
    assetStore.activeModalUnderlay = false
}

