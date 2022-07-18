<template>
  <div class="button-wrapper" :class="(assetStore.actionButtonsAreActive) ? 'active' : ''">
    <div class="button">
      <div class="icon edit"></div>
    </div>
    <div class="button group">
      <div class="icon group"></div>
      <div class="icon" :class="(isActive) ? 'arrow-down' : 'arrow-up'"></div>
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
  setup() {
    const assetStore = useAssetStore()
    return {
      assetStore
    }
  },
}
</script>
