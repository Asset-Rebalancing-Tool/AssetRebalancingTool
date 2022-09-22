<template>
  <HoldingGroup
    v-if="listEntry.entryType === EntryTypeEnum.HOLDING_GROUP"
    :key="listEntry.uuid"
    :holding="listEntry"
    :nested-holding-count="groupHoldingCount"
  >
    <template #holdings>
      <ListEntry
        v-for="(entry, index) in mergeChildHoldings(
          listEntry.holdingGroup.uuid
        )"
        :key="entry.uuid"
        :index="index"
        :list-entry="entry"
        :nested-holding="true"
      />
    </template>
  </HoldingGroup>

  <PublicHolding
    v-if="listEntry.entryType === EntryTypeEnum.PUBLIC_HOLDING"
    :key="listEntry.uuid"
    :holding="listEntry.publicHolding"
    @click="addOrRemoveHolding()"
  />

  <PrivateHolding
    v-if="listEntry.entryType === EntryTypeEnum.PRIVATE_HOLDING"
    :key="listEntry.uuid"
    :holding="listEntry.privateHolding"
    @click="addOrRemoveHolding()"
  />
</template>

<script lang="ts" setup>
import PatchAssetService from '@/services/PatchAssetService'
import HoldingGroup from '@/components/wrappers/asset-list/list-entries/groups/HoldingGroup.vue'
import PublicHolding from '@/components/wrappers/asset-list/list-entries/PublicHolding.vue'
import PrivateHolding from '@/components/wrappers/asset-list/list-entries/PrivateHolding.vue'
import { ref } from 'vue'
import type { HoldingGroup as HoldingGroupType } from '@/models/holdings/HoldingGroup'
import type { PublicHolding as PublicHoldingType } from '@/models/holdings/PublicHolding'
import type { PrivateHolding as PrivateHoldingType } from '@/models/holdings/PrivateHolding'
import { EntryTypeEnum } from '@/models/enums/EntryTypeEnum'
import type { AssetListEntry } from '@/models/holdings/AssetListEntry'
import type { Ref, PropType } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import type { HoldingGroupRequest } from '@/requests/HoldingGroupRequest'
import type { PublicHoldingRequest } from '@/requests/PublicHoldingRequest'
import type { PrivateHoldingRequest } from '@/requests/PrivateHoldingRequest'

const store = useAssetStore()
const props = defineProps({
  listEntry: {
    type: Object as PropType<AssetListEntry>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  nestedHolding: {
    type: Boolean,
    default: false,
  },
})

const groupHoldingCount: Ref<number> = ref(0)

/**
 * Merge the public and private holdings of a holding group in order to iterate over one list
 * This is needed to render the holdings in a specific order
 *
 * @param groupUuid string
 *
 * @return AssetListEntry[]
 */
function mergeChildHoldings(groupUuid: string): AssetListEntry[] {
  const mergedHoldings: AssetListEntry[] =
    store.mergePublicAndPrivateHoldings(groupUuid)
  // Always set the group holding count
  groupHoldingCount.value = mergedHoldings.length
  return mergedHoldings
}

/**
 * Check if the clicked row is nested in a group to determine if it should be added or removed
 *
 * @return void
 */
function addOrRemoveHolding(): void {
  props.nestedHolding ? removeHoldingFromGroup() : addListEntryToGroup()
}

/**
 * Add a public or private list entry to the selected holding group
 */
function addListEntryToGroup(): void {
  const selectedGroupUuid: string | null = store.selectionState.groupUuid
  if (selectedGroupUuid) {
    store.addListEntryToGroup(props.listEntry, selectedGroupUuid)
  }
}

/**
 * Remove a public or private list entry from the selected holding group
 */
function removeHoldingFromGroup(): void {
  const selectedGroupUuid: string | null = store.selectionState.groupUuid
  if (selectedGroupUuid) {
    store.removeHoldingFromGroup(props.listEntry, selectedGroupUuid)
  }
}
</script>
