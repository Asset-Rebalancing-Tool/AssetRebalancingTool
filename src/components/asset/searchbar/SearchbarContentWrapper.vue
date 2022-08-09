<template>
  <div
    class="searchbar-content-wrapper"
    :class="{ active: assetStore.activeModalUnderlay }"
  >
    <div class="searchbar-label-grid">
      <p>Ergebnisse ({{ props.fetchedAssets.length }})</p>
    </div>
    <SearchbarAsset
      v-for="asset in props.fetchedAssets"
      :key="asset.uuid"
      :thisAsset="asset"
    />
    <div class="divider"></div>
    <SearchbarFooter />
  </div>
</template>

<script lang="ts" setup>
import { useAssetStore } from '@/stores/AssetStore'
import SearchbarAsset from '@/components/asset/searchbar/SearchbarAsset.vue'
import SearchbarFooter from '@/components/asset/searchbar/SearchbarFooter.vue'

const assetStore = useAssetStore()
const props = defineProps({
  fetchedAssets: {
    type: Array,
    required: true,
  },
})
</script>

<!-- not scoped -->
<style lang="scss">
@import 'src/assets/scss/components/asset/searchbar/searchbar-content-wrapper.scss';
</style>
