<template>
  <div
    class="percentage-wrapper"
    :class="{ valid: isOneHundredPercent }"
    :style="dimensions"
  >
    <div class="header" ref="test">
      <span>{{ totalGroupTargetPercentage }}</span>
      <!--<IconCheck v-show="isOneHundredPercent" />-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue'
import type { Ref } from 'vue'
import { useAssetMapStore } from '@/stores/AssetMapStore'
import IconCheck from '@/assets/icons/IconCheck.vue'

const store = useAssetMapStore()

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

// Get the current groups target percentage formatted by german pattern
const totalGroupTargetPercentage = computed((): string => {
  const targetPercentage: number = store.getTotalGroupTargetPercentage(
    props.groupUuid
  )
  // Set the flag that indicates if the group equals one hundred percent
  isOneHundredPercent.value = targetPercentage === 100
  // Format the current percentage value after german pattern
  return new Intl.NumberFormat('de-DE').format(targetPercentage) + '%'
})
</script>
