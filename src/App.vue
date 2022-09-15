<template>
  <SidebarSection v-if="store.showSidebar" />
  <RouterView />
  <ModalUnderlay />
</template>

<script lang="ts" setup>
import SidebarSection from '@/components/SidebarSection.vue'
import ModalUnderlay from '@/components/modals/ModalUnderlay.vue'
import { useAssetStore } from '@/stores/AssetStore'

const store = useAssetStore()
</script>
