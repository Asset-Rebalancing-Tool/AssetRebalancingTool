<template>
  <div class="single-value-wrapper" :class="smallerGrid">
    <span class="graph" :class="graph"></span>
    <span class="first-digit">{{ firstDigit }}</span>
    <span class="decimal-wrapper">
      <span class="first-decimal">{{ firstDecimal }}</span>
      <span class="second-decimal">{{ secondDecimal }}</span>
    </span>
    <span class="unit">{{ unit }}</span>
    <span class="arrow" v-if="showArrow" :class="arrow"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'valueColumn',
  props: {
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
  },
  computed: {
    firstDigit() {
      return this.valueArray[0]
    },
    firstDecimal() {
      return this.valueArray[1]
    },
    secondDecimal() {
      return this.valueArray[2]
    },
    showArrow() {
      return this.arrow === 'up' || this.arrow === 'down'
    },
    smallerGrid() {
      return this.showArrow ? 'smaller' : ''
    },
  },
})
</script>

<style lang="scss" scoped>
/*
.first-digit {
  color: $primary-text-color;
  font-size: 16px;
  font-weight: $bold-font-weight;
  margin-top: 5px;
}

.first-decimal {
  height: 14px;
  color: $secondary-text-color;
  font-size: 13px;
  margin-left: 3px;
}

.decimal-wrapper {
  display: flex;
}

.second-decimal {
  height: 10px;
  color: $tertiary-text-color;
  font-size: 13px;
}

.unit {
  height: 12px;
  color: $primary-text-color;
  font-size: 14px;
  margin-left: 3px;
}*/
</style>
