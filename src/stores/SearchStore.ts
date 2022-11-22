import type { Ref } from 'vue'
import { reactive, ref, toRaw } from 'vue'
import { defineStore } from 'pinia'
import type { PublicAsset } from '@/models/PublicAsset'
import type { SearchbarState } from '@/models/SearchbarState'

export const useSearchStore = defineStore('searchStore', () => {
  /**-******************************************************************-**/
  /**-------------------- Asset List State Variables --------------------**/
  /**-******************************************************************-**/

  // The reactive searchbar state
  let searchbarState: SearchbarState = reactive({
    searchString: '',
    searchbarAssets: [],
    searchbarResultCount: 0,
    searchbarLoadingFlag: false,
    activeModalUnderlay: false,
  })

  /**-******************************************************************-**/
  /**------------------------ Searchbar Actions -------------------------**/
  /**-******************************************************************-**/

  /**
   * Iterate over the searchbar assets and check if the uuid matches the passed uuid
   *
   * @param uuid string
   *
   * @return PublicAsset
   */
  function getSearchbarAsset(uuid: string): PublicAsset {
    // Ensure that the searchbar assets array is not empty
    if (searchbarState.searchbarAssets.length === 0) {
      return {} as PublicAsset
    }
    // Loop over the searchbar assets and check if the uuid matches the passed uuid
    for (const asset of searchbarState.searchbarAssets) {
      if (asset.uuid === uuid) return asset
    }
    // If there is no asset with the passed uuid, return an empty object
    return {} as PublicAsset
  }

  /**
   * Clear the store state variables, in order to prevent bugs when re logging
   *
   * @return void
   */
  function resetStoreState(): void {
    searchbarState = {
      searchString: '',
      searchbarAssets: [],
      searchbarResultCount: 0,
      searchbarLoadingFlag: false,
      activeModalUnderlay: false,
    } as SearchbarState
  }

  /**-******************************************************************-**/
  /**------------- Return All State Variables And Actions ---------------**/
  /**-******************************************************************-**/

  return {
    searchbarState,
    getSearchbarAsset,
    resetStoreState,
  }
})
