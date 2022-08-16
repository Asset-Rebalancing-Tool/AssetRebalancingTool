<template>
  <div
    class="modal-underlay"
    :class="{ active: assetStore.activeModalUnderlay }"
    @click="hideModalUnderlay"
  ></div>
</template>

<script lang="ts" setup>
import { useAssetStore } from '@/stores/AssetStore'
const assetStore = useAssetStore()

// Hide the modal underlay when focussing the searchbar
const hideModalUnderlay = () => {
  assetStore.activeModalUnderlay = false
}
</script>
