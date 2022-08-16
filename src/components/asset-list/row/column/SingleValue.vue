<template>
  <div class="single-value-wrapper" :class="smallerGrid">
    <LineChart
      v-if="showGraph"
      :data-values="dataValues"
      :data-labels="dataLabels"
      :border-width="'0.8'"
      :background-color="'#19B399'"
      :border-color="'#19B399'"
    />
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
import LineChart from '@/components/charts/LineChart.vue'
import type { IPriceRecord } from '@/models/nested/IPriceRecord'

const props = defineProps({
  valueArray: {
    type: Array,
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

const showGraph = computed(() => {
  return props.priceRecords.length > 0
})

// Render the additional grid class
const smallerGrid = computed(() => {
  return showArrow.value ? 'smaller' : ''
})

const dataValues = computed((): number[] => {
  const dataValues: number[] = []
  if (props.priceRecords) {
    for (const item of props.priceRecords) {
      const record = item as IPriceRecord
      dataValues.push(record.price)
    }
  }
  return dataValues
})

const dataLabels = computed((): string[] => {
  const dataLabels: string[] = []
  if (props.priceRecords) {
    for (const item of props.priceRecords) {
      const record = item as IPriceRecord
      dataLabels.push(record.tsPrice)
    }
  }
  return dataLabels
})
</script>
