<template>
  <section id="asset-tab">

    <header>
      <AssetSearchbar />
      <ActionButtons />
    </header>

    <AssetContainer
        @click="selectAsset(asset)"
        v-for="asset in assetStore.assets"
        :key="asset.tickerSymbol"
        :asset="asset" />

  </section>
</template>

<script>
import AssetSearchbar from '@/components/AssetTab/Searchbar/AssetSearchbar'
import ActionButtons  from '@/components/AssetTab/Searchbar/ActionButtons'
import AssetContainer from '@/components/AssetTab/AssetRow/AssetContainer'
import { useAssetStore } from '@/stores/AssetStore'

export default {
  name: 'AssetTab',
  components: {
    AssetSearchbar,
    ActionButtons,
    AssetContainer
  },
  setup() {
    const assetStore = useAssetStore()
    return {
      assetStore
    }
  },
  methods: {
    selectAsset(thisAsset) {
      this.assetStore.selectedAsset(thisAsset);
    }
  }
}
</script>

<style>
  @import "../../css/asset-tab.css";
</style>