<template>
  <div
    class="tooltip-event-wrapper group-percentage-wrapper"
    :class="{ active: activeClass }"
    @mouseover="hoverGroupPercentage = true"
    @mouseleave="hoverGroupPercentage = false"
  >
    <div class="tooltip" v-show="hoverGroupPercentage">
      <div class="text">
        {{
          $t(
            'assetList.listEntries.holdingGroup.tooltips.groupPercentageWrapper'
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
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  activeClass: {
    type: Boolean,
    required: true,
  },
})

const hoverGroupPercentage: Ref<boolean> = ref(false)
</script>

<style lang="scss" scoped>
@import '@/assets/scss/wrappers/holding-tooltips.scss';
</style>
