<template>
  <section id="asset-list">

    <header>
      <SearchbarInput />
      <SearchbarContent />
    </header>

    <TableFilters />

    <div class="asset-container">
      <AssetRow
          :asset-holding="assetHolding"
          v-if="assetHoldingsExist"
          v-for="assetHolding in store.publicAssetHoldings"
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
import AssetRow from '@/components/wrappers/AssetRow.vue'
import AssetGroup from '@/components/wrappers/AssetGroup.vue'
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import TableFilters from '@/components/wrappers/TableFilters.vue'
import { computed, onMounted } from 'vue';
import AssetService from '@/services/AssetService';
import { useAssetStore } from '@/stores/AssetStore';
import IconCheck from '@/assets/icons/IconCheck.vue';

const store = useAssetStore()

let testDeviation = ['08', '62', '1']

onMounted(async () => {
  store.publicAssetHoldings = await AssetService.fetchPublicAssetHoldings()
  store.assetHoldingGroups = await AssetService.fetchAssetHoldingGroups()
})

const assetHoldingsExist = computed(() => {
  return store.publicAssetHoldings.length !== 0
})
</script>

<style lang="scss">
@import '@/assets/scss/views/asset-list.scss';
</style>
