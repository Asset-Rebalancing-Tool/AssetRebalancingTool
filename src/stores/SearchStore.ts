import type { Ref } from 'vue'
import { reactive, ref, toRaw } from 'vue'
import { defineStore } from 'pinia'
import type { PublicAsset } from '@/models/PublicAsset'
import type { SearchbarState } from '@/models/SearchbarState'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'

export const useSearchStore = defineStore('searchStore', () => {
  /**-******************************************************************-**/
  /**-------------------- Asset List State Variables --------------------**/
  /**-******************************************************************-**/

  // bool that indicates if the sidebar should be rendered
  const showSidebar: Ref<boolean> = ref(localStorage.getItem('token') !== null)

  // The reactive searchbar state
  const searchbarState: SearchbarState = reactive({
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

  /**-******************************************************************-**/
  /**------------- Return All State Variables And Actions ---------------**/
  /**-******************************************************************-**/

  return {
    showSidebar,
    searchbarState,
    getSearchbarAsset,
  }
})
