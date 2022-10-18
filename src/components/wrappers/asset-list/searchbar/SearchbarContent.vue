<template>
  <div
    class="searchbar-content-wrapper"
    :class="{ active: showContentWrapper }"
  >
    <div class="public-asset-container">
      <div class="searchbar-label-grid">
        <p>{{ $t('assetList.searchbar.results') }} ({{ searchbarResults }})</p>
        <p v-show="showPriceLabel">{{ $t('assetList.tableFilters.price') }}</p>
      </div>

      <SearchbarAsset
        v-for="asset in searchbarAssets"
        :key="asset.uuid"
        :this-asset="asset"
        @click="newPublicHoldingAction(asset.uuid)"
      />

      <SearchbarSkeleton
        v-show="showSkeletonAnimation"
        v-for="index in 5"
        :key="index"
      />
    </div>
    <div class="divider"></div>
    <SearchbarFooter />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useSearchStore } from '@/stores/SearchStore'
import { useAssetStore } from '@/stores/AssetStore'
import SearchbarAsset from '@/components/wrappers/asset-list/searchbar/PublicAsset.vue'
import SearchbarSkeleton from '@/components/wrappers/asset-list/searchbar/SearchbarSkeleton.vue'
import SearchbarFooter from '@/components/wrappers/asset-list/searchbar/SearchbarFooter.vue'
import { hideModalUnderlay } from '@/composables/UseModalUnderlay'
import type { PublicAsset } from '@/models/PublicAsset'
import type { PublicHoldingRequest } from '@/requests/PublicHoldingRequest'
import {
  getAuthorizedInstance,
  handleErrorResponseStatus,
} from '@/services/TokenService'
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import { addPublicHoldingToRenderList } from '@/composables/UseAssetRenderList'
import { addPublicHoldingToPool } from '@/composables/UseAssetPool'

// Initialize stores
const searchbarStore = useSearchStore()
const assetMapStore = useAssetStore()

const showContentWrapper = computed(
  () => searchbarStore.searchbarState.activeModalUnderlay
)
const searchbarResults = computed(
  () => searchbarStore.searchbarState.searchbarResultCount
)
const searchbarAssets = computed(
  () => searchbarStore.searchbarState.searchbarAssets
)
const showSkeletonAnimation = computed(
  () => searchbarStore.searchbarState.searchbarLoadingFlag
)

const showPriceLabel = computed(() => {
  return (
    searchbarStore.searchbarState.searchbarLoadingFlag ||
    searchbarStore.searchbarState.searchbarAssets.length > 0
  )
})

async function newPublicHoldingAction(uuid: string) {
  // Hide the modal underlay, no matter what creation will be fired
  hideModalUnderlay()
  const asset: PublicAsset = searchbarStore.getSearchbarAsset(uuid)
  const request = { publicAssetUuid: asset.uuid } as PublicHoldingRequest
  await getAuthorizedInstance().then((instance) => {
    instance
      .post<PublicHolding>('/holding_api/asset_holding/public', request)
      .then((result) => {
        addPublicHoldingToPool(assetMapStore, result.data)
        addPublicHoldingToRenderList(assetMapStore, result.data)
      })
      .catch((error) => handleErrorResponseStatus(error))
  })
}
</script>
