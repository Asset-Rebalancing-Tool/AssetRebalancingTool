<template>
  <div class="holding-row">
    <AssetInfo
      :type="assetType"
      :isin="holding.publicAsset.isin"
      :logo="holding.publicAsset.iconBase64"
    >
      <template #asset-name>
        <h4>{{ holding.publicAsset.assetName }}</h4>
      </template>
    </AssetInfo>

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
          :is-positive="isPositiveChart(holding.publicAsset.assetPriceRecords)"
        />
      </template>
    </ThreeDigitValue>

    <BaseInput
      type="number"
      :modelValue="ownedQuantity"
      :class="{ error: quantityError }"
      :select-on-focus="true"
      @input="patchOwnedQuantity($event.target.value, holding.uuid)"
    >
      <template #unit>
        <InputAnimation
          :execute-animation="showOwnedQuantityAnim"
          :animation-wrapper="AnimationWrapperEnum.OWNED_QUANTITY"
        >
          <template #unit>
            <span v-show="!showOwnedQuantityAnim">{{
              $t('assetList.listEntries.publicHolding.pieces')
            }}</span>
          </template>
        </InputAnimation>
      </template>
    </BaseInput>

    <div class="current-value-wrapper">
      <p>{{ currentValue }}</p>
      <p>{{ currentPercentage }}</p>
    </div>

    <BaseInput
      type="number"
      :modelValue="targetPercentage"
      :class="{ error: targetPercentageError }"
      :select-on-focus="true"
      @input="patchTargetPercentage($event.target.value, holding.uuid)"
    >
      <template #unit>
        <InputAnimation
          :execute-animation="showTargetPercentageAnim"
          :animation-wrapper="AnimationWrapperEnum.TARGET_PERCENTAGE"
        >
          <template #unit>
            <span v-show="!showTargetPercentageAnim">%</span>
          </template>
        </InputAnimation>
      </template>
    </BaseInput>

    <ThreeDigitValue :value-array="deviation" :unit="'%'">
      <template #arrow>
        <IconAssetRowArrow
          v-show="deviationExists"
          :arrow-up="deviationArrowDirection"
        />
      </template>
    </ThreeDigitValue>

    <DeviationTooltip
      :deviation="rawDeviation"
      :deviation-direction="deviationArrowDirection"
    />
  </div>
</template>
<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import PatchAssetService from '@/services/PatchAssetService'
import AssetInfo from '@/components/data/AssetInfo.vue'
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import InputAnimation from '@/components/inputs/InputAnimation.vue'
import { AnimationWrapperEnum } from '@/models/enums/AnimationWrapperEnum'
import { computed, ref } from 'vue'
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
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import DeviationTooltip from '@/components/wrappers/asset-list/list-entries/DeviationTooltip.vue'

/**-***************************************************-**/
/** ----------- Props And Store Declaration ----------- **/
/**-***************************************************-**/

const assetStore = useAssetStore()
const props = defineProps({
  uuid: {
    type: String,
    required: true,
  },
})

const holding: ComputedRef<PublicHolding> = computed(() => {
  return assetStore.getAssetPoolEntryByUuid(props.uuid) as PublicHolding
})

/**-***************************************************-**/
/** --------------- Input Model Values ---------------- **/
/**-***************************************************-**/

// The input model values itself
const ownedQuantity: Ref<number> = ref(holding.value.ownedQuantity)
const targetPercentage: Ref<number> = ref(holding.value.targetPercentage)

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
const showTargetPercentageAnim: Ref<boolean> = ref(false)

// Execute the input's check animation for a specified field
function executeAnimation(field: Ref<boolean>) {
  setTimeout(() => {
    field.value = true
    setTimeout(() => {
      field.value = false
    }, 1000)
  }, 500)
}

/**-***************************************************-**/
/** -------------- Input Patch Methods ---------------- **/
/**-***************************************************-**/

// Patch the public holdings owned quantity
function patchOwnedQuantity(inputValue: string, holdingUuid: string): void {
  ownedQuantity.value = +inputValue
  const request = patchOwnedQuantityRequest(inputValue)
  if (!quantityError.value) {
    PatchAssetService.patchPublicHolding(request, holdingUuid)
    executeAnimation(showOwnedQuantityAnim)
  }
}

// Patch the public holdings target percentage
function patchTargetPercentage(inputValue: string, holdingUuid: string) {
  targetPercentage.value = +inputValue
  const request = patchTargetPercentageRequest(inputValue)
  if (!targetPercentageError.value) {
    PatchAssetService.patchPublicHolding(request, holdingUuid)
    executeAnimation(showTargetPercentageAnim)
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
  return mapAssetType(holding.value.publicAsset.assetType)
})

// Get the mapped currencies of the newest price record
const currency = computed((): string => {
  return mapCurrency(holding.value.publicAsset.availableCurrencies[0])
})

/**-***************************************************-**/
/** ---------- Computed Template Properties ----------- **/
/**-***************************************************-**/

// Get the array that contains all price records
const priceRecords = computed((): PriceRecord[] => {
  return holding.value.publicAsset.assetPriceRecords
})

// Get an array that contains the exploded strings values of the newest price record
const formattedPriceDigits = computed((): string[] => {
  return getNewestPriceRecordFormatted(priceRecords.value)
})

// Get the current value formatted by german pattern
const currentValue = computed((): string => {
  const priceRecord: number = getNewestPriceRecord(priceRecords.value)
  const currentValue: number = holding.value.ownedQuantity * priceRecord

  // Format the current value after german pattern
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(currentValue)
})

// Get the current value percentage
function calcCurrentPercentage(): number {
  const priceRecord: number = getNewestPriceRecord(priceRecords.value)
  const currentValue: number = holding.value.ownedQuantity * priceRecord
  return (currentValue / assetStore.sumState.totalValue) * 100
}

// Get the current value percentage formatted by german pattern
const currentPercentage = computed((): string => {
  const currentPercentage: number = calcCurrentPercentage()
  // Format the current percentage value after german pattern
  return currentPercentage
    ? new Intl.NumberFormat('de-DE').format(currentPercentage) + ' %'
    : '0,00 %'
})

// Get the current deviation
function calcDeviation(): number {
  const currentPercentage: number = calcCurrentPercentage()
  return Math.abs(currentPercentage - holding.value.targetPercentage)
}

// The un formatted deviation
const rawDeviation = computed((): number => {
  return +Number(calcDeviation()).toFixed(2)
})

// Get the current deviation formatted by german pattern
const deviation = computed((): string[] => {
  const deviation: number = calcDeviation()
  return deviation ? formatValueArray(deviation) : ['00', '00', '0']
})

/**-***************************************************-**/
/** ---------- Deviation Computed Properties ---------- **/
/**-***************************************************-**/

// Get the deviation of the desired target percentage
const deviationArrowDirection = computed(() => {
  const priceRecord: number = getNewestPriceRecord(priceRecords.value)
  const currentValue: number = holding.value.ownedQuantity * priceRecord
  const currentPercentage: number =
    (currentValue / assetStore.sumState.totalValue) * 100
  const targetPercentage: number = holding.value.targetPercentage
  return currentPercentage > targetPercentage
})

const deviationExists = computed(() => {
  const priceRecord: number = getNewestPriceRecord(priceRecords.value)
  const currentValue: number = holding.value.ownedQuantity * priceRecord
  const currentPercentage: number =
    (currentValue / assetStore.sumState.totalValue) * 100
  const targetPercentage: number = holding.value.targetPercentage
  return currentPercentage !== targetPercentage
})
</script>
