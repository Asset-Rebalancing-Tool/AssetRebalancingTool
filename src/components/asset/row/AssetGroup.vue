<template>
  <div class="asset-group-container" :class="{'empty-group': emptyGroupClass, 'selected': isSelectedGroup }">
    <button v-if="isEmptyGroup" class="empty-group-button">+</button>
    <div class="asset-wrapper">
      <AssetContainer
            v-for="asset in relatedAssets"
            :key="asset.id"
            :thisAsset="asset"
            @click="assetStore.toggleIsSelectedFlag(asset.id, asset.relatedGroupId)"
      />
    </div>
    <AssetGroupFooter :thisGroup="thisGroup" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAssetStore }   from '@/stores/AssetStore'

import AssetContainer   from './AssetContainer.vue'
import AssetGroupFooter from './AssetGroupFooter.vue';

export default defineComponent({
  name: 'AssetGroup',
  components: {
    AssetGroupFooter,
    AssetContainer,
  },
  props: {
    thisGroup: {
      type: Object,
      required: true
    }
  },
  computed: {

    // Returns a bool that indicates if the assets object is empty or not
    isEmptyGroup() {
      return (this.thisGroup.relatedAssetsIdArray.length === 0)
    },

    // Render the selected class based in the groups isSelected flag
    isSelectedGroup() {
      return (this.thisGroup.isSelected) ? 'selected' : ''
    },

    // Render the empty-group class based on the isEmptyGroup bool
    emptyGroupClass() {
      return (this.isEmptyGroup) ? 'empty-group' : ''
    },

    // Get an object of all assets, that are nested in that group
    relatedAssets() {
      return this.assetStore.getAssetsByGroupId(this.thisGroup.id)
    }
  },
  setup() {
    const assetStore = useAssetStore()
    return {
      assetStore
    }
  }
})
</script>

<!-- not scoped -->
<style>
  .asset-group-container {
    width: 100%;
    margin-bottom: 15px;
  }

  .asset-group-container.selected {
    border-radius: var(--primary-border-radius);
    outline: 1px solid var(--main-color);
    outline-offset: -1px;
  }

  .asset-group-container .asset-container.selected {
    outline: none;
    outline-offset: 0;
    box-shadow: none;
  }

  .asset-group-container .asset-container {
    margin-bottom: -1px; /* easier than decreasing the inner borders */
  }

  .asset-wrapper .asset-container:first-child {
    border-radius: var(--primary-border-radius) var(--primary-border-radius) 0 0;
  }

  .asset-wrapper .asset-container:last-child {
    border-radius: 0;
  }

  .asset-group-container.empty-group {
    outline: 1px solid var(--passive-border-color);
    border-radius: var(--primary-border-radius);
    background-color: var(--secondary-background-color);
  }

  .empty-group-button {
    width: calc(100% - 5px);
    height: calc(var(--asset-row-height) - 5px);
    margin: 2.5px;
    background-color: var(--primary-infill-color);
    border-radius: var(--primary-border-radius);
    border-style: dotted;
    border-color: var(--passive-border-color);
    font-size: 20px;
    color: var(--secondary-text-color);
    cursor: pointer;
  }
</style>
