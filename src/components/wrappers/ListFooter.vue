<template>
  <footer>
    <h4>Portfoliowert</h4>
    <span></span>
    <span></span>
    <span class="total-value">{{ totalValue }} &nbsp 100,00%</span>
    <span class="total-percentage"
    >{{ totalPercentage }}<IconCheck v-show="showPercentageCheckIcon"
    /></span>
    <ThreeDigitValue :value-array="totalDeviation" :unit="'%'" :arrow="'up'">
      <template #arrow>
        <IconAssetRowArrow />
      </template>
    </ThreeDigitValue>
  </footer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { formatValueArray } from '@/composables/UsePriceRecords';
import { useAssetStore } from "@/stores/AssetStore";
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import IconCheck from '@/assets/icons/IconCheck.vue'

const store = useAssetStore()

// Get the total asset list value
const totalValue = computed(() => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(store.listState.totalAssetListValue)
})

// Get the total asset list percentage
const totalPercentage = computed(() => {
  return (
      new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(
          store.listState.totalAssetListPercentage
      ) + ' %'
  )
})

// Get the total asset list deviation
const totalDeviation = computed(() => {
  return formatValueArray(store.listState.totalAssetListDeviation)
})

// Bool that indicates if the percentage check icon should be rendered
const showPercentageCheckIcon = computed(
    () => store.listState.totalAssetListPercentage === 100
)

</script>
