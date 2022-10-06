<template>
  <PublicHolding
    v-if="groupEntry.entryType === EntryTypeEnum.PUBLIC_HOLDING"
    :key="groupEntry.uuid"
    :holding="groupEntry.publicHolding"
    @click="removeHoldingFromGroup"
  />

  <PrivateHolding
    v-if="groupEntry.entryType === EntryTypeEnum.PRIVATE_HOLDING"
    :key="groupEntry.uuid"
    :holding="groupEntry.privateHolding"
    @click="removeHoldingFromGroup"
  />
</template>

<script lang="ts" setup>
import PatchAssetService from '@/services/PatchAssetService'
import PublicHolding from '@/components/wrappers/asset-list/list-entries/PublicHolding.vue'
import PrivateHolding from '@/components/wrappers/asset-list/list-entries/PrivateHolding.vue'
import { EntryTypeEnum } from '@/models/enums/EntryTypeEnum'
import type { GroupEntry } from '@/models/holdings/GroupEntry'
import type { PropType } from 'vue'
import type { HoldingGroupRequest } from '@/requests/HoldingGroupRequest'
import { useAssetStore } from '@/stores/SearchbarStore'

/**-***************************************************-**/
/** ----------- Props And Store Declaration ----------- **/
/**-***************************************************-**/

const store = useAssetStore()
const props = defineProps({
  groupEntry: {
    type: Object as PropType<GroupEntry>,
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

/**-***************************************************-**/
/** ------------- Template Render Actions ------------- **/
/**-***************************************************-**/

/**
 * Remove a public or private list entry from the selected holding group
 */
function removeHoldingFromGroup(): void {
  if (store.selectionState.group) {
    const selectedGroupUuid: string = store.selectionState.group.uuid
    store.removeHoldingFromGroup(props.groupEntry, selectedGroupUuid)
    PatchAssetService.patchHoldingGroup(
      patchHoldingGroupRequest(),
      selectedGroupUuid
    )
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
