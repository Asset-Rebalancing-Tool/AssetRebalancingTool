<template>
  <HoldingGroup
    v-if="listEntry.entryType === EntryTypeEnum.HOLDING_GROUP"
    :key="listEntry.uuid"
    :holding="listEntry"
  >
    <template #holdings>

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
import PatchAssetService from '@/services/PatchAssetService'
import HoldingGroup from '@/components/wrappers/asset-list/list-entries/groups/HoldingGroup.vue'
import PublicHolding from '@/components/wrappers/asset-list/list-entries/PublicHolding.vue'
import PrivateHolding from '@/components/wrappers/asset-list/list-entries/PrivateHolding.vue'
import type { HoldingGroup as HoldingGroupType } from '@/models/holdings/HoldingGroup'
import type { PublicHolding as PublicHoldingType } from '@/models/holdings/PublicHolding'
import type { PrivateHolding as PrivateHoldingType } from '@/models/holdings/PrivateHolding'
import { EntryTypeEnum } from '@/models/enums/EntryTypeEnum'
import type { AssetListEntry } from '@/models/holdings/AssetListEntry'
import type { PropType } from 'vue'
import { useAssetStore } from "@/stores/AssetStore";
import type { HoldingGroupRequest } from "@/requests/HoldingGroupRequest";
import type { PublicHoldingRequest } from "@/requests/PublicHoldingRequest";
import type { PrivateHoldingRequest } from "@/requests/PrivateHoldingRequest";

const store = useAssetStore()
const props = defineProps({
  listEntry: {
    type: Object as PropType<AssetListEntry>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  }
})

function addListEntryToGroup() {
  store.addListEntryToGroup(props.listEntry)
}

function removeHoldingFromGroup() {
  store.removeHoldingFromGroup(props.listEntry)
}

</script>
