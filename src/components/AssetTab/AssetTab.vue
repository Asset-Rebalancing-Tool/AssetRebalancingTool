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
import AssetSearchbar from '@/components/AssetTab/Searchbar/AssetSearchbar'
import ActionButtons  from '@/components/AssetTab/Searchbar/ActionButtons'
import AssetGroup     from '@/components/AssetTab/AssetRow/AssetGroup'

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
  @import "../../css/AssetTab/asset-tab.css";
</style>