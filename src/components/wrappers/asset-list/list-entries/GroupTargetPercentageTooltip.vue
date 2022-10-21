<template>
  <div
    class="tooltip-event-wrapper target-percentage"
    @mouseover="hoverGroupTargetPercentage = true"
    @mouseleave="hoverGroupTargetPercentage = false"
  >
    <div class="tooltip" v-show="hoverGroupTargetPercentage">
      <span class="text">{{
        $t('assetList.listEntries.holdingGroup.tooltips.groupTargetPercentage')
      }}</span>
      <div class="corner-wrapper">
        <span class="corner"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const hoverGroupTargetPercentage: Ref<boolean> = ref(false)
</script>

<style lang="scss" scoped>
@import '@/assets/scss/wrappers/holding-tooltips.scss';
</style>
