<template>
  <div
    class="searchbar-content-wrapper"
    :class="{ active: store.activeModalUnderlay }"
  >
    <div class="searchbar-asset-container">
      <div class="searchbar-label-grid">
        <p>Ergebnisse ({{ store.searchbarResultCount }})</p>
        <p v-show="showPriceLabel">Kurswert (YTD)</p>
      </div>

      <SearchbarAsset
        v-for="asset in store.searchbarAssets"
        :key="asset.uuid"
        :this-asset="asset"
        @click="newAssetAction(asset.uuid)"
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
import { computed } from 'vue';
import { useAssetStore } from '@/stores/AssetStore'
import SearchbarAsset from '@/components/wrappers/SearchbarAsset.vue'
import SearchbarSkeleton from '@/components/wrappers/SearchbarSkeleton.vue'
import SearchbarFooter from '@/components/wrappers/SearchbarFooter.vue'
import { hideModalUnderlay } from "@/composables/UseModalUnderlay";
import type {IPublicAsset} from "@/models/IPublicAsset";
import type { PostPublicAssetHolding } from "@/requests/PostPublicAssetHolding";
import { getToken } from "@/composables/getToken";
import axios from "axios";
import type {IPublicAssetHolding} from "@/models/IPublicAssetHolding";

const store = useAssetStore()

const showPriceLabel = computed(() => {
  return store.searchbarLoadingFlag || store.searchbarAssets.length > 0
})


async function newAssetAction(uuid: string) {
  // Hide the modal underlay, no matter what creation will be fired
  hideModalUnderlay()
  let asset: IPublicAsset = store.getSearchbarAsset(uuid)
  let request = { publicAssetUuid: asset.uuid } as PostPublicAssetHolding

  await getToken().then(token => {
    axios.post<IPublicAssetHolding>('/holding_api/asset_holding/public', request, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(result => {
      store.publicAssetHoldings.push(result.data)
    }).catch(error => {
      console.log(error)
    })
  })

}
</script>
