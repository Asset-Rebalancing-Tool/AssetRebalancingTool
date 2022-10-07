<template>
  <section id="asset-list">
    <header>
      <SearchbarInput />
      <SearchbarContent />
    </header>

    <TableFilters />

    <div class="holding-container">
      <div v-if="!showSkeletonAnimation" v-for="[uuid, entry] in assetList" :key="uuid">
        <PublicHolding
          v-if="entry.entryType === EntryTypeEnum.PUBLIC_HOLDING"
          :uuid="uuid"
        />
        <PrivateHolding
            v-if="entry.entryType === EntryTypeEnum.PRIVATE_HOLDING"
            :uuid="uuid"
        />
      </div>

      <ListEntrySkeleton
          v-show="showSkeletonAnimation"
          v-for="index in 5"
          :key="index"
      />
    </div>

    <ListFooter />
  </section>
</template>

<script lang="ts" setup>
import SearchbarInput from '@/components/inputs/SearchbarInput.vue'
import SearchbarContent from '@/components/wrappers/asset-list/searchbar/SearchbarContent.vue'
import ListEntrySkeleton from '@/components/wrappers/asset-list/list-entries/ListEntrySkeleton.vue'
import TableFilters from '@/components/wrappers/TableFilters.vue'
import {computed, onMounted, ref} from 'vue'
import type { Ref } from 'vue'
import { generateAssetMap } from '@/composables/UseAssetMap'
import { useAssetMapStore } from '@/stores/AssetMapStore'
import ListFooter from '@/components/wrappers/ListFooter.vue'
import PublicHolding from '@/components/wrappers/asset-list/list-entries/PublicHolding.vue'
import { EntryTypeEnum } from '@/models/enums/EntryTypeEnum'
import type { AssetMapEntry } from '@/models/enums/AssetMapEntry'
import type { AssetList } from '@/models/holdings/AssetList'
import PrivateHolding from "@/components/wrappers/asset-list/list-entries/PrivateHolding.vue";

const store = useAssetMapStore()
const assetList: Ref<Map<string, AssetList>> = ref(new Map<string, AssetList>())

onMounted(async () => {
  await generateAssetMap()
  assetList.value = store.assetList
})

// Bool that indicates if the list is loading
const showSkeletonAnimation = computed(
    () => store.listLoadingFlag
)

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
