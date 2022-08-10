<template>
  <div class="single-value-wrapper" :class="smallerGrid">
    <span class="graph" :class="props.graph"></span>
    <span class="first-digit">{{ firstDigit }}</span>
    <span class="decimal-wrapper">
      <span class="first-decimal">{{ firstDecimal }}</span>
      <span class="second-decimal">{{ secondDecimal }}</span>
    </span>
    <span class="unit">{{ props.unit }}</span>
    <span class="arrow" v-if="showArrow" :class="props.arrow"></span>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  valueArray: {
    type: Array,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  graph: {
    type: String,
    required: false,
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
