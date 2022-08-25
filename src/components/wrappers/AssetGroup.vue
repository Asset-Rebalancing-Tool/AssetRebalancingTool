<template>
  <div class="asset-group">
    <slot name="assets"></slot>
    <AssetGroupPercentageWrapper />
    <AssetGroupFooter />
  </div>
</template>

<script setup>
import AssetGroupPercentageWrapper from '@/components/wrappers/AssetGroupPercentage.vue'
import AssetGroupFooter from '@/components/wrappers/AssetGroupFooter.vue'
</script>
