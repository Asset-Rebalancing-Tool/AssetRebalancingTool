<template>
  <div class="asset-row">
    <AssetInfo :asset-name="assetHolding.title" :type="assetType" />

    <BaseInput
      :modelValue="assetHolding.currentPrice"
      @input="patchCurrentPrice($event.target.value)"
    >
    </BaseInput>

    <span></span>

    <BaseInput
      :modelValue="assetHolding.targetPercentage"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <template #unit>
        <span>%</span>
      </template>
    </BaseInput>

    <ThreeDigitValue :value-array="testDeviation" :unit="'%'" :arrow="'up'">
      <template #arrow>
        <IconAssetRowArrow />
      </template>
    </ThreeDigitValue>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { IPublicAssetHolding } from '@/models/IPublicAssetHolding'
import type { IPrivateAssetHolding } from '@/models/IPrivateAssetHolding'
import AssetInfo from '@/components/data/AssetInfo.vue'
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import { computed } from 'vue'
import { mapAssetType } from '@/composables/assetType'
import {
  getNewestPriceRecord,
  getNewestPriceRecordFormatted,
} from '@/composables/valueArray'
import { mapCurrency } from '@/composables/currency'
import LineChart from '@/components/charts/LineChart.vue'
import {
  showGraph,
  getDataValues,
  getDataLabels,
  isPositiveChart,
} from '@/composables/smallLineChart'

const testDeviation = ['08', '62', '1']

const props = defineProps({
  assetHolding: {
    type: Object as PropType<IPrivateAssetHolding>,
    required: true,
  },
})

function patchCurrentPrice(currentPrice: string): void {
  // Parse the
  const quantity: number = +currentPrice
}

// Get the mapped asset type
const assetType = computed((): string => {
  return mapAssetType(props.assetHolding.assetType)
})

// Get an array that contains the exploded strings of a price record
const priceArray = computed((): string[] => {
  return getNewestPriceRecordFormatted(
    props.assetHolding.publicAsset.assetPriceRecords
  )
})

// Get the currency of the newest price record
const currency = computed((): string => {
  return mapCurrency(props.assetHolding.publicAsset.availableCurrencies[0])
})

const currentValue = computed(() => {
  const value =
    props.assetHolding.ownedQuantity *
    getNewestPriceRecord(props.assetHolding.publicAsset.assetPriceRecords)
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
})

const currentValuePercentage = computed(() => {
  return new Intl.NumberFormat('de-DE').format(66.84) + ' %'
})
</script>
