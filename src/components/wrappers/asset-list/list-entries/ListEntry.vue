<template>
  <HoldingGroup
    v-if="holding.entryType === AssetListEntryTypeEnum.HOLDING_GROUP"
    :key="holding.uuid"
    :holding="holding"
  >
    <template #holdings>
        <PublicHolding
            v-for="groupEntry in holding.publicHolding"
            :key="groupEntry.uuid"
            :holding="groupEntry"
            @click="removePublicEntryFromGroup(holding.uuid, groupEntry.uuid)"
        />
        <PrivateHolding
            v-for="groupEntry in holding.privateHolding"
            :key="groupEntry.uuid"
            :holding="groupEntry"
            @click="removePrivateEntryFromGroup(holding.uuid, groupEntry.uuid)"
        />
    </template>
  </HoldingGroup>

  <PublicHolding
    v-if="holding.entryType === AssetListEntryTypeEnum.PUBLIC_HOLDING"
    :key="holding.uuid"
    :holding="holding.publicHolding"
    @click="addPublicEntryToGroup(index, holding.uuid)"
  />

  <PrivateHolding
    v-if="holding.entryType === AssetListEntryTypeEnum.PRIVATE_HOLDING"
    :key="holding.uuid"
    :holding="holding.privateHolding"
    @click="addPrivateEntryToGroup(index, holding.uuid)"
  />
</template>

<script lang="ts" setup>
import HoldingGroup from '@/components/wrappers/asset-list/list-entries/groups/HoldingGroup.vue'
import PublicHolding from '@/components/wrappers/asset-list/list-entries/PublicHolding.vue'
import PrivateHolding from '@/components/wrappers/asset-list/list-entries/PrivateHolding.vue'
import { AssetListEntryTypeEnum } from '@/models/enums/AssetListEntryTypeEnum'
import type { AssetListEntry } from '@/models/holdings/AssetListEntry'
import type { PropType } from 'vue'

const props = defineProps({
  holding: {
    type: Object as PropType<AssetListEntry>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  }
})


function addPublicEntryToGroup(index: number, holdingUuid: string): void {
  console.log(holdingUuid)
}

function addPrivateEntryToGroup(index: number, holdingUuid: string): void {
  console.log(holdingUuid)
}

function removePublicEntryFromGroup(groupUuid: string, holdingUuid: string): void {
  console.log(groupUuid)
  console.log(holdingUuid)
}

function removePrivateEntryFromGroup(groupUuid: string, holdingUuid: string): void {
  console.log(groupUuid)
  console.log(holdingUuid)
}

</script>
