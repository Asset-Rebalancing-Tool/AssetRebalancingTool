<template>
  <section id="asset-list">
    <header>
      <SearchbarInput />
      <SearchbarContent />
    </header>

    <TableFilters v-if="!showEmptyAssetListBc" :show-shadow="showContainerShadow" />

    <div class="holding-container">
      <div
        v-if="!showLoadingAnimation"
        v-for="[uuid, entry] in assetList"
        :key="uuid"
      >
        <HoldingGroup
          :uuid="uuid"
          v-if="entry.entryType === EntryTypeEnum.HOLDING_GROUP"
          :nested-holding-count="getNestedHoldingCount(uuid)"
        >
          <template #holdings>
            <div
              v-for="groupEntry in entry.groupEntries"
              :key="groupEntry.uuid"
            >
              <PublicHolding
                :group-uuid="uuid"
                :uuid="groupEntry.uuid"
                v-if="groupEntry.entryType === EntryTypeEnum.PUBLIC_HOLDING"
                @click="
                  executeAction(
                    true,
                    groupEntry.uuid,
                    groupEntry.entryType,
                    uuid
                  )
                "
              />
              <PrivateHolding
                :group-uuid="uuid"
                :uuid="groupEntry.uuid"
                v-if="groupEntry.entryType === EntryTypeEnum.PRIVATE_HOLDING"
                @click="
                  executeAction(
                    true,
                    groupEntry.uuid,
                    groupEntry.entryType,
                    uuid
                  )
                "
              />
            </div>
          </template>
        </HoldingGroup>

        <PublicHolding
          :uuid="uuid"
          v-if="entry.entryType === EntryTypeEnum.PUBLIC_HOLDING"
          @click="executeAction(false, uuid)"
        />
        <PrivateHolding
          :uuid="uuid"
          v-if="entry.entryType === EntryTypeEnum.PRIVATE_HOLDING"
          @click="executeAction(false, uuid)"
        />
      </div>

      <ListEntrySkeleton
        v-show="showLoadingAnimation"
        v-for="index in 5"
        :key="index"
      />

      <EmptyAssetList v-if="showEmptyAssetListBc" />
    </div>

    <ListFooter v-if="!showEmptyAssetListBc" :show-shadow="showContainerShadow" />

    <FlashMessage v-if="showFlashMessage" />
  </section>
</template>

<script lang="ts" setup>
import type { ComputedRef, Ref } from 'vue'
import { computed, onMounted } from 'vue'
import { EntryTypeEnum } from '@/models/holdings/EntryTypeEnum'
import type { AssetRenderingEntry } from '@/models/holdings/AssetRenderingEntry'
import SearchbarInput from '@/components/inputs/SearchbarInput.vue'
import SearchbarContent from '@/components/wrappers/asset-list/searchbar/SearchbarContent.vue'
import ListEntrySkeleton from '@/components/wrappers/asset-list/list-entries/ListEntrySkeleton.vue'
import TableFilters from '@/components/wrappers/TableFilters.vue'
import PublicHolding from '@/components/wrappers/asset-list/list-entries/PublicHolding.vue'
import HoldingGroup from '@/components/wrappers/asset-list/list-entries/groups/HoldingGroup.vue'
import PrivateHolding from '@/components/wrappers/asset-list/list-entries/PrivateHolding.vue'
import ListFooter from '@/components/wrappers/asset-list/ListFooter.vue'
import EmptyAssetList from '@/components/wrappers/EmptyAssetList.vue'
import FlashMessage from '@/components/wrappers/FlashMessage.vue'
import { useAssetStore } from '@/stores/AssetStore'
import { useNotificationStore } from '@/stores/NotificationStore'
import { generateAssetRenderList } from '@/composables/assets/UseAssetRenderList'
import { executeAction } from '@/composables/assets/UseHoldings'
import type { AssetPoolEntry } from "@/models/AssetPoolEntry";

/**-***************************************************-**/
/** ----------- Store And List Declarations ----------- **/
/**-***************************************************-**/

// Initialize the store objects
const assetStore = useAssetStore()
const notificationStore = useNotificationStore()

// The asset list that is getting rendered
const assetList: Ref<Map<string, AssetRenderingEntry>> = computed(
  () => assetStore.renderState.assetList
)

// Fetch and generate the asset list
onMounted(async () => {
  await generateAssetRenderList()
  assetList.value = assetStore.renderState.assetList
})

/**-***************************************************-**/
/** ------------- Holding Action Handling ------------- **/
/**-***************************************************-**/

// Store state variables
const renderState = assetStore.renderState
const flashMessage = notificationStore.flashMessage

// Handle template display
const showLoadingAnimation = computed(() => renderState.loadingFlag)
const showFlashMessage = computed(() => flashMessage.showFlag)
const showEmptyAssetListBc = computed(() => {
  const flag = !renderState.loadingFlag && renderState.assetList.size === 0
  if (flag) {
    assetStore.sumState.totalValue = 0
    assetStore.sumState.totalTargetPercentage = 0
    assetStore.sumState.totalDeviation = 0
  }
  return flag
})

/**-***************************************************-**/
/** --------------- Template Methods ------------------ **/
/**-***************************************************-**/

/**
 * Get the count of assets, that are nested in a specific group
 *
 * @param groupUuid string
 *
 * @return number
 */
function getNestedHoldingCount(groupUuid: string) {
  if (assetStore.renderState.assetList.has(groupUuid)) {
    const group = assetStore.renderState.assetList.get(groupUuid)
    if (group && group.groupEntries) {
      return group.groupEntries.length
    }
  }
  return 0
}



const showContainerShadow: ComputedRef<boolean> = computed(() => {
  let containerHeight = 0
  assetStore.assetPool.forEach((entry: AssetPoolEntry) => {
    switch (entry.entryType) {
      case EntryTypeEnum.PUBLIC_HOLDING:
      case EntryTypeEnum.PRIVATE_HOLDING:
        containerHeight = containerHeight + 80
        break
      case EntryTypeEnum.HOLDING_GROUP:
        containerHeight = containerHeight + 114
        break
    }
  })
  return containerHeight > document.documentElement.clientHeight - 202 && !assetStore.renderState.loadingFlag
})

</script>

<style lang="scss">
@import '@/assets/scss/views/asset-list.scss';
</style>
