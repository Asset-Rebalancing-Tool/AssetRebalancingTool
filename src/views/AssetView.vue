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
import AssetSearchbar from '@/components/asset/searchbar/AssetSearchbar'
import ActionButtons  from '@/components/asset/searchbar/ActionButtons'
import TableFilters   from '@/components/asset/searchbar/TableFilters'
import AssetGroup     from '@/components/asset/row/AssetGroup'
import AssetFooter    from '@/components/asset/row/AssetFooter'
import AssetService   from '@/services/AssetService.js'

import { useAssetStore } from '@/stores/AssetStore'

export default {
  name: 'AssetView',
  components: {
    AssetSearchbar,
    ActionButtons,
    TableFilters,
    AssetGroup,
    AssetFooter
  },
  data() {
    return {
      assets: null
    }
  },
  setup() {
    const assetStore = useAssetStore()
    return { assetStore }
  },
  created() {
    AssetService.getAssets().then(response => {
      this.assets = response.data
    }).catch(error => {
      console.log(error)
    })
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