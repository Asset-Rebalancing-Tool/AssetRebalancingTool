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
          :nested-holding-count="getNestedHoldingCount(uuid)"
        >
          <template #holdings>
            <div
              v-for="groupEntry in entry.groupEntries"
              :key="groupEntry.uuid"
            >
              <PublicHolding
                v-if="groupEntry.entryType === EntryTypeEnum.PUBLIC_HOLDING"
                :uuid="groupEntry.uuid"
                @click="
                  removeHoldingFromGroup(
                    uuid,
                    groupEntry.uuid,
                    groupEntry.entryType
                  )
                "
              />
              <PrivateHolding
                v-if="groupEntry.entryType === EntryTypeEnum.PRIVATE_HOLDING"
                :uuid="groupEntry.uuid"
                @click="
                  removeHoldingFromGroup(
                    uuid,
                    groupEntry.uuid,
                    groupEntry.entryType
                  )
                "
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
import {
  addHoldingGroup,
  generateAssetMap,
  buildGroupPatchUuidArray,
  pushHoldingToSelectedGroup,
  moveGroupEntryToAssetList,
} from '@/composables/UseAssetMap'
import { useAssetMapStore } from '@/stores/AssetMapStore'
import ListFooter from '@/components/wrappers/asset-list/ListFooter.vue'
import PublicHolding from '@/components/wrappers/asset-list/list-entries/PublicHolding.vue'
import { EntryTypeEnum } from '@/models/enums/EntryTypeEnum'
import type { AssetMapEntry } from '@/models/AssetMapEntry'
import type { AssetListEntry } from '@/models/holdings/AssetListEntry'
import PrivateHolding from '@/components/wrappers/asset-list/list-entries/PrivateHolding.vue'
import FlashMessage from '@/components/wrappers/FlashMessage.vue'
import { useFlashMessageStore } from '@/stores/FlashMessageStore'
import HoldingGroup from '@/components/wrappers/asset-list/list-entries/groups/HoldingGroup.vue'
import PatchAssetService from '@/services/PatchAssetService'
import type { HoldingGroupRequest } from '@/requests/HoldingGroupRequest'

const store = useAssetMapStore()
const FlashMessageStore = useFlashMessageStore()

const assetList: Ref<Map<string, AssetListEntry>> = ref(
  new Map<string, AssetListEntry>()
)

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
 *
 * @param entryUuid string
 *
 * @return void
 */
function addHoldingToGroup(entryUuid: string): void {
  // Always return if no group is selected
  if (!store.editGroupEntries) return

  // Get the currently edited group and the holding that has been clicked
  const clickedHolding: AssetMapEntry | null =
    store.getAssetMapEntryByUuid(entryUuid)
  const group: HoldingGroup = store.selectedGroup

  if (clickedHolding && group) {
    // Push the clicked holding to the selected group
    pushHoldingToSelectedGroup(clickedHolding, group)
    // Remove the holding group from the asset list, which is getting rendered
    store.assetList.delete(clickedHolding.uuid)
    // Add the modified holding group to the asset map and the asset list
    addHoldingGroup(store, group)
    // Patch the holding group entry
    PatchAssetService.patchHoldingGroup(
      patchHoldingGroupRequest(group),
      group.uuid
    )
  }
}

/**
 * Remove a public or private list entry from the selected holding group
 *
 * @param groupUuid string
 * @param entryUuid string
 * @param entryType EntryTypeEnum
 *
 * @return void
 */
function removeHoldingFromGroup(
  groupUuid: string,
  entryUuid: string,
  entryType: EntryTypeEnum
): void {
  // Always return if no group is selected
  if (!store.editGroupEntries) return

  if (store.assetList.has(groupUuid)) {
    const group = store.assetList.get(groupUuid)
    if (group && group.groupEntries) {
      // Remove the whole holding entry from the selected group
      moveGroupEntryToAssetList(store, group, entryUuid, entryType)

      // Patch the holding group entry
      PatchAssetService.patchHoldingGroup(
        patchHoldingGroupRequest(store.selectedGroup),
        group.uuid
      )
    }
  }
}

/**
 * The patch owned quantity request body
 *
 * @param holdingGroup HoldingGroup
 *
 * @return HoldingGroupRequest
 */
function patchHoldingGroupRequest(
  holdingGroup: HoldingGroup
): HoldingGroupRequest {
  const publicUuids: string[] = buildGroupPatchUuidArray(
    holdingGroup,
    EntryTypeEnum.PUBLIC_HOLDING
  )
  const privateUuids: string[] = buildGroupPatchUuidArray(
    holdingGroup,
    EntryTypeEnum.PRIVATE_HOLDING
  )
  return {
    publicHoldingUuids: publicUuids,
    privateHoldingUuids: privateUuids,
    groupName: holdingGroup.groupName,
    targetPercentage: holdingGroup.targetPercentage,
  } as HoldingGroupRequest
}

/**
 * Get the count of holdings, that are nested in a specific group
 *
 * @param groupUuid string
 *
 * @return number
 */
function getNestedHoldingCount(groupUuid: string) {
  if (store.assetList.has(groupUuid)) {
    const group = store.assetList.get(groupUuid)
    if (group && group.groupEntries) {
      return group.groupEntries.length
    }
  }
  return 0
}
</script>

<style lang="scss">
@import '@/assets/scss/views/asset-list.scss';
</style>
