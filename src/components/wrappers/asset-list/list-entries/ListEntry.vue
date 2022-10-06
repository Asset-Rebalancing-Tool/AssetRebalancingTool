<template>
  <HoldingGroup
    v-if="listEntry.entryType === EntryTypeEnum.HOLDING_GROUP"
    :key="listEntry.uuid"
    :holding="listEntry"
    :nested-holding-count="groupEntryCount"
  >
    <template #holdings>
      <GroupEntry
        v-for="(entry, index) in mergeChildHoldings(
          listEntry.holdingGroup.uuid
        )"
        :key="entry.uuid"
        :index="index"
        :group-entry="entry"
        :nested-holding="true"
      />
    </template>
  </HoldingGroup>

  <PublicHolding
    v-if="listEntry.entryType === EntryTypeEnum.PUBLIC_HOLDING"
    :key="listEntry.uuid"
    :holding="listEntry.publicHolding"
    @click="addListEntryToGroup"
  />

  <PrivateHolding
    v-if="listEntry.entryType === EntryTypeEnum.PRIVATE_HOLDING"
    :key="listEntry.uuid"
    :holding="listEntry.privateHolding"
    @click="addListEntryToGroup"
  />
</template>

<script lang="ts" setup>
import HoldingGroup from '@/components/wrappers/asset-list/list-entries/groups/HoldingGroup.vue'
import PublicHolding from '@/components/wrappers/asset-list/list-entries/PublicHolding.vue'
import PrivateHolding from '@/components/wrappers/asset-list/list-entries/PrivateHolding.vue'
import { ref } from 'vue'
import { EntryTypeEnum } from '@/models/enums/EntryTypeEnum'
import type { AssetListEntry } from '@/models/AssetListEntry'
import type { Ref, PropType } from 'vue'
import { useAssetStore } from '@/stores/SearchbarStore'
import GroupEntry from '@/components/wrappers/asset-list/list-entries/groups/GroupEntry.vue'
import PatchAssetService from '@/services/PatchAssetService'
import type { HoldingGroupRequest } from '@/requests/HoldingGroupRequest'

/**-***************************************************-**/
/** ----------- Props And Store Declaration ----------- **/
/**-***************************************************-**/

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
})

// The count of the group entry list
const groupEntryCount: Ref<number> = ref(0)

/**-***************************************************-**/
/** ------------- Template Render Actions ------------- **/
/**-***************************************************-**/

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
  groupEntryCount.value = mergedHoldings.length
  return mergedHoldings
}

/**
 * Add a public or private list entry to the selected holding group
 */
function addListEntryToGroup(): void {
  if (store.selectionState.group) {
    const selectedGroupUuid: string | null = store.selectionState.group.uuid
    if (selectedGroupUuid) {
      store.addListEntryToGroup(props.listEntry, selectedGroupUuid)
      PatchAssetService.patchHoldingGroup(
        patchHoldingGroupRequest(),
        selectedGroupUuid
      )
    }
  }
}

/**-***************************************************-**/
/** ------------- Group Patch Requests ---------------- **/
/**-***************************************************-**/

// The patch owned quantity request body
function patchHoldingGroupRequest(): HoldingGroupRequest {
  const group = store.selectionState.group
  if (group) {
    return {
      publicHoldingUuids: group.publicHoldings.map(
        (publicHoldings) => publicHoldings.uuid
      ),
      privateHoldingUuids: group.privateHoldings.map(
        (privateHolding) => privateHolding.uuid
      ),
    } as HoldingGroupRequest
  }
  return {} as HoldingGroupRequest
}
</script>
