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
      :show-graph="showGraph(thisAsset.assetPriceRecords)"
    >
      <template #graph>
        <LineChart
          v-if="showGraph(thisAsset.assetPriceRecords)"
          :data-values="getDataValues(thisAsset.assetPriceRecords)"
          :data-labels="getDataLabels(thisAsset.assetPriceRecords)"
          :border-width="'0.8'"
          :background-color="getChartColor(thisAsset.assetPriceRecords)"
          :border-color="getChartColor(thisAsset.assetPriceRecords)"
        />
      </template>
    </ThreeDigitValue>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { IPublicAsset } from '@/models/IPublicAsset'
import AssetInfo from '@/components/data/AssetInfo.vue'
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
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

const props = defineProps({
  thisAsset: {
    type: Object as PropType<IPublicAsset>,
    required: true,
  },
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
