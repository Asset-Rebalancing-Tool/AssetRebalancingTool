<template>
  <div class="holding-row">
    <AssetInfo :asset-name="holding.title" :type="assetType" >
      <template #additional-info>
        <div class="asset-type">Privat</div>
      </template>
    </AssetInfo>

    <BaseInput
      type="number"
      :modelValue="holding.currentPrice"
      @input="
        PatchAssetService.patchPrivateHolding(
          $event.target.value,
          holding.holdingUuid,
          abortController
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
                $event.target.value,
                holding.holdingUuid,
                abortController
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
        PatchAssetService.patchPublicHolding(
          $event.target.value,
          holding.holdingUuid,
          abortController
        )
      "
    >
      <template #unit>
        <BaseSelect
            class="quantity"
            :options="unitTypeOptions"
            :default-selection="defaultUnitType"
            @change="
              PatchAssetService.patchPrivateHolding(
                $event.target.value,
                holding.holdingUuid,
                abortController
              )
            "
        >
        </BaseSelect>
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
          $event.target.value,
          holding.holdingUuid,
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
import PatchAssetService from '@/services/PatchAssetService'
import type { PrivateHolding } from '@/models/PrivateHolding'
import AssetInfo from '@/components/data/AssetInfo.vue'
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import BaseSelect from '@/components/inputs/BaseSelect.vue'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import { CurrencyEnum } from '@/models/enums/CurrencyEnum';
import { UnitTypeEnum } from '@/models/enums/UnitTypeEnum';
import { mapAssetType } from '@/composables/assetType'
import { mapUnitTypeArray, mapUnitType } from '@/composables/unitType'

const testDeviation = ['08', '62', '1']

const props = defineProps({
  holding: {
    type: Object as PropType<PrivateHolding>,
    required: true,
  },
})

const abortController: Ref<AbortController | null> = ref(new AbortController())

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
  let currencies = []
  for (let currency of Object.values(CurrencyEnum)) {
    if (currency == 'UNSUPPORTED') continue
    currencies.push(currency)
  }
  return currencies
})

</script>
