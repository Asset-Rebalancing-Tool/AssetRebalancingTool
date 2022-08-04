<template>
  <div class="actual-value-wrapper">
    <span class="currency">{{ formatValue }}</span>
    <span class="percentage">{{ formatPercentage }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ActualValueColumn',
  props: {
    value: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    // Format the currency value
    formatValue() {
      // Ensure that the value is not 0
      if (this.value === 0) return '0,00'

      const value: string = this.value.toString()
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
    },
    formatPercentage() {
      return this.percentage.toString().replace('.', ',') + '%'
    },
  },
})
</script>
