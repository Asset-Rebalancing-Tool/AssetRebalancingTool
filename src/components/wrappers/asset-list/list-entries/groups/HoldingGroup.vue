<template>
  <div class="holding-group">
    <slot name="holdings">
      <div class="holding-placeholder">
        {{ $t('assetList.listEntries.holdingGroup.emptyGroup') }}
      </div>
    </slot>
    <HoldingGroupPercentage
      v-if="nestedHoldingCount > 0"
      :group-uuid="uuid"
      :nested-holding-count="nestedHoldingCount"
    />
    <HoldingGroupFooter :uuid="uuid" />
  </div>
</template>

<script lang="ts" setup>
import HoldingGroupFooter from '@/components/wrappers/asset-list/list-entries/groups/HoldingGroupFooter.vue'
import HoldingGroupPercentage from '@/components/wrappers/asset-list/list-entries/groups/HoldingGroupPercentage.vue'
import { useAssetMapStore } from '@/stores/AssetMapStore'

const store = useAssetMapStore()

const props = defineProps({
  uuid: {
    type: String,
    required: true,
  },
  nestedHoldingCount: {
    type: Number,
    required: true,
  },
})
</script>
