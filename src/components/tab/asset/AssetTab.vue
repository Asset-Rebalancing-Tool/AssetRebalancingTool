<template>
  <section id="asset-tab">

    <header>
      <AssetSearchbar />
      <ActionButtons />
    </header>

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
import AssetGroup     from '@/components/tab/asset/row/AssetGroup'

import { useAssetStore } from '@/stores/AssetStore'

export default {
  name: 'AssetTab',
  components: {
    AssetSearchbar,
    ActionButtons,
    AssetGroup,
  },
  setup() {
    const assetStore = useAssetStore()
    return {
      assetStore
    }
  }
}
</script>

<style>
  @import "../../../assets/css/tab/asset/asset-tab.css";
</style>