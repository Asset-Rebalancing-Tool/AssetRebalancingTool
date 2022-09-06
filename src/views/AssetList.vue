<template>
  <section id="asset-list">
    <header>
      <SearchbarInput />
      <SearchbarContent />
    </header>

    <TableFilters />

    <div class="holding-container">
      <PublicHolding
        v-if="publicHoldingsExist"
        v-for="assetHolding in store.publicHoldings"
        :asset-holding="assetHolding"
        :key="assetHolding.holdingUuid"
      />

      <PrivateHolding
        v-if="privateHoldingsExist"
        v-for="assetHolding in store.privateHoldings"
        :asset-holding="assetHolding"
        :key="assetHolding.holdingUuid"
      />
    </div>

    <footer>
      <h4>Portfoliowert</h4>
      <span></span>
      <span></span>
      <span class="total-value">16.802,36 €</span>
      <span class="total-percentage">100,00 % <IconCheck /></span>
      <ThreeDigitValue :value-array="testDeviation" :unit="'%'" :arrow="'up'">
        <template #arrow>
          <IconAssetRowArrow />
        </template>
      </ThreeDigitValue>
    </footer>
  </section>
</template>

<script setup>
import SearchbarInput from '@/components/inputs/SearchbarInput.vue'
import SearchbarContent from '@/components/wrappers/SearchbarContent.vue'
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import TableFilters from '@/components/wrappers/TableFilters.vue'
import { computed, onMounted } from 'vue'
import AssetService from '@/services/FetchAssetService'
import { useAssetStore } from '@/stores/AssetStore'
import IconCheck from '@/assets/icons/IconCheck.vue'
import PublicHolding from '@/components/wrappers/PublicHolding.vue'
import PrivateHolding from '@/components/wrappers/PrivateHolding.vue'

const store = useAssetStore()

const testDeviation = ['08', '62', '1']

onMounted(async () => {
  store.publicHoldings = await AssetService.fetchPublicAssetHoldings()
  store.privateHoldings = await AssetService.fetchPrivateAssetHoldings()
  store.assetHoldingGroups = await AssetService.fetchAssetHoldingGroups()
})

const publicHoldingsExist = computed(() => {
  return store.publicHoldings.length !== 0
})

const privateHoldingsExist = computed(() => {
  return store.privateHoldings.length !== 0
})
</script>

<style lang="scss">
@import '@/assets/scss/views/asset-list.scss';
</style>
