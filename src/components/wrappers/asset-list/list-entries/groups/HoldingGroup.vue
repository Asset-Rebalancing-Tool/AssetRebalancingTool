<template>
  <div class="holding-group">
    <slot name="holdings">
      <div class="holding-placeholder">leere Gruppe</div>
    </slot>
    <HoldingGroupPercentage
      v-if="nestedHoldingCount > 0"
      :nested-holding-count="nestedHoldingCount"
    />
    <HoldingGroupFooter :holding="holding.holdingGroup" />
  </div>
</template>

<script lang="ts" setup>
import HoldingGroupFooter from '@/components/wrappers/asset-list/list-entries/groups/HoldingGroupFooter.vue'
import HoldingGroupPercentage from '@/components/wrappers/asset-list/list-entries/groups/HoldingGroupPercentage.vue'
import type { AssetListEntry } from '@/models/AssetListEntry'
import type { PropType } from 'vue'
import type { EntryTypeEnum } from '@/models/enums/EntryTypeEnum'
import { computed } from 'vue'

const props = defineProps({
  holding: {
    type: Object as PropType<AssetListEntry>,
    required: true,
  },
  nestedHoldingCount: {
    type: Number,
    required: true,
  },
})
</script>
