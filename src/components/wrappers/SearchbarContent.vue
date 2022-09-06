<template>
  <div
    class="searchbar-content-wrapper"
    :class="{ active: store.activeModalUnderlay }"
  >
    <div class="public-asset-container">
      <div class="searchbar-label-grid">
        <p>Ergebnisse ({{ store.searchbarResultCount }})</p>
        <p v-show="showPriceLabel">Kurswert (YTD)</p>
      </div>

      <SearchbarAsset
        v-for="asset in store.searchbarAssets"
        :key="asset.uuid"
        :this-asset="asset"
        @click="newPublicHoldingAction(asset.uuid)"
      />

      <SearchbarSkeleton
        v-show="store.searchbarLoadingFlag"
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
import SearchbarAsset from '@/components/wrappers/PublicAsset.vue'
import SearchbarSkeleton from '@/components/wrappers/SearchbarSkeleton.vue'
import SearchbarFooter from '@/components/wrappers/SearchbarFooter.vue'
import { hideModalUnderlay } from '@/composables/UseModalUnderlay'
import type { PublicAsset } from '@/models/PublicAsset'
import type { PublicHoldingRequest } from '@/requests/PublicHoldingRequest'
import { getAuthorizedInstance } from '@/services/TokenService'
import axios from 'axios'
import type { PublicHolding } from '@/models/PublicHolding'

const store = useAssetStore()

const showPriceLabel = computed(() => {
  return store.searchbarLoadingFlag || store.searchbarAssets.length > 0
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
        store.publicHoldings.push(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  })
}
</script>
