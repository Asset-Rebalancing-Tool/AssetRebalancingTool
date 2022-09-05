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

    <footer></footer>
  </section>
</template>

<script setup>
import SearchbarInput from '@/components/inputs/SearchbarInput.vue'
import SearchbarContent from '@/components/wrappers/SearchbarContent.vue'
import AssetRow from '@/components/wrappers/AssetRow.vue'
import AssetGroup from '@/components/wrappers/AssetGroup.vue'
import TableFilters from '@/components/wrappers/TableFilters.vue'
import { computed, onMounted } from "vue";
import AssetService from "@/services/AssetService";
import { useAssetStore } from "@/stores/AssetStore";

const store = useAssetStore()

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
