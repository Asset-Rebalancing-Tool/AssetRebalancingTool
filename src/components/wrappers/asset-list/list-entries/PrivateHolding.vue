<template>
  <div class="holding-row">
    <AssetInfo :asset-name="holding.title" :type="assetType">
      <template #additional-info>
        <div class="asset-type">Privat</div>
      </template>
    </AssetInfo>

    <BaseInput
      type="number"
      :modelValue="holding.pricePerUnit"
      @input="
        PatchAssetService.patchPrivateHolding(
          patchPricePerUnitRequest($event.target.value),
          holding.uuid
        )
      "
    >
      <template #unit>
        <BaseSelect
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
    </BaseInput>

    <BaseInput
      custom-container-class="quantity-input"
      type="number"
      :modelValue="'0'"
      @input="
        PatchAssetService.patchPrivateHolding(
          patchOwnedQuantityRequest($event.target.value),
          holding.uuid
        )
      "
    >
      <template #unit>
        <InputAnimation :input-status="`save`">
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
        </InputAnimation>
      </template>
    </BaseInput>

    <div class="current-value-wrapper">
      <p>4.658,13 €</p>
      <p>32,25 %</p>
    </div>

    <BaseInput
      type="number"
      :modelValue="holding.targetPercentage"
      @input="
        PatchAssetService.patchPrivateHolding(
          patchTargetPercentageRequest($event.target.value),
          holding.uuid
        )
      "
    >
      <template #unit>
        <InputAnimation :input-status="`save`">
          <span>%</span>
        </InputAnimation>
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
import PatchAssetService from '@/services/PatchAssetService'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import AssetInfo from '@/components/data/AssetInfo.vue'
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import InputAnimation from '@/components/inputs/InputAnimation.vue'
import BaseSelect from '@/components/inputs/BaseSelect.vue'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import { computed, ref } from 'vue'
import { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import { UnitTypeEnum } from '@/models/enums/UnitTypeEnum'
import { mapAssetType } from '@/composables/UseAssetType'
import { mapUnitTypeArray, mapUnitType } from '@/composables/UseUnitType'
import type { PrivateHoldingRequest } from '@/requests/PrivateHoldingRequest'

const testDeviation = ['08', '62', '1']

const props = defineProps({
  holding: {
    type: Object as PropType<PrivateHolding>,
    required: true,
  },
})

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
</script>
