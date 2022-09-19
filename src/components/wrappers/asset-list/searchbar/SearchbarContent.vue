<template>
  <div
    class="searchbar-content-wrapper"
    :class="{ active: showContentWrapper }"
  >
    <div class="public-asset-container">
      <div class="searchbar-label-grid">
        <p>Ergebnisse ({{ searchbarResults }})</p>
        <p v-show="showPriceLabel">Kurswert (YTD)</p>
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
import { AssetListEntryTypeEnum } from '@/models/enums/AssetListEntryTypeEnum'
import type { AssetListEntry } from '@/models/holdings/AssetListEntry'

const store = useAssetStore()

const showContentWrapper = computed(() => store.searchbarState.activeModalUnderlay)
const searchbarResults = computed(() => store.searchbarState.searchbarResultCount)
const searchbarAssets = computed(() => store.searchbarState.searchbarAssets)
const showSkeletonAnimation = computed(() => store.searchbarState.searchbarLoadingFlag)

const showPriceLabel = computed(() => {
  return store.searchbarState.searchbarLoadingFlag || store.searchbarState.searchbarAssets.length > 0
})

async function newPublicHoldingAction(uuid: string) {
  // Hide the modal underlay, no matter what creation will be fired
  hideModalUnderlay()
  const asset: PublicAsset = store.getSearchbarAsset(uuid)
  const request = { publicAssetUuid: asset.uuid } as PublicHoldingRequest
  await getAuthorizedInstance().then((instance) => {
    instance
      .post<PublicHolding>('/holding_api/asset_holding/public', request)
      .then((result) => {
        store.listState.assetListEntries.push({
          uuid: result.data.uuid,
          entryType: AssetListEntryTypeEnum.PUBLIC_HOLDING,
          publicHolding: result.data,
        } as AssetListEntry)
      })
      .catch((error) => handleErrorResponseStatus(error.response.status))
  })
}
</script>
