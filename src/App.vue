<template>
  <div class="app-container" :class="mainStore.getThemeColor">
    <SidebarSection v-if="showSidebar" />
    <RouterView />
    <ModalUnderlay />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useMainStore } from "@/stores/MainStore";
import SidebarSection from '@/components/SidebarSection.vue'
import ModalUnderlay from '@/components/modals/ModalUnderlay.vue'
import { ThemeColorEnum } from "@/models/enums/ThemeColorEnum";

const mainStore = useMainStore()
const showSidebar = computed(() => mainStore.showSidebar)

const themeClass = computed(() => {
  switch (mainStore.getThemeColor) {
    case ThemeColorEnum.GREEN: return 'green'
    case ThemeColorEnum.BLUE: return 'blue'
    case ThemeColorEnum.ORANGE: return 'green'
    case ThemeColorEnum.VIOLETTE: return 'green'
  }
})
</script>

<style>

</style>