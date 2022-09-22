<template>
  <div class="percentage-wrapper" :style="dimensions">
    <div class="header" ref="test">
      <span>100%</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import type { Ref } from 'vue'

const props = defineProps({
  nestedHoldingCount: {
    type: Number,
    required: true,
  },
})

interface IDimensions {
  height: number
  width: number
}

const dimensions: Ref<IDimensions | {}> = ref({})
const holdingCount: Ref<number> = ref(props.nestedHoldingCount)

onMounted(() => {
  dimensions.value = {
    height: 65 * holdingCount.value + 2 + 'px',
    width: 98 + 'px',
  }
})

watch(() => props.nestedHoldingCount, (count: number) => {
  dimensions.value = {
    height: 65 * count + 'px',
    width: 98 + 'px',
  }
});
</script>
