<template>
  <div class="holding-row">
    <AssetInfo :asset-name="holding.title" :type="assetType">
      <template #additional-info>
        <div class="asset-type">Privat</div>
      </template>
    </AssetInfo>

    <BaseInput
      type="number"
      :modelValue="pricePerUnit"
      :class="{ error: pricePerUnitError }"
      @input="patchPricePerUnit($event.target.value, holding.uuid)"
    >
      <template #unit>
        <InputAnimation
            :execute-animation="showPricePerUnitAnim"
            :animation-wrapper="AnimationWrapperEnum.CURRENCY"
        >
          <template #unit>
            <BaseSelect
              v-show="!showPricePerUnitAnim"
              class="currency"
              :options="currencyOptions"
              :default-selection="CurrencyEnum.EUR"
              :modelValue="currency"
              @change="patchCurrency($event.target.value, holding.uuid)"
            />
          </template>
        </InputAnimation>
      </template>
    </BaseInput>

    <BaseInput
      custom-container-class="quantity-input"
      type="number"
      :modelValue="ownedQuantity"
      :class="{ error: quantityError }"
      @input="patchOwnedQuantity($event.target.value, holding.uuid)"
    >
      <template #unit>
        <InputAnimation
            :execute-animation="showOwnedQuantityAnim"
            :animation-wrapper="AnimationWrapperEnum.UNIT_TYPE"
        >
          <template #unit>
            <BaseSelect
              v-show="!showOwnedQuantityAnim"
              class="quantity"
              :options="unitTypeOptions"
              :default-selection="defaultUnitType"
              :modelValue="unitType"
              @change="patchUnitType($event.target.value, holding.uuid)"
            >
            </BaseSelect>
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
      <!--<template #arrow>
        <IconAssetRowArrow />
      </template>-->
    </ThreeDigitValue>
  </div>
</template>

