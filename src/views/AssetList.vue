<template>
  <section id="asset-list">
    <header>
      <SearchbarInput />
      <SearchbarContent />
    </header>

    <TableFilters />

    <div class="holding-container">
      <ListEntry
        v-for="(entry, index) in listEntries"
        :key="entry.uuid"
        :index="index"
        :list-entry="entry"
      />
    </div>

    <ListFooter />
  </section>
</template>

<script lang="ts" setup>
import SearchbarInput from '@/components/inputs/SearchbarInput.vue'
import SearchbarContent from '@/components/wrappers/asset-list/searchbar/SearchbarContent.vue'
import TableFilters from '@/components/wrappers/TableFilters.vue'
import ListEntry from '@/components/wrappers/asset-list/list-entries/ListEntry.vue'
import { computed, onMounted } from 'vue'
import { generateListEntries } from '@/composables/UseListEntries'
import { useAssetStore } from '@/stores/AssetStore'
import ListFooter from '@/components/wrappers/ListFooter.vue'

const store = useAssetStore()

onMounted(async () => {
  // Fetch and merge all groups, private and public holdings
  store.listState.assetListEntries = await generateListEntries()
  // Update the total list values
  store.updateTotalValue()
  store.updateTotalTargetPercentage()
})

const listEntries = computed(() => store.listState.assetListEntries)
</script>

<style lang="scss">
@import '@/assets/scss/views/asset-list.scss';
</style>
