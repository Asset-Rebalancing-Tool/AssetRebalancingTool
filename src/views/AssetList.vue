<template>
  <section id="asset-list">
    <AssetContainer
        v-for="asset in singleAssets"
        :key="asset.uuid"
        :thisAsset="asset"
        @click="assetStore.toggleIsSelectedFlag(asset.uuid, asset.relatedGroupUuid)"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'

import AssetSearchbar from '../components/asset/searchbar/AssetSearchbar.vue'
import ActionButtons from '../components/asset/searchbar/ActionButtons.vue'
import TableFilters from '../components/asset/searchbar/TableFilters.vue'
import AssetGroup from '../components/asset/row/AssetGroup.vue'
import AssetContainer from '../components/asset/row/AssetContainer.vue'
import AssetListFooter from '../components/asset/row/AssetListFooter.vue'
import type { IOwnedPublicAssets } from '@/models/IOwnedPublicAssets'

export default defineComponent({
  name: 'AssetList',
  components: {
    AssetSearchbar,
    ActionButtons,
    TableFilters,
    AssetGroup,
    AssetContainer,
    AssetListFooter,
  },
  setup() {
    const assetStore = useAssetStore()
    return { assetStore }
  },
  computed: {
    singleAssets(): IOwnedPublicAssets {
      return this.assetStore.getAssetsWithoutGroup()
    },
  },
})
</script>

<style lang="scss">
  @import "@/assets/scss/components/_asset-list.scss";
</style>
