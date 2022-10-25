<template>
  <div class="holding-row">
    <AssetInfo :type="assetType" :edit-asset="isEdited">
      <template #asset-logo>
        <div
          class="asset-logo private-holding"
          :class="{
            shake: editGroupFlag,
            delete: deleteHoldingFlag,
          }"
        ></div>
      </template>
      <template #asset-name>
        <h4 v-show="!isEdited">{{ holding.title }}</h4>
      </template>
      <template #additional-info>
        <div class="asset-type" v-show="!isEdited">
          {{ $t('assetList.listEntries.privateHolding.type') }}
        </div>
        <div class="edit-asset" v-show="!isEdited" @click.prevent="editAsset">
          {{ $t('assetList.listEntries.privateHolding.edit') }}
        </div>
        <div class="edit-asset-name-wrapper">
          <input
            class="asset-name-input"
            v-show="isEdited"
            type="text"
            v-model="holding.title"
          />
          <div
            class="save-asset"
            v-show="isEdited"
            @click="
              PatchAssetService.patchPrivateHolding(
                patchPrivateHoldingNameRequest(),
                holding.uuid
              )
            "
          >
            {{ $t('assetList.listEntries.privateHolding.save') }}
          </div>
        </div>
      </template>
    </AssetInfo>

    <BaseInput
      type="number"
      :modelValue="pricePerUnit"
      :class="{ error: pricePerUnitError }"
      :select-on-focus="true"
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
              :default-selection="defaultCurrency"
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
      :select-on-focus="true"
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
import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'
import PatchAssetService from '@/services/PatchAssetService'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import AssetInfo from '@/components/data/AssetInfo.vue'
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import InputAnimation from '@/components/inputs/InputAnimation.vue'
import BaseSelect from '@/components/inputs/BaseSelect.vue'
import { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import { UnitTypeEnum } from '@/models/enums/UnitTypeEnum'
import { mapAssetType } from '@/composables/UseAssetType'
import { createUnitTypeObject } from '@/composables/UseUnitType'
import { createCurrencyObject } from '@/composables/UseCurrency'
import type { PrivateHoldingRequest } from '@/requests/PrivateHoldingRequest'
import { useAssetStore } from '@/stores/AssetStore'
import { AnimationWrapperEnum } from '@/models/enums/AnimationWrapperEnum'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import { useI18n } from 'vue-i18n'
import DeviationTooltip from '@/components/wrappers/asset-list/list-entries/DeviationTooltip.vue'
import type { AssetPoolEntry } from "@/models/AssetPoolEntry";
import { getCurrentPercentage, getCurrentValue } from "@/composables/assets/UseCurrentValues";
import { EntryTypeEnum } from "@/models/holdings/EntryTypeEnum";
import {
  getRawDeviation,
  checkIfDeviationExists,
  getDeviationArray,
  getDeviationArrowDirection
} from "@/composables/assets/UseDeviation";

/**-***************************************************-**/
/** ----------- Props And Store Declaration ----------- **/
/**-***************************************************-**/

const { t } = useI18n()
const assetStore = useAssetStore()

const props = defineProps({
  uuid: {
    type: String,
    required: true,
  },
})

const holding: ComputedRef<PrivateHolding> = computed(
    () => assetStore.getAssetPoolEntryByUuid(props.uuid) as PrivateHolding
)

// The public holding casted as pool entry
const poolEntry: ComputedRef<AssetPoolEntry> = computed(
    () => holding.value as AssetPoolEntry
)

const entryType: EntryTypeEnum = EntryTypeEnum.PRIVATE_HOLDING

/**-***************************************************-**/
/** --------------- Input Model Values ---------------- **/
/**-***************************************************-**/

// The input model values itself
const pricePerUnit: Ref<number> = ref(holding.value.pricePerUnit)
const ownedQuantity: Ref<number> = ref(holding.value.ownedQuantity)
const targetPercentage: Ref<number> = ref(holding.value.targetPercentage)
const unitType: Ref<UnitTypeEnum> = ref(holding.value.unitType)
const currency: Ref<CurrencyEnum> = ref(holding.value.currency)

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

// Patch the public assets price per unit
function patchPricePerUnit(inputValue: string, holdingUuid: string) {
  pricePerUnit.value = +inputValue
  const request = patchPricePerUnitRequest(inputValue)
  if (!pricePerUnitError.value) {
    PatchAssetService.patchPrivateHolding(request, holdingUuid)
    executeAnimation(showPricePerUnitAnim)
  }
}

// Patch the public assets owned quantity
function patchOwnedQuantity(inputValue: string, holdingUuid: string) {
  ownedQuantity.value = +inputValue
  const request = patchOwnedQuantityRequest(inputValue)
  if (!quantityError.value) {
    PatchAssetService.patchPrivateHolding(request, holdingUuid)
    executeAnimation(showOwnedQuantityAnim)
  }
}

// Patch the public assets target percentage
function patchTargetPercentage(inputValue: string, holdingUuid: string) {
  targetPercentage.value = +inputValue
  const request = patchTargetPercentageRequest(inputValue)
  if (!targetPercentageError.value) {
    PatchAssetService.patchPrivateHolding(request, holdingUuid)
    executeAnimation(showTargetPercentageAnim)
  }
}

// Patch the public assets unit type
function patchUnitType(inputValue: UnitTypeEnum, holdingUuid: string) {
  unitType.value = inputValue
  const request = patchUnitTypeRequest(inputValue)
  PatchAssetService.patchPrivateHolding(request, holdingUuid)
}

// Patch the public currency
function patchCurrency(inputValue: CurrencyEnum, holdingUuid: string) {
  currency.value = inputValue
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

// The patch holding name body
function patchPrivateHoldingNameRequest() {
  isEdited.value = false
  if (holding.value.title === '') {
    holding.value.title = t('assetList.listEntries.privateHolding.defaultName')
  }
  return { title: holding.value.title } as PrivateHoldingRequest
}

/**-***************************************************-**/
/** ------------- Select Value Mapping  --------------- **/
/**-***************************************************-**/

// Get the mapped asset types of this holding
const assetType = computed((): string => {
  return mapAssetType(holding.value.assetType)
})

// Get the default unit type
const defaultUnitType = computed(() => {
  return UnitTypeEnum.PIECE
})

// Get the unit type select options
const unitTypeOptions = computed(() => {
  return createUnitTypeObject(Object.values(UnitTypeEnum))
})

// Get the default currency
const defaultCurrency = computed(() => {
  return CurrencyEnum.EUR
})

// Get the currency select options
const currencyOptions = computed(() => {
  return createCurrencyObject(Object.values(CurrencyEnum))
})

/**-***************************************************-**/
/** ---------- Computed Template Properties ----------- **/
/**-***************************************************-**/

const editGroupFlag = computed(() => assetStore.editFlag)

const deleteHoldingFlag = computed(() => assetStore.deleteFlag)

const isEdited: Ref<boolean> = ref(false)
const editAsset = () => (isEdited.value = true)

// Get the current value formatted by german pattern
const currentValue = computed(
    (): string => getCurrentValue(poolEntry.value, entryType)
)

// Get the current value percentage formatted by german pattern
const currentPercentage = computed(
    (): string => getCurrentPercentage(poolEntry.value, entryType)
)

// The un formatted deviation
const rawDeviation = computed(
    (): number => getRawDeviation(poolEntry.value, entryType)
)

// The un formatted deviation
const deviation = computed(
    (): string[] => getDeviationArray(poolEntry.value, entryType)
)

// Get the deviation of the desired target percentage
const deviationArrowDirection = computed(
    () => getDeviationArrowDirection(poolEntry.value, entryType)
)

// Flag that indicates if there is a deviation
const deviationExists = computed(
    () => checkIfDeviationExists(poolEntry.value, entryType)
)
</script>
