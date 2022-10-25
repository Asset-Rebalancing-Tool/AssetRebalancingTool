<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="15"
    viewBox="0 0 8 15"
  >
    <g transform="translate(-1232 4575)">
      <path
        d="M4,0,8,6H0Z"
        transform="translate(1240 -4560) rotate(180)"
        :fill="arrowUpColor"
      />
      <path
        d="M4,0,8,7H0Z"
        transform="translate(1232 -4575)"
        :fill="arrowDownColor"
      />
    </g>
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { ComputedRef } from 'vue'

const props = defineProps({
  isSelected: {
    type: Boolean,
    default: false,
  },
  isAsc: {
    type: Boolean,
    default: true,
  }
})

// Check what color the arrow up should have
const arrowUpColor: ComputedRef<string> = computed(() => {
  if (props.isSelected) {
    return (props.isAsc) ? '#19b399' : '#787878'
  }
  return '#787878'
})

// Check what color the arrow down should have
const arrowDownColor: ComputedRef<string> = computed(() => {
  if (props.isSelected) {
    return (!props.isAsc) ? '#19b399' : '#787878'
  }
  return '#787878'
})
</script>
