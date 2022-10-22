<template>
  <div
    class="percentage-wrapper"
    :class="{ valid: isOneHundredPercent }"
    :style="dimensions"
  >
    <div class="header" ref="test">
      <span>{{ totalGroupTargetPercentage }}</span>
      <!--<IconCheck v-show="isOneHundredPercent" />-->
      <GroupPercentageWrapperTooltip
          v-if="groupPercentageWrapperActive"
          :active-class="groupPercentageWrapperActive"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import { getTotalGroupTargetPercentage } from '@/composables/UseTotalValues'
import IconCheck from '@/assets/icons/IconCheck.vue'
import GroupPercentageWrapperTooltip from '@/components/wrappers/asset-list/list-entries/GroupPercentageWrapperTooltip.vue'

const assetStore = useAssetStore()

const props = defineProps({
  groupUuid: {
    type: String,
    required: true,
  },
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
const isOneHundredPercent: Ref<boolean> = ref(false)

onMounted(() => {
  dimensions.value = {
    height: 65 * holdingCount.value + 2 + 'px',
    width: 98 + 'px',
  }
})

watch(
  () => props.nestedHoldingCount,
  (count: number) => {
    dimensions.value = {
      height: 65 * count + 'px',
      width: 98 + 'px',
    }
  }
)

// The un formatted target percentage
const targetPercentage: ComputedRef<number> = computed((): number => {
  return getTotalGroupTargetPercentage(
      props.groupUuid
  )
})

// Get the current groups target percentage formatted by german pattern
const totalGroupTargetPercentage = computed((): string => {
  // Set the flag that indicates if the group equals one hundred percent
  isOneHundredPercent.value = targetPercentage.value === 100
  // Format the current percentage value after german pattern
  return new Intl.NumberFormat('de-DE').format(targetPercentage.value) + '%'
})

// Flag that indicated if the groups target percentage wrapper should be active
const groupPercentageWrapperActive: Ref<boolean> = computed((): boolean => {
  return targetPercentage.value < 100
})
</script>
