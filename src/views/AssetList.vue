<template>
  <section id="asset-list">

    <header>
      <AssetSearchbar />
      <ActionButtons />
    </header>

    <TableFilters />

    <AssetGroup
        v-for="group in assetStore.ownedGroups"
        :key="group.uuid"
        :thisGroup="group"
    />

    <AssetContainer
        v-for="asset in singleAssets"
        :key="asset.uuid"
        :thisAsset="asset"
        @click="assetStore.toggleIsSelectedFlag(asset.uuid, asset.relatedGroupUuid)"
    />

    <AssetListFooter />

  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAssetStore }   from '@/stores/AssetStore'

import AssetSearchbar   from '../components/asset/searchbar/AssetSearchbar.vue'
import ActionButtons    from '../components/asset/searchbar/ActionButtons.vue'
import TableFilters     from '../components/asset/searchbar/TableFilters.vue'
import AssetGroup       from '../components/asset/row/AssetGroup.vue'
import AssetContainer   from '../components/asset/row/AssetContainer.vue'
import AssetListFooter  from '../components/asset/row/AssetListFooter.vue'
import { IOwnedAssets } from "@/models/IOwnedAssets";

export default defineComponent({
  name: 'AssetList',
  components: {
    AssetSearchbar,
    ActionButtons,
    TableFilters,
    AssetGroup,
    AssetContainer,
    AssetListFooter
  },
  setup() {
    const assetStore = useAssetStore()
    return { assetStore }
  },
  computed: {
    singleAssets(): IOwnedAssets {
      return this.assetStore.getAssetsWithoutGroup()
    }
  }
})
</script>

<style scoped>
  #asset-list {
    position: relative;
    width: 100%;
    padding: 25px;
  }

  header {
    display: flex;
    column-gap: 25px;
    margin-bottom: 25px;
  }
</style>
