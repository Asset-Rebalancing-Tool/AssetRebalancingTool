import { useSearchStore } from '@/stores/SearchStore'
import { useAssetStore } from '@/stores/AssetStore'

/**
 * Show the modal underlay by setting the active modal underlay wrapper flag to true
 */
export function showModalUnderlay(): void {
  const searchbarStore = useSearchStore()
  const assetStore = useAssetStore()
  searchbarStore.searchbarState.activeModalUnderlay = true
  assetStore.listActionState.editFlag = false
  assetStore.listActionState.deleteFlag = false
}

/**
 * Show the modal underlay by setting the active modal underlay wrapper flag to false
 */
export function hideModalUnderlay(): void {
  const searchbarStore = useSearchStore()
  searchbarStore.searchbarState.activeModalUnderlay = false
}
