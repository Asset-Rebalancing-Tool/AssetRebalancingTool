<template>
  <slot name="unit"></slot>
  <Vue3Lottie
    v-if="inputStatus === InputStatusEnum.LOAD"
    :animationData="inputLoading"
    :height="25"
    :width="25"
  />
  <Vue3Lottie
    v-if="inputStatus === InputStatusEnum.SAVE"
    :animationData="inputChecked"
    :height="35"
    :width="35"
  />
</template>

<script lang="ts" setup>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import inputLoading from '@/assets/animations/input-loading.json'
import inputChecked from '@/assets/animations/input-check.json'
import { InputStatusEnum } from '@/models/enums/InputStatusEnum'
import type { PropType } from 'vue'

const props = defineProps({
  inputStatus: {
    type: String as PropType<InputStatusEnum>,
    default: InputStatusEnum.NONE,
  },
})
</script>
