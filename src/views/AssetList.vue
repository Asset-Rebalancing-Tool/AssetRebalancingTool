<template>
  <section id="asset-list">
    <header>
      <SearchbarInput />
      <SearchbarContent />
    </header>

    <TableFilters />

    <div class="holding-container">

      <div
          v-if="!isLoading"
          v-for="[uuid, entry] in assetList"
          :key="uuid"
      >
        <PublicHoldingN
            v-if="entry.entryType === EntryTypeEnum.PUBLIC_HOLDING"
            :uuid="uuid"
        />
      </div>
    </div>

    <ListFooter />
  </section>
</template>

<script lang="ts" setup>
import SearchbarInput from '@/components/inputs/SearchbarInput.vue'
import SearchbarContent from '@/components/wrappers/asset-list/searchbar/SearchbarContent.vue'
import TableFilters from '@/components/wrappers/TableFilters.vue'
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import { generateAssetMap } from '@/composables/UseAssetMap'
import { useAssetMapStore } from '@/stores/AssetMapStore'
import ListFooter from '@/components/wrappers/ListFooter.vue'
import PublicHoldingN from "@/components/wrappers/asset-list/list-entries/PublicHoldingN.vue";
import { EntryTypeEnum } from "@/models/enums/EntryTypeEnum";
import type { AssetMapEntry } from "@/models/enums/AssetMapEntry"
import type { AssetList } from "@/models/holdings/AssetList";

const store = useAssetMapStore()
let assetList: Ref<Map<string, AssetList>> = ref(new Map<string, AssetList>)
let isLoading: Ref<boolean> = ref(true)

onMounted(async () => {
  await generateAssetMap()
  assetList.value = store.assetList
  isLoading.value = false
})

/**
 * Add a public or private list entry to the selected holding group
 */
function addAssetMapEntry(uuid: string, entry: AssetMapEntry): void {
  store.addAssetMapEntry(uuid, entry)
}

</script>

<style lang="scss">
@import '@/assets/scss/views/asset-list.scss';
</style>
