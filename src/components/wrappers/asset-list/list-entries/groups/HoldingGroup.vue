<template>
  <div class="holding-group">
    <slot name="holdings"></slot>
    <HoldingGroupPercentage />
    <HoldingGroupFooter />
  </div>
</template>

<script setup>
import HoldingGroupPercentage from '@/components/wrappers/asset-list/list-entries/groups/HoldingGroupPercentage.vue'
import HoldingGroupFooter from '@/components/wrappers/asset-list/list-entries/groups/HoldingGroupFooter.vue'
</script>
