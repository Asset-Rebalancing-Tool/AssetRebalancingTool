<template>
  <section id="asset-tab">

    <header>
      <AssetSearchbar />
      <ActionButtons />
    </header>

    <AssetContainer />
  </section>
</template>

<script>
import AssetSearchbar from '@/components/AssetTab/AssetSearchbar'
import ActionButtons  from '@/components/AssetTab/ActionButtons'
import AssetContainer from '@/components/AssetTab/AssetContainer'

export default {
  name: 'AssetTab',
  components: {
    AssetSearchbar,
    ActionButtons,
    AssetContainer
  }
}
</script>

<style>
  @import "../../css/asset-tab.css";
</style>