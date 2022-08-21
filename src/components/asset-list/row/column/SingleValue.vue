<template>
  <div class="single-value-wrapper" :class="smallerGrid">
    <slot name="graph">
      <LineChart
          v-if="showGraph"
          :data-values="getDataValues(assetUuid)"
          :data-labels="getDataLabels(assetUuid)"
          :border-width="'0.8'"
          :background-color="'#19B399'"
          :border-color="'#19B399'"
      />
    </slot>
    <span class="first-digit">{{ firstDigit }}</span>
    <span class="decimal-wrapper">
      <span class="first-decimal">{{ firstDecimal }}</span>
      <span class="second-decimal">{{ secondDecimal }}</span>
    </span>
    <span class="unit">{{ unit }}</span>
    <span class="arrow" v-if="showArrow" :class="arrow"></span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { PropType } from 'vue'
import LineChart from '@/components/charts/LineChart.vue';
import { getAssetCurrency } from '@/composables/currency';
import { showGraph, getDataValues, getDataLabels } from '@/composables/smallLineChart';

const props = defineProps({
  assetUuid: {
    type: String,
    required: true,
  },
  valueArray: {
    type: Array as PropType<string[]>,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  arrow: {
    type: String,
    default: '',
  },
})

// Get the different parts of the exploded single value strings
const firstDigit = computed(() => props.valueArray[0])
const firstDecimal = computed(() => props.valueArray[1])
const secondDecimal = computed(() => props.valueArray[2])

// Render the additional arrow class
const showArrow = computed(() => {
  return props.arrow === 'up' || props.arrow === 'down'
})

// Render the additional grid class
const smallerGrid = computed(() => {
  return showArrow.value ? 'smaller' : ''
})

// Get the currency of the newest price record
const currency = computed((): string => {
  return getAssetCurrency(props.assetUuid)
})
</script>
