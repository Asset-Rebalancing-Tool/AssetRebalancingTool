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

  </section>
</template>

<script>
import AssetSearchbar from '@/components/tab/asset/searchbar/AssetSearchbar'
import ActionButtons  from '@/components/tab/asset/searchbar/ActionButtons'
import TableFilters    from '@/components/tab/asset/searchbar/TableFilters'
import AssetGroup     from '@/components/tab/asset/row/AssetGroup'

import { useAssetStore } from '@/stores/AssetStore'

export default {
  name: 'AssetTab',
  components: {
    AssetSearchbar,
    ActionButtons,
    TableFilters,
    AssetGroup
  },
  setup() {
    const assetStore = useAssetStore()
    return { assetStore }
  }
}
</script>

<style scoped>
  #asset-tab {
    width: 100%;
    padding: 25px;
  }

  header {
    display: flex;
    column-gap: 25px;
    margin-bottom: 25px;
  }
</style>