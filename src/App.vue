<template>
  <SidebarSection />
  <RouterView />
  <ModalUnderlay />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SidebarSection from './components/sidebar/SidebarSection.vue'
import ModalUnderlay from './components/asset/ModalUnderlay.vue'

export default defineComponent({
  name: 'App',
  components: {
    SidebarSection,
    ModalUnderlay,
  },
})
</script>
