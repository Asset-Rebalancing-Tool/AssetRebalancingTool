<template>
  <div class="holding-row">
    <AssetInfo :asset-name="assetHolding.title" :type="assetType" />

    <BaseInput
      type="number"
      :modelValue="assetHolding.currentPrice"
      @input="
        PatchAssetService.patchPrivateHolding(
          $event.target.value,
          assetHolding.holdingUuid,
          abortController
        )
      "
    >
      <template #unit>
        <BaseSelect
            :options="Object.values(CurrencyEnum)"
            :default-selection="CurrencyEnum.EUR"
            @change="
              PatchAssetService.patchPrivateHolding(
                $event.target.value,
                assetHolding.holdingUuid,
                abortController
              )
            "
        />
      </template>
    </BaseInput>

    <BaseInput
        type="number"
        :modelValue="'0'"
        @input="
        PatchAssetService.patchPublicHolding(
          $event.target.value,
          assetHolding.holdingUuid,
          abortController
        )
      "
    >
      <template #unit>
        <BaseSelect
            :options="Object.values(UnitTypeEnum)"
            :default-selection="UnitTypeEnum.PIECE"
            @change="
              PatchAssetService.patchPrivateHolding(
                $event.target.value,
                assetHolding.holdingUuid,
                abortController
              )
            "
        />
      </template>
    </BaseInput>

    <div class="current-value-wrapper">
      <p>4.658,13 €</p>
      <p>32,25 %</p>
    </div>

    <BaseInput
      type="number"
      :modelValue="assetHolding.targetPercentage"
      @input="
        PatchAssetService.patchPrivateHolding(
          $event.target.value,
          assetHolding.holdingUuid,
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

const testDeviation = ['08', '62', '1']

const props = defineProps({
  assetHolding: {
    type: Object as PropType<PrivateHolding>,
    required: true,
  },
})

const abortController: Ref<AbortController | null> = ref(new AbortController())

// Get the mapped asset type
const assetType = computed((): string => {
  return mapAssetType(props.assetHolding.assetType)
})
</script>
