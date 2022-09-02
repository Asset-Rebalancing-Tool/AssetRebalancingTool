<template>
  <BaseInput
    type="text"
    placeholder="Nach Asset suchen (Bezeichnung, WKN oder ISIN)"
    @focus="showModalUnderlay"
    @input="searchAsset($event.target.value)"
    v-model="userInput"
  >
    <template #inputIcon>
      <Component :is="inputIcon" :class="{'remove-value': userInput.length > 0}" @click="removeUserInput" />
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
import IconRemoveValue from '@/assets/icons/inputs/IconRemoveValue.vue'
import type { InputIconEnum } from "@/models/enums/InputIconEnum";

const store = useAssetStore()

// reactive variables needed in order fetch assets properly
const abortController: Ref<AbortController | null> = ref(new AbortController())
const timer: Ref<ReturnType<typeof setTimeout> | null> = ref(null)

let userInput: Ref<string> = ref('')
let inputIcon: Ref<InputIconEnum> = ref(IconInputSearch)


// Clear the search string if the user click the remove icon and reset the store's asset state variables
function removeUserInput() {
  if (store.searchString.length > 0) {
    resetFetch()
    store.searchString = ''
    userInput.value = ''
    inputIcon.value = IconInputSearch
    store.searchbarLoadingFlag = false
  }
}

/**
 * This method will be executed on each searchbar input change.
 * In order to not spam the backend with requests, there is a timer that must expire,
 * before the service fetch is executed.
 *
 * @param searchValue string
 *
 * @return void
 */
function searchAsset(searchValue: string): void {

  // Abort the previous fetch and reset the asset store state variables
  resetFetch()

  // Always update the search string of the asset store
  store.searchString = searchValue

  inputIcon.value = (searchValue.length > 0)
      ? IconRemoveValue
      : IconInputSearch

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
  timer.value = setTimeout(async () => {
    // Controller that is used to abort the request if necessary
    abortController.value = new AbortController()
    await AssetService.fetchPublicAssets(searchValue, abortController.value).then(
        (results) => {
          store.searchbarLoadingFlag = false
          store.searchbarResultCount = results.length
          store.searchbarAssets = results
        }
    ).catch(error => {
      console.log(error)
    })
  }, 500)
}

/**
 * Abort the previous fetch and reset the asset store state variables
 *
 * @return void
 */
function resetFetch(): void {
  // Always abort previous requests
  if (abortController.value) {
    abortController.value.abort()
    abortController.value = null
  }

  // Always reset the reactive state object properties
  store.searchbarAssets = [] as IPublicAsset[]
  store.searchbarResultCount = 0
  store.searchbarLoadingFlag = true
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
.input-wrapper svg.remove-value {
  width: 16px;
  height: 16px;
  pointer-events: all;
  cursor: pointer;
}

</style>
