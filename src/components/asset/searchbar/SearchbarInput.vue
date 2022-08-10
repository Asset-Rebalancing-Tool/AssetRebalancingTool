<template>
  <label>
    <input
      type="text"
      placeholder="Nach Asset suchen (Bezeichnung, WKN oder ISIN)"
      @focusin="toggleModalUnderlay"
      @focusout="toggleModalUnderlay"
      @input="fetchPublicAssets($event.target.value)"
    />
    <span class="icon"></span>
    <SearchbarContentWrapper :fetchedAssets="state.publicAssets" />
  </label>
</template>

<script lang="ts" setup>
import axios from 'axios'
import AssetService from '@/services/AssetService'
import { reactive } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import type { IPublicAsset } from "@/models/IPublicAsset";
import SearchbarContentWrapper from './SearchbarContentWrapper.vue'

// The components reactive state interface
type ISearchbarInputState = {
  publicAssets: IPublicAsset[]
  timer: ReturnType<typeof setTimeout> | null
  isLoading: boolean
}

// The components reactive state object
const state: ISearchbarInputState = reactive({
  publicAssets : [],
  timer: null,
  isLoading: false
});

// Fetch public assets based on the user input
async function fetchPublicAssets(searchValue: string) {
  // If this method is called before the timer has expired, reset it
  // If there is no timer and therefore no request, set the isLoading flag to true
  if (state.timer) {
    clearTimeout(state.timer)
    state.timer = null
  } else {
    state.isLoading = true
  }

  // Set the timer to 500ms before making the fetch request
  state.timer = setTimeout(async () => {
    // Asynchronously fetch assets based on the users input
    await AssetService.searchAssets(searchValue)
      .then((response: IPublicAsset[]) => {
        state.isLoading = false
        state.publicAssets = response;
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request cancelled')
        }
      })
  }, 380)
}

// Show or hide the modal underlay when focussing the searchbar
const assetStore = useAssetStore()
const toggleModalUnderlay = () => {
  assetStore.activeModalUnderlay = !assetStore.activeModalUnderlay
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/components/asset/searchbar/searchbar-input.scss';
</style>
