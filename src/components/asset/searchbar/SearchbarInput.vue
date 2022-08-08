<template>
  <label>
    <input
      type="text"
      placeholder="Nach Asset suchen (Bezeichnung, WKN oder ISIN)"
      @focusin="toggleModalUnderlay"
      @focusout="toggleModalUnderlay"
      @input="fetchPublicAssets($event.target.value)"
    />
    <span class="icon"></span>
    <SearchbarContentWrapper :fetchedAssets="assets" />
  </label>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useAssetStore } from '@/stores/AssetStore'
  import SearchbarContentWrapper from './SearchbarContentWrapper.vue'
  import AssetService from '@/services/AssetService'

  const assetStore = useAssetStore()
  let assets = []

  // Show or hide the modal underlay when focussing the searchbar
  const toggleModalUnderlay = () => {
    assetStore.activeModalUnderlay = (!assetStore.activeModalUnderlay)
  }

  // Asynchronously fetch assets based on the users input
  const fetchPublicAssets = async (searchValue: String) => {
    let response = await AssetService.searchAssets(searchValue);
    assets = ref(response)
  }
</script>

<style lang="scss" scoped>
  @import 'src/assets/scss/components/asset/searchbar/searchbar-input.scss';
</style>
