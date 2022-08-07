<template>
  <div
    v-if="true"
    class="inner-target-percentage-wrapper"
    :style="{ height: targetPercentageGroupingHeight }"
  >
    <div class="header">
      <span>100%</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { IOwnedPublicAssets } from '@/models/old/IOwnedPublicAssets'
import { useAssetStore } from '@/stores/AssetStore'

export default defineComponent({
  name: 'TargetPercentageGrouping',
  props: {
    assets: {
      type: Object as PropType<IOwnedPublicAssets>,
      required: true,
    },
  },
  computed: {
    // Calculate the height of the target percentage grouping
    targetPercentageGroupingHeight(): string {
      // Check for how many asset rows the wrapper height has to be adjusted
      const assetCount = Object.keys(this.assets).length - 1

      // Css variables in _dimensions.scss
      // TODO: get variables from dom elements
      const header = 16
      const border = 3
      const innerPadding = 3
      const secondaryInputHeight = 32
      const innerFrame = innerPadding * 2 + secondaryInputHeight
      const rowGap = 57

      return border * 2 + header + innerFrame + rowGap * assetCount + 'px'
    },
  },
  setup() {
    const assetStore = useAssetStore()
    return {
      assetStore,
    }
  },
})
</script>
