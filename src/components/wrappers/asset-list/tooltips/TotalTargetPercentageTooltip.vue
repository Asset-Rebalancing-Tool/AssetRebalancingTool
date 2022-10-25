<template>
  <div class="tooltip-event-wrapper total-target-percentage">
    <div class="tooltip" v-show="hover">
      <div class="text">{{
          $t(
              'assetList.listFooter.tooltips.totalTargetPercentage'
          )
        }}</div>
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
    required: true,
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/wrappers/holding-tooltips.scss';
</style>
