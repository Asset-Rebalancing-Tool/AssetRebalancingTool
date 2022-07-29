<template>
  <section id="asset-list">

    <header>
      <AssetSearchbar />
      <ActionButtons />
    </header>

    <TableFilters />

    <AssetGroup
        v-for="group in assetStore.groupListObject"
        :key="group.id"
        :thisGroup="group"
        @click="assetStore.toggleIsSelectedFlag(group.id, 'groupList')"
    />

    <AssetContainer
        v-for="asset in singleAssets"
        :key="asset.id"
        :thisAsset="asset"
        @click="assetStore.toggleIsSelectedFlag(asset.id, 'assetList')"
    />

    <AssetFooter />

  </section>
</template>

<script>
import AssetSearchbar from '@/components/asset/searchbar/AssetSearchbar'
import ActionButtons  from '@/components/asset/searchbar/ActionButtons'
import TableFilters   from '@/components/asset/searchbar/TableFilters'
import AssetGroup     from '@/components/asset/row/AssetGroup'
import AssetContainer from '@/components/asset/row/AssetContainer'
import AssetFooter    from '@/components/asset/row/AssetFooter'

import { useAssetStore } from '@/stores/AssetStore'

export default {
  name: 'AssetList',
  components: {
    AssetSearchbar,
    ActionButtons,
    TableFilters,
    AssetGroup,
    AssetContainer,
    AssetFooter
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
}
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