<template>
  <section id="asset-list">
    <header>
      <SearchbarInput />
      <SearchbarContent />
    </header>

    <TableFilters />

    <div class="holding-container">
      <ListEntry
          v-for="holding in store.assetListEntries"
          :key="holding.uuid"
          :holding="holding"
      />
    </div>

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
  </section>
</template>

<script lang="ts" setup>
import SearchbarInput from '@/components/inputs/SearchbarInput.vue'
import SearchbarContent from '@/components/wrappers/SearchbarContent.vue'
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import TableFilters from '@/components/wrappers/TableFilters.vue'
import IconCheck from '@/assets/icons/IconCheck.vue'
import ListEntry from "@/components/wrappers/ListEntry.vue";
import { computed, onMounted } from 'vue'
import { formatValueArray } from '@/composables/UsePriceRecords'
import { mergeListEntries } from '@/composables/UseListEntries'
import { useAssetStore } from '@/stores/AssetStore'

const store = useAssetStore()

onMounted(async () => {
  store.assetListEntries = await mergeListEntries()
  store.updateTotalValue()
  store.updateTotalTargetPercentage()
})

const totalValue = computed(() => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(store.totalAssetListValue)
})

const totalPercentage = computed(() => {
  return (
    new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(
      store.totalAssetListPercentage
    ) + ' %'
  )
})

const showPercentageCheckIcon = computed(
  () => store.totalAssetListPercentage === 100
)

const totalDeviation = computed(() => {
  return formatValueArray(store.totalAssetListDeviation)
})
</script>

<style lang="scss">
@import '@/assets/scss/views/asset-list.scss';
</style>
