<template>
  <div
    class="modal-underlay"
    :class="{ active: store.activeModalUnderlay }"
    @click="hideModalUnderlay"
  ></div>
</template>

<script lang="ts" setup>
import { useAssetStore } from '@/stores/AssetStore'
import { hideModalUnderlay } from '@/composables/UseModalUnderlay'
const store = useAssetStore()
</script>

<style>
.modal-underlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  opacity: 0;
  z-index: 10;
  pointer-events: none;
  transition: 200ms ease-out;
}

.modal-underlay.active {
  opacity: 0.6;
  pointer-events: all;
}
</style>
