<template>
  <div class="asset-row">
    <AssetInfo
      :asset-name="id + ' ' + name"
      :type="'ETF'"
      :isin="'IE00BFY0GT14'"
    />

    <ThreeDigitValue :value-array="testPrice" :unit="'€'" />

    <BaseInput>
      <template #unit>
        <span>Stk.</span>
      </template>
    </BaseInput>

    <div class="current-value-wrapper">
      <p>10.642,59 €</p>
      <p>66,84 %</p>
    </div>

    <BaseInput>
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
import AssetInfo from '@/components/data/AssetInfo.vue'
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'

// TODO: remove later
const testPrice = ['236', '26', '8']
const testDeviation = ['08', '16', '0']

const props = defineProps({
  id: {
    type: Number,
    default: '',
  },
  name: {
    type: String,
    default: '',
  }
})
</script>
