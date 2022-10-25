<template>
  <div
    class="tooltip-event-wrapper target-percentage"
  >
    <div class="tooltip" v-show="hover">
      <div class="text">
        {{
          $t(
            'assetList.listEntries.holdingGroup.tooltips.groupTargetPercentage'
          )
        }}
      </div>
      <div class="corner-wrapper">
        <div class="corner"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  hover: {
    type: Boolean,
    default: true,
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/wrappers/holding-tooltips.scss';
</style>
