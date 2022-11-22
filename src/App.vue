<template>
  <div class="app-container" :class="mainStore.getThemeColor">
    <SidebarSection v-if="showSidebar" />
    <RouterView />
    <ModalUnderlay />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useMainStore } from '@/stores/MainStore'
import SidebarSection from '@/components/SidebarSection.vue'
import ModalUnderlay from '@/components/modals/ModalUnderlay.vue'

const mainStore = useMainStore()
const showSidebar = computed(() => mainStore.showSidebar)

</script>

<style></style>
