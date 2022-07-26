<template>
  <section id="asset-list">

    <header>
      <AssetSearchbar />
      <ActionButtons />
    </header>

    <TableFilters />

    <AssetGroup
        v-for="group in assetStore.assetGroups"
        :key="group.groupKey"
        :thisGroup="group"
    />

    <AssetFooter />

  </section>
</template>

<script>
import AssetSearchbar from '@/components/asset/searchbar/AssetSearchbar'
import ActionButtons  from '@/components/asset/searchbar/ActionButtons'
import TableFilters   from '@/components/asset/searchbar/TableFilters'
import AssetGroup     from '@/components/asset/row/AssetGroup'
import AssetFooter    from '@/components/asset/row/AssetFooter'

import { useAssetStore } from '@/stores/AssetStore'

export default {
  name: 'AssetList',
  components: {
    AssetSearchbar,
    ActionButtons,
    TableFilters,
    AssetGroup,
    AssetFooter
  },
  setup() {
    const assetStore = useAssetStore()
    return { assetStore }
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