<script lang="ts" setup>
import type { Ref, ComputedRef } from 'vue'
import PatchAssetService from '@/services/PatchAssetService'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import AssetInfo from '@/components/data/AssetInfo.vue'
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import InputAnimation from '@/components/inputs/InputAnimation.vue'
import BaseSelect from '@/components/inputs/BaseSelect.vue'
import { computed, ref } from 'vue'
import { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import { UnitTypeEnum } from '@/models/enums/UnitTypeEnum'
import { mapAssetType } from '@/composables/UseAssetType'
import { mapUnitTypeArray, mapUnitType } from '@/composables/UseUnitType'
import type { PrivateHoldingRequest } from '@/requests/PrivateHoldingRequest'
import { useAssetMapStore } from '@/stores/AssetMapStore'
import {formatValueArray} from "@/composables/UsePriceRecords";
import { AnimationWrapperEnum } from "@/models/enums/AnimationWrapperEnum";

/**-***************************************************-**/
/** ----------- Props And Store Declaration ----------- **/
/**-***************************************************-**/

const store = useAssetMapStore()
const props = defineProps({
  uuid: {
    type: String,
    required: true,
  },
})

const holding: ComputedRef<PrivateHolding> = computed(() => {
  return store.getAssetMapEntryByUuid(props.uuid) as PrivateHolding
})

/**-***************************************************-**/
/** --------------- Input Model Values ---------------- **/
/**-***************************************************-**/

// The input model values itself
const pricePerUnit: Ref<number> = ref(holding.value.pricePerUnit)
const ownedQuantity: Ref<number> = ref(holding.value.ownedQuantity)
const targetPercentage: Ref<number> = ref(holding.value.targetPercentage)
const unitType: Ref<UnitTypeEnum> = ref(holding.value.unitType)
const currency: Ref<CurrencyEnum> = ref(CurrencyEnum.EUR)

/**-***************************************************-**/
/** ---------------- Error Class Flags ---------------- **/
/**-***************************************************-**/

// booleans that indicate if input error class should be rendered
const pricePerUnitError: Ref<boolean> = ref(false)
const quantityError: Ref<boolean> = ref(false)
const targetPercentageError: Ref<boolean> = ref(false)

/**-***************************************************-**/
/** ------------- Input Animation Status -------------- **/
/**-***************************************************-**/

// The owned quantity patch status (needed for animation)
const showPricePerUnitAnim: Ref<boolean> = ref(false)
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

// Patch the public holdings price per unit
function patchPricePerUnit(inputValue: string, holdingUuid: string) {
  pricePerUnit.value = +inputValue
  const request = patchPricePerUnitRequest(inputValue)
  if (!pricePerUnitError.value) {
    PatchAssetService.patchPrivateHolding(request, holdingUuid)
    executeAnimation(showPricePerUnitAnim)
  }
}

// Patch the public holdings owned quantity
function patchOwnedQuantity(inputValue: string, holdingUuid: string) {
  ownedQuantity.value = +inputValue
  const request = patchOwnedQuantityRequest(inputValue)
  if (!quantityError.value) {
    PatchAssetService.patchPrivateHolding(request, holdingUuid)
    executeAnimation(showOwnedQuantityAnim)
  }
}

// Patch the public holdings target percentage
function patchTargetPercentage(inputValue: string, holdingUuid: string) {
  targetPercentage.value = +inputValue
  const request = patchTargetPercentageRequest(inputValue)
  if (!targetPercentageError.value) {
    PatchAssetService.patchPrivateHolding(request, holdingUuid)
    executeAnimation(showTargetPercentageAnim)
  }
}

// Patch the public holdings unit type
function patchUnitType(inputValue: UnitTypeEnum, holdingUuid: string) {
  console.log(inputValue)
  console.log(holdingUuid)
  const request = patchUnitTypeRequest(inputValue)
  PatchAssetService.patchPrivateHolding(request, holdingUuid)
}

// Patch the public currency
function patchCurrency(inputValue: CurrencyEnum, holdingUuid: string) {
  console.log(inputValue)
  console.log(holdingUuid)
  const request = patchCurrencyRequest(inputValue)
  PatchAssetService.patchPrivateHolding(request, holdingUuid)
}

/**-***************************************************-**/
/** ------------- Input Patch Requests ---------------- **/
/**-***************************************************-**/

// The patch owned quantity request body
function patchOwnedQuantityRequest(quantity: string) {
  quantityError.value = !+quantity
  return { ownedQuantity: +quantity } as PrivateHoldingRequest
}

// The patch price per unit request body
function patchPricePerUnitRequest(price: string) {
  pricePerUnitError.value = !+price
  return { pricePerUnit: +price } as PrivateHoldingRequest
}

// The patch target percentage request body
function patchTargetPercentageRequest(percentage: string) {
  targetPercentageError.value = !+percentage
  return { targetPercentage: +percentage } as PrivateHoldingRequest
}

// The patch unit type request body
function patchUnitTypeRequest(unit: UnitTypeEnum) {
  return { unitType: unit } as PrivateHoldingRequest
}

// The patch currency request body
function patchCurrencyRequest(currency: CurrencyEnum) {
  return { currency: currency } as PrivateHoldingRequest
}

/**-***************************************************-**/
/** ------------- Select Value Mapping  --------------- **/
/**-***************************************************-**/

// Get the mapped asset types of this holding
const assetType = computed((): string => {
  return mapAssetType(holding.value.assetType)
})

// Get the default mapped unit type
const defaultUnitType = computed(() => {
  return mapUnitType(UnitTypeEnum.PIECE)
})

// Get the unit type select options
const unitTypeOptions = computed(() => {
  return mapUnitTypeArray(Object.values(UnitTypeEnum))
})

// Get the currency select options
const currencyOptions = computed(() => {
  const currencies = []
  for (const currency of Object.values(CurrencyEnum)) {
    if (currency == 'UNSUPPORTED') continue
    currencies.push(currency)
  }
  return currencies
})

/**-***************************************************-**/
/** ---------- Computed Template Properties ----------- **/
/**-***************************************************-**/

// Get the current value formatted by german pattern
const currentValue = computed((): string => {
  // Format the current value after german pattern
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(holding.value.ownedQuantity * holding.value.pricePerUnit)
})

// Get the current value percentage
function calcCurrentPercentage(): number {
  const currentValue: number = holding.value.ownedQuantity * holding.value.pricePerUnit
  return (currentValue / store.totalAssetListValue) * 100
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

// Get the current deviation formatted by german pattern
const deviation = computed((): string[] => {
  const deviation: number = calcDeviation()
  return deviation ? formatValueArray(deviation) : ['00', '00', '']
})
</script>
