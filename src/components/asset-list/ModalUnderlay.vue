<template>
  <div
    class="modal-underlay"
    :class="{ active: assetStore.activeModalUnderlay }"
    @click="hideModalUnderlay"
  ></div>
</template>

<script lang="ts" setup>
import { useAssetStore } from '@/stores/AssetStore'
import { hideModalUnderlay } from '@/composables/modalOverlay'

const assetStore = useAssetStore()
</script>
