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
    <GroupContextMenu :showWrapper="assetStore.showGroupWrapper" />
    <button
      :class="atLeastOneSelected"
      @click="assetStore.removeAllSelectedAssets"
    >
      <span class="icon delete"></span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import GroupContextMenu from '../context-menu/GroupContextMenu.vue'

export default defineComponent({
  name: 'ActionButtons',
  components: {
    GroupContextMenu,
  },
  setup() {
    const assetStore = useAssetStore()
    return {
      assetStore,
    }
  },
  data() {
    return {
      showGroupWrapper: false,
    }
  },
  computed: {
    oneSelected(): string {
      return this.assetStore.selectedAssetCount === 1 ? 'active' : ''
    },
    atLeastOneSelected(): string {
      return this.assetStore.selectedAssetCount >= 1 ? 'active' : ''
    },
  },
  methods: {
    toggleGroupWrapper(): void {
      this.assetStore.showGroupWrapper = !this.assetStore.showGroupWrapper
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/components/asset/action-buttons/action-buttons';
</style>
