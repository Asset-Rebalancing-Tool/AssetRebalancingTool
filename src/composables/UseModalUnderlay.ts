import { useSearchbarStore } from '@/stores/SearchbarStore'

/**
 * Show the modal underlay by setting the active modal underlay wrapper flag to true
 */
export function showModalUnderlay(): void {
  const searchbarStore = useSearchbarStore()
  searchbarStore.searchbarState.activeModalUnderlay = true
}

/**
 * Show the modal underlay by setting the active modal underlay wrapper flag to false
 */
export function hideModalUnderlay(): void {
  const searchbarStore = useSearchbarStore()
  searchbarStore.searchbarState.activeModalUnderlay = false
}
