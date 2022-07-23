<template>
  <section id="asset-tab">

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
import AssetSearchbar from '@/components/tab/asset/searchbar/AssetSearchbar'
import ActionButtons  from '@/components/tab/asset/searchbar/ActionButtons'
import TableFilters   from '@/components/tab/asset/searchbar/TableFilters'
import AssetGroup     from '@/components/tab/asset/row/AssetGroup'
import AssetFooter    from '@/components/tab/asset/row/AssetFooter'

import { useAssetStore } from '@/stores/AssetStore'

export default {
  name: 'AssetTab',
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
  #asset-tab {
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