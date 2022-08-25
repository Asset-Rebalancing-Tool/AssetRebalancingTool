<template>
  <div class="searchbar-asset">
    <AssetInfo
      :asset-name="thisAsset.assetName"
      :type="assetType"
      :isin="thisAsset.isin"
    />

    <ThreeDigitValue
      :value-array="priceArray"
      :unit="currency"
      :show-graph="showGraph(thisAsset.uuid)"
    >
      <template #graph>
        <LineChart
          v-if="showGraph(thisAsset.uuid)"
          :data-values="getDataValues(thisAsset.uuid)"
          :data-labels="getDataLabels(thisAsset.uuid)"
          :border-width="'0.8'"
          :background-color="'#19B399'"
          :border-color="'#19B399'"
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
import { hideModalUnderlay } from '@/composables/UseModalUnderlay'
import { computed } from 'vue'
import { mapAssetType } from '@/composables/assetType'
import { getNewestPriceRecordFormatted } from '@/composables/valueArray'
import { mapAssetCurrencyByUuid } from '@/composables/currency'
import LineChart from '@/components/charts/LineChart.vue'
import {
  showGraph,
  getDataValues,
  getDataLabels,
} from '@/composables/smallLineChart'

const props = defineProps({
  thisAsset: {
    type: Object as PropType<IPublicAsset>,
    required: true,
  },
})

console.log(showGraph(props.thisAsset.uuid))

function newAssetAction(): void {
  // Hide the modal underlay, no matter what creation will be fired
  hideModalUnderlay()
}

// Get the mapped asset type
const assetType = computed((): string => {
  return mapAssetType(props.thisAsset.assetType)
})

// Get an array that contains the exploded strings of a price record
const priceArray = computed((): string[] => {
  return getNewestPriceRecordFormatted(props.thisAsset.uuid)
})

// Get the currency of the newest price record
const currency = computed((): string => {
  return mapAssetCurrencyByUuid(props.thisAsset.uuid)
})
</script>
