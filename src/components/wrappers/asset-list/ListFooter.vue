<template>
  <footer>
    <h4>{{ $t('assetList.listFooter.totalValue') }}</h4>

    <div class="total-value-wrapper">
      <header>{{ $t('assetList.listFooter.totalValue') }}</header>
      <span class="total-value">{{ totalValue }}</span>
    </div>

    <div class="total-value-wrapper">
      <header>
        {{ $t('assetList.listFooter.totalTargetPercentage') }}
        <IconCheck v-show="showPercentageCheckIcon" />
      </header>
      <span class="total-percentage">{{ totalTargetPercentage }}</span>
    </div>

    <div class="total-value-wrapper">
      <header>{{ $t('assetList.listFooter.deviation') }}</header>
      <span class="total-value">{{ totalDeviation }}</span>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { formatValueArray } from '@/composables/UsePriceRecords'
import { useAssetMapStore } from '@/stores/AssetMapStore'
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import IconCheck from '@/assets/icons/IconCheck.vue'

const store = useAssetMapStore()

// Get the total asset list value
const totalValue = computed(() => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(store.totalAssetListValue)
})

// Get the total asset list percentage
const totalPercentage = computed(() => {
  return (
    new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(
      store.totalAssetListPercentage
    ) + ' %'
  )
})

const totalTargetPercentage = computed(() => {
  return (
    new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(
      store.totalAssetListTargetPercentage
    ) + ' %'
  )
})

// Get the total asset list deviation
const totalDeviation = computed(() => {
  console.log(store.totalAssetListDeviation)
  return (
    new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(
      store.totalAssetListDeviation
    ) + ' %'
  )
})

// Bool that indicates if the percentage check icon.svg should be rendered
const showPercentageCheckIcon = computed(() => {
  return store.totalAssetListTargetPercentage === 100
})
</script>
