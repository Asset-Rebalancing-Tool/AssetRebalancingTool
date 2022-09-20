<template>
  <div v-show="inputStatus === InputStatusEnum.NONE">
    <slot name="unit"></slot>
  </div>
  <Vue3Lottie
    v-show="inputStatus === InputStatusEnum.LOAD"
    :animationData="inputLoading"
    :height="200"
    :width="200"
  />
  <Vue3Lottie
    v-show="inputStatus === InputStatusEnum.SAVE"
    :animationData="inputValueSaved"
    :height="200"
    :width="200"
  />
</template>

<script lang="ts" setup>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import inputLoading from '@/assets/animations/input-loading.json'
import inputValueSaved from '@/assets/animations/input-value-saved.json'
import { InputStatusEnum } from '@/models/enums/InputStatusEnum'
import type { PropType } from 'vue'

const props = defineProps({
  inputStatus: {
    type: String as PropType<InputStatusEnum>,
    default: InputStatusEnum.NONE,
  },
})
</script>
