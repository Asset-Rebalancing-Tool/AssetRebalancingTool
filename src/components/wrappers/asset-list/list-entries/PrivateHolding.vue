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
        <InputAnimation :input-status="pricePerUnitStatus">
          <template #unit>
            <BaseSelect
              v-show="checkStatus(pricePerUnitStatus)"
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
        <InputAnimation :input-status="quantityStatus">
          <template #unit>
            <BaseSelect
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
      <p>4.658,13 €</p>
      <p>32,25 %</p>
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

    <ThreeDigitValue :value-array="['00', '00', '0']" :unit="'%'" :arrow="'up'">
      <template #arrow>
        <IconAssetRowArrow />
      </template>
    </ThreeDigitValue>
  </div>
</template>

<script lang="ts" setup>
import type { Ref, PropType } from 'vue'
import PatchAssetService from '@/services/PatchAssetService'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import AssetInfo from '@/components/data/AssetInfo.vue'
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import InputAnimation from '@/components/inputs/InputAnimation.vue'
import BaseSelect from '@/components/inputs/BaseSelect.vue'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import { computed, ref, watch } from 'vue'
import { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import { UnitTypeEnum } from '@/models/enums/UnitTypeEnum'
import { mapAssetType } from '@/composables/UseAssetType'
import { mapUnitTypeArray, mapUnitType } from '@/composables/UseUnitType'
import type { PrivateHoldingRequest } from '@/requests/PrivateHoldingRequest'
import { InputStatusEnum } from '@/models/enums/InputStatusEnum'
import { useAssetStore } from '@/stores/AssetStore'

/**-***************************************************-**/
/** ----------- Props And Store Declaration ----------- **/
/**-***************************************************-**/

const store = useAssetStore()
const props = defineProps({
  holding: {
    type: Object as PropType<PrivateHolding>,
    required: true,
  },
})

/**-***************************************************-**/
/** --------------- Input Model Values ---------------- **/
/**-***************************************************-**/

// The input model values itself
const pricePerUnit: Ref<number> = ref(props.holding.pricePerUnit)
const ownedQuantity: Ref<number> = ref(props.holding.ownedQuantity)
const targetPercentage: Ref<number> = ref(props.holding.targetPercentage)
const unitType: Ref<UnitTypeEnum> = ref(props.holding.unitType)
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

// The price per unit patch status (needed for animation)
const pricePerUnitStatus: Ref<InputStatusEnum> = computed(() => {
  return store.listState.inputStatusIcon
})

// The owned quantity patch status (needed for animation)
const quantityStatus: Ref<InputStatusEnum> = computed(() => {
  return store.listState.inputStatusIcon
})

// The target percentage patch status (needed for animation)
const targetPercentageStatus: Ref<InputStatusEnum> = computed(() => {
  return store.listState.inputStatusIcon
})

// Check if the status of an input is none in order to show the unit slot
function checkStatus(status: InputStatusEnum) {
  return status === InputStatusEnum.NONE
}

/**-***************************************************-**/
/** -------- Watch Props For Reactive Template -------- **/
/**-***************************************************-**/

// Watch the price per unit prop in order to update the template after patch request response
watch(
  () => props.holding.pricePerUnit,
  (price: number) => {
    pricePerUnit.value = price
  }
)

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

// Patch the public holdings price per unit
function patchPricePerUnit(inputValue: string, holdingUuid: string) {
  const request = patchPricePerUnitRequest(inputValue)
  if (!pricePerUnitError.value) {
    PatchAssetService.patchPrivateHolding(request, holdingUuid)
  }
}

// Patch the public holdings owned quantity
function patchOwnedQuantity(inputValue: string, holdingUuid: string) {
  const request = patchOwnedQuantityRequest(inputValue)
  if (!quantityError.value) {
    PatchAssetService.patchPrivateHolding(request, holdingUuid)
  }
}

// Patch the public holdings target percentage
function patchTargetPercentage(inputValue: string, holdingUuid: string) {
  const request = patchTargetPercentageRequest(inputValue)
  if (!targetPercentageError.value) {
    PatchAssetService.patchPrivateHolding(request, holdingUuid)
  }
}

// Patch the public holdings unit type
function patchUnitType(inputValue: UnitTypeEnum, holdingUuid: string) {
  const request = patchUnitTypeRequest(inputValue)
  PatchAssetService.patchPrivateHolding(request, holdingUuid)
}

// Patch the public currency
function patchCurrency(inputValue: CurrencyEnum, holdingUuid: string) {
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
  return mapAssetType(props.holding.assetType)
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
</script>
