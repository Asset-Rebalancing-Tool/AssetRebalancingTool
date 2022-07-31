<template>
  <div class="actual-value-wrapper">
    <span class="currency">{{formatValue}} €</span>
    <span class="percentage">{{formatPercentage}} %</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'ActualValueColumn',
  props: {
    value: {
      type: String,
      required: true
    },
    percentage: {
      type: String,
      required: true
    }
  },
  computed: {
    // Format the currency value
    formatValue() {

      // Ensure that the value is not 0
      if (this.value === 0) return "0,00"

      let value        = this.value.toString()
      let valueArray   = value.split('.')
      let stringLength = valueArray[0].length

      // Set the dots based on the length of the string
      if      (stringLength === 6) { valueArray[0] = value.slice(0,2) + '.' + value.slice(2,5) }
      else if (stringLength === 5) { valueArray[0] = value.slice(0,2) + '.' + value.slice(2,5) }
      else if (stringLength === 4) { valueArray[0] = value.slice(0,1) + '.' + value.slice(1,4) }

      // Ensure, that the decimal value is two digits long
      if (valueArray[1].length === 1){
        valueArray[1] = valueArray[1] + '0'
      }

      // Return the value and the decimal digit added as one string
      return valueArray[0] + ',' + valueArray[1]

    },
    formatPercentage() {
      return this.percentage.toString().replace(".", ",");
    }
  }
})
</script>

<style scoped>
  .actual-value-wrapper {
    width: 200px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    column-gap: 50px;
  }

  .actual-value-wrapper .currency,
  .actual-value-wrapper .percentage {
    height: 18px;
    line-height: 18px;
    font-size: 15px;
    font-weight: 600;
    text-align: right;
    color: var(--primary-text-color);
  }

  .actual-value-wrapper .currency {
    width: 90px;
  }

  .actual-value-wrapper .percentage {
    width: 65px;
  }
</style>
