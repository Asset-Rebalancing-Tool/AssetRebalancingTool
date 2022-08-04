<template>
  <section id="asset-list">
    <AssetRow
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
import AssetRow from '../components/asset/row/AssetRow.vue'
import AssetListFooter from '../components/asset/row/AssetListFooter.vue'
import type { IOwnedPublicAssets } from '@/models/IOwnedPublicAssets'

export default defineComponent({
  name: 'AssetList',
  components: {
    AssetSearchbar,
    ActionButtons,
    TableFilters,
    AssetGroup,
    AssetRow,
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
