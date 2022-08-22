<template>
  <div class="asset-row" :class="selectedAsset">
    <div class="asset-logo"></div>

    <InfoColumn
      :asset-name="thisAsset.name"
      :type="thisAsset.type"
      :isin="thisAsset.isin"
    />

    <SingleValue
      :asset-uuid="thisAsset.uuid"
      :graph="thisAsset.graph"
      :value-array="priceArray"
      :unit="thisAsset.currency"
    />

    <ColumnInput
      :input-value="thisAsset.shares"
      :unit="'Stk.'"
      @click="$event.stopPropagation()"
    />

    <CurrentValueColumn
      :value="thisAsset.currentValue"
      :percentage="thisAsset.currentPercentage"
      :currency="thisAsset.currency"
    />

    <ColumnInput
      :input-value="thisAsset.targetPercentage"
      :unit="'%'"
      @click="$event.stopPropagation()"
    />

    <SingleValue :asset-uuid="thisAsset.uuid" :arrow="'up'" :value-array="deviationArray" :unit="'%'" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import InfoColumn from './column/InfoColumn.vue'
import SingleValue from './column/SingleValue.vue'
import CurrentValueColumn from './column/CurrentValueColumn.vue'
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
