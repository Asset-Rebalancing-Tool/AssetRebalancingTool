<template>
  <div
    class="asset-group-container"
    :class="{
      'empty-group': emptyGroupClass,
      selected: isSelectedGroup,
    }"
  >
    <button v-if="isEmptyGroup">+</button>

    <AssetRow
      v-for="asset in relatedAssets"
      :key="asset.uuid"
      :thisAsset="asset"
      @click="
        assetStore.toggleIsSelectedFlag(asset.uuid, asset.relatedGroupUuid)
      "
    />

    <TargetPercentageGrouping :assets="relatedAssets"/>

    <AssetGroupFooter :thisGroup="thisGroup" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import type { PropType } from 'vue'
import type { IOwnedPublicAssets } from '@/models/old/IOwnedPublicAssets'
import type { IOwnedPrivateGroup } from '@/models/old/IOwnedPrivateGroup'
import AssetRow from '../row/AssetRow.vue'
import TargetPercentageGrouping from '../row/column/TargetPercentageGrouping.vue'
import AssetGroupFooter from './AssetGroupFooter.vue'

export default defineComponent({
  name: 'AssetGroup',
  components: {
    AssetRow,
    AssetGroupFooter,
    TargetPercentageGrouping
  },
  props: {
    thisGroup: {
      type: Object as PropType<IOwnedPrivateGroup>,
      required: true,
    },
  },
  computed: {
    // Returns a bool that indicates if the assets object is empty or not
    isEmptyGroup(): boolean {
      return this.thisGroup.relatedAssetsUuidArray.length === 0
    },

    // Render the selected class based in the groups isSelected flag
    isSelectedGroup(): string {
      return this.thisGroup.isSelected ? 'selected' : ''
    },

    // Render the empty-group class based on the isEmptyGroup bool
    emptyGroupClass(): string {
      return this.isEmptyGroup ? 'empty-group' : ''
    },

    // Get an object of all assets, that are nested in that group
    relatedAssets(): IOwnedPublicAssets {
      return this.assetStore.getAssetsByGroupUuid(this.thisGroup.uuid)
    }
  },
  setup() {
    const assetStore = useAssetStore()
    return {
      assetStore,
    }
  }
})
</script>
