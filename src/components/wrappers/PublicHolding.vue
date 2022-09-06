<template>
  <div class="holding-row">
    <AssetInfo
      :asset-name="assetHolding.publicAsset.assetName"
      :type="assetType"
      :isin="assetHolding.publicAsset.isin"
      :logo="assetHolding.publicAsset.iconBase64"
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
          :is-positive="
            isPositiveChart(props.assetHolding.publicAsset.assetPriceRecords)
          "
        />
      </template>
    </ThreeDigitValue>

    <BaseInput
      type="number"
      :modelValue="assetHolding.ownedQuantity"
      @input="
        PatchAssetService.patchPublicHolding(
          $event.target.value,
          assetHolding.holdingUuid,
          abortController
        )
      "
    >
      <template #unit>
        <span>Stk.</span>
      </template>
    </BaseInput>

    <div class="current-value-wrapper">
      <p>{{ currentValue }}</p>
      <p>{{ currentValuePercentage }}</p>
    </div>

    <BaseInput
        type="number"
        :modelValue="assetHolding.targetPercentage"
        @input="
        PatchAssetService.patchPublicHolding(
          $event.target.value,
          assetHolding.holdingUuid,
          abortController
        )
      "
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
import type { PublicHolding } from '@/models/PublicHolding'
import PatchAssetService from '@/services/PatchAssetService'
import AssetInfo from '@/components/data/AssetInfo.vue'
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
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
import { useAssetStore } from '@/stores/AssetStore'

//temp
const testDeviation = ['08', '62', '1']

const store = useAssetStore()

const props = defineProps({
  assetHolding: {
    type: Object as PropType<PublicHolding>,
    required: true,
  },
})

// reactive variables needed in order fetch assets properly
const abortController: Ref<AbortController | null> = ref(new AbortController())

const priceRecords = computed(() => {
  return props.assetHolding.publicAsset.assetPriceRecords
})

// Get the mapped asset type
const assetType = computed((): string => {
  return mapAssetType(props.assetHolding.publicAsset.assetType)
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
