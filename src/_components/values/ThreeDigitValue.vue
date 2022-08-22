<template>
  <div class="three-digit-wrapper">
    <span class="first-digit">{{ firstDigit }}</span>
    <span class="decimal-wrapper">
      <span class="first-decimal">{{ firstDecimal }}</span>
      <span class="second-decimal">{{ secondDecimal }}</span>
    </span>
    <span class="unit">{{ unit }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  valueArray: {
    type: Array as PropType<string[]>,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  }
})

// Get the different parts of the value array strings
const firstDigit    = computed(() => props.valueArray[0])
const firstDecimal  = computed(() => props.valueArray[1])
const secondDecimal = computed(() => props.valueArray[2])
</script>

<style scoped>
  @import '@/assets/scss/components/values/three-digit-value.scss';
</style>
