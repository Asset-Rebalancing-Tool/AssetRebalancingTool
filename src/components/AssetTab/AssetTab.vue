<template>
  <section id="asset-tab">

    <header>
      <AssetSearchbar />
      <ActionButtons />
    </header>

    <AssetContainer
        @click="toggleIsSelectedFlag(asset)"
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
    toggleIsSelectedFlag(thisAsset) {
      this.assetStore.toggleIsSelectedFlag(thisAsset);
    }
  }
}
</script>

<style>
  @import "../../css/asset-tab.css";
</style>