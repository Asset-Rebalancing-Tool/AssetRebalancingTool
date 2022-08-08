<template>
  <div class="asset-row" :class="selectedAsset">
    <div class="asset-logo"></div>

    <InfoColumn
      :name="thisAsset.name"
      :type="thisAsset.type"
      :isin="thisAsset.isin"
    />

    <SingleValue
      :graph="thisAsset.graph"
      :valueArray="priceArray"
      :unit="thisAsset.currency"
    />

    <ColumnInput
      :inputValue="thisAsset.shares"
      :unit="'Stk.'"
      @click="$event.stopPropagation()"
    />

    <ActualValueColumn
      :value="thisAsset.actualValue"
      :percentage="thisAsset.actualPercentage"
      :currency="thisAsset.currency"
    />

    <ColumnInput
      :inputValue="thisAsset.targetPercentage"
      :unit="'%'"
      @click="$event.stopPropagation()"
    />

    <SingleValue :arrow="'up'" :valueArray="deviationArray" :unit="'%'" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import type { PropType } from 'vue'
import type { IOwnedPublicAsset } from '@/models/old/IOwnedPublicAsset'
import InfoColumn from './column/InfoColumn.vue'
import SingleValue from './column/SingleValue.vue'
import ActualValueColumn from './column/ActualValueColumn.vue'
import ColumnInput from './column/ColumnInput.vue'

const assetStore = useAssetStore()

const props = defineProps({
  thisAsset: {
    type: Object as PropType<IOwnedPublicAsset>,
    required: true,
  }
})

// Set the selected flag of an asset
const selectedAsset = computed(() => {
  return props.thisAsset.isSelected ? 'selected' : ''
})

// Get an array that contains the exploded strings of a price record
const priceArray = computed(() => {
  return assetStore.getValueArray(props.thisAsset.stockPrice)
})

// Get an array that contains the exploded strings of a deviation record
const deviationArray = computed(() => {
  return assetStore.getValueArray(props.thisAsset.deviation)
})
</script>

<style lang="scss">
@import '@/assets/scss/components/asset/row/_asset-row.scss';
</style>
