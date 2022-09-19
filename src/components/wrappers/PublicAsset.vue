<template>
  <div class="searchbar-asset">
    <AssetInfo
      :asset-name="thisAsset.assetName"
      :type="assetType"
      :isin="thisAsset.isin"
      :logo="thisAsset.iconBase64"
    />

    <ThreeDigitValue
      :value-array="priceArray"
      :unit="currency"
      :show-graph="showGraph(priceRecords)"
    >
      <template #graph>
        <LineChart
          v-if="showGraph(priceRecords)"
          :data-values="getDataValues(priceRecords)"
          :data-labels="getDataLabels(priceRecords)"
          :border-width="'0.8'"
          :is-positive="isPositiveChart(priceRecords)"
        />
      </template>
    </ThreeDigitValue>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { PublicAsset } from '@/models/PublicAsset'
import AssetInfo from '@/components/data/AssetInfo.vue'
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import { computed } from 'vue'
import { mapAssetType } from '@/composables/UseAssetType'
import { getNewestPriceRecordFormatted } from '@/composables/UseValueArray'
import { mapCurrency } from '@/composables/UseCurrency'
import LineChart from '@/components/charts/LineChart.vue'
import {
  showGraph,
  getDataValues,
  getDataLabels,
  isPositiveChart,
} from '@/composables/UsePreviewChart'

const props = defineProps({
  thisAsset: {
    type: Object as PropType<PublicAsset>,
    required: true,
  },
})

const priceRecords = computed(() => {
  return props.thisAsset.assetPriceRecords
})

// Get the mapped asset type
const assetType = computed((): string => {
  return mapAssetType(props.thisAsset.assetType)
})

// Get an array that contains the exploded strings of a price record
const priceArray = computed((): string[] => {
  return getNewestPriceRecordFormatted(props.thisAsset.assetPriceRecords)
})

// Get the currency of the newest price record
const currency = computed((): string => {
  return mapCurrency(props.thisAsset.availableCurrencies[0])
})
</script>
