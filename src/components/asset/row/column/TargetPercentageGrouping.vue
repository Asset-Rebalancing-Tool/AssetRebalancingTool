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
import type { IOwnedPublicAssets } from '@/models/IOwnedPublicAssets'
import {useAssetStore} from "@/stores/AssetStore";

export default defineComponent({
  name: "TargetPercentageGrouping",
  props: {
    assets: {
      type: Object as PropType<IOwnedPublicAssets>,
      required: true,
    }
  },
  computed: {

    // Calculate the height of the target percentage grouping
    targetPercentageGroupingHeight(): String {

      // Check for how many asset rows the wrapper height has to be adjusted
      let assetCount = (Object.keys(this.assets).length) - 1;

      // Css variables in _dimensions.scss
      // TODO: get variables from dom elements
      let header = 16;
      let border = 3;
      let innerPadding = 3;
      let secondaryInputHeight = 32;
      let innerFrame = (innerPadding * 2) + secondaryInputHeight;
      let rowGap = 57;

      return (border * 2) + header + innerFrame  + (rowGap * assetCount) + 'px';
    }
  },
  setup() {
    const assetStore = useAssetStore()
    return {
      assetStore,
    }
  }
})
</script>
