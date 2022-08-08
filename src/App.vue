<template>
  <SidebarSection />
  <RouterView />
  <ModalUnderlay />
</template>

<script lang="ts" setup>
  import SidebarSection from './components/sidebar/SidebarSection.vue'
  import ModalUnderlay from './components/asset/ModalUnderlay.vue'
</script>
