<template>
  <div class="button-wrapper" :class="activeActionButtons">
    <div class="button">
      <div class="icon edit"></div>
    </div>
    <div class="button group">
      <div class="icon group"></div>
      <div class="icon arrow-down"></div>
    </div>
    <div class="button">
      <div class="icon delete"></div>
    </div>
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
