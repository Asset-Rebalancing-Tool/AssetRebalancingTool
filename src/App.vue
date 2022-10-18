<template>
  <SidebarSection v-if="showSidebar" />
  <RouterView />
  <ModalUnderlay />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import SidebarSection from '@/components/SidebarSection.vue'
import ModalUnderlay from '@/components/modals/ModalUnderlay.vue'
import { useSearchStore } from '@/stores/SearchStore'

const searchStore = useSearchStore()
const showSidebar = computed(() => searchStore.showSidebar)
</script>
