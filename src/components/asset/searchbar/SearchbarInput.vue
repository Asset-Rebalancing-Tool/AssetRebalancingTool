<template>
  <label>
    <input
      type="text"
      placeholder="Nach Asset suchen (Bezeichnung, WKN oder ISIN)"
      @focusin="toggleModalUnderlay"
      @focusout="toggleModalUnderlay"
      v-model="searchInput"
    />
    <span class="icon"></span>
    <SearchbarContentWrapper
      :resultCount="resultCount"
      :fetchedAssets="publicAssets"
    />
  </label>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import AssetService from '@/services/AssetService'
import { useAssetStore } from '@/stores/AssetStore'
import type { IPublicAsset } from '@/models/IPublicAsset'
import SearchbarContentWrapper from './SearchbarContentWrapper.vue'

const searchInput: Ref<string> = ref('')
const resultCount: Ref<number> = ref(0)
const isLoading: Ref<boolean> = ref(false)
const publicAssets: Ref<IPublicAsset[]> = ref([])
const timer: ReturnType<typeof setTimeout> | null = null

// Watch effect constants
const stop = watchEffect((onCleanup) => {}) // call stop() when content wrapper closes

watchEffect(async () => {
  publicAssets.value = await AssetService.searchAssets(searchInput.value)
})

// Fetch public assets based on the user input
/*async function fetchPublicAssets(searchValue: string) {

  console.log('input hit')

  // If this method is called before the timer has expired, reset it
  // If there is no timer and therefore no request, set the isLoading flag to true
  if (timer) {
    clearTimeout(timer)
    timer = null
  } else {
    isLoading = true
  }

  // Set the timer to 500ms before making the fetch request
  timer = setTimeout(async () => {
    // Asynchronously fetch assets based on the users input
    await AssetService.searchAssets(searchValue)
      .then((response: IPublicAsset[]) => {
        isLoading = false
        return response
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request cancelled')
        }
      })
  }, 500)
}*/

// Show or hide the modal underlay when focussing the searchbar
/*const assetStore = useAssetStore()
const toggleModalUnderlay = () => {
  assetStore.activeModalUnderlay = !assetStore.activeModalUnderlay
}*/
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/components/asset/searchbar/searchbar-input.scss';
</style>
