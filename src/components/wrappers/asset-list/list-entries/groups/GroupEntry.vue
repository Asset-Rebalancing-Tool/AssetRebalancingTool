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
import PublicHolding from '@/components/wrappers/asset-list/list-entries/PublicHolding.vue'
import PrivateHolding from '@/components/wrappers/asset-list/list-entries/PrivateHolding.vue'
import { EntryTypeEnum } from '@/models/enums/EntryTypeEnum'
import type { GroupEntry } from '@/models/holdings/GroupEntry'
import type { PropType } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'

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
  const selectedGroupUuid: string | null = store.selectionState.groupUuid
  if (selectedGroupUuid) {
    store.removeHoldingFromGroup(props.groupEntry, selectedGroupUuid)
  }
}
</script>
