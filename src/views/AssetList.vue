<template>
  <section id="asset-list">
    <header>
      <SearchbarInput />
      <SearchbarContent />
    </header>

    <TableFilters />

    <div class="holding-container">
      <div
        v-if="!showSkeletonAnimation"
        v-for="[uuid, entry] in assetList"
        :key="uuid"
      >
        <HoldingGroup
            v-if="entry.entryType === EntryTypeEnum.HOLDING_GROUP"
            :uuid="uuid"
            :nested-holding-count="0"
        >
          <template #holdings>
            <div
                v-for="groupEntry in entry.groupEntries"
                :key="groupEntry.uuid"
            >
              <PublicHolding
                  v-if="groupEntry.entryType === EntryTypeEnum.PUBLIC_HOLDING"
                  :uuid="groupEntry.uuid"
              />
              <PrivateHolding
                  v-if="groupEntry.entryType === EntryTypeEnum.PRIVATE_HOLDING"
                  :uuid="groupEntry.uuid"
              />
            </div>
          </template>
      </HoldingGroup>

        <PublicHolding
          v-if="entry.entryType === EntryTypeEnum.PUBLIC_HOLDING"
          :uuid="uuid"
          @click="addHoldingToGroup(uuid)"
        />
        <PrivateHolding
          v-if="entry.entryType === EntryTypeEnum.PRIVATE_HOLDING"
          :uuid="uuid"
          @click="addHoldingToGroup(uuid)"
        />
      </div>

      <ListEntrySkeleton
        v-show="showSkeletonAnimation"
        v-for="index in 5"
        :key="index"
      />
    </div>

    <ListFooter />

    <FlashMessage v-if="showFlashMessage" />
  </section>
</template>

<script lang="ts" setup>
import SearchbarInput from '@/components/inputs/SearchbarInput.vue'
import SearchbarContent from '@/components/wrappers/asset-list/searchbar/SearchbarContent.vue'
import ListEntrySkeleton from '@/components/wrappers/asset-list/list-entries/ListEntrySkeleton.vue'
import TableFilters from '@/components/wrappers/TableFilters.vue'
import { computed, onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import {addHoldingGroup, addPrivateHolding, addPublicHolding, generateAssetMap} from '@/composables/UseAssetMap'
import { useAssetMapStore } from '@/stores/AssetMapStore'
import ListFooter from '@/components/wrappers/ListFooter.vue'
import PublicHolding from '@/components/wrappers/asset-list/list-entries/PublicHolding.vue'
import { EntryTypeEnum } from '@/models/enums/EntryTypeEnum'
import type { AssetMapEntry } from '@/models/AssetMapEntry'
import type { AssetList } from '@/models/holdings/AssetList'
import PrivateHolding from '@/components/wrappers/asset-list/list-entries/PrivateHolding.vue'
import FlashMessage from '@/components/wrappers/FlashMessage.vue'
import { useFlashMessageStore } from '@/stores/FlashMessageStore'
import HoldingGroup from "@/components/wrappers/asset-list/list-entries/groups/HoldingGroup.vue";
import type { HoldingGroup as HoldingGroupType } from "@/models/holdings/HoldingGroup";
import PatchAssetService from "@/services/PatchAssetService";
import type { HoldingGroupRequest } from "@/requests/HoldingGroupRequest";

const store = useAssetMapStore()
const FlashMessageStore = useFlashMessageStore()

const assetList: Ref<Map<string, AssetList>> = ref(new Map<string, AssetList>())

onMounted(async () => {
  await generateAssetMap()
  assetList.value = store.assetList
})

// Bool that indicates if the list is loading
const showSkeletonAnimation = computed(() => store.listLoadingFlag)

const showFlashMessage = computed(() => {
  return FlashMessageStore.flashMessage.showFlashMessage
})

/**
 * Add a public or private list entry to the selected holding group
 */
function addHoldingToGroup(entryUuid: string): void {
  // Always return if no group is selected
  if (!store.editGroupEntries) return

  const clickedEntry: AssetMapEntry | null = store.getAssetMapEntryByUuid(entryUuid)
  const selectedGroup: HoldingGroup = store.selectedGroup

  if (clickedEntry) {
    switch (clickedEntry.entryType) {
      case EntryTypeEnum.PUBLIC_HOLDING:
        let publicHolding = clickedEntry as PublicHolding
        selectedGroup.publicHoldings.push(publicHolding)
        break;
      case EntryTypeEnum.PRIVATE_HOLDING:
        let privateHolding = clickedEntry as PrivateHolding
        selectedGroup.privateHoldings.push(privateHolding)
        break;
    }
  }

  addHoldingGroup(store, selectedGroup)
}

// The patch owned quantity request body
function patchHoldingGroupRequest(holdingGroup: HoldingGroup, mapEntry: AssetMapEntry): HoldingGroupRequest {
  let publicUuids: string[] = []
  let privateUuids: string[] = []

  switch (mapEntry.entryType) {
    case EntryTypeEnum.PUBLIC_HOLDING:
      holdingGroup.publicHoldings.forEach((publicHolding: PublicHolding) => {
        addPublicHolding(store, publicHolding)
        publicUuids.push(publicHolding.uuid)
      })
      break;
    case EntryTypeEnum.PRIVATE_HOLDING:
      holdingGroup.publicHoldings.forEach((privateHolding: PrivateHolding) => {
        addPrivateHolding(store, privateHolding)
        publicUuids.push(privateHolding.uuid)
      })
      break;
  }

  return {
    publicHoldingUuids: publicUuids,
    privateHoldingUuids: privateUuids,
    groupName: holdingGroup.groupName,
    targetPercentage: holdingGroup.targetPercentage
  } as HoldingGroupRequest
}
</script>

<style lang="scss">
@import '@/assets/scss/views/asset-list.scss';
</style>
