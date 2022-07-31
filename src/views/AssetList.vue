<template>
  <section id="asset-list">

    <header>
      <AssetSearchbar />
      <ActionButtons />
    </header>

    <TableFilters />

    <AssetGroup
        v-for="group in assetStore.listOfGroups"
        :key="group.id"
        :thisGroup="group"
    />

    <AssetContainer
        v-for="asset in singleAssets"
        :key="asset.id"
        :thisAsset="asset"
        @click="assetStore.toggleIsSelectedFlag(asset.id, asset.relatedGroupId)"
    />

    <AssetListFooter />

  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAssetStore }   from '@/stores/AssetStore'

import AssetSearchbar  from '../components/asset/searchbar/AssetSearchbar.vue'
import ActionButtons   from '../components/asset/searchbar/ActionButtons.vue'
import TableFilters    from '../components/asset/searchbar/TableFilters.vue'
import AssetGroup      from '../components/asset/row/AssetGroup.vue'
import AssetContainer  from '../components/asset/row/AssetContainer.vue'
import AssetListFooter from '../components/asset/row/AssetListFooter.vue'

export defineComponent({
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
    singleAssets() {
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
