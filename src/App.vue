<template>
  <SidebarSection />
  <router-view />
  <ModalUnderlay />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import SidebarSection from './components/sidebar/SidebarSection.vue'
import ModalUnderlay  from './components/asset/searchbar/ModalUnderlay.vue'

export default defineComponent({
  name: 'App',
  components: {
    SidebarSection,
    ModalUnderlay
  }
})
</script>

<style>
  @import "assets/css/theme.scss";
  @import "assets/css/general.scss";
  @import "assets/css/icons.scss";
</style>
