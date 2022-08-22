<template>
  <div class="button-wrapper">
    <button :class="oneSelected">
      <span class="icon edit"></span>
    </button>
    <button
      class="group"
      :class="{
        active: atLeastOneSelected,
        highlighted: assetStore.showGroupWrapper,
      }"
      @click="toggleGroupWrapper"
    >
      <span class="icon group"></span>
      <span class="icon arrow-down"></span>
    </button>
    <!-- Context menu should not be the last element in the button-wrapper, to ensure the :last-child selector is working on the button -->
    <GroupContextMenu :show-wrapper="assetStore.showGroupWrapper" />
    <button
      :class="atLeastOneSelected"
      @click="assetStore.removeAllSelectedAssets"
    >
      <span class="icon delete"></span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import GroupContextMenu from '../context-menu/GroupContextMenu.vue'

const assetStore = useAssetStore()

// Render the action button active class, if exactly one asset is selected
const oneSelected = computed(() => {
  return assetStore.selectedAssetCount === 1 ? 'active' : ''
})

// Render the action button active class, if at least one asset is selected
const atLeastOneSelected = computed(() => {
  return assetStore.selectedAssetCount >= 1 ? 'active' : ''
})

// Toggle the group wrapper boolean in order to display or hide the group wrapper
const toggleGroupWrapper = () => {
  assetStore.showGroupWrapper = !assetStore.showGroupWrapper
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/components/asset/action-buttons/action-buttons';
</style>
