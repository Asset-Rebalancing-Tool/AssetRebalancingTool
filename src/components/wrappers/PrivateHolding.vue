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
        <BaseSelect />
      </template>
    </BaseInput>

    <BaseInput
      :modelValue="assetHolding.targetPercentage"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <template #unit>
        <span>%</span>
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
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import { computed, ref, Ref } from 'vue'
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
