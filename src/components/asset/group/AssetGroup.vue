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

    <TargetPercentageGrouping :assets="relatedAssets" />

    <AssetGroupFooter :thisGroup="thisGroup" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import type { PropType } from 'vue'
import type { IOwnedPrivateGroup } from '@/models/old/IOwnedPrivateGroup'
import AssetRow from '../row/AssetRow.vue'
import TargetPercentageGrouping from '../row/column/TargetPercentageGrouping.vue'
import AssetGroupFooter from './AssetGroupFooter.vue'

const assetStore = useAssetStore()

const props = defineProps({
  thisGroup: {
    type: Object as PropType<IOwnedPrivateGroup>,
    required: true,
  }
})

// Returns a bool that indicates if the assets object is empty or not
const isEmptyGroup = computed(() => {
  return props.thisGroup.relatedAssetsUuidArray.length === 0
})

// Render the selected class based in the groups isSelected flag
const isSelectedGroup = computed(() => {
  return props.thisGroup.isSelected ? 'selected' : ''
})

// Render the empty-group class based on the isEmptyGroup bool
const emptyGroupClass = computed(() => {
  return isEmptyGroup ? 'empty-group' : ''
})

// Get an object of all assets, that are nested in that group
const relatedAssets = computed(() => {
  return assetStore.getAssetsByGroupUuid(this.thisGroup.uuid)
})
</script>
