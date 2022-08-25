<template>
  <div
    class="searchbar-content-wrapper"
    :class="{ active: store.activeModalUnderlay }"
  >
    <div class="searchbar-asset-container">
      <div class="searchbar-label-grid">
        <p>Ergebnisse ({{ store.searchbarResultCount }})</p>
        <p v-show="showPriceLabel">Kurswert</p>
      </div>

      <SearchbarAsset
        v-for="asset in store.searchbarAssets"
        :key="asset.uuid"
        :this-asset="asset"
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

const store = useAssetStore()

const showPriceLabel = computed(() => {
  return store.searchbarLoadingFlag || store.searchbarAssets.length > 0
})
</script>
