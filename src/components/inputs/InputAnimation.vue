<template>
  <slot name="unit"></slot>
  <!-- Always v-if, because this will play animation from beginning,
       instead of toggling the element's visibility -->

  <div class="input-animation-base-wrapper" :class="showAnimationWrapper">
    <Vue3Lottie
      class="animation"
      v-if="executeAnimation"
      :animationData="inputChecked"
      :width="23"
      :height="23"
    />
  </div>
</template>

<script lang="ts" setup>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import inputChecked from '@/assets/animations/input-check.json'
import { computed } from 'vue'
import type { PropType } from 'vue'
import { AnimationWrapperEnum } from '@/models/enums/AnimationWrapperEnum'

const props = defineProps({
  executeAnimation: {
    type: Boolean,
    default: false,
  },
  animationWrapper: {
    type: String as PropType<AnimationWrapperEnum>,
    required: true,
  },
})

const showAnimationWrapper = computed(() => {
  if (props.executeAnimation) {
    return props.animationWrapper
  }
})
</script>
