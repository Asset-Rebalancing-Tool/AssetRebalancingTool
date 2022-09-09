<template>
  <SidebarSection v-if="true" />
  <RouterView />
  <ModalUnderlay />
</template>

<script lang="ts" setup>
import SidebarSection from '@/components/SidebarSection.vue'
import ModalUnderlay from '@/components/modals/ModalUnderlay.vue'
</script>
