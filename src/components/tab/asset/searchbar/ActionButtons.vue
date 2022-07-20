<template>
  <div class="button-wrapper" :class="activeActionButtons">
    <button class="button">
      <span class="icon edit"></span>
    </button>
    <button class="button group">
      <span class="icon group"></span>
      <span class="icon arrow-down"></span>
    </button>
    <button class="button">
      <span class="icon delete"></span>
    </button>
  </div>
</template>

<script>

import { useAssetStore } from '@/stores/AssetStore'

export default {
  name: 'ActionButtons',
  data() {
    return {
      isActive: true
    }
  },
  computed: {
    // Returns a class that is used to highlight the button wrapper, if at least one asset is selected
    activeActionButtons() {
      return (this.assetStore.actionButtonsAreActive) ? 'active' : ''
    }
  },
  setup() {
    const assetStore = useAssetStore()
    return {
      assetStore
    }
  },
}
</script>

<style>
  @import "src/assets/css/tab/asset/action-buttons.css";
</style>