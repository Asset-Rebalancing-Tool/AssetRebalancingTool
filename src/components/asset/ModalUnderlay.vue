<template>
  <div
    class="modal-underlay"
    :class="{ active: assetStore.activeModalUnderlay }"
  ></div>
</template>

<script lang="ts" setup>
  import { useAssetStore } from '@/stores/AssetStore'
  const assetStore = useAssetStore()
</script>
