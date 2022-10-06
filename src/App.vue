<template>
  <SidebarSection v-if="showSidebar" />
  <RouterView />
  <ModalUnderlay />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import SidebarSection from '@/components/SidebarSection.vue'
import ModalUnderlay from '@/components/modals/ModalUnderlay.vue'
import { useSearchbarStore } from '@/stores/SearchbarStore'

const store = useSearchbarStore()

const showSidebar = computed(() => store.showSidebar)
</script>
