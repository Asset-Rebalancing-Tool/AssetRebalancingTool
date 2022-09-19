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
import AssetService from '@/services/FetchAssetService'
import IconCheck from '@/assets/icons/IconCheck.vue'
import PublicHolding from '@/components/wrappers/PublicHolding.vue'
import PrivateHolding from '@/components/wrappers/PrivateHolding.vue'
import HoldingGroup from '@/components/wrappers/HoldingGroup.vue'
import ListEntry from "@/components/wrappers/ListEntry.vue";
import { computed, onMounted } from 'vue'
import { formatValueArray } from '@/composables/UseValueArray'
import { useAssetStore } from '@/stores/AssetStore'
import { AssetListEntryTypeEnum } from '@/models/enums/AssetListEntryTypeEnum'
import type { AssetListEntry } from '@/models/holdings/AssetListEntry'

const store = useAssetStore()

onMounted(async () => {
  store.assetListEntries = await generateHoldingRow()
  store.updateTotalValue()
  store.updateTotalTargetPercentage()
})

async function generateHoldingRow() {
  const genericHoldingRows: AssetListEntry[] = []
  const holdingGroups: HoldingGroup[] = await AssetService.fetchHoldingGroups()
  const publicHoldings: PublicHolding[] =
    await AssetService.fetchPublicHoldings()
  const privateHoldings: PrivateHolding[] =
    await AssetService.fetchPrivateHoldings()

  holdingGroups.forEach((group) => {
    genericHoldingRows.push({
      uuid: group.uuid,
      entryType: AssetListEntryTypeEnum.HOLDING_GROUP,
      holdingGroup: group,
    } as AssetListEntry)
  })

  publicHoldings.forEach((holding) => {
    genericHoldingRows.push({
      uuid: holding.uuid,
      entryType: AssetListEntryTypeEnum.PUBLIC_HOLDING,
      publicHolding: holding,
    } as AssetListEntry)
  })

  privateHoldings.forEach((holding) => {
    genericHoldingRows.push({
      uuid: holding.uuid,
      entryType: AssetListEntryTypeEnum.PRIVATE_HOLDING,
      privateHolding: holding,
    } as AssetListEntry)
  })

  return genericHoldingRows
}

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
