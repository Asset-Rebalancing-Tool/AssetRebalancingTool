<template>
  <div
    class="searchbar-content-wrapper"
    :class="{ active: assetStore.activeModalUnderlay }"
  >
    <div class="searchbar-label-grid">
      <p>Ergebnisse ({{ resultCount }})</p>
    </div>
    <SearchbarAsset
      v-for="asset in fetchedAssets"
      :key="asset.uuid"
      :thisAsset="asset"
    />
    <div class="divider"></div>
    <SearchbarFooter />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, watch } from 'vue'
import type { PropType } from 'vue'
import type { IPublicAsset } from '@/models/IPublicAsset'
import { useAssetStore } from '@/stores/AssetStore'
import SearchbarAsset from '@/components/asset/searchbar/SearchbarAsset.vue'
import SearchbarFooter from '@/components/asset/searchbar/SearchbarFooter.vue'

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
})

watch(() => props.fetchedAssets, (first, second) => {
  console.log(
      "Watch props.selected function called with args:",
      first,
      second
  );
});
</script>

<!-- not scoped -->
<style lang="scss">
@import 'src/assets/scss/components/asset/searchbar/searchbar-content-wrapper.scss';
</style>
