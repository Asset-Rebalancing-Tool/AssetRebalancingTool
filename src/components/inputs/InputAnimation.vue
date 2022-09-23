<template>
  <slot name="unit"></slot>
  <Vue3Lottie
    v-if="executeAnimation"
    :animationData="inputChecked"
    :height="35"
    :width="35"
  />
</template>

<script lang="ts" setup>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import inputChecked from '@/assets/animations/input-check.json'

const props = defineProps({
  executeAnimation: {
    type: Boolean,
    default: false
  },
})
</script>
