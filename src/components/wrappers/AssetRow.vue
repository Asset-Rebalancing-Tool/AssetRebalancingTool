<template>
  <div class="asset-row">
    <AssetInfo
      :asset-name="assetHolding.publicAsset.assetName"
      :type="assetType"
      :isin="assetHolding.publicAsset.isin"
    />

    <ThreeDigitValue :value-array="priceArray" :unit="currency" />

    <BaseInput :modelValue="assetHolding.ownedQuantity">
      <template #unit>
        <span>Stk.</span>
      </template>
    </BaseInput>

    <div class="current-value-wrapper">
      <p>10.642,59 €</p>
      <p>66,84 %</p>
    </div>

    <BaseInput :modelValue="assetHolding.targetPercentage">
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
import type { IPublicAssetHolding } from '@/models/IPublicAssetHolding';
import type { IPublicAsset } from '@/models/IPublicAsset'
import AssetInfo from '@/components/data/AssetInfo.vue'
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import { computed } from 'vue'
import { mapAssetType } from '@/composables/assetType'
import { getNewestPriceRecordFormatted } from '@/composables/valueArray'
import { mapCurrency} from '@/composables/currency'
import LineChart from '@/components/charts/LineChart.vue'
import {
  showGraph,
  getDataValues,
  getDataLabels,
  getChartColor
} from '@/composables/smallLineChart'


let testDeviation = ['08', '62', '1']

const props = defineProps({
  assetHolding: {
    type: Object as PropType<IPublicAssetHolding>,
    required: true,
  },
})

// Get the mapped asset type
const assetType = computed((): string => {
  return mapAssetType(props.assetHolding.publicAsset.assetType)
})

// Get an array that contains the exploded strings of a price record
const priceArray = computed((): string[] => {
  return getNewestPriceRecordFormatted(props.assetHolding.publicAsset.uuid)
})

// Get the currency of the newest price record
const currency = computed((): string => {
  return mapCurrency(props.assetHolding.publicAsset.availableCurrencies[0])
})
</script>
