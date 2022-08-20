<template>
  <div class="single-value-wrapper" :class="smallerGrid">
    <slot name="graph"></slot>
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
import type { IPriceRecord } from '@/models/nested/IPriceRecord'

const props = defineProps({
  valueArray: {
    type: Array as PropType<string[]>,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  priceRecords: {
    type: Array,
    default: [] as IPriceRecord[],
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
</script>
