<template>
  <section id="asset-list">
    <header>
      <SearchbarInput />
      <SearchbarContent />
    </header>

    <TableFilters />

    <div class="asset-container">
      <PublicAssetRow
        v-if="publicAssetHoldingsExist"
        v-for="assetHolding in store.publicAssetHoldings"
        :asset-holding="assetHolding"
        :key="assetHolding.holdingUuid"
      />

      <PrivateAssetRow
        v-if="privateAssetHoldingsExist"
        v-for="assetHolding in store.privateAssetHoldings"
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
import AssetGroup from '@/components/wrappers/AssetGroup.vue'
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import TableFilters from '@/components/wrappers/TableFilters.vue'
import { computed, onMounted } from 'vue'
import AssetService from '@/services/FetchAssetService'
import { useAssetStore } from '@/stores/AssetStore'
import IconCheck from '@/assets/icons/IconCheck.vue'
import PublicAssetRow from '@/components/wrappers/PublicHolding.vue'
import PrivateAssetRow from '@/components/wrappers/PrivateHolding.vue'

const store = useAssetStore()

const testDeviation = ['08', '62', '1']

onMounted(async () => {
  store.publicAssetHoldings = await AssetService.fetchPublicAssetHoldings()
  store.privateAssetHoldings = await AssetService.fetchPrivateAssetHoldings()
  store.assetHoldingGroups = await AssetService.fetchAssetHoldingGroups()
})

const publicAssetHoldingsExist = computed(() => {
  return store.publicAssetHoldings.length !== 0
})

const privateAssetHoldingsExist = computed(() => {
  return store.privateAssetHoldings.length !== 0
})
</script>

<style lang="scss">
@import '@/assets/scss/views/asset-list.scss';
</style>
