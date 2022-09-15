<template>
  <div class="holding-group">
    <slot name="holdings"></slot>
    <HoldingGroupPercentage />
    <HoldingGroupFooter />
  </div>
</template>

<script setup>
import HoldingGroupPercentage from '@/components/wrappers/HoldingGroupPercentage.vue'
import HoldingGroupFooter from '@/components/wrappers/HoldingGroupFooter.vue'
</script>
