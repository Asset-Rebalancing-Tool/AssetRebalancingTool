<template>
  <SidebarSection v-if="false" />
  <RouterView />
  <ModalUnderlay />
</template>

<script lang="ts" setup>
import SidebarSection from '@/components/SidebarSection.vue'
import ModalUnderlay from '@/components/modals/ModalUnderlay.vue'
</script>
