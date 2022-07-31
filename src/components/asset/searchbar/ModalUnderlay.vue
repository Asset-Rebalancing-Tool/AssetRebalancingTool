<template>
  <div class="modal-underlay" :class="{'active': assetStore.activeModalUnderlay}"></div>
</template>

<script>
import {useAssetStore} from '@/stores/AssetStore';

export default {
  name: 'ModalUnderlay',
  setup() {
    const assetStore = useAssetStore()
    return {
      assetStore
    }
  }
}
</script>

<style scoped>
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
  opacity: 0.45;
  pointer-events: all;
}

</style>