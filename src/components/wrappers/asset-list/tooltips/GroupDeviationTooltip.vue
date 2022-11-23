<template>
  <div
    class="tooltip-event-wrapper group-deviation"
    :class="{ active: deviation !== 0 }"
  >
    <div class="tooltip" v-show="hover && deviation !== 0">
      <div class="text">{{ deviationPrefix }} {{ deviation }} {{ deviationText }}</div>
      <div class="corner"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  hover: {
    type: Boolean,
    default: true,
  },
  deviation: {
    type: Number,
    required: true,
  },
  deviationDirection: {
    type: Boolean,
    required: true,
  },
})

const deviationText: ComputedRef<string> = computed((): string => {
  return props.deviationDirection
    ? t('assetList.listEntries.holdingGroup.tooltips.deviation.higher')
    : t('assetList.listEntries.holdingGroup.tooltips.deviation.less')
})
const deviationPrefix: ComputedRef<string> = computed(() => {
  return t('assetList.listEntries.publicHolding.tooltips.deviation.prefix')
})

</script>

<style lang="scss" scoped>
@import '@/assets/scss/wrappers/holding-tooltips.scss';
</style>
