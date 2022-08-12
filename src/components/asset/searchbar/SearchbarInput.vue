<template>
  <div class="searchbar-wrapper">
    <input
      type="text"
      placeholder="Nach Asset suchen (Bezeichnung, WKN oder ISIN)"
      @focus="showModalUnderlay"
      @input="fetchPublicAssets($event.target.value)"
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
import axios from 'axios'
import { reactive } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import type { IPublicAsset } from '@/models/IPublicAsset'
import SearchbarContentWrapper from './SearchbarContentWrapper.vue'

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
  publicAssets : [],
  resultCount: 0,
  timer: null,
  isLoading: false
});

// Fetch public assets based on the user input
async function fetchPublicAssets(searchValue: string) {

  // Always update the search string of the asset store
  assetStore.searchString = searchValue

  // Always reset reactive the state object
  state.publicAssets = []
  state.resultCount = 0
  state.isLoading = true

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

  // Set a timer of 500ms before firing the fetch request
  state.timer = setTimeout(async () => {
    axios.post(
      '/asset_api/asset/search',
      { SearchString: searchValue }
    ).then((response) => {
      if (response.data !== '') {
        state.isLoading = false
        state.publicAssets = JSON.parse(JSON.stringify(response.data));
        state.resultCount = response.data.length
      } else {
        console.log('empty')
      }
    });
  }, 500)
}

// Show the modal underlay when focussing the searchbar
const showModalUnderlay = () => {
  assetStore.activeModalUnderlay = true
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/components/asset/searchbar/searchbar-input.scss';
</style>
