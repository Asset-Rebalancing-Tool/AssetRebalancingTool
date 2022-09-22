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
      @input="
        PatchAssetService.patchPrivateHolding(
          patchPricePerUnitRequest($event.target.value),
          holding.uuid
        )
      "
    >
      <template #unit>
        <InputAnimation :input-status="pricePerUnitStatus">
          <template #unit>
            <BaseSelect
                v-show="checkStatus(pricePerUnitStatus)"
                class="currency"
                :options="currencyOptions"
                :default-selection="CurrencyEnum.EUR"
                @change="
              PatchAssetService.patchPrivateHolding(
                patchCurrencyRequest($event.target.value),
                holding.uuid
              )
            "
            />
          </template>
        </InputAnimation>
      </template>
    </BaseInput>

    <BaseInput
      custom-container-class="quantity-input"
      type="number"
      :modelValue="ownedQuantity"
      @input="
        PatchAssetService.patchPrivateHolding(
          patchOwnedQuantityRequest($event.target.value),
          holding.uuid
        )
      "
    >
      <template #unit>
        <InputAnimation :input-status="quantityStatus">
          <template #unit>
            <BaseSelect
                class="quantity"
                :options="unitTypeOptions"
                :default-selection="defaultUnitType"
                @change="
              PatchAssetService.patchPrivateHolding(
                patchUnitTypeRequest($event.target.value),
                holding.uuid
              )
            "
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
      @input="
        PatchAssetService.patchPrivateHolding(
          patchTargetPercentageRequest($event.target.value),
          holding.uuid
        )
      "
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
import {computed, ref, watch} from 'vue'
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

const pricePerUnit: Ref<number> = ref(props.holding.pricePerUnit)
const pricePerUnitStatus: Ref<InputStatusEnum>  = computed(() => {
  return store.listState.inputStatusIcon
})
watch(() => props.holding.pricePerUnit, (price: number) => {
  pricePerUnit.value = price
});

const ownedQuantity: Ref<number> = ref(props.holding.ownedQuantity)
const quantityStatus: Ref<InputStatusEnum> = computed(() =>{
  return store.listState.inputStatusIcon
})
watch(() => props.holding.ownedQuantity, (quantity: number) => {
  ownedQuantity.value = quantity
});

const targetPercentage: Ref<number> = ref(props.holding.targetPercentage)
const targetPercentageStatus: Ref<InputStatusEnum> = computed(() => {
  return store.listState.inputStatusIcon
})
watch(() => props.holding.targetPercentage, (percentage: number) => {
  targetPercentage.value = percentage
});

// Check if the status of an input is none in order to show the unit slot
function checkStatus(status: InputStatusEnum) {
  return status === InputStatusEnum.NONE
}


/**-***************************************************-**/
/** ---------- Computed Template Properties ----------- **/
/**-***************************************************-**/

// Get the mapped asset type
const assetType = computed((): string => {
  return mapAssetType(props.holding.assetType)
})

const unitTypeOptions = computed(() => {
  return mapUnitTypeArray(Object.values(UnitTypeEnum))
})

const defaultUnitType = computed(() => {
  return mapUnitType(UnitTypeEnum.PIECE)
})

const currencyOptions = computed(() => {
  const currencies = []
  for (const currency of Object.values(CurrencyEnum)) {
    if (currency == 'UNSUPPORTED') continue
    currencies.push(currency)
  }
  return currencies
})

/**-***************************************************-**/
/** -------------- Input Patch Requests --------------- **/
/**-***************************************************-**/

function patchPricePerUnitRequest(price: number) {
  return { pricePerUnit: price } as PrivateHoldingRequest
}

function patchCurrencyRequest(currency: CurrencyEnum) {
  return { currency: currency } as PrivateHoldingRequest
}

function patchOwnedQuantityRequest(quantity: number) {
  return { ownedQuantity: quantity } as PrivateHoldingRequest
}

function patchUnitTypeRequest(unit: UnitTypeEnum) {
  return { unitType: unit } as PrivateHoldingRequest
}

function patchTargetPercentageRequest(percentage: number) {
  return { targetPercentage: percentage } as PrivateHoldingRequest
}
</script>
