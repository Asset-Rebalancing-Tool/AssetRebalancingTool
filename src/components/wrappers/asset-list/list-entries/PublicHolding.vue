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
        <InputAnimation :execute-animation="showOwnedQuantityAnim">
          <template #unit>
            <span v-show="!showOwnedQuantityAnim">Stk.</span>
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
        <InputAnimation :execute-animation="showTargetPercentageAnim">
          <template #unit>
            <span v-show="!showTargetPercentageAnim">%</span>
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
import { computed, ref, watch } from 'vue'
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

/**-***************************************************-**/
/** --------------- Input Model Values ---------------- **/
/**-***************************************************-**/

// The input model values itself
const ownedQuantity: Ref<number> = ref(props.holding.ownedQuantity)
const targetPercentage: Ref<number> = ref(props.holding.targetPercentage)

/**-***************************************************-**/
/** ---------------- Error Class Flags ---------------- **/
/**-***************************************************-**/

// booleans that indicate if input error class should be rendered
const quantityError: Ref<boolean> = ref(false)
const targetPercentageError: Ref<boolean> = ref(false)

/**-***************************************************-**/
/** ------------- Input Animation Status -------------- **/
/**-***************************************************-**/

// The owned quantity patch status (needed for animation)
const showOwnedQuantityAnim: Ref<boolean> = ref(false)

// The target percentage patch status (needed for animation)
const showTargetPercentageAnim: Ref<boolean> = ref(false)

/**-***************************************************-**/
/** -------- Watch Props For Reactive Template -------- **/
/**-***************************************************-**/

// Watch the owned quantity prop in order to update the template after patch request response
watch(
  () => props.holding.ownedQuantity,
  (quantity: number) => {
    ownedQuantity.value = quantity
  }
)

// Watch the target percentage prop in order to update the template after patch request response
watch(
  () => props.holding.targetPercentage,
  (percentage: number) => {
    targetPercentage.value = percentage
  }
)

/**-***************************************************-**/
/** -------------- Input Patch Methods ---------------- **/
/**-***************************************************-**/

// Patch the public holdings owned quantity
function patchOwnedQuantity(inputValue: string, holdingUuid: string): void {
  const request = patchOwnedQuantityRequest(inputValue)
  if (!quantityError.value) {
    PatchAssetService.patchPublicHolding(request, holdingUuid)
    setTimeout(() => {
      showOwnedQuantityAnim.value = true
      setTimeout(() => {
        showOwnedQuantityAnim.value = false
      }, 1000)
    }, 500)
  }
}

// Patch the public holdings target percentage
function patchTargetPercentage(inputValue: string, holdingUuid: string) {
  const request = patchTargetPercentageRequest(inputValue)
  if (!targetPercentageError.value) {
    PatchAssetService.patchPublicHolding(request, holdingUuid)
    setTimeout(() => {
      showTargetPercentageAnim.value = true
      setTimeout(() => {
        showTargetPercentageAnim.value = false
      }, 1000)
    }, 500)

  }
}

/**-***************************************************-**/
/** ------------- Input Patch Requests ---------------- **/
/**-***************************************************-**/

// The patch owned quantity request body
function patchOwnedQuantityRequest(quantity: string) {
  quantityError.value = !+quantity
  return { ownedQuantity: +quantity } as PublicHoldingRequest
}

// The patch target percentage request body
function patchTargetPercentageRequest(percentage: string) {
  targetPercentageError.value = !+percentage
  return { targetPercentage: +percentage } as PublicHoldingRequest
}

/**-***************************************************-**/
/** -------------- Select Value Mapping --------------- **/
/**-***************************************************-**/

// Get the mapped asset types of this holding
const assetType = computed((): string => {
  return mapAssetType(props.holding.publicAsset.assetType)
})

// Get the mapped currencies of the newest price record
const currency = computed((): string => {
  return mapCurrency(props.holding.publicAsset.availableCurrencies[0])
})

/**-***************************************************-**/
/** ---------- Computed Template Properties ----------- **/
/**-***************************************************-**/

// Get the array that contains all price records
const priceRecords = computed((): PriceRecord[] => {
  return props.holding.publicAsset.assetPriceRecords
})

// Get an array that contains the exploded strings values of the newest price record
const formattedPriceDigits = computed((): string[] => {
  return getNewestPriceRecordFormatted(priceRecords.value)
})

// Get the current value formatted by german pattern
const currentValue = computed((): string => {
  const priceRecord: number = getNewestPriceRecord(priceRecords.value)
  const currentValue: number = props.holding.ownedQuantity * priceRecord

  // Format the current value after german pattern
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(currentValue)
})

// Get the current value percentage formatted by german pattern
const currentValuePercentage = computed((): string => {
  const priceRecord: number = getNewestPriceRecord(priceRecords.value)
  const currentValue: number = props.holding.ownedQuantity * priceRecord
  const currentPercentage =
    (currentValue / store.listState.totalAssetListValue) * 100

  // Format the current percentage value after german pattern
  return new Intl.NumberFormat('de-DE').format(currentPercentage) + ' %'
})

// Get the deviation of the desired target percentage
const deviation = computed(() => {
  const deviation: number =
    +currentValuePercentage.value - props.holding.targetPercentage
  return deviation ? formatValueArray(deviation) : ['00', '00', '0']
})
</script>
