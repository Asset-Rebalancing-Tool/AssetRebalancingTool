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
    <SearchbarContentWrapper :fetchedAssets="assets" />
  </label>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import SearchbarContentWrapper from './SearchbarContentWrapper.vue'
import AssetService from '@/services/AssetService'
import axios, {AxiosResponse} from 'axios'
import type { IOwnedPublicAsset } from "@/models/IOwnedPublicAsset";

const assetStore = useAssetStore()
let assets = ref([])
let timer: any
let isLoading = false

const state = reactive({
  assets: ref([]),
});

// 👇 function to get index
/*const getAssetUuid = (uuid: string) => {
  return state.assets.findIndex((asset: IOwnedPublicAsset) => asset.uuid === uuid);
};*/

// Fetch public assets based on the user input
async function fetchPublicAssets(searchValue: string) {
  // Reset an existing timer, if this method is called before an ongoing timer has expired
  // If there is no ongoing timer and therefore no request, set the isLoading flag to true
  if (timer) {
    clearTimeout(timer)
    timer = null
  } else {
    isLoading = true
  }

  // Set a timer of 500ms before making the fetch request
  timer = setTimeout(async () => {
    // Asynchronously fetch assets based on the users input
    await AssetService.searchAssets(searchValue)
      .then((response: IOwnedPublicAsset) => {
        console.log(response, 'SearchbarInput::response')
        isLoading = false
        state.assets = ref(response);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request cancelled')
        }
      })
  }, 380)
}

// Show or hide the modal underlay when focussing the searchbar
const toggleModalUnderlay = () => {
  assetStore.activeModalUnderlay = !assetStore.activeModalUnderlay
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/components/asset/searchbar/searchbar-input.scss';
</style>
