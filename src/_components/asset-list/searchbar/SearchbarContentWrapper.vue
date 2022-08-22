<template>
  <div
    class="searchbar-content-wrapper"
    :class="{ active: assetStore.activeModalUnderlay }"
  >
    <div class="searchbar-asset-container">
      <div class="searchbar-label-grid">
        <p>Ergebnisse ({{ resultCount }})</p>
      </div>

      <SearchbarAsset
        v-for="asset in fetchedAssets"
        :key="asset.uuid"
        :this-asset="asset"
      />

      <SearchbarSkeleton v-show="isLoading" v-for="index in 5" :key="index" />
    </div>

    <div class="divider"></div>
    <SearchbarFooter />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { IPublicAsset } from '@/models/IPublicAsset'
import { useAssetStore } from '@/stores/AssetStore'
import SearchbarAsset from '@/components/asset-list/searchbar/SearchbarAsset.vue'
import SearchbarFooter from '@/components/asset-list/searchbar/SearchbarFooter.vue'
import SearchbarSkeleton from '@/components/asset-list/searchbar/SearchbarSkeleton.vue'

const assetStore = useAssetStore()

const props = defineProps({
  fetchedAssets: {
    type: Array as PropType<IPublicAsset[]>,
    required: true,
  },
  resultCount: {
    type: Number,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
})
</script>

<!-- not scoped -->
<style lang="scss">
@import 'src/assets/scss/components/asset/searchbar/searchbar-content-wrapper.scss';
</style>
