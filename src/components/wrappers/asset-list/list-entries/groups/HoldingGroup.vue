<template>
  <div class="holding-group">
    <slot name="holdings">
      <div class="holding-placeholder">leere Gruppe</div>
    </slot>
    <HoldingGroupPercentage v-if="false" />
    <HoldingGroupFooter :holding="holding.holdingGroup" />
  </div>
</template>

<script lang="ts" setup>
import HoldingGroupFooter from '@/components/wrappers/asset-list/list-entries/groups/HoldingGroupFooter.vue'
import HoldingGroupPercentage from '@/components/wrappers/asset-list/list-entries/groups/HoldingGroupPercentage.vue'
import type { AssetListEntry } from '@/models/holdings/AssetListEntry'
import type { PropType } from 'vue'
import type { AssetListEntryTypeEnum } from '@/models/enums/AssetListEntryTypeEnum'

const props = defineProps({
  holding: {
    type: Object as PropType<AssetListEntry>,
    required: true,
  },
})
</script>
