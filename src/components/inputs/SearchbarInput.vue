<template>
  <div class="searchbar-wrapper">
    <BaseInput
      type="text"
      :placeholder="$t('assetList.searchbar.placeholder')"
      @focus="showModalUnderlay"
      @input="searchAsset($event.target.value)"
      v-model="userInput"
    >
      <template #inputIcon>
        <Component
          :is="inputIcon"
          :class="{ 'remove-value': userInput.length > 0 }"
          @click="removeUserInput"
        />
      </template>
    </BaseInput>
    <button
      v-show="showDeleteButton"
      class="delete-holding"
      :class="{ active: deleteHoldingFlag }"
      @click.prevent="toggleDeleteHoldingFlag"
    >
      <IconDelete />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useSearchStore } from '@/stores/SearchStore'
import { showModalUnderlay } from '@/composables/UseModalUnderlay'
import type { PublicAsset } from '@/models/PublicAsset'
import type { Ref } from 'vue'
import AssetService from '@/services/FetchAssetService'
import BaseInput from '@/components/inputs/BaseInput.vue'
import IconInputSearch from '@/assets/icons/inputs/IconInputSearch.vue'
import IconRemoveValue from '@/assets/icons/inputs/IconRemoveValue.vue'
import type { InputIconEnum } from '@/models/enums/InputIconEnum'
import { handleErrorResponseStatus } from '@/services/TokenService'
import IconDelete from '@/assets/icons/inputs/IconDelete.vue'
import { useAssetStore } from '@/stores/AssetStore'

const searchbarStore = useSearchStore()
const assetStore = useAssetStore()

// reactive variables needed in order fetch assets properly
const abortController: Ref<AbortController | null> = ref(new AbortController())
const timer: Ref<ReturnType<typeof setTimeout> | null> = ref(null)

const userInput: Ref<string> = ref('')
const inputIcon: Ref<InputIconEnum> = ref(IconInputSearch)

const showDeleteButton = computed(() => {
  if (searchbarStore.searchbarState.activeModalUnderlay) {
    return false
  }
  return (
    assetStore.renderState.loadingFlag ||
    assetStore.renderState.assetList.size !== 0
  )
})

const deleteHoldingFlag = computed(() => {
  return (!searchbarStore.searchbarState.activeModalUnderlay)
    ? assetStore.deleteFlag
    : false
})

function toggleDeleteHoldingFlag() {
  assetStore.listActionState.editFlag = false
  assetStore.listActionState.deleteFlag = !assetStore.listActionState.deleteFlag
}

// Clear the search string if the user click the remove icon.svg and reset the searchbarStore's asset state variables
function removeUserInput() {
  if (searchbarStore.searchbarState.searchString.length > 0) {
    resetFetch()
    searchbarStore.searchbarState.searchString = ''
    userInput.value = ''
    inputIcon.value = IconInputSearch
    searchbarStore.searchbarState.searchbarLoadingFlag = false
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
  // Abort the previous fetch and reset the asset searchbarStore state variables
  resetFetch()

  // Always update the search string of the asset searchbarStore
  searchbarStore.searchbarState.searchString = searchValue

  inputIcon.value = searchValue.length > 0 ? IconRemoveValue : IconInputSearch

  // Ensure to only make request, if the user input is greater than three characters
  if (searchValue.length < 3) {
    searchbarStore.searchbarState.searchbarLoadingFlag = false
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
    await AssetService.fetchPublicAssets(searchValue, abortController.value)
      .then((results) => {
        searchbarStore.searchbarState.searchbarLoadingFlag = false
        searchbarStore.searchbarState.searchbarResultCount = results.length
        searchbarStore.searchbarState.searchbarAssets = results
      })
      .catch((error) => handleErrorResponseStatus(error))
  }, 500)
}

/**
 * Abort the previous fetch and reset the asset searchbarStore state variables
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
  searchbarStore.searchbarState.searchbarAssets = [] as PublicAsset[]
  searchbarStore.searchbarState.searchbarResultCount = 0
  searchbarStore.searchbarState.searchbarLoadingFlag = true
}
</script>

<style lang="scss">
header input {
  text-align: left;
  padding-left: $base-margin;
}

.input-wrapper svg {
  @include absolute-right-center-y;
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
