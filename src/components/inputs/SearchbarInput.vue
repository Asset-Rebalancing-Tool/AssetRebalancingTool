<template>
  <BaseInput
    class="locked"
    type="text"
    placeholder="Nach Asset suchen (Bezeichnung, WKN oder ISIN)"
    @focus="showModalUnderlay"
    @input="searchAsset($event.target.value)"
  >
    <template #inputIcon>
      <IconInputSearch />
    </template>
  </BaseInput>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import { showModalUnderlay } from '@/composables/UseModalUnderlay'
import type { IPublicAsset } from '@/models/IPublicAsset'
import type { Ref } from 'vue'
import AssetService from '@/services/AssetService'
import BaseInput from '@/components/inputs/BaseInput.vue'
import IconInputSearch from '@/assets/icons/inputs/IconInputSearch.vue'

const store = useAssetStore()

// reactive variables needed in order fetch assets properly
const abortController: Ref<AbortController | null> = ref(new AbortController())
const timer: Ref<ReturnType<typeof setTimeout> | null> = ref(null)

/**
 * This method will be executed on each searchbar input change.
 * In order to not spam the backend with requests, there is a timer that must expire,
 * before the service fetch is executed.
 *
 * @param searchValue string
 */
function searchAsset(searchValue: string) {
  // Always abort previous requests
  if (abortController.value) {
    abortController.value.abort()
    abortController.value = null
  }

  // Always update the search string of the asset store
  store.searchString = searchValue

  // Always reset the reactive state object properties
  store.searchbarAssets = [] as IPublicAsset[]
  store.searchbarResultCount = 0
  store.searchbarLoadingFlag = true

  // Ensure to only make request, if the user input is greater than three characters
  if (searchValue.length < 3) {
    store.searchbarLoadingFlag = false
    return
  }

  // If this method is called before the timer has expired, reset it
  // If there is no timer and therefore no request, set the isLoading flag to true
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }

  // Fetch each time the timer expires
  timer.value = setTimeout(() => {
    // Controller that is used to abort the request if necessary
    abortController.value = new AbortController()
    AssetService.fetchPublicAssets(searchValue, abortController.value).then(
      (results) => {
        store.searchbarLoadingFlag = false
        store.searchbarResultCount = results.length
        store.searchbarAssets = results
      }
    )
  }, 500)
}
</script>

<style lang="scss">
header input {
  text-align: left;
  padding-left: $base-margin;
}

.input-wrapper svg {
  @include absolute-right-center-y;
  right: 25px;
  width: 18px;
  height: 18px;
  pointer-events: none;
}
</style>
