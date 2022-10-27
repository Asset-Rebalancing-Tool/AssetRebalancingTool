<template>
  <footer :class="{shadow: showShadow}">
    <h4>{{ $t('assetList.listFooter.totalValue') }}</h4>

    <div class="total-value-wrapper">
      <header>{{ $t('assetList.listFooter.totalValue') }}</header>
      <span class="total-value">{{ totalValue }}</span>
    </div>

    <div
      class="total-target-percentage-wrapper"
      :class="{ valid: targetPercentageIsOneHundredPercent }"
      @mouseover="hoverTotalTargetPercentage = true"
      @mouseleave="hoverTotalTargetPercentage = false"
    >
      <header
          @mouseover="hoverTotalTargetPercentage = true"
          @mouseleave="hoverTotalTargetPercentage = false"
      >
        {{ $t('assetList.listFooter.totalTargetPercentage') }}
        <IconCheck
            v-show="showPercentageCheckIcon"
            style="margin-bottom: -1px; margin-left: 1px;"
        />
        <IconWarning
            v-show="!showPercentageCheckIcon"
            style="margin-bottom: -3px; margin-left: 1px; width: 15px;"
        />
      </header>
      <span class="total-percentage">{{ totalTargetPercentage }}</span>
      <TotalTargetPercentageTooltip
          v-show="!showPercentageCheckIcon"
          :hover="hoverTotalTargetPercentage"
      />
    </div>

    <div class="total-deviation-wrapper"
         @mouseover="hoverTotalDeviation = true"
         @mouseleave="hoverTotalDeviation = false"
    >
      <header
          @mouseover="hoverTotalDeviation = true"
          @mouseleave="hoverTotalDeviation = false"
      >{{ $t('assetList.listFooter.deviation') }}</header>
      <span class="total-value">{{ totalDeviation }}</span>
      <TotalDeviationTooltip
          v-show="showDeviationTooltip"
          :hover="hoverTotalDeviation"
          :deviation="totalDeviation"
      />
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import IconCheck from '@/assets/icons/IconCheck.vue'
import IconWarning from "@/assets/icons/flash-message/IconWarning.vue";
import TotalTargetPercentageTooltip from "@/components/wrappers/asset-list/tooltips/TotalTargetPercentageTooltip.vue";
import TotalDeviationTooltip from "@/components/wrappers/asset-list/tooltips/TotalDeviationTooltip.vue";

const props = defineProps({
  showShadow: {
    type: Boolean,
    default: false,
  },
})

const assetStore = useAssetStore()

const hoverTotalTargetPercentage: Ref<boolean> = ref(false)
const hoverTotalDeviation: Ref<boolean> = ref(false)
const showDeviationTooltip = computed(
    () => assetStore.sumState.totalDeviation !== 0
)

const targetPercentageIsOneHundredPercent: Ref<boolean> = ref(false)

// Get the total asset list value
const totalValue = computed(() => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(assetStore.sumState.totalValue)
})

const totalTargetPercentage = computed(() => {
  const targetPercentage: number = assetStore.sumState.totalTargetPercentage
  // Set the flag that indicates if the group equals one hundred percent
  targetPercentageIsOneHundredPercent.value =
    targetPercentage === 0 || targetPercentage === 100
  return (
    new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(
      targetPercentage
    ) + ' %'
  )
})

// Get the total asset list deviation
const totalDeviation = computed(() => {
  return (
    new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(
      assetStore.sumState.totalDeviation
    ) + ' %'
  )
})

// Bool that indicates if the percentage check icon.svg should be rendered
const showPercentageCheckIcon = computed(() => {
  return assetStore.sumState.totalTargetPercentage === 100
})
</script>
