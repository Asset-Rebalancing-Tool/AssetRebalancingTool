<template>
  <div class="holding-row">
    <AssetInfo
      :asset-name="holding.publicAsset.assetName"
      :type="assetType"
      :isin="holding.publicAsset.isin"
      :logo="holding.publicAsset.iconBase64"
    />

    <ThreeDigitValue
      :value-array="formattedPriceDigits"
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
      :modelValue="ownedQuantity"
      :class="{ error: quantityError }"
      @input="patchOwnedQuantity($event.target.value, holding.uuid)"
    >
      <template #unit>
        <InputAnimation :input-status="quantityStatus">
          <template #unit>
            <span v-show="checkStatus(quantityStatus)">Stk.</span>
          </template>
        </InputAnimation>
      </template>
    </BaseInput>

    <div class="current-value-wrapper">
      <p>{{ currentValue }}</p>
      <p>{{ currentValuePercentage }}</p>
    </div>

    <BaseInput
      type="number"
      :modelValue="targetPercentage"
      :class="{ error: targetPercentageError }"
      @input="patchTargetPercentage($event.target.value, holding.uuid)"
    >
      <template #unit>
        <InputAnimation :input-status="targetPercentageStatus">
          <template #unit>
            <span v-show="checkStatus(targetPercentageStatus)">%</span>
          </template>
        </InputAnimation>
      </template>
    </BaseInput>

    <ThreeDigitValue :value-array="deviation" :unit="'%'" :arrow="'up'">
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
import InputAnimation from '@/components/inputs/InputAnimation.vue'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import {computed, ref, watch} from 'vue'
import type { Ref } from 'vue'
import { mapAssetType } from '@/composables/UseAssetType'
import {
  formatValueArray,
  getNewestPriceRecord,
  getNewestPriceRecordFormatted,
} from '@/composables/UsePriceRecords'
import { mapCurrency } from '@/composables/UseCurrency'
import LineChart from '@/components/charts/LineChart.vue'
import {
  showGraph,
  getDataValues,
  getDataLabels,
  isPositiveChart,
} from '@/composables/UsePreviewChart'
import { useAssetStore } from '@/stores/AssetStore'
import type { PublicHoldingRequest } from '@/requests/PublicHoldingRequest'
import type { PriceRecord } from '@/models/nested/PriceRecord'
import { InputStatusEnum } from '@/models/enums/InputStatusEnum'
import {bool} from "yup";

/**-***************************************************-**/
/** ----------- Props And Store Declaration ----------- **/
/**-***************************************************-**/

const store = useAssetStore()

const props = defineProps({
  holding: {
    type: Object as PropType<PublicHolding>,
    required: true,
  },
})

const ownedQuantity: Ref<number> = ref(props.holding.ownedQuantity)
const quantityStatus: Ref<InputStatusEnum> = computed(() =>{
  return store.listState.inputStatusIcon
})
watch(() => props.holding.ownedQuantity, (quantity: number) => {
  ownedQuantity.value = quantity
});

const targetPercentage: Ref<number> = ref(props.holding.targetPercentage)
const targetPercentageStatus: Ref<InputStatusEnum> = computed(() =>{
  return store.listState.inputStatusIcon
})
watch(() => props.holding.targetPercentage, (percentage: number) => {
  targetPercentage.value = percentage
});

// Check if the status of an input is none in order to show the unit slot
function checkStatus(status: InputStatusEnum) {
  return status === InputStatusEnum.NONE
}

// render input error class if value is not numeric
let quantityError: Ref<boolean> = ref(false)
let targetPercentageError: Ref<boolean> = ref(false)


function patchOwnedQuantity(inputValue: string, holdingUuid: string) {
  let request = patchOwnedQuantityRequest(inputValue)
  if (!quantityError.value) {
    PatchAssetService.patchPublicHolding(request, holdingUuid)
  }
}

function patchTargetPercentage(inputValue: string, holdingUuid: string) {
  let request = patchTargetPercentageRequest(inputValue)
  if (!targetPercentageError.value) {
    PatchAssetService.patchPublicHolding(request, holdingUuid)
  }
}

/**-***************************************************-**/
/** ---------- Computed Template Properties ----------- **/
/**-***************************************************-**/

// Get the mapped asset type
const assetType = computed((): string => {
  return mapAssetType(props.holding.publicAsset.assetType)
})

// Get the array that contains all price records
const priceRecords = computed((): PriceRecord[] => {
  return props.holding.publicAsset.assetPriceRecords
})

// Get an array that contains the exploded strings values of the newest price record
const formattedPriceDigits = computed((): string[] => {
  return getNewestPriceRecordFormatted(
    props.holding.publicAsset.assetPriceRecords
  )
})

// Get the current value formatted by german pattern
const currentValue = computed((): string => {
  const value =
    props.holding.ownedQuantity *
    getNewestPriceRecord(props.holding.publicAsset.assetPriceRecords)
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
})

// Get the current value percentage formatted by german pattern
const currentValuePercentage = computed(() => {
  const percentage =
    ((props.holding.ownedQuantity *
      getNewestPriceRecord(props.holding.publicAsset.assetPriceRecords)) /
      store.listState.totalAssetListValue) *
    100
  return new Intl.NumberFormat('de-DE').format(percentage) + ' %'
})

const deviation = computed(() => {
  const deviation: number = +currentValuePercentage.value - props.holding.targetPercentage
  return deviation ? formatValueArray(deviation) : ['00', '00', '0']
})

// Get the mapped currency of the newest price record
const currency = computed((): string => {
  return mapCurrency(props.holding.publicAsset.availableCurrencies[0])
})

/**-***************************************************-**/
/** -------------- Input Patch Requests --------------- **/
/**-***************************************************-**/

// The owned quantity request body
function patchOwnedQuantityRequest(quantity: string) {
  quantityError.value = !+quantity
  return { ownedQuantity: +quantity } as PublicHoldingRequest
}

// The target percentage request body
function patchTargetPercentageRequest(percentage: string) {
  targetPercentageError.value = !+percentage
  return { targetPercentage: +percentage } as PublicHoldingRequest
}
</script>
