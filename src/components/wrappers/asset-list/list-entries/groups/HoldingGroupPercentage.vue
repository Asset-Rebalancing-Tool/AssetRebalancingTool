<template>
  <div class="percentage-wrapper" :style="dimensions">
    <div class="header" ref="test">
      <span>100%</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'

interface IDimensions {
  height: number
  width: number
}

const dimensions: Ref<IDimensions | {}> = ref({})

onMounted(() => {
  const assetRow: Element | null = document.querySelector(
    '.holding-group .holding-row'
  )
  const input: Element | null = document.querySelector(
    '.holding-group footer input'
  )
  const groupAssetCount = 2

  // Set the with and height of the dimensions object that is bindet to the style attribute
  if (assetRow && input) {
    dimensions.value = {
      height: assetRow.clientHeight * groupAssetCount + 'px',
      width: input.clientWidth + 16 + 'px', // + 16px padding
    }
  }
})
</script>