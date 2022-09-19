<template>
  <HoldingGroup
      v-if="holding.entryType === AssetListEntryTypeEnum.HOLDING_GROUP"
      :key="holding.uuid"
      :holding="holding.holdingGroup"
  ></HoldingGroup>

  <PublicHolding
      v-if="holding.entryType === AssetListEntryTypeEnum.PUBLIC_HOLDING"
      :key="holding.uuid"
      :holding="holding.publicHolding"
  />

  <PrivateHolding
      v-if="holding.entryType === AssetListEntryTypeEnum.PRIVATE_HOLDING"
      :key="holding.uuid"
      :holding="holding.privateHolding"
  />
</template>

<script lang="ts" setup>
import HoldingGroup  from '@/components/wrappers/HoldingGroup.vue'
import PublicHolding from '@/components/wrappers/PublicHolding.vue'
import PrivateHolding from '@/components/wrappers/PrivateHolding.vue'
import { AssetListEntryTypeEnum } from '@/models/enums/AssetListEntryTypeEnum'
import type { AssetListEntry } from '@/models/holdings/AssetListEntry'
import type { PropType } from 'vue'

const props = defineProps({
  holding: {
    type: Object as PropType<AssetListEntry>,
    required: true
  }
})
</script>
