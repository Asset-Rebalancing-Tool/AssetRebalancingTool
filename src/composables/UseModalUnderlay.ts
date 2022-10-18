import { useSearchStore } from '@/stores/SearchStore'

/**
 * Show the modal underlay by setting the active modal underlay wrapper flag to true
 */
export function showModalUnderlay(): void {
  const searchbarStore = useSearchStore()
  searchbarStore.searchbarState.activeModalUnderlay = true
}

/**
 * Show the modal underlay by setting the active modal underlay wrapper flag to false
 */
export function hideModalUnderlay(): void {
  const searchbarStore = useSearchStore()
  searchbarStore.searchbarState.activeModalUnderlay = false
}
