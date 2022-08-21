<template>
  <div class="searchbar-wrapper">
    <input
        type="text"
        placeholder="Nach Asset suchen (Bezeichnung, WKN oder ISIN)"
        @focus="showModalUnderlay"
        @input="searchAsset($event.target.value)"
    />
    <span class="icon"></span>
    <SearchbarContentWrapper
        :result-count="state.resultCount"
        :fetched-assets="state.publicAssets"
        :is-loading="state.isLoading"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import { showModalUnderlay } from '@/composables/modalOverlay'
import type { IPublicAsset } from '@/models/IPublicAsset'
import SearchbarContentWrapper from './SearchbarContentWrapper.vue'
import AssetService from '@/services/AssetService'

const assetStore = useAssetStore()

// The components reactive state interface
interface IState {
  publicAssets: IPublicAsset[]
  resultCount: number
  timer: ReturnType<typeof setTimeout> | null
  isLoading: boolean
}

// The components reactive state object
const state: IState = reactive({
  publicAssets: [],
  resultCount: 0,
  timer: null,
  isLoading: false,
})

/**
 * This method will be executed on each searchbar input change.
 * In order to not spam the backend with requests, there is a timer that must expire,
 * before the service fetch is executed.
 *
 * @param searchValue string
 */
function searchAsset(searchValue: string) {

  // Always update the search string of the asset store
  assetStore.searchString = searchValue

  // Always reset the reactive state object properties
  state.publicAssets = [] as IPublicAsset[]
  state.resultCount = 0
  state.isLoading = true

  // Ensure to only make request, if the user input is greater than three characters
  if (searchValue.length < 3) {
    state.isLoading = false
    return
  }

  // If this method is called before the timer has expired, reset it
  // If there is no timer and therefore no request, set the isLoading flag to true
  if (state.timer) {
    clearTimeout(state.timer)
    state.timer = null
  }

  // Fetch each time the timer expires
  state.timer = setTimeout(() => {
    AssetService.fetchPublicAssets(searchValue)
        .then(results => {
          state.isLoading = false
          state.publicAssets = results
          state.resultCount = results.length
          assetStore.searchbarAssets = results
        })
  }, 500)
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/components/asset/searchbar/searchbar-input.scss';
</style>
