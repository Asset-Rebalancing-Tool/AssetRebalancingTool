<template>
  <div class="holding-row">
    <AssetInfo
      :asset-name="holding.publicAsset.assetName"
      :type="assetType"
      :isin="holding.publicAsset.isin"
      :logo="holding.publicAsset.iconBase64"
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
            isPositiveChart(props.holding.publicAsset.assetPriceRecords)
          "
        />
      </template>
    </ThreeDigitValue>

    <BaseInput
      type="number"
      :modelValue="holding.ownedQuantity"
      @input="
        PatchAssetService.patchPublicHolding(
          publicHoldingPatchRequest($event.target.value),
          holding.holdingUuid
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
      :modelValue="holding.targetPercentage"
      @input="
        PatchAssetService.patchPublicHolding(
          publicHoldingPatchRequest($event.target.value),
          holding.holdingUuid
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
import type { PublicHolding } from '@/models/holdings/PublicHolding'
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
import type { PublicHoldingRequest } from "@/requests/PublicHoldingRequest";
import type { PrivateHoldingRequest } from "@/requests/PrivateHoldingRequest";

//temp
const testDeviation = ['08', '62', '1']

const store = useAssetStore()

const props = defineProps({
  holding: {
    type: Object as PropType<PublicHolding>,
    required: true,
  },
})

const priceRecords = computed(() => {
  return props.holding.publicAsset.assetPriceRecords
})

// Get the mapped asset type
const assetType = computed((): string => {
  return mapAssetType(props.holding.publicAsset.assetType)
})

// Get an array that contains the exploded strings of a price record
const priceArray = computed((): string[] => {
  return getNewestPriceRecordFormatted(
    props.holding.publicAsset.assetPriceRecords
  )
})

// Get the currency of the newest price record
const currency = computed((): string => {
  return mapCurrency(props.holding.publicAsset.availableCurrencies[0])
})

const currentValue = computed(() => {
  const value =
    props.holding.ownedQuantity *
    getNewestPriceRecord(props.holding.publicAsset.assetPriceRecords)
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
})

const currentValuePercentage = computed(() => {
  return new Intl.NumberFormat('de-DE').format(66.84) + ' %'
})

/**
 * Build the request body for the public holding patch
 *
 * @param inputValue string
 */
function publicHoldingPatchRequest(inputValue: string): PublicHoldingRequest {
  const data: number = +inputValue
  return { data } as unknown as PublicHoldingRequest
}
</script>
