<template>
  <div
    class="modal-underlay"
    :class="{ active: activeModalUnderlay }"
    @click="hideModalUnderlay"
  ></div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useSearchStore } from '@/stores/SearchStore'
import { hideModalUnderlay } from '@/composables/UseModalUnderlay'

const store = useSearchStore()

const activeModalUnderlay = computed(() => {
  return store.searchbarState.activeModalUnderlay
})
</script>

<style lang="scss">
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
