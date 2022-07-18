<template>
  <section id="asset-tab">

    <header>
      <AssetSearchbar />
      <ActionButtons />
    </header>

    <AssetContainer
        v-for="asset in assetList"
        :key="asset.tickerSymbol"
        :asset="asset" />

  </section>
</template>

<script>
import AssetSearchbar from '@/components/AssetTab/Searchbar/AssetSearchbar'
import ActionButtons  from '@/components/AssetTab/Searchbar/ActionButtons'
import AssetContainer from '@/components/AssetTab/AssetRow/AssetContainer'

export default {
  name: 'AssetTab',
  components: {
    AssetSearchbar,
    ActionButtons,
    AssetContainer
  },
  props: [
      'assetList'
  ]
}
</script>

<style>
  @import "../../css/asset-tab.css";
</style>