<template>
  <div class="asset-row" :class="selectedAsset">
    <div class="asset-logo"></div>

    <InfoColumn
      :asset-name="props.thisAsset.name"
      :type="props.thisAsset.type"
      :isin="props.thisAsset.isin"
    />

    <SingleValue
      :graph="props.thisAsset.graph"
      :value-array="priceArray"
      :unit="props.thisAsset.currency"
    />

    <ColumnInput
      :input-value="props.thisAsset.shares"
      :unit="'Stk.'"
      @click="$event.stopPropagation()"
    />

    <ActualValueColumn
      :value="props.thisAsset.actualValue"
      :percentage="props.thisAsset.actualPercentage"
      :currency="props.thisAsset.currency"
    />

    <ColumnInput
      :input-value="props.thisAsset.targetPercentage"
      :unit="'%'"
      @click="$event.stopPropagation()"
    />

    <SingleValue :arrow="'up'" :value-array="deviationArray" :unit="'%'" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import InfoColumn from './column/InfoColumn.vue'
import SingleValue from './column/SingleValue.vue'
import ActualValueColumn from './column/ActualValueColumn.vue'
import ColumnInput from './column/ColumnInput.vue'

const assetStore = useAssetStore()

const props = defineProps({
  thisAsset: {
    type: Object,
    required: true,
  },
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
