<template>
  <div class="actual-value-wrapper">
    <span class="currency">{{ formatValue }}</span>
    <span class="percentage">{{ formatPercentage }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  }
})

// Convert the percentage float value into german format
const formatPercentage = computed(() => {
  return props.percentage.toString().replace('.', ',') + '%'
})

// Convert the value float value into german format
const formatValue = computed(() => {
  // Ensure that the value is not 0
  if (props.value === 0) return '0,00'

  const value: string = props.value.toString()
  const valueArray: string[] = value.split('.')
  const stringLength: number = valueArray[0].length

  // Set the dots based on the length of the string
  if (stringLength === 6) {
    valueArray[0] = value.slice(0, 2) + '.' + value.slice(2, 5)
  } else if (stringLength === 5) {
    valueArray[0] = value.slice(0, 2) + '.' + value.slice(2, 5)
  } else if (stringLength === 4) {
    valueArray[0] = value.slice(0, 1) + '.' + value.slice(1, 4)
  }

  // Ensure, that the decimal value is two digits long
  if (valueArray[1].length === 1) {
    valueArray[1] = valueArray[1] + '0'
  }

  // Return the value and the decimal digit added as one string
  return valueArray[0] + ',' + valueArray[1] + '€'
})
</script>
