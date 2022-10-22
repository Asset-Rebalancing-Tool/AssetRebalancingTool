<template>
  <div
    class="tooltip-event-wrapper deviation"
    :class="{ active: deviation !== 0 }"
    @mouseover="hoverDeviation = true"
    @mouseleave="hoverDeviation = false"
  >
    <div class="tooltip" v-show="hoverDeviation && deviation !== 0">
      <div class="text">{{ deviation }}% {{ deviationText }}</div>
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
  deviation: {
    type: Number,
    required: true,
  },
  deviationDirection: {
    type: Boolean,
    required: true,
  },
})

const hoverDeviation: Ref<boolean> = ref(false)
const deviationText: ComputedRef<string> = computed((): string => {
  return props.deviationDirection
    ? t('assetList.listEntries.publicHolding.tooltips.deviation.higher')
    : t('assetList.listEntries.publicHolding.tooltips.deviation.less')
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/wrappers/holding-tooltips.scss';
</style>
