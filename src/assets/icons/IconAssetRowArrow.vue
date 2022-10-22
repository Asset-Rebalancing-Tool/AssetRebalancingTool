<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="7.836"
    height="13.21"
    viewBox="0 0 7.836 13.21"
  >
    <g :transform="transform">
      <path
        d="M3.9,4.756a.821.821,0,0,0,.585-.237L7.6,1.411A.828.828,0,0,0,6.425.24L3.916,2.749,1.408.24A.833.833,0,0,0,.237.24.81.81,0,0,0,0,.826a.846.846,0,0,0,.237.585l3.08,3.108a.821.821,0,0,0,.585.237Z"
        transform="translate(0 8.455)"
        fill="#19b399"
      />
      <rect
        width="1.47"
        height="11.758"
        rx="0.735"
        transform="translate(3.176)"
        fill="#19b399"
      />
    </g>
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({
  arrowUp: {
    type: Boolean,
    default: true,
  },
})
// Bind the transform property in order to arrange the arrow
const transform = computed(() => {
  return props.arrowUp ? 'translate(7.836 13.21) rotate(180)' : ''
})
</script>
