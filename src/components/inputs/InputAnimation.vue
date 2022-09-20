<template>
  <slot v-show="inputStatus === 'none'" name="unit"></slot>
  <Vue3Lottie v-show="inputStatus === 'load'" :animationData="inputLoading" :height="200" :width="200" />
  <Vue3Lottie v-show="inputStatus === 'save'" :animationData="inputValueSaved" :height="200" :width="200" />
</template>

<script lang="ts" setup>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import inputLoading from '@/assets/animations/input-loading.json'
import inputValueSaved from '@/assets/animations/input-value-saved.json'

const props = defineProps({
  inputStatus: {
    type: String,
    default: 'none',
  },
})

</script>
